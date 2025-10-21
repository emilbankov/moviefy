import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { search } from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const query = searchParams.get('q');
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                setLoading(true);
                try {
                    const data = await search(query);
                    const searchResults = data.results || data;
                    setResults(searchResults);
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchResults();
    }, [query, setLoading]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Results for "{query}"</h2>
            <div className="row">
                {results.map((item) => (
                    <div key={item.id || item._id} className="col-md-4 col-lg-3 mb-4">
                        <Link 
                            to={item.type === 'series' ? `/series/details/${item.id}` : `/movie/details/${item.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="movie-card">
                                <div className="poster">
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
                                        alt={item.title || item.name} 
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="content p-3">
                                    <h3 className="h5 mb-2">{item.title || item.name}</h3>
                                    <p className="mb-2">
                                        <span className="rating me-2">
                                            <i className="fas fa-star"></i>
                                            {item.vote_average}
                                        </span>
                                        <span className="type me-2">
                                            {item.type === 'movie' ? 'Movie' : 'Series'}
                                        </span>
                                        {item.release_date && (
                                            <span className="year">
                                                {item.release_date.split('-')[0]}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {results.length === 0 && (
                <div className="text-center">
                    <p>No results found for "{query}"</p>
                </div>
            )}
        </div>
    );
} 