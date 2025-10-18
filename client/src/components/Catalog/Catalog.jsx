import { useState, useEffect } from 'react';
import { getLatestMovies, getPopularMovies, getTrendingMovies } from '../../services/moviesService';

export default function Catalog() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('latest');

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                let data;
                switch (activeTab) {
                    case 'latest':
                        data = await getLatestMovies();
                        break;
                    case 'popular':
                        data = await getPopularMovies();
                        break;
                    case 'trending':
                        data = await getTrendingMovies();
                        break;
                    default:
                        data = await getLatestMovies();
                }
                const movieResults = data.results || data;
                setMovies(movieResults);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            }
            setIsLoading(false);
        };

        fetchMovies();
    }, [activeTab]);

    if (isLoading) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Movie Catalog</h2>
            
            {/* Tab Navigation */}
            <div className="catalog-tabs mb-4">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link ${activeTab === 'latest' ? 'active' : ''}`}
                            onClick={() => setActiveTab('latest')}
                        >
                            Latest Movies
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link ${activeTab === 'popular' ? 'active' : ''}`}
                            onClick={() => setActiveTab('popular')}
                        >
                            Popular Movies
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link ${activeTab === 'trending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('trending')}
                        >
                            Trending Movies
                        </button>
                    </li>
                </ul>
            </div>

            {/* Movies Grid */}
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id || movie._id} className="col-md-4 col-lg-3 mb-4">
                        <div className="movie-card">
                            <div className="poster">
                                <img 
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/images/placeholder-movie.jpg'} 
                                    alt={movie.title || movie.name} 
                                    className="img-fluid"
                                />
                            </div>
                            <div className="content p-3">
                                <h3 className="h5 mb-2">{movie.title || movie.name}</h3>
                                <p className="mb-2">
                                    <span className="rating me-2">
                                        <i className="fas fa-star"></i>
                                        {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                    </span>
                                    {movie.release_date && (
                                        <span className="year">
                                            {movie.release_date.split('-')[0]}
                                        </span>
                                    )}
                                </p>
                                {movie.overview && (
                                    <p className="overview text-muted small">
                                        {movie.overview.length > 100 
                                            ? `${movie.overview.substring(0, 100)}...` 
                                            : movie.overview
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {movies.length === 0 && (
                <div className="text-center">
                    <p>No movies found</p>
                </div>
            )}
        </div>
    );
} 