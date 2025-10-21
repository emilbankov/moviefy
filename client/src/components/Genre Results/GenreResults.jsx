import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getMovieGenres } from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';

export default function GenreResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const genre = searchParams.get('genre');
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchGenreResults = async () => {
            if (genre) {
                setLoading(true);
                try {
                    const data = await getMovieGenres('all', genre);
                    console.log('Genre results:', data);
                    setResults(data.results || data.movies || data);
                } catch (error) {
                    console.error('Genre fetch error:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchGenreResults();
    }, [genre, setLoading]);

    return (
        <>
            <section className="space-ptb bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">{genre} Movies & TV Shows</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {results && results.length > 0 ? (
                            results.map((item) => (
                                <div key={item.id || item._id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <Link 
                                        to={item.type === 'series' ? `/series/details/${item.id}` : `/movie/details/${item.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div className="movies-categories-style-3">
                                            <div className="movie-image">
                                                <img
                                                    className="img-fluid"
                                                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/movie/movie-01.jpg'}
                                                    alt={item.title || item.name}
                                                />
                                            </div>
                                            <div className="movie-info-content">
                                                <h6>
                                                    <span className="title">
                                                        {item.title || item.name}
                                                    </span>
                                                </h6>
                                                <div className="movie-info smaller-text">
                                                    <span className="year">
                                                        {item.release_date ? new Date(item.release_date).getFullYear() : 
                                                         item.first_air_date ? new Date(item.first_air_date).getFullYear() : 
                                                         item.year || 'N/A'}
                                                    </span>
                                                    {item.type === 'series' ? (
                                                        <a className="time" href="#">
                                                            SS {item.seasons || item.number_of_seasons || 'N/A'} <span className="dot"></span> EPS {item.episodes || item.number_of_episodes || 'N/A'}
                                                        </a>
                                                    ) : (
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            {item.runtime ? `${Math.floor(item.runtime / 60)}hr : ${item.runtime % 60}min` : 'N/A'}
                                                        </a>
                                                    )}
                                                    <div className="info-tag">
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" />
                                                        </a>
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="rating" href="#">
                                                            <i className="fa-solid fa-star" /> {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}/10
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p className="text-white">No results found for {genre}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

