import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { search } from '../../services/moviesService';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const query = searchParams.get('q');

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                setIsLoading(true);
                try {
                    const data = await search(query);
                    const searchResults = data.results || data;
                    setResults(searchResults);
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                }
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (isLoading) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Results for "{query}"</h2>
            <div className="row">
                {results.map((item) => (
                    <div key={item.id || item._id} className="col-md-4 col-lg-3 mb-4">
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