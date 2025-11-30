import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as moviesService from '../../services/moviesService'
import * as reviewsService from '../../services/reviewsService'
import { useLoading } from '../../contexts/LoadingContext';

// Helper function to convert genre display name to database name
const getGenreParam = (genreName) => {
    if (genreName === 'Sci-Fi') return 'Science Fiction';
    if (genreName === 'Sci-Fi & Fantasy') return 'Science Fiction';
    return genreName;
};

// Helper function to render star rating (rating is 0-10, convert to 0-5 stars)
const renderStars = (rating) => {
    const starRating = rating ? Math.round(rating / 2) : 0;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= starRating) {
            stars.push(<i key={i} className="fas fa-star" />);
        } else if (i === starRating + 0.5) {
            stars.push(<i key={i} className="fas fa-star-half-alt" />);
        } else {
            stars.push(<i key={i} className="far fa-star" />);
        }
    }

    return stars;
};

// Helper function to truncate review content
const truncateReview = (text, maxLength = 350) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

export default function MovieDetails() {
    const [movie, setMovie] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showMoviePlayer, setShowMoviePlayer] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedReviews, setExpandedReviews] = useState(new Set());
    const reviewsPerPage = 20;
    const { movieId } = useParams();
    const location = useLocation();
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        moviesService.getMovieDetails(movieId)
            .then(result => {
                setMovie(result);
                // Always fetch page 1 initially - contains up to 20 reviews
                return reviewsService.getReviews(movieId, 'movies', 1);
            })
            .then(reviewsResult => {
                if (reviewsResult) {
                    setReviews(reviewsResult);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {
            setMovie('movie');
            setReviews([]);
            setShowAllReviews(false);
            setCurrentPage(1);
            setExpandedReviews(new Set());
        };
    }, [location.pathname, setLoading, movieId]);

    // Fetch all reviews when showAllReviews becomes true
    useEffect(() => {
        if (showAllReviews) {
            const fetchAllReviews = async () => {
                const firstPage = await reviewsService.getReviews(movieId, 'movies', 1);
                if (firstPage.total_pages <= 1) {
                    setReviews(firstPage);
                    return;
                }

                const allPromises = [];
                for (let page = 2; page <= firstPage.total_pages; page++) {
                    allPromises.push(reviewsService.getReviews(movieId, 'movies', page));
                }

                const otherPages = await Promise.all(allPromises);
                const allReviews = [firstPage, ...otherPages].flatMap(page => page.reviews);

                setReviews({
                    ...firstPage,
                    reviews: allReviews
                });
            };

            fetchAllReviews();
        }
    }, [showAllReviews, movieId]);

    // Scroll to movie content when page changes
    useEffect(() => {
        if (showAllReviews && currentPage > 1) {
            const movieContent = document.querySelector('#movie-content');
            if (movieContent) {
                movieContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }, [currentPage, showAllReviews]);

console.log(reviews);

    useEffect(() => {
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

        return () => {
            const script = document.querySelector('script[src="/js/custom.js"]');
            if (script && document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [movie.movies]);

    // Reinitialize popup functionality when movie player closes
    useEffect(() => {
        if (!showMoviePlayer && movie.movies) {
            // Wait a bit for DOM to update, then reinitialize Magnific Popup
            const timer = setTimeout(() => {
                if (window.jQuery && window.jQuery.magnificPopup && window.jQuery('.popup-youtube').length > 0) {
                    // Destroy existing popup bindings and reinitialize
                    window.jQuery('.popup-youtube').off('click').magnificPopup({
                        type: 'iframe',
                        mainClass: 'mfp-fade',
                        removalDelay: 160,
                        preloader: false,
                        fixedContentPos: false
                    });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showMoviePlayer, movie.movies]);

    return (
        <>
            {movie.movies && (
                <section className="single-movie-details space-pb bg-holder bg-overlay-dark-99" style={{ backgroundImage: "url(/images/bg/03.jpg)" }}>
                    <div className="container position-relative">
                        <div className="movie-details-bg col-12 bg-overlay-dark-5" style={{ backgroundImage: showMoviePlayer ? 'none' : `url(https://image.tmdb.org/t/p/original${movie.movies.backdrop_path || ''})`, padding: showMoviePlayer ? 0 : undefined }}>
                            {showMoviePlayer ? (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '70vh',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                    justifyContent: 'center',
                                    background: '#000',
                                    margin: 0,
                                    padding: 0
                                }}>
                                    <button
                                        className="btn btn-sm btn-light"
                                        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
                                        onClick={() => setShowMoviePlayer(false)}
                                    >
                                        Back to Details
                                    </button>
                                    <iframe
                                        src={`https://vidsrc.net/embed/movie?tmdb=${movie.movies.api_id}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Movie Player"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            minHeight: '70vh',
                                            background: '#000',
                                            margin: 0,
                                            padding: 0
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="row position-relative">
                                    <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
                                        <div className="movie-details">
                                            <div className="movie-info">
                                                <h2 className="title">{movie.movies.title}</h2>
                                                <div className="movie-details-info movies-info">
                                                    <div className="features">
                                                        <span className="imdb">
                                                            <a className="logo-align" href={`https://www.imdb.com/title/${movie.movies.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                                <img className="img-fluid" src="/images/imdb-logo.png" alt="#" />{movie.movies.vote_average}
                                                            </a>
                                                        </span>
                                                        <span className="imdb">
                                                            <a className="logo-align" href={`https://www.themoviedb.org/movie/${movie.movies.api_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                                <img className="img-fluid" src="/images/tmdb-logo.svg" alt="#" />{movie.movies.vote_average}
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="movies-language">
                                                    Language: English
                                                </div>
                                                <div className="movies-genre">
                                                    Genre: {movie.movies.genres.map((genre, index) => (
                                                        <Link key={index} to={`/genre?genre=${getGenreParam(genre.name)}&media=movies`}>
                                                            {genre.name}{index < movie.movies.genres.length - 1 && ", "}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="movies-genre">
                                                    Studio: {movie.movies.production_companies.map((company, index) => (
                                                        <span key={index}>
                                                            {company.name}{index < movie.movies.production_companies.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="d-sm-flex">
                                                    <span className="year">{new Date(movie.movies.release_date).getFullYear()}</span>
                                                    <a className="time" href="#"><i className="far fa-clock me-2" />{Math.floor(movie.movies.runtime / 60)}hr : {movie.movies.runtime % 60}mins</a>
                                                    <span className="quality">Quality: <a href="#">720p, 1080p</a></span>
                                                </div>
                                                <div className="d-sm-flex my-2">
                                                    <a href="javascript:void(0)" className="add-icon me-3"> Add to List</a>
                                                    <div className="share-box">
                                                        <a href="#"><i className="fas fa-share-alt" /> Share</a>
                                                        <ul className="list-unstyled share-box-social">
                                                            <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                                            <li><a href="#"><i className="fab fa-twitter" /></a></li>
                                                            <li><a href="#"><i className="fab fa-linkedin" /></a></li>
                                                            <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className="mb-4">{movie.movies.overview}</p>
                                                <a className="btn btn-primary popup-youtube" href={`https://www.youtube.com/watch?v=${movie.movies.trailer}`}><i className="fa-solid fa-play" /> Watch Trailer</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-5 col-lg-6 col-md-4 col-sm-12 align-self-center order-md-2 order-1">
                                        <div className="video movie-video-btn mb-4 mb-md-0">
                                            <a className="video-btn btn-animation" onClick={e => { e.preventDefault(); setShowMoviePlayer(true); }} href="#"><i className="fa-solid fa-play" /></a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="row mt-4 mt-lg-5">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Cast &amp; Crew</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3-4 col-md-6 order-lg-1 mb-4 mb-md-0">
                                <h6 className="author-title">Director, Writers & Producers</h6>
                                {movie.movies.crew &&
                                    movie.movies.crew
                                        .filter((crew) =>
                                            crew.job === "Director" ||
                                            crew.job === "Writer" ||
                                            crew.job === "Screenplay" ||
                                            crew.job === "Producer"
                                        )
                                        .slice(0, 3)  // Limit to the first three entries
                                        .map((crew, index) => (
                                            <Link to={`/crew-media?crewId=${crew.id}&crewName=${encodeURIComponent(crew.name)}&crewImage=${encodeURIComponent(crew.profilePath || '')}`} className="movie-author" key={`crew-${crew.id}-${index}`}>
                                                <div className="author-img">
                                                    <img
                                                        className="crew img-fluid"
                                                        src={crew.profilePath
                                                            ? `https://image.tmdb.org/t/p/w138_and_h175_face${crew.profilePath}`
                                                            : '/images/no-image.jpg'}
                                                        alt={crew.name}
                                                        onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                    />
                                                </div>
                                                <div className="author-details">
                                                    <h6 className="author-name">{crew.name}</h6>
                                                    <span className="author-designation">{crew.job}</span>
                                                </div>
                                            </Link>
                                        ))}
                            </div>
                            <div className="col-lg-9 col-md-12 order-lg-2 mb-4 mb-lg-0">
                                <h6 className="author-title">Cast</h6>
                                <div className="row">
                                    {movie.movies.cast &&
                                        movie.movies.cast.slice(0, 9).map((actor) => (
                                            <div className="col-md-4" key={`cast-${actor.id}`}>
                                                <Link to={`/actor-media?actorId=${actor.id}&actorName=${encodeURIComponent(actor.name)}&actorImage=${encodeURIComponent(actor.profilePath || '')}`} className="movie-author">
                                                    <div className="author-img">
                                                        <img
                                                            className="actor img-fluid"
                                                            src={actor.profilePath
                                                                ? `https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profilePath}`
                                                                : '/images/no-image.jpg'}
                                                            alt={actor.name}
                                                            onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                        />
                                                    </div>
                                                    <div className="author-details">
                                                        <h6 className="author-name">{actor.name}</h6>
                                                        <span className="author-designation">{actor.character}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div id="movie-content" className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="movie-details-tabs tabs">
                                    <ul
                                        className="nav nav-tabs nav-pills mb-3"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link active"
                                                id="pills-description-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-description"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-description"
                                                aria-selected="true"
                                            >
                                                Overview
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-information-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-information"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-information"
                                                aria-selected="false"
                                            >
                                                Additional information
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-reviews-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-reviews"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-reviews"
                                                aria-selected="false"
                                            >
                                                Reviews ({reviews?.total_items || 0})
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-description"
                                            role="tabpanel"
                                            aria-labelledby="pills-description-tab"
                                            tabIndex={0}
                                        >
                                            <p className="mb-0">
                                                {movie.movies.overview}
                                            </p>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-information"
                                            role="tabpanel"
                                            aria-labelledby="pills-information-tab"
                                            tabIndex={0}
                                        >
                                            <div className="mb-3">
                                                <h5 className="mb-2">Description of Service</h5>
                                                <p>
                                                    The best way is to develop and follow a plan. Start with
                                                    your goals in mind and then work backwards to develop the
                                                    plan. What steps are required to get you to the goals? Make
                                                    the plan as detailed as possible. Try to visualize and then
                                                    plan for, every possible setback.{" "}
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <h5 className="mb-2">Your Registration Obligations</h5>
                                                <p>
                                                    Was this just another little prank, courtesy of a
                                                    mischievous Universe? Or is it possible to get good things
                                                    coming your way with only mild desire — maybe even a calm
                                                    indifference? Many inspirational writers, including Napoleon
                                                    Hill, have assured us that a burning desire is one of the
                                                    prerequisites of acquiring a fortune. I’ve even said it
                                                    myself, although I added the qualifier that the powerful
                                                    desire is not so much for the Universe.
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <h5 className="mb-2">User Conduct</h5>
                                                <p>
                                                    Benjamin Franklin, inventor, statesman, writer, publisher
                                                    and economist relates in his autobiography that early in his
                                                    life he decided to focus on arriving at moral perfection. He
                                                    made a list of 13 virtues, assigning a page to each. Under
                                                    each virtue he wrote a summary that gave it fuller meaning.
                                                    Then he practiced each one for a certain length of time. To
                                                    make these virtues a habit,{" "}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-reviews"
                                            role="tabpanel"
                                            aria-labelledby="pills-reviews-tab"
                                            tabIndex={0}
                                        >
                                            <div className="row">
                                                <div className="col-12">
                                                    {reviews?.reviews && reviews.reviews.length > 0 ? (
                                                        <>
                                                            {/* Display reviews - show 6 initially, or paginated reviews if showAllReviews */}
                                                            {(showAllReviews ? reviews.reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage) : reviews.reviews.slice(0, 6)).map((review, index) => {
                                                                // Create a stable key for tracking expanded reviews
                                                                const reviewKey = review.id || `${review.author}- ${review.created_at}-${index}`;
                                                                const globalIndex = showAllReviews ? ((currentPage - 1) * reviewsPerPage) + index : index;
                                                                return (
                                                                    <div key={`review-${globalIndex}-${review.author}-${Date.parse(review.created_at)}`} className="commentlist">
                                                                        <div className="comment-author">
                                                                            <img
                                                                                className="img-fluid"
                                                                                src={review.author_path ? `https://image.tmdb.org/t/p/w45${review.author_path}` : '/images/no-image.jpg'}
                                                                                alt={review.author}
                                                                                onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                                                style={{ minWidth: '70px', minHeight: '70px', width: '70px', height: '70px', objectFit: 'cover' }}
                                                                            />
                                                                        </div>
                                                                        <div className="comment-content">
                                                                            <div className="reviews">
                                                                                <p className="meta">
                                                                                    <strong>{review.author}</strong> {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                                                </p>
                                                                                <div className="rating" style={{ color: '#FFD700' }}>
                                                                                    {renderStars(review.rating)}
                                                                                </div>
                                                                            </div>
                                                                            <p>
                                                                                {expandedReviews.has(reviewKey) ? review.content : truncateReview(review.content)}
                                                                                {review.content.length > 350 && (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-link p-0 ms-2 text-primary"
                                                                                        style={{ textDecoration: 'none', fontSize: '0.9em' }}
                                                                                        onClick={() => {
                                                                                            const newExpanded = new Set(expandedReviews);
                                                                                            if (newExpanded.has(reviewKey)) {
                                                                                                newExpanded.delete(reviewKey);
                                                                                            } else {
                                                                                                newExpanded.add(reviewKey);
                                                                                            }
                                                                                            setExpandedReviews(newExpanded);
                                                                                        }}
                                                                                    >
                                                                                        {expandedReviews.has(reviewKey) ? 'Read Less' : 'Read More'}
                                                                                    </button>
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}

                                                            {/* View More Button */}
                                                            {!showAllReviews && reviews.reviews.length > 6 && (
                                                                <div className="text-center mt-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={() => setShowAllReviews(true)}
                                                                    >
                                                                        View More Reviews
                                                                    </button>
                                                                </div>
                                                            )}

                                                            {/* Pagination - only show when showAllReviews is true and there are more than 20 reviews total */}
                                                            {showAllReviews && reviews.total_items > 20 && (
                                                                <div className="row mt-4">
                                                                    <div className="col-12">
                                                                        <nav aria-label="Reviews pagination">
                                                                            <ul className="pagination justify-content-center">
                                                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="page-link"
                                                                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                                                        disabled={currentPage === 1}
                                                                                    >
                                                                                        Previous
                                                                                    </button>
                                                                                </li>
                                                                                {Array.from({ length: Math.ceil(reviews.total_items / reviewsPerPage) }, (_, i) => i + 1).map(page => (
                                                                                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="page-link"
                                                                                            onClick={() => setCurrentPage(page)}
                                                                                        >
                                                                                            {page}
                                                                                        </button>
                                                                                    </li>
                                                                                ))}
                                                                                <li className={`page-item ${currentPage === Math.ceil(reviews.total_items / reviewsPerPage) ? 'disabled' : ''}`}>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="page-link"
                                                                                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(reviews.total_items / reviewsPerPage), prev + 1))}
                                                                                        disabled={currentPage === Math.ceil(reviews.total_items / reviewsPerPage)}
                                                                                    >
                                                                                        Next
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </nav>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p>No reviews available yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {movie.movies && movie.movies.collection.length > 0 && (
                <section className="bg-secondary space-ptb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">{movie.movies.collection_name}</h2>
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
                                    {movie.movies.collection.map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/movie/details/${item.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className="movies-categories br-20">
                                                    <div className="movies-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                                            alt={item.title}
                                                        />
                                                        <div className="info-top">
                                                            <span className="tag">{item.genre}</span>
                                                            <div className="ms-auto">
                                                                <a href="javascript:void(0)" className="like" onClick={(e) => e.preventDefault()} />
                                                                <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                                    <i className="fa-solid fa-star" /> {item.vote_average}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="movies-info">
                                                            <div className="content">
                                                                <h5><span className="title mt-0">{item.title}</span></h5>
                                                                <span className="time">
                                                                    {item.year || (item.release_date ? new Date(item.release_date).getFullYear() : 'N/A')}
                                                                    <i className="far fa-clock me-2 ms-2" />
                                                                    {Math.floor(item.runtime / 60)}hr : {item.runtime % 60}mins
                                                                </span>
                                                            </div>
                                                            <a
                                                                className="play-btn popup-youtube"
                                                                href={`https://www.youtube.com/watch?v=${item.trailer}`}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <i className="fa-solid fa-play" />
                                                            </a>
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
    )
}


