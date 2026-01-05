import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestMovies, getTrendingMovies, getPopularMovies } from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';

// Helper function to convert genre display name to database name
const getGenreParam = (genreName) => {
    if (genreName === 'Sci-Fi') return 'Science Fiction';
    if (genreName === 'Sci-Fi & Fantasy') return 'Science Fiction';
    return genreName;
};

export default function Movies() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const [trending, latest, popular] = await Promise.all([
                    getTrendingMovies('movies', 1, 20, []),
                    getLatestMovies('movies', 1, 20, []),
                    getPopularMovies('movies', 1, 20, [])
                ]);
                setTrendingMovies(trending.movies || []);
                setLatestMovies(latest.movies || []);
                setPopularMovies(popular.movies || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [setLoading]);

    useEffect(() => {
        const initializeCarousels = () => {
            // Wait for movies to load and DOM to update
            setTimeout(() => {
                // Reinitialize carousels after dynamic content is rendered
                if (window.$ && window.$.fn.owlCarousel) {
                    // Destroy existing carousels
                    $('.owl-carousel').each(function() {
                        if ($(this).data('owl.carousel')) {
                            $(this).owlCarousel('destroy');
                        }
                    });
                    
                    // Reinitialize all carousels
                    $('.owl-carousel').owlCarousel({
                        nav: true,
                        dots: false,
                        items: 6,
                        rewind: true,
                        responsive: {
                            0: { items: 3 },
                            768: { items: 4 },
                            992: { items: 5 },
                            1200: { items: 6 }
                        },
                        autoplay: false,
                        loop: false,
                        margin: 30,
                        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
                    });
                }
            }, 200);
        };

        // Initialize carousels when movies data changes
        if (trendingMovies.length > 0) {
            initializeCarousels();
        }
    }, [trendingMovies, latestMovies, popularMovies]);

    return (
        <>
            <section className="movie-banner bg-secondary">
                <div id="main-slider" className="swiper-container">
                    <div className="swiper-wrapper">
                        <div
                            className="swiper-slide bg-holder slide-01 bg-overlay-black-4"
                            style={{ backgroundImage: "url(images/banner/home-movie/01.jpg)" }}
                        >
                            <h1
                                className="text-primary banner-title"
                                data-swiper-animation="fadeInUp"
                                data-duration="1.0s"
                                data-delay="0.50s"
                            >
                                Movie
                            </h1>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 position-relative">
                                        <div className="single-banner-info">
                                            <h1
                                                className="title"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.0s"
                                            >
                                                Back to Future
                                            </h1>
                                            <div
                                                className="imdb"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.50s"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/imdb-logo.png"
                                                    alt="#"
                                                />
                                                <span>
                                                    <i className="fa-solid fa-star" />
                                                    4.0
                                                </span>
                                            </div>
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="2.0s"
                                            >
                                                <div>
                                                    <a href="javascript:void(0)" className="add-icon">
                                                        Add to List
                                                    </a>
                                                </div>
                                                <a
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                    className="btn btn-light play-btn popup-youtube mx-3 mx-sm-4"
                                                >
                                                    <i className="fa-solid fa-play" />
                                                    Play Now
                                                </a>
                                                <div className="share-box">
                                                    <a href="#">
                                                        {" "}
                                                        <i className="fas fa-share-alt" />
                                                        Share
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
                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <a href="#">
                                                                <i className="fab fa-linkedin" />
                                                            </a>{" "}
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
                        <div
                            className="swiper-slide bg-holder slide-02 bg-overlay-black-4"
                            style={{ backgroundImage: "url(images/banner/home-movie/02.jpg)" }}
                        >
                            <h1
                                className="text-primary banner-title"
                                data-swiper-animation="fadeInUp"
                                data-duration="1.0s"
                                data-delay="0.50s"
                            >
                                Movie
                            </h1>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 position-relative">
                                        <div className="single-banner-info">
                                            <h1
                                                className="title"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.0s"
                                            >
                                                {" "}
                                                Modern Times
                                            </h1>
                                            <div
                                                className="imdb"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.50s"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/imdb-logo.png"
                                                    alt="#"
                                                />
                                                <span>
                                                    <i className="fa-solid fa-star" />
                                                    5.2
                                                </span>
                                            </div>
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="2.0s"
                                            >
                                                <div>
                                                    <a href="javascript:void(0)" className="add-icon">
                                                        Add to List
                                                    </a>
                                                </div>
                                                <a
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                    className="btn btn-light play-btn popup-youtube mx-3 mx-sm-4"
                                                >
                                                    <i className="fa-solid fa-play" />
                                                    Play Now
                                                </a>
                                                <div className="share-box">
                                                    <a href="#">
                                                        {" "}
                                                        <i className="fas fa-share-alt" />
                                                        Share
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
                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <a href="#">
                                                                <i className="fab fa-linkedin" />
                                                            </a>{" "}
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
                        <div
                            className="swiper-slide bg-holder slide-03 bg-overlay-black-4"
                            style={{ backgroundImage: "url(images/banner/home-movie/03.jpg)" }}
                        >
                            <h1
                                className="text-primary banner-title"
                                data-swiper-animation="fadeInUp"
                                data-duration="1.0s"
                                data-delay="0.50s"
                            >
                                Movie
                            </h1>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 position-relative">
                                        <div className="single-banner-info">
                                            <h1
                                                className="title"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.0s"
                                            >
                                                Head Choppers
                                            </h1>
                                            <div
                                                className="imdb"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.50s"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/imdb-logo.png"
                                                    alt="#"
                                                />
                                                <span>
                                                    <i className="fa-solid fa-star" />
                                                    7.0
                                                </span>
                                            </div>
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="2.0s"
                                            >
                                                <div>
                                                    <a href="javascript:void(0)" className="add-icon">
                                                        Add to List
                                                    </a>
                                                </div>
                                                <a
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                    className="btn btn-light play-btn popup-youtube mx-3 mx-sm-4"
                                                >
                                                    <i className="fa-solid fa-play" />
                                                    Play Now
                                                </a>
                                                <div className="share-box">
                                                    <a href="#">
                                                        {" "}
                                                        <i className="fas fa-share-alt" />
                                                        Share
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
                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <a href="#">
                                                                <i className="fab fa-linkedin" />
                                                            </a>{" "}
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
                    {/* Pagination */}
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="swiper-pagination" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-pt bg-dark">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Trending Movies</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={6}
                                data-xl-items={6}
                                data-lg-items={4}
                                data-md-items={4}
                                data-sm-items={3}
                                data-xs-items={3}
                                data-space={30}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="false"
                            >
                                {trendingMovies?.map((movie) => (
                                    <div className="item" key={movie.id}>
                                        <Link to={`/movie/details/${movie.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="movies-categories br-20">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'images/movie/movie-01.jpg'}
                                                        alt={movie.title || movie.name}
                                                    />
                                                    <div className="info-top">
                                                        {movie.genre && (
                                                            <Link 
                                                                to={`/genre?genre=${getGenreParam(movie.genre)}&media=movies`}
                                                                className="tag" 
                                                                onClick={e => e.stopPropagation()}
                                                            >
                                                                {movie.genre}
                                                            </Link>
                                                        )}
                                                        <div className="ms-auto">
                                                            <a href="#" className="like" onClick={e => e.preventDefault()} />
                                                            <span className="views">
                                                                <i className="far fa-eye" /> {movie.vote_average ? `${movie.vote_average.toFixed(1)}★` : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <span className="time">
                                                                <i className="far fa-clock me-2" />
                                                                {movie.runtime ? `${Math.floor(movie.runtime / 60)}hr : ${movie.runtime % 60}mins` : 'N/A'}
                                                            </span>
                                                            <div className="info-content">
                                                                <div className="movies-title">
                                                                    <a
                                                                        className="play-btn popup-youtube"
                                                                        href={movie.trailer ? `https://www.youtube.com/watch?v=${movie.trailer}` : "#"}
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <i className="fa-solid fa-play" />
                                                                    </a>
                                                                    <h5>
                                                                        <span className="title mt-0">
                                                                            {movie.title || movie.name}
                                                                        </span>
                                                                    </h5>
                                                                </div>
                                                                <div className="share-info">
                                                                    <a href="#" className="add-icon" onClick={e => e.preventDefault()} />
                                                                    <div className="share-box">
                                                                        <a href="#" onClick={e => e.preventDefault()}>
                                                                            <i className="fas fa-share-alt" />
                                                                        </a>
                                                                        <ul className="list-unstyled share-box-social">
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-facebook-f" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-instagram" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
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
            <section className="space-sm-ptb bg-dark overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Latest Movies</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={6}
                                data-xl-items={5}
                                data-lg-items={4}
                                data-md-items={4}
                                data-sm-items={3}
                                data-xs-items={3}
                                data-space={30}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="false"
                            >
                                {latestMovies.map((movie) => (
                                    <div className="item" key={movie.id}>
                                        <Link to={`/movie/details/${movie.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="movies-categories br-20">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'images/movie/movie-01.jpg'}
                                                        alt={movie.title || movie.name}
                                                    />
                                                    <div className="info-top">
                                                        {movie.genre && (
                                                            <Link 
                                                                to={`/genre?genre=${getGenreParam(movie.genre)}&media=movies`}
                                                                className="tag" 
                                                                onClick={e => e.stopPropagation()}
                                                            >
                                                                {movie.genre}
                                                            </Link>
                                                        )}
                                                        <div className="ms-auto">
                                                            <a href="#" className="like" onClick={e => e.preventDefault()} />
                                                            <span className="views">
                                                                <i className="far fa-eye" /> {movie.vote_average ? `${movie.vote_average.toFixed(1)}★` : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <span className="time">
                                                                <i className="far fa-clock me-2" />
                                                                {movie.runtime ? `${Math.floor(movie.runtime / 60)}hr : ${movie.runtime % 60}mins` : 'N/A'}
                                                            </span>
                                                            <div className="info-content">
                                                                <div className="movies-title">
                                                                    <a
                                                                        className="play-btn popup-youtube"
                                                                        href={movie.trailer ? `https://www.youtube.com/watch?v=${movie.trailer}` : "#"}
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <i className="fa-solid fa-play" />
                                                                    </a>
                                                                    <h5>
                                                                        <span className="title mt-0">
                                                                            {movie.title || movie.name}
                                                                        </span>
                                                                    </h5>
                                                                </div>
                                                                <div className="share-info">
                                                                    <a href="#" className="add-icon" onClick={e => e.preventDefault()} />
                                                                    <div className="share-box">
                                                                        <a href="#" onClick={e => e.preventDefault()}>
                                                                            <i className="fas fa-share-alt" />
                                                                        </a>
                                                                        <ul className="list-unstyled share-box-social">
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-facebook-f" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-instagram" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
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
            <section className="space-sm-pb bg-dark overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Popular Movies</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={5}
                                data-xl-items={5}
                                data-lg-items={5}
                                data-md-items={3}
                                data-sm-items={2}
                                data-xs-items={1}
                                data-space={30}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="false"
                            >
                                {popularMovies.map((movie) => (
                                    <div className="item" key={movie.id}>
                                        <Link to={`/movie/details/${movie.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="movies-categories br-20">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'images/movie/movie-01.jpg'}
                                                        alt={movie.title || movie.name}
                                                    />
                                                    <div className="info-top">
                                                        {movie.genre && (
                                                            <Link 
                                                                to={`/genre?genre=${getGenreParam(movie.genre)}&media=movies`}
                                                                className="tag" 
                                                                onClick={e => e.stopPropagation()}
                                                            >
                                                                {movie.genre}
                                                            </Link>
                                                        )}
                                                        <div className="ms-auto">
                                                            <a href="#" className="like" onClick={e => e.preventDefault()} />
                                                            <a className="views" href="#" onClick={e => e.preventDefault()}>
                                                                <i className="fa-solid fa-star" /> {movie.vote_average ? `${movie.vote_average.toFixed(1)}` : 'N/A'}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <span className="time">
                                                                <i className="far fa-clock me-2" />
                                                                {movie.runtime ? `${Math.floor(movie.runtime / 60)}hr : ${movie.runtime % 60}min` : 'N/A'}
                                                            </span>
                                                            <div className="info-content">
                                                                <div className="movies-title">
                                                                    <a
                                                                        className="play-btn popup-youtube"
                                                                        href={movie.trailer ? `https://www.youtube.com/watch?v=${movie.trailer}` : "#"}
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <i className="fa-solid fa-play" />
                                                                    </a>
                                                                    <h5>
                                                                        <span className="title mt-0">
                                                                            {movie.title || movie.name}
                                                                        </span>
                                                                    </h5>
                                                                </div>
                                                                <div className="share-info">
                                                                    <a href="#" className="add-icon" onClick={e => e.preventDefault()} />
                                                                    <div className="share-box">
                                                                        <a href="#" onClick={e => e.preventDefault()}>
                                                                            <i className="fas fa-share-alt" />
                                                                        </a>
                                                                        <ul className="list-unstyled share-box-social">
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-facebook-f" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#" onClick={e => e.preventDefault()}>
                                                                                    <i className="fab fa-instagram" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
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
            <section className="space-pb bg-dark overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Popular Horror Movies</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="categories-slider">
                                <div
                                    className="owl-carousel owl-nav-center"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={6}
                                    data-xl-items={5}
                                    data-lg-items={4}
                                    data-md-items={4}
                                    data-sm-items={3}
                                    data-xs-items={3}
                                    data-space={30}
                                    data-autoheight="true"
                                    data-autoplay="false"
                                    data-loop="false"
                                >
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-14.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 20K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            3hr : 00mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        The Monster That Ate the Mutant
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-06.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Fantasy
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 30M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 38mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        Wicked Knights
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-08.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 30M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            1hr : 48mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        Night of the Killer Man Eating Bunnies
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-16.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Crime
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 10K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 24mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        {" "}
                                                                        Murder Noob
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-17.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 30M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 10mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        How to Get Rid of the Survivors
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-18.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Adventure
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 35K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 48mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        We Have Eyeballs
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-19.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 40K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            3hr : 6mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        Head Choppers
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-06.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Fantasy
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 30M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 38mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        Wicked Knights
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-08.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 30M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            1hr : 48mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        Night of the Killer Man Eating Bunnies
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                    <div className="item">
                                        <div className="movies-categories">
                                            <div className="movies-img">
                                                <img
                                                    className="img-fluid"
                                                    src="images/movie/movie-16.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Crime
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" onClick={e => e.preventDefault()} />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 10K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 24mins
                                                        </a>
                                                        <div className="info-content">
                                                            <div className="movies-title">
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                                <h5>
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
                                                                        {" "}
                                                                        Murder Noob
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div className="share-info">
                                                                <a href="javascript:void(0)" className="add-icon" onClick={e => e.preventDefault()} />
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
                                                                            </a>
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
                                                                            </a>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}