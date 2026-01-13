import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestMovies, getPopularMovies, getTrendingMovies } from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';
import MetaTags from '../Meta Tags/MetaTags';

export default function Catalog() {
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState('latest');
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [activeTab, setLoading]);

    const formatRuntime = (minutes) => {
        if (!minutes) return '2hr : 30mins';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}hr : ${mins}mins`;
    };

    const formatViews = (count) => {
        if (!count) return Math.floor(Math.random() * 100) + 'K';
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
        return count.toString();
    };

    const getGenreName = (genreId) => {
        const genres = {
            28: 'Action',
            12: 'Adventure',
            16: 'Animation',
            35: 'Comedy',
            80: 'Crime',
            99: 'Documentary',
            18: 'Drama',
            10751: 'Family',
            14: 'Fantasy',
            36: 'History',
            27: 'Horror',
            10402: 'Music',
            9648: 'Mystery',
            10749: 'Romance',
            878: 'Sci-Fi',
            10770: 'TV Movie',
            53: 'Thriller',
            10752: 'War',
            37: 'Western'
        };
        return genres[genreId] || null;
    };

    return (
        <>
            <MetaTags
                title="Moviefy | Каталог"
                description="Разгледайте нашия пълен каталог с филми и сериали. Най-новите, популярните, тенденциите и топ рейтинговите заглавия на едно място."
                keywords="каталог, филми, сериали, най-нови, популярни, тенденции, топ рейтинг, Moviefy, онлайн каталог"
            />
            <section className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="categories-tabs">
                                <div className="section-title">
                                    <h2 className="title">Movie Catalog</h2>
                                </div>
                                <div className="tabs">
                                    <ul
                                        className="nav nav-tabs nav-pills"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === 'latest' ? 'active' : ''}`}
                                                id="latest-movies"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-latest"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-latest"
                                                aria-selected={activeTab === 'latest'}
                                                onClick={() => setActiveTab('latest')}
                                            >
                                                Latest Movies
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === 'popular' ? 'active' : ''}`}
                                                id="popular-movies"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-popular"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-popular"
                                                aria-selected={activeTab === 'popular'}
                                                onClick={() => setActiveTab('popular')}
                                            >
                                                Popular Movies
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${activeTab === 'trending' ? 'active' : ''}`}
                                                id="trending-movies"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-trending"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-trending"
                                                aria-selected={activeTab === 'trending'}
                                                onClick={() => setActiveTab('trending')}
                                            >
                                                Trending Movies
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {movies.map((movie) => {
                            const posterUrl = movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                                : '/images/no-image.jpg';
                            const genre = movie.genre_ids && movie.genre_ids[0] 
                                ? getGenreName(movie.genre_ids[0]) 
                                : null;

                            return (
                                <div key={movie.id || movie._id} className="col-xxl-3 col-lg-4 col-md-6 mb-4">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src={posterUrl}
                                                alt={movie.title || movie.name}
                                                onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                            />
                                            <div className="info-top">
                                                {genre && (
                                                    <Link className="tag" to="#">
                                                        {genre}
                                                    </Link>
                                                )}
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> {formatViews(movie.popularity)}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        {formatRuntime(movie.runtime)}
                                                    </a>
                                                    <div className="info-content">
                                                        <div className="movies-title">
                                                            <h5>
                                                                <Link
                                                                    className="title mt-0"
                                                                    to={`/movie/details/${movie.api_id}`}
                                                                >
                                                                    {movie.title || movie.name}
                                                                </Link>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="add-icon"
                                                            />
                                                            <div className="share-box">
                                                                <a href="#">
                                                                    {" "}
                                                                    <i className="fas fa-share-alt" />{" "}
                                                                </a>
                                                                <ul className="list-unstyled share-box-social">
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-facebook-f" />
                                                                        </a>{" "}
                                                                    </li>
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-twitter" />
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-linkedin" />
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-instagram" />
                                                                        </a>{" "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {movies.length === 0 && (
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="py-5">
                                    <h3 className="text-white-50">No movies found</h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
} 