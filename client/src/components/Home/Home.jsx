import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as moviesService from '../../services/moviesService'

export default function Home() {
    const [bannerMovies, setBannerMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularCollections, setPopularCollections] = useState([]);

    const [latestSeries, setLatestSeries] = useState([]);
    const [trendingSeries, setTrendingSeries] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);

    useEffect(() => {
        Promise.all([
            moviesService.getBannerMovies(),
            moviesService.getLatestMovies(),
            moviesService.getTrendingMovies(),
            moviesService.getPopularMovies(),
            moviesService.getPopularCollections(),
            moviesService.getLatestSeries(),
            moviesService.getTrendingSeries(),
            moviesService.getPopularSeries(),
        ])
            .then(([banner, latest, trending, popular, collections, latestSeriesData, trendingSeriesData, popularSeriesData]) => {
                setBannerMovies(banner);
                setLatestMovies(latest);
                setTrendingMovies(trending);
                setPopularMovies(popular);
                setPopularCollections(collections);
                setLatestSeries(latestSeriesData);
                setTrendingSeries(trendingSeriesData);
                setPopularSeries(popularSeriesData);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }, []);

    useEffect(() => {
        const existingScript = document.querySelector('script[src="/js/custom.js"]');
        if (existingScript) {
            document.body.removeChild(existingScript);
        }

        const script = document.createElement('script');
        script.src = '/js/custom.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [bannerMovies.rest_movies, latestMovies.movies, trendingMovies.movies, popularMovies.movies, popularCollections.collections]);
    console.log(trendingSeries);

    return (
        <>
            <section className="banner banner-1 position-relative">
                <div className="shape-01"><img className="img-fluid" src="images/banner/home-01/shape-01.png" alt="#" /></div>
                <div className="shape-02"><img className="img-fluid" src="images/banner/home-01/shape-02.png" alt="#" /></div>
                <div className="container">
                    {bannerMovies.first_movie && (
                        <div className="row banner-img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerMovies.first_movie.backdrop_path || ''})` }}>
                            <div className="col-xxl-6 col-xl-7 col-md-9 order-md-1 order-2">
                                <div className="movie-details-info movies-info">
                                    <h1 className="title">{bannerMovies.first_movie.title}</h1>
                                    <div className="d-flex">
                                        <span className="year m-0">{bannerMovies.first_movie.release_date.split("-")[0]}</span>
                                        <span className="dot as-c"></span>
                                        <span className="time">{Math.floor(bannerMovies.first_movie.runtime / 60)} hr {bannerMovies.first_movie.runtime % 60} min</span>
                                    </div>
                                    <div className="features">
                                        <span className="review">R</span>
                                        <span className="imdb"><img className="img-fluid" src="images/imdb-logo.png" alt="#" />{bannerMovies.first_movie.vote_average}</span>
                                        <span className="bookmark save" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Bookmark" />
                                        <span className="like" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Like" />
                                        <span className="reting" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Rating">
                                            <i className="fa-regular fa-star" />
                                        </span>
                                    </div>
                                    <p>{bannerMovies.first_movie.overview.length > 140 ? `${bannerMovies.first_movie.overview.substring(0, 140)}...` : bannerMovies.first_movie.overview}</p>
                                    <div className="author-info">
                                        <div className="author-details">
                                            <span className="author-designation">Directed By</span>
                                            <span>{bannerMovies.first_movie.crew[0].name}</span>
                                        </div>
                                        <div className="author-details">
                                            <span className="author-designation">Written By</span>
                                            <span>{bannerMovies.first_movie.crew[1].name}</span>
                                        </div>
                                        <div className="author-details">
                                            <span className="author-designation">Studio</span>
                                            <span>{bannerMovies.first_movie.production_companies[0].name}</span>
                                        </div>
                                    </div>
                                    <Link to={`/movie/details/${bannerMovies.first_movie.id}`} className="btn btn-primary me-2"><i className="fa-solid fa-play" />Play Now</Link>
                                    <a href="#" className="btn btn-light"><i className="fa-solid fa-circle-plus" />Add to List</a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-xl-3 col-md-3 align-self-center order-md-2 order-1 justify-content-start justify-content-md-center d-flex">
                                <div className="video">
                                    <a
                                        className="video-btn btn-animation popup-youtube"
                                        href={`https://www.youtube.com/watch?v=${bannerMovies.first_movie.trailer}`}
                                    >
                                        <i className="fa-solid fa-play" />
                                    </a>
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
                                            <div className="movies-categories movies-style-1">
                                                <div className="movies-img banner-backdrop">
                                                    <img
                                                        className="img-fluid"
                                                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                                        alt={movie.title}
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#"><i className="fa-solid fa-star" />{movie.vote_average}</a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5><Link className="title" to={`/movie/details/${movie.id}`}>{movie.title}</Link></h5>
                                                            <a className="time" to={`/movie/details/${movie.id}`}><i className="far fa-clock me-2" />{Math.floor(movie.runtime / 60)}hr : {movie.runtime % 60}mins</a>
                                                        </div>
                                                        <a className="play-btn popup-youtube" href={`https://www.youtube.com/watch?v=${movie.trailer}`}><i className="fa-solid fa-play" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-3 align-self-center text-center py-4 py-sm-0">
                                <a href="movie.html" className="btn btn-link text-dark text-uppercase">
                                    See All <i className="fa-solid fa-arrow-right" />
                                </a>
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
                                <a href="movie.html" className="btn-link">
                                    More Movies
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {latestMovies.movies && latestMovies.movies.map(latest => (
                            <div key={latest.id} className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-4">
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
                                            <Link className="title" to={`/movie/details/${latest.id}`}>
                                                {latest.title}
                                            </Link>
                                        </h6>
                                        <div className="movie-info smaller-text">
                                            <span className="year">{new Date().getFullYear()}</span>
                                            <a className="time" href="#">
                                                <i className="far fa-clock me-2" />
                                                {Math.floor(latest.runtime / 60)}hr : {latest.runtime % 60}min
                                            </a>
                                            <div className="info-tag">
                                                <a className="views" href="#">
                                                    <i className="far fa-eye" />
                                                </a>
                                                <a href="javascript:void(0)" className="like" />
                                                <a className="rating" href="#">
                                                    <i className="fa-solid fa-star" /> {latest.vote_average}/10
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <a href="movie.html" className="btn-link">
                                        More Movies
                                    </a>
                                </div>
                            </div>
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
                                    {trendingMovies.movies.map((trending) => (
                                        <div className="item" key={trending.id}>
                                            <div className="movies-categories br-20">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}
                                                        alt={trending.title}
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            {trending.genre}
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="fa-solid fa-star" /> {trending.vote_average}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <Link className="time" to={`/movie/details/${trending.id}`}>
                                                                <i className="far fa-clock me-2" />
                                                                {Math.floor(trending.runtime / 60)}hr : {trending.runtime % 60}min
                                                            </Link>
                                                            <div className="info-content">
                                                                <div className="movies-title">
                                                                    <a
                                                                        className="play-btn popup-youtube"
                                                                        href={`https://www.youtube.com/watch?v=${trending.trailer}`}
                                                                    >
                                                                        <i className="fa-solid fa-play" />
                                                                    </a>
                                                                    <h5>
                                                                        <Link className="title mt-0" to={`/movie/details/${trending.id}`}>
                                                                            {trending.title}
                                                                        </Link>
                                                                    </h5>
                                                                </div>
                                                                <div className="share-info">
                                                                    <a href="javascript:void(0)" className="add-icon" />
                                                                    <div className="share-box">
                                                                        <a href="#">
                                                                            <i className="fas fa-share-alt" />
                                                                        </a>
                                                                        <ul className="list-unstyled share-box-social">
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-facebook-f" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
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
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/01.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="movie.html">Horror</a>{" "}
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
                                                    <a href="movie.html">Horror</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4 mt-sm-0 mt-md-4">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/02.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="web-series.html">Action</a>{" "}
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
                                                    <a href="web-series.html">Action</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/03.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="#">Drama</a>
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
                                                    <a href="#">Drama</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/04.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="tv-show.html">Thriller</a>{" "}
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
                                                    <a href="tv-show.html">Thriller</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/03.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="#">Adventure</a>
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
                                                    <a href="#">Adventure</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/03.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="#">Crime</a>
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
                                                    <a href="#">Crime</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4 mt-sm-0 mt-md-4">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/02.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="web-series.html">Comedy</a>{" "}
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
                                                    <a href="web-series.html">Comedy</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/03.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="#">Romance</a>
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
                                                    <a href="#">Romance</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="movies-categories-iteam mt-4">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/04.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="tv-show.html">Fantasy</a>{" "}
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
                                                    <a href="tv-show.html">Fantasy</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                            <div className="movies-categories-iteam">
                                <div className="categories-img">
                                    <img
                                        className="img-fluid"
                                        src="images/movie/categories/03.jpg"
                                        alt="#"
                                    />
                                    <h3 className="title">
                                        <a href="#">Sci-Fi</a>
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
                                                    <a href="#">Sci-Fi</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <a href="movie.html" className="btn-link">
                                        More Movies
                                    </a>
                                </div>
                            </div>
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
                                    {popularMovies.movies.map((popular) => (
                                        <div className="item" key={popular.id}>
                                            <div className="movies-categories br-20">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
                                                        alt={popular.title}
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            {popular.genre}
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="fa-solid fa-star" /> {popular.vote_average}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <Link className="time" to={`/movie/details/${popular.id}`}>
                                                                <i className="far fa-clock me-2" />
                                                                {Math.floor(popular.runtime / 60)}hr : {popular.runtime % 60}min
                                                            </Link>
                                                            <div className="info-content">
                                                                <div className="movies-title">
                                                                    <a
                                                                        className="play-btn popup-youtube"
                                                                        href={`https://www.youtube.com/watch?v=${popular.trailer}`}
                                                                    >
                                                                        <i className="fa-solid fa-play" />
                                                                    </a>
                                                                    <h5>
                                                                        <Link className="title mt-0" to={`/movie/details/${popular.id}`}>
                                                                            {popular.title}
                                                                        </Link>
                                                                    </h5>
                                                                </div>
                                                                <div className="share-info">
                                                                    <a href="javascript:void(0)" className="add-icon" />
                                                                    <div className="share-box">
                                                                        <a href="#">
                                                                            <i className="fas fa-share-alt" />
                                                                        </a>
                                                                        <ul className="list-unstyled share-box-social">
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-facebook-f" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
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
                                <a href="web-series.html" className="btn-link">
                                    More Collections
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {popularCollections.collections && popularCollections.collections.map((collection, index) => (
                            <div className="col-xl-2-3 col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
                                <div className="movies-categories-style-2">
                                    <div className="movie-image">
                                        <img
                                            className="img-fluid br-20"
                                            src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                                            alt={collection.name}
                                        />
                                        <div className="info-top">
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="views" href="#">
                                                <i className="far fa-eye" /> 24M
                                            </a>
                                        </div>
                                        <div className="movie-info-content">
                                            <a className="time" href="#">
                                                <i className="far fa-clock me-2" />
                                                1hr : 00mins
                                            </a>
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    {collection.name}
                                                </a>
                                            </h5>
                                            <p>
                                                {`The ${collection.name} is a series of movies that include exciting action and adventure.`}
                                            </p>
                                            <Link className="btn btn-link btn-link-1" to={`/movie/details/${collection.first_movie_id}`}><i className="fa-solid fa-play" />Play Now</Link>
                                        </div>
                                    </div>
                                </div>
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
                                    {trendingSeries.series && trendingSeries.series.slice(0, 4).map((series) => (
                                        <div
                                            key={series.id}
                                            className="swiper-slide bg-holder"
                                            style={{
                                                backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
                                                backgroundPosition: 'center -30px',
                                                backgroundSize: 'cover'
                                            }}
                                        >
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                        <div className="movie-details">
                                                            <div className="movie-info">
                                                                <h2 className="title">{series.name}</h2>
                                                                <div className="movies-language">
                                                                    Language: <a href="#">English</a>{" "}<a className="rating" href="#"><i className="fa-solid fa-star" /> {series.vote_average}/10</a>
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
                                                                    <a href="javascript:void(0)" className="add-icon mx-3">
                                                                        {" "}
                                                                        Add to List
                                                                    </a>
                                                                    <div className="share-box">
                                                                        <a href="#">
                                                                            {" "}
                                                                            <i className="fas fa-share-alt" /> Share
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
                                                                <p>{series.overview}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 ol-xl-5 col-md-2 col-sm-2 align-self-center order-sm-2 order-1">
                                                        <div className="video mb-4 mb-sm-0">
                                                            <a
                                                                className="video-btn btn-animation popup-youtube"
                                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                            >
                                                                <i className="fa-solid fa-play" />
                                                            </a>
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
                                        {trendingSeries.series && trendingSeries.series.slice(0, 4).map((series, index) => (
                                            <div className="swiper-slide" key={series.id}>
                                                <div className="movies-categories movies-style-2">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${series.backdrop_path}`}
                                                            alt={series.name}
                                                        />
                                                        <div className="info-top">
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className="like" />
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
            <section className="space-ptb bg-holder bg-overlay-dark-99" style={{ backgroundImage: "url(images/bg/01.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Newest Series</h2>
                                <a href="movie.html" className="btn-link">
                                    More Series
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {latestSeries.series && latestSeries.series.map(latest => (
                            <div key={latest.id} className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-4">
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
                                            <Link className="title" to={`/movie/details/${latest.id}`}>
                                                {latest.name}
                                            </Link>
                                        </h6>
                                        <div className="movie-info smaller-text">
                                            <span className="year">{new Date().getFullYear()}</span>
                                            <a className="time" href="#">SS {latest.seasons} <span className="dot"></span> EPS {latest.episodes}</a>
                                            <div className="info-tag">
                                                <a href="javascript:void(0)" className="like" />
                                                <a className="rating" href="#">
                                                    <i className="fa-solid fa-star" /> {latest.vote_average}/10
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <a href="movie.html" className="btn-link">
                                        More Series
                                    </a>
                                </div>
                            </div>
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
                                    {popularSeries.series.map((popular) => (
                                        <div className="item" key={popular.id}>
                                            <div className="movies-categories br-20">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
                                                        alt={popular.title}
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            {popular.genre}
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="fa-solid fa-star" /> {popular.vote_average}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">SS {popular.seasons} <span className="dot"></span> EPS {popular.episodes}</a>
                                                            <div className="info-content">
                                                                <div className="movies-title">
                                                                    <a
                                                                        className="play-btn popup-youtube"
                                                                        href={`https://www.youtube.com/watch?v=${popular.trailer}`}
                                                                    >
                                                                        <i className="fa-solid fa-play" />
                                                                    </a>
                                                                    <h6>
                                                                        <Link className="title mt-0" to={`/movie/details/${popular.id}`}>
                                                                            {popular.name}
                                                                        </Link>
                                                                    </h6>
                                                                </div>
                                                                <div className="share-info">
                                                                    <a href="javascript:void(0)" className="add-icon" />
                                                                    <div className="share-box">
                                                                        <a href="#">
                                                                            <i className="fas fa-share-alt" />
                                                                        </a>
                                                                        <ul className="list-unstyled share-box-social">
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-facebook-f" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-twitter" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <i className="fab fa-linkedin" />
                                                                                </a>
                                                                            </li>
                                                                            <li>
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