import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as moviesService from '../../services/moviesService'

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        moviesService.getBannerMovies()
            .then(result => setMovies(result))
            .catch(err => {
                console.log(err);
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
    }, [movies.rest_movies]);

    return (
        <>
            <section className="banner banner-1 position-relative">
                <div className="shape-01"><img className="img-fluid" src="images/banner/home-01/shape-01.png" alt="#" /></div>
                <div className="shape-02"><img className="img-fluid" src="images/banner/home-01/shape-02.png" alt="#" /></div>
                <div className="container">
                    {movies.first_movie && (
                        <div className="row banner-img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies.first_movie.backdrop_path || ''})` }}>
                            <div className="col-xxl-6 col-xl-7 col-md-9 order-md-1 order-2">
                                <div className="movie-details-info movies-info">
                                    <h1 className="title">{movies.first_movie.title}</h1>
                                    <div className="d-flex">
                                        <span className="year">{movies.first_movie.release_date.split("-")[0]} .</span>
                                        <span className="time">{Math.floor(movies.first_movie.runtime / 60)} hr {movies.first_movie.runtime % 60} min</span>
                                    </div>
                                    <div className="features">
                                        <span className="review">R</span>
                                        <span className="imdb"><img className="img-fluid" src="images/imdb-logo.png" alt="#" />{movies.first_movie.vote_average}</span>
                                        <span className="bookmark save" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Bookmark" />
                                        <span className="like" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Like" />
                                        <span className="reting" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Rating">
                                            <i className="fa-regular fa-star" />
                                        </span>
                                    </div>
                                    <p>{movies.first_movie.overview.length > 140 ? `${movies.first_movie.overview.substring(0, 140)}...` : movies.first_movie.overview}</p>
                                    <div className="author-info">
                                        <div className="author-details">
                                            <span className="author-designation">Directed By</span>
                                            <span>{movies.first_movie.crew[0].name}</span>
                                        </div>
                                        <div className="author-details">
                                            <span className="author-designation">Written By</span>
                                            <span>{movies.first_movie.crew[1].name}</span>
                                        </div>
                                        <div className="author-details">
                                            <span className="author-designation">Studio</span>
                                            <span>{movies.first_movie.production_companies[0].name}</span>
                                        </div>
                                    </div>
                                    <Link to={`/movie/details/${movies.first_movie.id}`} className="btn btn-primary me-2"><i className="fa-solid fa-play"/>Play Now</Link>
                                    <a href="#" className="btn btn-light"><i className="fa-solid fa-circle-plus" />Add to List</a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-xl-3 col-md-3 align-self-center order-md-2 order-1 justify-content-start justify-content-md-center d-flex">
                                <div className="video">
                                    <a
                                        className="video-btn btn-animation popup-youtube"
                                        href={`https://www.youtube.com/watch?v=${movies.first_movie.trailer}`}
                                    >
                                        <i className="fa-solid fa-play" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {movies.rest_movies && movies.rest_movies.length > 0 && (
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
                                    {movies.rest_movies.map((movie) => (
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
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/05.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            The fellowship of the ring
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 57mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/13.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            On the waterfront
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            3hr : 02mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/14.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Monty python and the holy grail
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 30mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/15.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Wall-E
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 15mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-lg-0">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/16.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            12 Angry Men
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 38mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-4 mb-lg-0">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/17.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Ghostbusters
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 52mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-sm-0">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/18.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            The bridge on the river kwai
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 57mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/19.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Brokeback Mountain
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            3hr : 00mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Top 10 Trending Movies</h2>
                                <a href="tv-show.html" className="btn-link">
                                    More Show
                                </a>
                            </div>
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={4}
                                data-xl-items={4}
                                data-lg-items={3}
                                data-md-items={3}
                                data-sm-items={2}
                                data-xs-items={1}
                                data-space={24}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="false"
                            >
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/26.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 12K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 30mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Breaking Bad
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/27.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Horror
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 36M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 23mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Rick and Morty
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/28.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 85K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 21mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Planet Earth
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/29.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Action
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 76M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 25mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Band of Brothers
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/30.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 96K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 28mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    The Last Airbender
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/27.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Horror
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 36M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 23mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Rick and Morty
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/28.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 85K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 21mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Planet Earth
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Popular movie genres</h2>
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
            <section className="space-ptb bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">All Time Most Popular Movies</h2>
                                <a href="tv-show.html" className="btn-link">
                                    More Show
                                </a>
                            </div>
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={4}
                                data-xl-items={4}
                                data-lg-items={3}
                                data-md-items={3}
                                data-sm-items={2}
                                data-xs-items={1}
                                data-space={24}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="false"
                            >
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/26.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 12K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 30mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Breaking Bad
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/27.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Horror
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 36M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 23mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Rick and Morty
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/28.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 85K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 21mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Planet Earth
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/29.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Action
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 76M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 25mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Band of Brothers
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/30.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 96K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 28mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    The Last Airbender
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/27.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Horror
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 36M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 23mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Rick and Morty
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/28.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 85K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 21mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Planet Earth
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">All Time Favorite Movie Collections</h2>
                                <a href="web-series.html" className="btn-link">
                                    More Series
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/01.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 24M
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Action,</a>
                                            <a href="#">Adventure,</a>
                                            <a href="#">Comedy</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            1hr : 00mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                The Umbrella Academy
                                            </a>
                                        </h5>
                                        <p>
                                            A family of former child heroes, now grown apart, must reunite
                                            to continue to protect the world.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/20.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 12K
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Comedy,</a>
                                            <a href="#">Drama,</a>
                                            <a href="#">Crime</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 50mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                Orange is the new black
                                            </a>
                                        </h5>
                                        <p>
                                            Convicted of a decade old crime of transporting drug money to
                                            an ex-girlfriend, normally law-abiding Piper Chapman is
                                            sentenced to a year and a half behind bars to face the reality
                                            of how life-changing prison can really be.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/21.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 8M
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Action,</a>
                                            <a href="#">Drama</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 45mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                The queen's gambit{" "}
                                            </a>
                                        </h5>
                                        <p>
                                            Orphaned at the tender age of nine, prodigious introvert Beth
                                            Harmon discovers and masters the game of chess in 1960s USA.
                                            But child stardom comes at a price.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/22.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 55K
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Action,</a>
                                            <a href="#">Horror,</a>
                                            <a href="#">Mystery</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 40mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                The haunting of hill house
                                            </a>
                                        </h5>
                                        <p>
                                            Flashing between past and present, a fractured family
                                            confronts haunting memories of their old home and the
                                            terrifying events that drove them from it.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-lg-0">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/23.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 59M
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Drama</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 58mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                House of Cards
                                            </a>
                                        </h5>
                                        <p>
                                            A Congressman works with his equally conniving wife to exact
                                            revenge on the people who betrayed him.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-lg-0">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/24.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 23M
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Comedy,</a>
                                            <a href="#">Horror</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 51mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                Santa clarita diet
                                            </a>
                                        </h5>
                                        <p>
                                            Sheila and Joel are married real estate agents who live and
                                            work in Santa Clarita, California. When Sheila dies, their
                                            lives take a dark turn.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-sm-0">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/25.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 28K
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Comedy</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 40mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                Unbreakable kimmy schmidt
                                            </a>
                                        </h5>
                                        <p>
                                            LA woman is rescued from a doomsday cult and starts life over
                                            again in New York City.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="movies-categories-style-2">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/26.jpg" alt="#" />
                                    <div className="info-top">
                                        <a href="javascript:void(0)" className="like" />
                                        <a className="views" href="#">
                                            <i className="far fa-eye" /> 72M
                                        </a>
                                    </div>
                                    <div className="movie-info-content">
                                        <div className="movies-tag">
                                            <a href="#">Action,</a>
                                            <a href="#">Drama,</a>
                                            <a href="#">Fantasy</a>
                                        </div>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            0hr : 53mins
                                        </a>
                                        <h5>
                                            <a className="title" href="web-series-single.html">
                                                I am not okay with this{" "}
                                            </a>
                                        </h5>
                                        <p>
                                            Sydney is a teenage girl navigating the trials and
                                            tribulations of high school while dealing with the
                                            complexities of her family, her budding sexuality, and
                                            mysterious superpowers just beginning to awaken deep within
                                            her.
                                        </p>
                                        <a
                                            className="btn btn-link popup-youtube"
                                            href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                        >
                                            <i className="fa-solid fa-play" />
                                            Play Now
                                        </a>
                                        <a href="javascript:void(0)" className="add-icon mx-3">
                                            {" "}
                                            Add to List
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="single-categories">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="swiper single-slide">
                                <div className="swiper-wrapper">
                                    <div
                                        className="swiper-slide bg-holder"
                                        style={{
                                            backgroundImage: "url(images/movie/single-categories/01.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">Blazing Saddles</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 5M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" />
                                                                7.7/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">1974</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    3hr : 02mins
                                                                </a>
                                                                <span className="quality">
                                                                    Quality: <a href="#">720P, HD, 4K</a>
                                                                </span>
                                                            </div>
                                                            <div className="d-sm-flex my-2">
                                                                <a className="btn btn-link" href="#">
                                                                    <i className="fa-solid fa-play" /> Play Now
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="add-icon mx-3"
                                                                >
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
                                                            <p>
                                                                Appearing onstage with Alan Yentob, creative
                                                                director for the BBC, at the Geffen Theater in
                                                                Westwood, Cal.
                                                            </p>
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
                                    <div
                                        className="swiper-slide bg-holder"
                                        style={{
                                            backgroundImage: "url(images/movie/single-categories/03.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">All the President's Men</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 5M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" />
                                                                8.3/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">1976</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    2hr : 42mins
                                                                </a>
                                                                <span className="quality">
                                                                    Quality: <a href="#">720P, HD, 4K</a>
                                                                </span>
                                                            </div>
                                                            <div className="d-sm-flex my-2">
                                                                <a className="btn btn-link" href="#">
                                                                    <i className="fa-solid fa-play" /> Play Now
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="add-icon mx-3"
                                                                >
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
                                                            <p>
                                                                The Washington Post" reporters Bob Woodward and Carl
                                                                Bernstein uncover the details of the Watergate
                                                                scandal that leads to President Richard Nixon's
                                                                resignation.
                                                            </p>
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
                                    <div
                                        className="swiper-slide bg-holder"
                                        style={{
                                            backgroundImage: "url(images/movie/single-categories/05.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">Young Frankenstein</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 68M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" /> 8/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">2022</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    2hr : 50mins
                                                                </a>
                                                                <span className="quality">
                                                                    Quality: <a href="#">720P, HD, 4K</a>
                                                                </span>
                                                            </div>
                                                            <div className="d-sm-flex my-2">
                                                                <a className="btn btn-link" href="#">
                                                                    <i className="fa-solid fa-play" /> Play Now
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="add-icon mx-3"
                                                                >
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
                                                            <p>
                                                                An American grandson of the infamous scientist,
                                                                struggling to prove that his grandfather was not as
                                                                insane as people believe, is invited to
                                                                Transylvania, where he discovers the process that
                                                                reanimates a dead body.
                                                            </p>
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
                                    <div
                                        className="swiper-slide bg-holder"
                                        style={{
                                            backgroundImage: "url(images/movie/single-categories/07.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">Almost Famous</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 58M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" />
                                                                7.9/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">2000</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    2hr : 58mins
                                                                </a>
                                                                <span className="quality">
                                                                    Quality: <a href="#">720P, HD, 4K</a>
                                                                </span>
                                                            </div>
                                                            <div className="d-sm-flex my-2">
                                                                <a className="btn btn-link" href="#">
                                                                    <i className="fa-solid fa-play" /> Play Now
                                                                </a>
                                                                <a
                                                                    href="javascript:void(0)"
                                                                    className="add-icon mx-3"
                                                                >
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
                                                            <p>
                                                                A high-school boy in the early 1970s is given the
                                                                chance to write a story for Rolling Stone magazine
                                                                about an up-and-coming rock band as he accompanies
                                                                them on their concert tour.
                                                            </p>
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
                                        <div className="swiper-slide">
                                            <div className="movies-categories movies-style-2">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/single-categories/02.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 5M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    Blazing Saddles
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 40mins
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="movies-categories movies-style-2">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/single-categories/04.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 5K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    All the President's Men
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 12mins
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="movies-categories movies-style-2">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/single-categories/06.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 68M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    Young Frankenstein
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 20mins
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="movies-categories movies-style-2">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/single-categories/08.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 58K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    Almost Famous
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 30mins
                                                            </a>
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
            <section className="space-ptb bg-holder bg-overlay-dark-99" style={{ backgroundImage: "url(images/bg/01.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Newest Series</h2>
                                <a href="movie.html" className="btn-link">
                                    More Movies
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/05.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            The fellowship of the ring
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 57mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/13.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            On the waterfront
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            3hr : 02mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/14.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Monty python and the holy grail
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 30mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/15.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Wall-E
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 15mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-lg-0">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/16.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            12 Angry Men
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 38mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-4 mb-lg-0">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/17.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Ghostbusters
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 52mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 mb-sm-0">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/18.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            The bridge on the river kwai
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            2hr : 57mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="movies-categories-style-3">
                                <div className="movie-image">
                                    <img className="img-fluid" src="images/movie/19.jpg" alt="#" />
                                </div>
                                <div className="movie-info-content">
                                    <h5>
                                        <a className="title" href="movie-single.html">
                                            Brokeback Mountain
                                        </a>
                                    </h5>
                                    <div className="movie-info">
                                        <span className="year">2022</span>
                                        <a className="time" href="#">
                                            <i className="far fa-clock me-2" />
                                            3hr : 00mins
                                        </a>
                                        <div className="info-tag">
                                            <a className="views" href="#">
                                                <i className="far fa-eye" />
                                            </a>
                                            <a href="javascript:void(0)" className="like" />
                                            <a className="rating" href="#">
                                                <i className="fa-solid fa-star" /> 8.3/10
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">All Time Most Popular Series</h2>
                                <a href="tv-show.html" className="btn-link">
                                    More Show
                                </a>
                            </div>
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={4}
                                data-xl-items={4}
                                data-lg-items={3}
                                data-md-items={3}
                                data-sm-items={2}
                                data-xs-items={1}
                                data-space={24}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="false"
                            >
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/26.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 12K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 30mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Breaking Bad
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/27.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Horror
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 36M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 23mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Rick and Morty
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/28.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 85K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 21mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Planet Earth
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/29.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Action
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 76M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 25mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Band of Brothers
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/30.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 96K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 28mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    The Last Airbender
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/27.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Horror
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 36M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 23mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Rick and Morty
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                                <div className="item">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/28.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 85K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 21mins
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
                                                                    href="tv-show-single.html"
                                                                >
                                                                    Planet Earth
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a href="javascript:void(0)" className="add-icon" />
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};