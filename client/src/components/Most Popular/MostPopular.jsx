import React, { useEffect, useState, useRef } from 'react';
import * as moviesService from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';
import { Link } from 'react-router-dom';

// Helper function to convert genre display name to database name
const getGenreParam = (genreName) => {
    if (genreName === 'Sci-Fi') return 'Science Fiction';
    if (genreName === 'Sci-Fi & Fantasy') return 'Science Fiction';
    return genreName;
};

export default function MostPopular() {
    const [movie, setMovie] = useState(null);
    const [popularCollections, setPopularCollections] = useState({ popular: [], page: 1, total_pages: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;
    const { setLoading } = useLoading();
    const sectionRef = useRef(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);
            try {
                const movieDetails = await moviesService.getMovieDetails(912649);
                setMovie(movieDetails);
                console.log(movieDetails);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        getMovieDetails();
    }, [setLoading]);

    // Fetch popular collections with pagination
    useEffect(() => {
        const getCollections = async () => {
            try {
                const collections = await moviesService.getPopularCollections(currentPage, pageSize);
                setPopularCollections(collections);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        getCollections();
    }, [currentPage]);

    // Pagination helpers identical to Results component
    const totalPages = popularCollections?.total_pages || 1;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        didMountRef.current = true;
    }, [currentPage]);

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
        } else {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, start + 2);
            if (end - start < 2) start = Math.max(1, end - 2);
            for (let i = start; i <= end; i++) pageNumbers.push(i);
        }
        return pageNumbers;
    };

    useEffect(() => {
        const initPieChart = () => {
            const $pieChart = $('.pie-chart-percentage');
            if ($pieChart.length) {
                $pieChart.each(function () {
                    const $elem = $(this);
                    const pieChartSize = $elem.attr('data-size') || "60";
                    const pieChartAnimate = $elem.attr('data-animate') || "2000";
                    const pieChartWidth = $elem.attr('data-width') || "4";
                    const pieChartColor = $elem.attr('data-color') || "#f6be00";
                    const pieChartTrackColor = $elem.attr('data-trackcolor') || "#fff";

                    $elem.find('span, i').css({
                        'line-height': pieChartSize + 'px',
                        'width': pieChartSize + 'px',
                        'height': pieChartSize + 'px'
                    });

                    $elem.appear(function () {
                        $elem.easyPieChart({
                            size: Number(pieChartSize),
                            animate: Number(pieChartAnimate),
                            trackColor: pieChartTrackColor,
                            lineWidth: Number(pieChartWidth),
                            barColor: pieChartColor,
                            scaleColor: false,
                            lineCap: 'square',
                            onStep: function (from, to, percent) {
                                $elem.find('span.percent').text(Math.round(percent));
                            }
                        });
                    });
                });
            }
        };

        initPieChart();

        return () => {
            const $pieChart = $('.pie-chart-percentage');
            if ($pieChart.length) {
                $pieChart.each(function () {
                    const $elem = $(this);
                    if ($.fn.easyPieChart) {
                        $elem.easyPieChart('destroy');
                    }
                    $elem.off();
                });
            }
        };
    }, []);

    return (
        <>
            <section className="banner banner-2 bg-holder" style={{ backgroundImage: movie?.movies?.backdrop_path ? `url(https://image.tmdb.org/t/p/original${movie.movies.backdrop_path})` : 'url(images/banner/home-02/01.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-7 col-xl-9 col-md-10">
                            <div className="movie-details-info movies-info bg">
                                <ul className="d-flex">
                                    <li className="year">{movie?.movies?.release_date ? new Date(movie.movies.release_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'N/A'}</li>
                                    <li className="tag">
                                        {movie?.movies?.genres?.map((genre, index) => (
                                            <span key={index}>
                                                <Link to={`/genre?genre=${getGenreParam(genre.name)}&media=movies`}>{genre.name}</Link>
                                                {index < movie.movies.genres.length - 1 && ', '}
                                            </span>
                                        )) || <Link to="#">N/A</Link>}
                                    </li>
                                    <li className="time">{movie?.movies?.runtime ? `${Math.floor(movie.movies.runtime / 60)}h ${movie.movies.runtime % 60}m` : 'N/A'}</li>
                                </ul>
                                <h1 className="title">{movie?.movies?.title || 'N/A'}</h1>
                                <div className="features">
                                    <div className="user-score pie-chart pie-chart-percentage" data-percent={movie?.movies?.vote_average ? Math.round(movie.movies.vote_average * 10) : 76} data-color="#f6be00" data-trackcolor="#fff">
                                        <div className="round-chart">
                                            <span className="percent"></span>
                                        </div>
                                        <h6 className="chart-title mb-0">User <br />Score</h6>
                                    </div>
                                    <span className="save bookmark" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Bookmark"></span>
                                    <span className="like" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Like"></span>
                                    <span className="reting" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Rating">
                                        <i className="fa-regular fa-star"></i>
                                    </span>
                                </div>
                                <h3 className="mb-3 overview">Overview</h3>
                                <p>{movie?.movies?.overview || 'No overview available.'}</p>
                                <div className="link-btn">
                                    <a href={movie?.movies?.trailer ? `https://www.youtube.com/watch?v=${movie.movies.trailer}` : "#"} className="btn btn-link popup-youtube">
                                        <i className="fa-solid fa-play"></i>Play Now
                                    </a>
                                    <a href="javascript:void(0)" className="add-icon">My List</a>
                                </div>
                                <div className="author-info">
                                    <div className="author-details mb-0">
                                        {movie?.movies?.crew?.filter(person => person.job === 'Director').map((director, index) => (
                                            <div key={index} className="author-designation">{director.name} <span>Director</span></div>
                                        ))}
                                        {movie?.movies?.crew?.filter(person => person.job === 'Writer').slice(0, 2).map((writer, index) => (
                                            <div key={index} className="author-designation">{writer.name} <span>Writer</span></div>
                                        ))}
                                        {movie?.movies?.cast?.slice(0, 2).map((actor, index) => (
                                            <div key={index} className="author-designation">{actor.name} <span>{actor.character}</span></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={sectionRef} className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">All Time Favorite Movie Collections</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {(popularCollections.popular || popularCollections.collections) && (popularCollections.popular || popularCollections.collections).map((collection, index) => (
                            <div className="col-xl-2-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-4" key={index}>
                                <Link to={`/collection/${collection.api_id || collection.first_movie_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="movies-categories-style-2">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid br-20"
                                                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                                                alt={collection.name}
                                            />
                                            <div className="info-top">
                                                <a href="javascript:void(0)" className="like" onClick={(e) => e.preventDefault()} />
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
                                                <span className="btn btn-link btn-link-1" onClick={(e) => e.stopPropagation()}><i className="fa-solid fa-play" />Play Now</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {((popularCollections.total_pages || 1) > 1) && (
                        <div className="row mt-5">
                            <div className="col-12">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center flex-wrap" style={{ gap: '8px' }}>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage > 1 && paginate(1)}
                                                disabled={currentPage === 1}
                                                style={{
                                                    backgroundColor: currentPage === 1 ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === 1 ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-angles-left me-1"></i>
                                            </button>
                                        </li>

                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                style={{
                                                    backgroundColor: currentPage === 1 ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === 1 ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-chevron-left me-1"></i>
                                            </button>
                                        </li>

                                        {getPageNumbers().map((number) => (
                                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => paginate(number)}
                                                    style={{
                                                        backgroundColor: currentPage === number ? '#f6be00' : '#0a0a0a',
                                                        border: '1px solid #f6be00',
                                                        color: currentPage === number ? '#0a0a0a' : '#f6be00',
                                                        padding: '10px 16px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        minWidth: '45px',
                                                        fontSize: '14px',
                                                        fontWeight: currentPage === number ? '600' : '500'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (currentPage !== number) {
                                                            e.target.style.backgroundColor = '#f6be00';
                                                            e.target.style.color = '#0a0a0a';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (currentPage !== number) {
                                                            e.target.style.backgroundColor = '#0a0a0a';
                                                            e.target.style.color = '#f6be00';
                                                        }
                                                    }}
                                                >
                                                    {number}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${currentPage === (popularCollections.total_pages || 1) ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage < (popularCollections.total_pages || 1) && paginate(currentPage + 1)}
                                                disabled={currentPage === (popularCollections.total_pages || 1)}
                                                style={{
                                                    backgroundColor: currentPage === (popularCollections.total_pages || 1) ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === (popularCollections.total_pages || 1) ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === (popularCollections.total_pages || 1) ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== (popularCollections.total_pages || 1)) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== (popularCollections.total_pages || 1)) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-chevron-right ms-1"></i>
                                            </button>
                                        </li>

                                        <li className={`page-item ${currentPage === (popularCollections.total_pages || 1) ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage < (popularCollections.total_pages || 1) && paginate(popularCollections.total_pages || 1)}
                                                disabled={currentPage === (popularCollections.total_pages || 1)}
                                                style={{
                                                    backgroundColor: currentPage === (popularCollections.total_pages || 1) ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === (popularCollections.total_pages || 1) ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === (popularCollections.total_pages || 1) ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== (popularCollections.total_pages || 1)) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== (popularCollections.total_pages || 1)) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-angles-right ms-1"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="text-center mt-3">
                                    <p className="text-white-50" style={{ fontSize: '14px' }}>
                                        Page {currentPage} of {popularCollections.total_pages || 1} ({popularCollections.items_on_page || pageSize} items per page)
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="categories-tabs">
                                <div className="section-title">
                                    <h2 className="title">The most popular movie</h2>
                                </div>
                                <div className="tabs">
                                    <ul
                                        className="nav nav-tabs nav-pills"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link active"
                                                id="all-categories"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-categories"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-categories"
                                                aria-selected="true"
                                            >
                                                All Time
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="letast-movie"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-movie"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-movie"
                                                aria-selected="false"
                                            >
                                                Latest Movies
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="top-rated"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-rated"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-rated"
                                                aria-selected="false"
                                            >
                                                Top Rated
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="pills-categories"
                                    role="tabpanel"
                                    aria-labelledby="all-categories"
                                    tabIndex={0}
                                >
                                    <div className="row">
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 ">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/31.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Fantasy
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 86K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 50mins
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
                                                                            All About Eve
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 ">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/32.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 25M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 20mins
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
                                                                            The big lebowski
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 ">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/33.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Drama
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 76K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 30mins
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
                                                                            Rear Window
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-xxl-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/34.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 6K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 05mins
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
                                                                            The usual suspects
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-xxl-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/35.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 35M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 40mins
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
                                                                            Saving private ryan
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-xxl-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/36.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Crime
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 3K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 18mins
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
                                                                            When harry met sally
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-lg-0 mb-md-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/37.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 8M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 45mins
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
                                                                            Ferris bueller's day Off
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/38.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Action
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 12M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 22mins
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
                                                                            A Clockwork
                                                                        </a>
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
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-movie"
                                    role="tabpanel"
                                    aria-labelledby="letast-movie"
                                    tabIndex={0}
                                >
                                    <div className="row">
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-xxl-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/33.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 68K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 52mins
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
                                                                            The empire strikes back
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-xxl-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/35.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            {" "}
                                                            Biography
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 53M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 02mins
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
                                                                            The princess bride
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-md-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/38.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 37K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 42mins
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
                                                                            One flew over the cuckoo's nest
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/37.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Mystery
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 93M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 03mins
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
                                                                            Blade Runner
                                                                        </a>
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
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="pills-rated"
                                    role="tabpanel"
                                    aria-labelledby="top-rated"
                                    tabIndex={0}
                                >
                                    <div className="row">
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-lg-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/27.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Thriller
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 82M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 41mins
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
                                                                            The breakfast club
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-xxl-0">
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
                                                                <i className="far fa-eye" /> 41K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 13mins
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
                                                                            Singin' in the Rain
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4 mb-md-0">
                                            <div className="movies-categories">
                                                <div className="movies-img">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/movie/29.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <a className="tag" href="#">
                                                            Drama
                                                        </a>
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" />
                                                                13M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                2hr : 58mins
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
                                                                            The Sound of Music
                                                                        </a>
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
                                        <div className="col-xxl-3 col-lg-4 col-md-6">
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
                                                                <i className="far fa-eye" /> 73M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                3hr : 25mins
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
                                                                            The silence of the lambs
                                                                        </a>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-pb bg-secondary movies-categories-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div
                                className="owl-carousel owl-nav-center arrow-center movies-categories-slider"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={1}
                                data-xl-items={1}
                                data-lg-items={1}
                                data-md-items={1}
                                data-sm-items={1}
                                data-xs-items={1}
                                data-space={0}
                                data-autoheight="true"
                            >
                                <div className="item">
                                    <div className="movies-categories movies-style-3">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/movie-slid01.jpg"
                                                alt="#"
                                            />
                                            <div className="movies-info">
                                                <h2>
                                                    <a className="title" href="movie-single.html">
                                                        Close encounters of the third kind
                                                    </a>
                                                </h2>
                                                <div className="content">
                                                    <div className="share-info">
                                                        <span className="imdb">
                                                            <img
                                                                className="img-fluid"
                                                                src="images/imdb-logo.png"
                                                                alt="#"
                                                            />
                                                            7.4
                                                        </span>
                                                        <a href="javascript:void(0)" className="add-icon">
                                                            Add to List
                                                        </a>
                                                        <div className="share-box">
                                                            <a href="#" className="share-icon">
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
                                                <a
                                                    className="play-btn popup-youtube"
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                >
                                                    <i className="fa-solid fa-play" /> Play Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="movies-categories movies-style-3">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/movie-slid02.jpg"
                                                alt="#"
                                            />
                                            <div className="movies-info">
                                                <h2>
                                                    <a className="title" href="movie-single.html">
                                                        The lord of the rings: the return of the king
                                                    </a>
                                                </h2>
                                                <div className="content">
                                                    <div className="share-info">
                                                        <span className="imdb">
                                                            <img
                                                                className="img-fluid"
                                                                src="images/imdb-logo.png"
                                                                alt="#"
                                                            />
                                                            6.4
                                                        </span>
                                                        <a href="javascript:void(0)" className="add-icon">
                                                            Add to List
                                                        </a>
                                                        <div className="share-box">
                                                            <a href="#" className="share-icon">
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
                                                <a
                                                    className="play-btn popup-youtube"
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                >
                                                    <i className="fa-solid fa-play" /> Play Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="movies-categories movies-style-3">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src="images/movie/movie-slid03.jpg"
                                                alt="#"
                                            />
                                            <div className="movies-info">
                                                <h2>
                                                    <a className="title" href="movie-single.html">
                                                        The lord of the rings: the fellowship of the ring
                                                    </a>
                                                </h2>
                                                <div className="content">
                                                    <div className="share-info">
                                                        <span className="imdb">
                                                            <img
                                                                className="img-fluid"
                                                                src="images/imdb-logo.png"
                                                                alt="#"
                                                            />
                                                            8.4
                                                        </span>
                                                        <a href="javascript:void(0)" className="add-icon">
                                                            Add to List
                                                        </a>
                                                        <div className="share-box">
                                                            <a href="#" className="share-icon">
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
                                                <a
                                                    className="play-btn popup-youtube"
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                >
                                                    <i className="fa-solid fa-play" /> Play Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-pb bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Latest News</h2>
                                <a href="blog.html" className="btn-link">
                                    More News
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="blog-post blog-post-style-02">
                                <div className="blog-post-img">
                                    <img className="img-fluid" src="images/blog/02.jpg" alt="" />
                                </div>
                                <div className="blog-post-details">
                                    <h4 className="blog-title">
                                        <a href="blog-single.html">
                                            From a small startup to a leading global agency in 10 Years.
                                        </a>
                                    </h4>
                                    <div className="blog-post-meta">
                                        <div className="blog-post-date">
                                            <a href="#">
                                                <i className="fa-regular fa-calendar-days" />
                                                21 Jan 2022
                                            </a>
                                        </div>
                                        <div className="blog-post-like">
                                            <a href="#">
                                                <i className="fa-regular fa-thumbs-up" />
                                                <span>2M</span>Like
                                            </a>
                                        </div>
                                        <div className="blog-post-comment">
                                            <a href="#">
                                                <i className="fa-regular fa-comment" />
                                                <span>74</span>Comments{" "}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p className="mt-2 mb-0">
                                            I truly believe Augustine’s words are true and if you look at
                                            history you know it is true. There are many people in the
                                            world with amazing talents.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="blog-post blog-post-style-02">
                                        <div className="blog-post-img">
                                            <img className="img-fluid" src="images/blog/03.jpg" alt="" />
                                        </div>
                                        <div className="blog-post-details">
                                            <h4 className="blog-title">
                                                <a href="blog-single.html">
                                                    How google’s BERT algorithm affects your website traffic
                                                </a>
                                            </h4>
                                            <div className="blog-post-meta">
                                                <div className="blog-post-date">
                                                    <a href="#">
                                                        <i className="fa-regular fa-calendar-days" />
                                                        20 Jan 2022
                                                    </a>
                                                </div>
                                                <div className="blog-post-like">
                                                    <a href="#">
                                                        <i className="fa-regular fa-thumbs-up" />
                                                        <span>5M</span>Like
                                                    </a>
                                                </div>
                                                <div className="blog-post-comment">
                                                    <a href="#">
                                                        <i className="fa-regular fa-comment" />
                                                        <span>10</span>Comments
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="blog-post blog-post-style-02">
                                        <div className="blog-post-img">
                                            <img className="img-fluid" src="images/blog/04.jpg" alt="" />
                                        </div>
                                        <div className="blog-post-details">
                                            <h4 className="blog-title">
                                                <a href="blog-single.html">
                                                    Five reasons why you must create a website for your
                                                    company
                                                </a>
                                            </h4>
                                            <div className="blog-post-meta">
                                                <div className="blog-post-date">
                                                    <a href="#">
                                                        <i className="fa-regular fa-calendar-days" />
                                                        14 Sep 2022
                                                    </a>
                                                </div>
                                                <div className="blog-post-like">
                                                    <a href="#">
                                                        <i className="fa-regular fa-thumbs-up" />
                                                        <span>1M</span>Like
                                                    </a>
                                                </div>
                                                <div className="blog-post-comment">
                                                    <a href="#">
                                                        <i className="fa-regular fa-comment" />
                                                        <span>60</span>Comments
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
            </section>
            <section className="single-categories single-categories-style-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="swiper single-slide">
                                <div className="swiper-wrapper">
                                    <div
                                        className="swiper-slide bg-holder"
                                        style={{
                                            backgroundImage: "url(images/movie/single-categories/09.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">The wizard of oz</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 69M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" />
                                                                8.1/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">1939</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    0hr : 50mins
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
                                                                The Wizard of Oz is a 1939 American musical fantasy
                                                                film produced by Metro-Goldwyn-Mayer. An adaptation
                                                                of L. Frank Baum's 1900 children's fantasy novel The
                                                                Wonderful Wizard of Oz, the film was primarily.
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
                                            backgroundImage: "url(images/movie/single-categories/11.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">Schindler's list</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 12M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" />
                                                                8.3/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">1194</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    0hr : 45mins
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
                                                                Andy Dufresne, a successful banker, is arrested for
                                                                the murders of his wife and her lover, and is
                                                                sentenced to life imprisonment at the Shawshank
                                                                prison. He becomes the most unconventional prisoner.
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
                                            backgroundImage: "url(images/movie/single-categories/13.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">The godfather: part II</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 96M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" /> 9/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">1974</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    0hr : 47mins
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
                                                                Michael, Vito Corleone's son, attempts to expand his
                                                                family's criminal empire. While he strikes a
                                                                business deal with gangster Hyman Roth, he remains
                                                                unaware of the lurking danger.
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
                                            backgroundImage: "url(images/movie/single-categories/15.jpg)"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xxl-6 col-xl-7 col-md-10 col-sm-10 order-sm-1 order-2">
                                                    <div className="movie-details">
                                                        <div className="movie-info">
                                                            <h2 className="title">Back to the future</h2>
                                                            <div className="movies-language">
                                                                Language: <a href="#">English,</a>
                                                                <a href="#">Hindi</a>
                                                            </div>
                                                            <div className="movies-genre">
                                                                Genre: <a href="#">Action,</a>
                                                                <a href="#">Drama</a>
                                                            </div>
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 85M Views
                                                            </a>
                                                            <a className="rating" href="#">
                                                                <i className="fa-solid fa-star" />
                                                                7.9/10
                                                            </a>
                                                            <div className="d-sm-flex">
                                                                <span className="year">1982</span>
                                                                <a className="time" href="#">
                                                                    <i className="far fa-clock me-2" />
                                                                    0hr : 55mins
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
                                                                An alien is left behind on Earth and is saved by
                                                                young Elliot who decides to keep him hidden. While
                                                                the task force hunts for it, Elliot and his siblings
                                                                form an emotional bond with their new friend.
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
                                                        src="images/movie/single-categories/10.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 69K
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    The Wizard of Oz
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                0hr : 50mins
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
                                                        src="images/movie/single-categories/12.jpg"
                                                        alt="#"
                                                    />
                                                    <div className="info-top">
                                                        <div className="ms-auto">
                                                            <a href="javascript:void(0)" className="like" />
                                                            <a className="views" href="#">
                                                                <i className="far fa-eye" /> 12M
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="movies-info">
                                                        <div className="content">
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    Schindler's List
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                0hr : 45mins
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
                                                        src="images/movie/single-categories/14.jpg"
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
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    The godfather: part II
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                0hr : 47mins
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
                                                        src="images/movie/single-categories/16.jpg"
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
                                                            <h5>
                                                                <a className="title" href="javascript:void(0)">
                                                                    Back to the future
                                                                </a>
                                                            </h5>
                                                            <a className="time" href="#">
                                                                <i className="far fa-clock me-2" />
                                                                0hr : 55mins
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
            <section className="space-ptb bg-secondary movies-categories-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2 className="title">New Releases</h2>
                            </div>
                            <div
                                className="owl-carousel owl-nav-center movies-categories-slider"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={4}
                                data-xl-items={4}
                                data-lg-items={3}
                                data-md-items={3}
                                data-sm-items={2}
                                data-xs-items={1}
                                data-space={30}
                                data-autoheight="true"
                                data-autoplay="false"
                                data-loop="true"
                            >
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/01.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Raiders of the lost ark
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1981</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    1hr : 00mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/02.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Forrest Gump
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1994</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 50mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/03.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Gone with the wind
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1939</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 42mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/04.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    To kill a mockingbird
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1962</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 55mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/05.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Apocalypse Now
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1962</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 45mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/06.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    It's a wonderful life
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1946</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 52mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/01.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Raiders of the lost ark
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1981</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    1hr : 00mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/02.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Forrest Gump
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1994</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 50mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/03.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    Gone with the wind
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1939</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 42mins
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
                                <div className="item">
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src="images/web-series/04.jpg"
                                                alt="#"
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h5>
                                                <a className="title" href="web-series-single.html">
                                                    To kill a mockingbird
                                                </a>
                                            </h5>
                                            <div className="movie-info">
                                                <span className="year">1962</span>
                                                <a className="time" href="#">
                                                    <i className="far fa-clock me-2" />
                                                    0hr : 55mins
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
                    </div>
                </div>
            </section>
        </>
    );
};