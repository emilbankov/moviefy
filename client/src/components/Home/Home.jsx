import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as moviesService from '../../services/moviesService'
import * as seriesService from '../../services/seriesService'
import * as userService from '../../services/userService'
import { useLoading } from '../../contexts/LoadingContext';

// Helper function to convert genre display name to database name
const getGenreParam = (genreName) => {
    if (genreName === 'Sci-Fi') return 'Science Fiction';
    if (genreName === 'Sci-Fi & Fantasy') return 'Science Fiction';
    return genreName;
};

export default function Home() {
    const [bannerMovies, setBannerMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularCollections, setPopularCollections] = useState([]);

    const [bannerSeries, setBannerSeries] = useState([]);
    const [latestSeries, setLatestSeries] = useState([]);
    const [trendingSeries, setTrendingSeries] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);

    // Favorites state
    const [favoriteMovieIds, setFavoriteMovieIds] = useState(new Set());
    const [favoriteSeriesIds, setFavoriteSeriesIds] = useState(new Set());

    // Notification state
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success', id: null });

    const { setLoading } = useLoading();

    // Notification function
    const showNotification = (message, type = 'add') => {
        const notificationId = Date.now();

        // If there's a notification currently showing, hide it first
        if (notification.show) {
            setNotification(prev => ({ ...prev, show: false }));
            // Wait for hide animation, then show new one
            setTimeout(() => {
                setNotification({ show: true, message, type, id: notificationId });
                setTimeout(() => {
                    setNotification(prev => ({ ...prev, show: false }));
                }, 2000); // 2 seconds as requested
            }, 200); // Brief pause for hide animation
        } else {
            // No current notification, show immediately
            setNotification({ show: true, message, type, id: notificationId });
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 2000); // 2 seconds as requested
        }
    };

    useEffect(() => {
        setLoading(true);
      
        Promise.all([
          moviesService.getBannerMovies(),
          moviesService.getLatestMovies("movies", 1, 12, ""),
          moviesService.getTrendingMovies("movies", 1, 10, ""),
          moviesService.getPopularMovies("movies", 1, 10, ""),
          moviesService.getTopRatedMovies("movies", 1, 10, ""),
          moviesService.getPopularCollections(1, 10),
          seriesService.getBannerSeries(),
          seriesService.getLatestSeries("", 1, 12),
          seriesService.getTrendingSeries("", 1, 10, ""),
          seriesService.getPopularSeries("", 1, 10),
          seriesService.getTopRatedSeries("", 1, 10, ""),
        ])
          .then(([
            banner, latest, trending, popular, topRated, collections,
            bannerSeries, latestSeriesData, trendingSeriesData, popularSeriesData, topRatedSeriesData
          ]) => {
            setBannerMovies(banner);
            setLatestMovies(latest);
            setTrendingMovies(trending);
            setPopularMovies(popular);
            setTopRatedMovies(topRated);
            setPopularCollections(collections);
      
            setBannerSeries(bannerSeries);
            setLatestSeries(latestSeriesData);
            setTrendingSeries(trendingSeriesData);
            setPopularSeries(popularSeriesData);
            setTopRatedSeries(topRatedSeriesData);
      
            // favorites - best effort
            return Promise.all([
              userService.getFavoriteMoviesIds(),
              userService.getFavoriteSeriesIds(),
            ]).catch(() => [ { data: [] }, { data: [] } ]);
          })
          .then(([favoriteMovies, favoriteSeries]) => {
            setFavoriteMovieIds(new Set(favoriteMovies.data));
            setFavoriteSeriesIds(new Set(favoriteSeries.data));
          })
          .catch(err => console.error("Error fetching data:", err))
          .finally(() => setLoading(false));
      }, [setLoading]);

    // useEffect(() => {
    //     const existingScript = document.querySelector('script[src="/js/custom.js"]');
    //     if (existingScript) {
    //         document.body.removeChild(existingScript);
    //     }

    //     const script = document.createElement('script');
    //     script.src = '/js/custom.js';
    //     script.async = true;
    //     document.body.appendChild(script);

    //     return () => {
    //         if (document.body.contains(script)) {
    //             document.body.removeChild(script);
    //         }
    //     };
    // }, [bannerMovies.rest_movies, latestMovies.movies, trendingMovies.movies, popularMovies.movies, popularCollections.collections, latestSeries.series, bannerSeries.series, popularSeries.series]);

    useEffect(() => {
        const handleLoad = () => {
            // Wait for all images to load before initializing carousel
            const images = document.querySelectorAll('.owl-carousel img');
            let loadedCount = 0;
            const totalImages = images.length;

            const initCarousel = () => {
                const existingScript = document.querySelector('script[src="/js/custom.js"]');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }

                const script = document.createElement('script');
                script.src = '/js/custom.js';
                script.async = true;
                document.body.appendChild(script);
            };

            if (totalImages === 0) {
                // No images, initialize immediately
                initCarousel();
            } else {
                // Wait for all images to load
                images.forEach((img) => {
                    if (img.complete) {
                        loadedCount++;
                    } else {
                        img.addEventListener('load', () => {
                            loadedCount++;
                            if (loadedCount === totalImages) {
                                initCarousel();
                            }
                        });
                        img.addEventListener('error', () => {
                            loadedCount++;
                            if (loadedCount === totalImages) {
                                initCarousel();
                            }
                        });
                    }
                });

                // If all images were already loaded
                if (loadedCount === totalImages) {
                    initCarousel();
                }
            }
        };

        // Wait for the window to fully load
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
            const script = document.querySelector('script[src="/js/custom.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [bannerMovies.rest_movies, latestMovies.movies, trendingMovies.movies, popularMovies.movies, topRatedMovies.movies, popularCollections.collections, latestSeries.series, bannerSeries.series, trendingSeries.series, popularSeries.series, topRatedSeries.series]);

    const toggleFavorite = async (mediaType, id, e) => {
        e.preventDefault();
        e.stopPropagation();

        const isMovie = mediaType === 'movie';
        const currentFavorites = isMovie ? favoriteMovieIds : favoriteSeriesIds;
        const isFavorited = currentFavorites.has(id);

        try {
            if (isFavorited) {
                // Remove from favorites - wait for API success
                if (isMovie) {
                    const response = await userService.removeMovieFromFavorites(id);
                    setFavoriteMovieIds(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(id);
                        return newSet;
                    });
                    showNotification(response.message, 'remove');
                } else {
                    const response = await userService.removeSeriesFromFavorites(id);
                    setFavoriteSeriesIds(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(id);
                        return newSet;
                    });
                    showNotification(response.message, 'remove');
                }
            } else {
                // Add to favorites - wait for API success
                if (isMovie) {
                    const response = await userService.addMovieToFavorites(id);
                    setFavoriteMovieIds(prev => new Set([...prev, id]));
                    showNotification(response.message, 'add');
                } else {
                    const response = await userService.addSeriesToFavorites(id);
                    setFavoriteSeriesIds(prev => new Set([...prev, id]));
                    showNotification(response.message, 'add');
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);

            // Handle authentication errors (including redirects to login)
            if (error.status === 401 || error.status === 403 || error.status === 302) {
                showNotification('You need to be logged in to add favorites', 'auth');
            } else {
                showNotification('Failed to update favorite', 'remove');
            }

            // Don't update UI on error - heart stays in current state
        }
    };

    return (
        <>
            {/* Notification */}
            <div
                 key={notification.id}
                 style={{
                     position: 'fixed',
                     top: notification.show ? '20px' : '-120px',
                     left: '50%',
                     transform: 'translateX(-50%)',
                     zIndex: 9999,
                     backgroundColor: notification.type === 'add' ? '#28a745' : notification.type === 'auth' ? '#17a2b8' : '#dc3545',
                     color: 'white',
                     padding: notification.type === 'auth' ? '20px 32px' : '16px 32px',
                     borderRadius: '8px',
                     boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                     border: '2px solid rgba(255,255,255,0.2)',
                     transition: 'all 0.4s ease-in-out',
                     opacity: notification.show ? 1 : 0,
                     fontWeight: '600',
                     fontSize: '16px',
                     whiteSpace: 'nowrap',
                     minWidth: notification.type === 'auth' ? '400px' : '300px',
                     textAlign: 'center',
                     pointerEvents: notification.show ? 'auto' : 'none',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     gap: notification.type === 'auth' ? '12px' : '0'
                 }}>
                {notification.show && (
                    <>
                        <div>{notification.message}</div>
                        {notification.type === 'auth' && (
                            <Link
                                to="/login-register"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    transition: 'background-color 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                            >
                                Login to Add Favorites
                            </Link>
                        )}
                    </>
                )}
            </div>

            <section className="banner banner-1 position-relative">
                <div className="shape-01"><img className="img-fluid" src="images/banner/home-01/shape-01.png" alt="#" /></div>
                <div className="shape-02"><img className="img-fluid" src="images/banner/home-01/shape-02.png" alt="#" /></div>
                <div className="container">
                    {bannerMovies.first_movie && (
                        <div className="row banner-img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovies.first_movie.backdrop_path || ''})`, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: -12, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', pointerEvents: 'none', zIndex: 0 }} />
                            <div className="col-xxl-6 col-xl-7 col-md-9 order-md-1 order-2" style={{ position: 'relative', zIndex: 1 }}>
                                <div className="movie-details-info movies-info">
                                    <h1 className="title">{bannerMovies.first_movie.title}</h1>
                                    <div className="d-flex">
                                        <span className="year m-0">{bannerMovies.first_movie?.year || ''}</span>
                                        <span className="dot as-c"></span>
                                        <span className="time">{Math.floor(bannerMovies.first_movie.runtime / 60)} hr {bannerMovies.first_movie.runtime % 60} min</span>
                                    </div>
                                    <div className="features">
                                        <span className="review">R</span>
                                        <span className="imdb">
                                            <a className="logo-align" href={`https://www.imdb.com/title/${bannerMovies.first_movie.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <img className="img-fluid" src="/images/imdb-logo.png" alt="#" />{bannerMovies.first_movie.vote_average}
                                            </a>
                                        </span>
                                        <span className="imdb">
                                            <a className="logo-align" href={`https://www.themoviedb.org/movie/${bannerMovies.first_movie.api_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <img className="img-fluid" src="/images/tmdb-logo.svg" alt="#" />{bannerMovies.first_movie.vote_average}
                                            </a>
                                        </span>
                                        <span className={`like ${favoriteMovieIds.has(bannerMovies.first_movie.id) ? 'active' : ''}`} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Like" onClick={(e) => toggleFavorite('movie', bannerMovies.first_movie.id, e)} style={{ cursor: 'pointer' }} />
                                    </div>
                                    <p>{bannerMovies.first_movie.overview.length > 140 ? `${bannerMovies.first_movie.overview.substring(0, 140)}...` : bannerMovies.first_movie.overview}</p>
                                    <div className="author-info">
                                        <div className="author-details">
                                            <span className="author-designation">Directed By</span>
                                            <Link
                                                to={`/crew-media?crewId=${bannerMovies.first_movie.crew[0].id}&crewName=${encodeURIComponent(bannerMovies.first_movie.crew[0].name)}&crewImage=${encodeURIComponent(bannerMovies.first_movie.crew[0].profilePath || '')}&mediaType=all`}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                {bannerMovies.first_movie.crew[0].name}
                                            </Link>
                                        </div>
                                        <div className="author-details">
                                            <span className="author-designation">Written By</span>
                                            <Link
                                                to={`/crew-media?crewId=${bannerMovies.first_movie.crew[1].id}&crewName=${encodeURIComponent(bannerMovies.first_movie.crew[1].name)}&crewImage=${encodeURIComponent(bannerMovies.first_movie.crew[1].profilePath || '')}&mediaType=all`}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                {bannerMovies.first_movie.crew[1].name}
                                            </Link>
                                        </div>
                                        <div className="author-details">
                                            <span className="author-designation">Studio</span>
                                            <Link
                                                to={`/production-company-media?prodId=${bannerMovies.first_movie.production_companies[0].id}&prodName=${encodeURIComponent(bannerMovies.first_movie.production_companies[0].name)}&prodImage=${encodeURIComponent(bannerMovies.first_movie.production_companies[0].logo_path || '')}&mediaType=all`}
                                                style={{ color: 'inherit', textDecoration: 'none' }}
                                            >
                                                {bannerMovies.first_movie.production_companies[0].name}
                                            </Link>
                                        </div>
                                    </div>
                                    <Link to={`/movie/details/${bannerMovies.first_movie.api_id}`} className="btn btn-primary me-2"><i className="fa-solid fa-play" />Play Now</Link>
                                    <a href="#" className="btn btn-light"><i className="fa-solid fa-circle-plus" />Add to List</a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-xl-3 col-md-3 align-self-center order-md-2 order-1 justify-content-start justify-content-md-center d-flex ms-xl-play-button-movies" style={{ position: 'relative', zIndex: 1 }}>
                                <div className="video">
                                    <a className="video-btn btn-animation popup-youtube" href={`https://www.youtube.com/watch?v=${bannerMovies.first_movie.trailer}`}><i className="fa-solid fa-play" /></a>
                                </div>
                            </div>
                        </div>
                    )}
                    {bannerMovies.rest_movies && bannerMovies.rest_movies.length > 0 && (
                        <div className="row">
                            <div className="col-md-10 col-sm-9">
                                <div
                                    className="owl-carousel owl-nav-center"
                                    data-nav-dots="false"
                                    data-nav-arrow="false"
                                    data-items={3}
                                    data-xl-items={3}
                                    data-lg-items={3}
                                    data-md-items={2}
                                    data-sm-items={2}
                                    data-xs-items={1}
                                    data-space={0}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {bannerMovies.rest_movies.map((movie) => (
                                        <div key={movie.id} className="item">
                                            <Link to={`/movie/details/${movie.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories movies-style-1">
                                                    <div className="movies-img banner-backdrop">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                                            alt={movie.title}
                                                        />
                                                        <div className="info-top">
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteMovieIds.has(movie.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('movie', movie.id, e)} style={{ color: favoriteMovieIds.has(movie.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-star" />{movie.vote_average}</a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <h5><span className="title">{movie.title}</span></h5>
                                                                <span className="time"><i className="far fa-clock me-2" />{Math.floor(movie.runtime / 60)}hr : {movie.runtime % 60}mins</span>
                                                            </div>
                                                            <a className="play-btn popup-youtube" href={`https://www.youtube.com/watch?v=${movie.trailer}`} onClick={(e) => e.stopPropagation()}><i className="fa-solid fa-play" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-3 align-self-center text-center py-4 py-sm-0">
                                <Link to={`/collection/${bannerMovies.collection_api_id}`} className="btn btn-link text-white text-uppercase">
                                    See All <i className="fa-solid fa-arrow-right" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section className="space-ptb bg-holder bg-overlay-dark-99" style={{ backgroundImage: "url(images/bg/01.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Latest Movie Releases</h2>
                                <Link to="/catalog?media=movies&category=latest" className="btn-link">
                                    More movies
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {latestMovies.movies && latestMovies.movies.map(latest => (
                            <div key={latest.id} className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 mb-4">
                                <Link to={`/movie/details/${latest.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src={`https://image.tmdb.org/t/p/w500${latest.poster_path}`}
                                                alt={latest.title}
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h6>
                                                <span className="title">
                                                    {latest.title}
                                                </span>
                                            </h6>
                                            <div className="movie-info smaller-text">
                                                <span className="year">{latest.year}</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    {Math.floor(latest.runtime / 60)}hr : {latest.runtime % 60}min
                                                </a>
                                                <div className="info-tag">
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" />
                                                    </a>
                                                    <a href="javascript:void(0)" className={`like ${favoriteMovieIds.has(latest.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('movie', latest.id, e)} style={{ color: favoriteMovieIds.has(latest.id) ? '#ffc107' : 'inherit' }} />
                                                    <a className="rating" href="#">
                                                        <i className="fa-solid fa-star" /> {latest.vote_average}/10
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {trendingMovies.movies && (
                <section className="space-ptb bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Trending Movies</h2>
                                    <Link to="/catalog?media=movies&category=trending" className="btn-link">
                                        More movies
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div
                                    className="owl-carousel owl-nav-center peek-effect"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={5}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={3}
                                    data-sm-items={2}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-stage-padding={50}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {trendingMovies.movies.map((trending) => (
                                        <div className="item" key={trending.id}>
                                            <Link to={`/movie/details/${trending.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}
                                                            alt={trending.title}
                                                        />
                                                        <div className="info-top">
                                                            <Link
                                                                to={`/genre?genre=${getGenreParam(trending.genre)}&media=movies`}
                                                                className="tag"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {trending.genre}
                                                            </Link>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteMovieIds.has(trending.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('movie', trending.id, e)} style={{ color: favoriteMovieIds.has(trending.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {trending.vote_average}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <span className="time">
                                                                    <span className="year" style={{ fontSize: '14px' }}>{trending.year}</span>{" "}
                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                    {Math.floor(trending.runtime / 60)}hr : {trending.runtime % 60}min
                                                                </span>
                                                                <div className="info-content">
                                                                    <div className="movies-title">
                                                                        <a
                                                                            className="play-btn popup-youtube"
                                                                            href={`https://www.youtube.com/watch?v=${trending.trailer}`}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <i className="fa-solid fa-play" />
                                                                        </a>
                                                                        <h5>
                                                                            <span className="title mt-0">
                                                                                {trending.title}
                                                                            </span>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className="space-ptb bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Popular Movie Genres</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row genre-responsive">
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam">
                                <Link to="/genre?genre=Horror" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/horror.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Horror
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/horror.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Horror
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-sm-0 mt-md-4">
                                <Link to="/genre?genre=Action" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/action.png"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Action
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/action.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Action
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <Link to="/genre?genre=Drama" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/drama.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Drama
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/drama.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Drama
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4">
                                <Link to="/genre?genre=Thriller" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/thriller.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Thriller
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/thriller.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Thriller
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <Link to="/genre?genre=Adventure" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/adventure.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Adventure
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/adventure.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Adventure
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <Link to="/genre?genre=Crime" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/crime.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Crime
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/crime.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Crime
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4 mt-sm-0 mt-md-4">
                                <Link to="/genre?genre=Comedy" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/comedy.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Comedy
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/comedy.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Comedy
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <Link to="/genre?genre=Romance" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/romance.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Romance
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/romance.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Romance
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4">
                                <Link to="/genre?genre=Fantasy" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/fantasy.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Fantasy
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/fantasy.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Fantasy
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <Link to="/genre?genre=Science Fiction" className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/genres/sci-fi.jpg"
                                        alt="#"
                                        style={{ opacity: 0.5 }}
                                    />
                                    <h3 className="title">
                                        Sci-Fi
                                    </h3>
                                    <div className="categories-content overlay-new">
                                        <div className="categories-content-inner">
                                            <div>
                                                <div className="icon">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/svg/sci-fi.svg"
                                                        alt="#"
                                                    />
                                                </div>
                                                <h3 className="categories-title">
                                                    Sci-Fi
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {popularMovies.movies && (
                <section className="space-ptb bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">All Time Most Popular Movies</h2>
                                    <Link to="/catalog?media=movies&category=popular" className="btn-link">
                                        More movies
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div
                                    className="owl-carousel owl-nav-center peek-effect"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={5}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={3}
                                    data-sm-items={2}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-stage-padding={50}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {popularMovies.movies.map((popular) => (
                                        <div className="item" key={popular.id}>
                                            <Link to={`/movie/details/${popular.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
                                                            alt={popular.title}
                                                        />
                                                        <div className="info-top">
                                                            <Link
                                                                to={`/genre?genre=${getGenreParam(popular.genre)}&media=movies`}
                                                                className="tag"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {popular.genre}
                                                            </Link>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteMovieIds.has(popular.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('movie', popular.id, e)} style={{ color: favoriteMovieIds.has(popular.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {popular.vote_average}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <span className="time">
                                                                    <span className="year" style={{ fontSize: '14px' }}>{popular.year}</span>{" "}
                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                    {Math.floor(popular.runtime / 60)}hr : {popular.runtime % 60}min
                                                                </span>
                                                                <div className="info-content">
                                                                    <div className="movies-title">
                                                                        <a
                                                                            className="play-btn popup-youtube"
                                                                            href={`https://www.youtube.com/watch?v=${popular.trailer}`}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <i className="fa-solid fa-play" />
                                                                        </a>
                                                                        <h5>
                                                                            <span className="title mt-0">
                                                                                {popular.title}
                                                                            </span>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {topRatedMovies.movies && (
                <section className="space-ptb bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Top Rated Movies</h2>
                                    <Link to="/catalog?media=movies&category=top_rated" className="btn-link">
                                        More movies
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div
                                    className="owl-carousel owl-nav-center peek-effect"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={5}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={3}
                                    data-sm-items={2}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-stage-padding={50}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {topRatedMovies.movies.map((topRated) => (
                                        <div className="item" key={topRated.id}>
                                            <Link to={`/movie/details/${topRated.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${topRated.poster_path}`}
                                                            alt={topRated.title}
                                                        />
                                                        <div className="info-top">
                                                            <Link
                                                                to={`/genre?genre=${getGenreParam(topRated.genre)}&media=movies`}
                                                                className="tag"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {topRated.genre}
                                                            </Link>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteMovieIds.has(topRated.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('movie', topRated.id, e)} style={{ color: favoriteMovieIds.has(topRated.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {topRated.score.toFixed(1)}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <span className="time">
                                                                    <span className="year" style={{ fontSize: '14px' }}>{topRated.year}</span>{" "}
                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                    {Math.floor(topRated.runtime / 60)}hr : {topRated.runtime % 60}min
                                                                </span>
                                                                <div className="info-content">
                                                                    <div className="movies-title">
                                                                        <a
                                                                            className="play-btn popup-youtube"
                                                                            href={`https://www.youtube.com/watch?v=${topRated.trailer}`}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <i className="fa-solid fa-play" />
                                                                        </a>
                                                                        <h5>
                                                                            <span className="title mt-0">
                                                                                {topRated.title}
                                                                            </span>
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">All Time Favorite Movie Collections</h2>
                                <Link to="/catalog?media=collections&category=popular" className="btn-link">
                                    More collections
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {popularCollections.results && popularCollections.results.map((collection, index) => (
                            <div className="col-xl-2-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-4" key={index}>
                                <Link to={`/collection/${collection.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="movies-categories-style-2">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid br-20"
                                                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                                                alt={collection.name}
                                            />
                                            <div className="info-top">
                                                <a href="javascript:void(0)" className={`like ${favoriteMovieIds.has(collection.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('movie', collection.id, e)} style={{ color: favoriteMovieIds.has(collection.id) ? '#ffc107' : 'inherit' }} />
                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                    <i className="fa-solid fa-star" /> {collection.vote_average.toFixed(1)}
                                                </a>
                                            </div>
                                            <div className="movie-info-content">
                                                <a className="time" href="#" onClick={(e) => e.preventDefault()}>
                                                    <i className="far fa-clock me-2" />
                                                    {Math.floor(collection.runtime / 60)}hr : {collection.runtime % 60}min
                                                </a>
                                                <h5>
                                                    <span className="title">
                                                        {collection.name}
                                                    </span>
                                                </h5>
                                                <p>
                                                    {collection.overview}
                                                </p>
                                                <span
                                                    className="btn btn-link btn-link-1"
                                                    style={{ color: 'white', textDecoration: "none" }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ffc107'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <i className="fa-solid fa-play" />Play Now
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="single-categories">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="swiper single-slide">
                                <div className="swiper-wrapper">
                                    {bannerSeries.series && bannerSeries.series.slice(0, 4).map((series) => (
                                        <div
                                            key={series.id}
                                            className="swiper-slide bg-holder"
                                            style={{
                                                position: 'relative'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
                                                    backgroundPosition: 'center -30px',
                                                    backgroundSize: 'cover',
                                                    opacity: 0.4,
                                                    zIndex: 1
                                                }}
                                            />
                                            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                                                <div className="row">
                                                    <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                        <div className="movie-details">
                                                            <div className="movie-info">
                                                                <h2 className="title">{series.name}</h2>
                                                                <div className="movies-language">
                                                                    Language: <span>English</span>{" "}<span className="rating"><i className="fa-solid fa-star" /> {series.vote_average}/10</span>
                                                                </div>
                                                                <div className="movies-genre">
                                                                    Genre:{" "}
                                                                    {series.genres.map((genre, index) => (
                                                                        <a key={index} href="#">
                                                                            {genre.name}
                                                                            {index < series.genres.length - 1 && ", "}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                                <div className="d-sm-flex">
                                                                    <span className="year">{new Date(series.firstAirDate).getFullYear()}</span>
                                                                    <a className="time" href="#">SS {series.seasons} <span className="dot"></span> EPS {series.episodes}</a>
                                                                    <span className="quality">
                                                                        Quality: <a href="#">720P, 1080P</a>
                                                                    </span>
                                                                </div>
                                                                <div className="d-sm-flex my-2">
                                                                    <a className="btn btn-link" href="#">
                                                                        <i className="fa-solid fa-play" /> Play Now
                                                                    </a>
                                                                </div>
                                                                <p className="series-overview">{series.overview.length > 270 ? `${series.overview.substring(0, 270)}...` : series.overview}</p>
                                                            </div>
                                                        </div>
                                                        <Link to={`/series/details/${series.api_id}`} className="btn btn-primary me-2"><i className="fa-solid fa-play" />Play Now</Link>
                                                        <a href="#" className="btn btn-light"><i className="fa-solid fa-circle-plus" />Add to List</a>
                                                    </div>
                                                    <div className="col-xxl-6 ol-xl-5 col-md-2 col-sm-2 align-self-center order-sm-2 order-1">
                                                        <div className="video mb-4 mb-sm-0 ms-xl-play-button-series">
                                                            <a className="video-btn btn-animation popup-youtube" href={`https://www.youtube.com/watch?v=${series.trailer}`}><i className="fa-solid fa-play" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="position-relative">
                                <div className="swiper single-slide-thumb">
                                    <div className="swiper-wrapper">
                                        {bannerSeries.series && bannerSeries.series.slice(0, 4).map((series, index) => (
                                            <div className="swiper-slide" key={series.id}>
                                                <div className="movies-categories movies-style-2">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${series.backdrop_path}`}
                                                            alt={series.name}
                                                        // style={{ opacity: 0.5 }}
                                                        />
                                                        <div className="info-top">
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteSeriesIds.has(series.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('series', series.id, e)} style={{ color: favoriteSeriesIds.has(series.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="rating" href="#"><i className="fa-solid fa-star" /> {series.vote_average}/10</a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <h5>
                                                                    <a className="title" href="javascript:void(0)">
                                                                        {series.name}
                                                                    </a>
                                                                </h5>
                                                                <a className="time" href="#">SS {series.seasons} <span className="dot"></span> EPS {series.episodes}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {trendingSeries.series && (
                <section className="space-ptb bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Trending Series</h2>
                                    <Link to="/catalog?media=series&category=trending" className="btn-link">
                                        More series
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div
                                    className="owl-carousel owl-nav-center peek-effect"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={5}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={3}
                                    data-sm-items={2}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-stage-padding={50}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {trendingSeries.series.map((trending) => (
                                        <div className="item" key={trending.id}>
                                            <Link to={`/series/details/${trending.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}
                                                            alt={trending.title}
                                                        />
                                                        <div className="info-top">
                                                            <Link
                                                                to={`/genre?genre=${getGenreParam(trending.genre)}&media=series`}
                                                                className="tag"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {trending.genre}
                                                            </Link>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteSeriesIds.has(trending.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('series', trending.id, e)} style={{ color: favoriteSeriesIds.has(trending.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {trending.vote_average}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <span className="time">
                                                                    <span className="year" style={{ fontSize: '14px' }}>{trending.year}</span>{" "}
                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                    SS {trending.seasons} <span className="dot"></span> EPS {trending.episodes}
                                                                </span>
                                                                <div className="info-content">
                                                                    <div className="movies-title">
                                                                        <a
                                                                            className="play-btn popup-youtube"
                                                                            href={`https://www.youtube.com/watch?v=${trending.trailer}`}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <i className="fa-solid fa-play" />
                                                                        </a>
                                                                        <h6>
                                                                            <span className="title mt-0">
                                                                                {trending.name}
                                                                            </span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className="space-ptb bg-holder bg-overlay-dark-99" style={{ backgroundImage: "url(images/bg/01.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Newest Series</h2>
                                <Link to="/catalog?media=series&category=latest" className="btn-link">
                                    More series
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {latestSeries.series && latestSeries.series.map(latest => (
                            <div key={latest.id} className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 mb-4">
                                <Link to={`/series/details/${latest.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src={`https://image.tmdb.org/t/p/w500${latest.poster_path}`}
                                                alt={latest.title}
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h6>
                                                <span className="title">
                                                    {latest.name}
                                                </span>
                                            </h6>
                                            <div className="movie-info smaller-text">
                                                <span className="year">{latest.year}</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    SS {latest.seasons} <span className="dot"></span> EPS {latest.episodes}
                                                </a>
                                                <div className="info-tag">
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" />
                                                    </a>
                                                    <a href="javascript:void(0)" className={`like ${favoriteSeriesIds.has(latest.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('series', latest.id, e)} style={{ color: favoriteSeriesIds.has(latest.id) ? '#ffc107' : 'inherit' }} />
                                                    <a className="rating" href="#">
                                                        <i className="fa-solid fa-star" /> {latest.vote_average}/10
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {popularSeries.series && (
                <section className="space-ptb bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">All Time Most Popular Series</h2>
                                    <Link to="/catalog?media=series&category=popular" className="btn-link">
                                        More series
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div
                                    className="owl-carousel owl-nav-center peek-effect"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={5}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={3}
                                    data-sm-items={2}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-stage-padding={50}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {popularSeries.series.map((popular) => (
                                        <div className="item" key={popular.id}>
                                            <Link to={`/series/details/${popular.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
                                                            alt={popular.title}
                                                        />
                                                        <div className="info-top">
                                                            <Link
                                                                to={`/genre?genre=${getGenreParam(popular.genre)}&media=series`}
                                                                className="tag"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {popular.genre}
                                                            </Link>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteSeriesIds.has(popular.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('series', popular.id, e)} style={{ color: favoriteSeriesIds.has(popular.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {popular.vote_average}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <span className="time">
                                                                    <span className="year" style={{ fontSize: '14px' }}>{popular.year}</span>{" "}
                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                    SS {popular.seasons} <span className="dot"></span> EPS {popular.episodes}
                                                                </span>
                                                                <div className="info-content">
                                                                    <div className="movies-title">
                                                                        <a
                                                                            className="play-btn popup-youtube"
                                                                            href={`https://www.youtube.com/watch?v=${popular.trailer}`}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <i className="fa-solid fa-play" />
                                                                        </a>
                                                                        <h6>
                                                                            <span className="title mt-0">
                                                                                {popular.name}
                                                                            </span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {topRatedSeries.series && (
                <section className="space-ptb bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Top Rated Series</h2>
                                    <Link to="/catalog?media=series&category=top_rated" className="btn-link">
                                        More series
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div
                                    className="owl-carousel owl-nav-center peek-effect"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={5}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={3}
                                    data-sm-items={2}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-stage-padding={50}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    {topRatedSeries.series.map((topRated) => (
                                        <div className="item" key={topRated.id}>
                                            <Link to={`/series/details/${topRated.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${topRated.poster_path}`}
                                                            alt={topRated.title}
                                                        />
                                                        <div className="info-top">
                                                            <Link
                                                                to={`/genre?genre=${getGenreParam(topRated.genre)}&media=series`}
                                                                className="tag"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                {topRated.genre}
                                                            </Link>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className={`like ${favoriteSeriesIds.has(topRated.id) ? 'active' : ''}`} onClick={(e) => toggleFavorite('series', topRated.id, e)} style={{ color: favoriteSeriesIds.has(topRated.id) ? '#ffc107' : 'inherit' }} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {topRated.score.toFixed(1)}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <span className="time">
                                                                    <span className="year" style={{ fontSize: '14px' }}>{topRated.year}</span>{" "}
                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                    SS {topRated.seasons} <span className="dot"></span> EPS {topRated.episodes}
                                                                </span>
                                                                <div className="info-content">
                                                                    <div className="movies-title">
                                                                        <a
                                                                            className="play-btn popup-youtube"
                                                                            href={`https://www.youtube.com/watch?v=${topRated.trailer}`}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <i className="fa-solid fa-play" />
                                                                        </a>
                                                                        <h6>
                                                                            <span className="title mt-0">
                                                                                {topRated.name}
                                                                            </span>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};