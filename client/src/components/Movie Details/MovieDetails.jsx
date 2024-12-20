import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as moviesService from '../../services/moviesService'

export default function MovieDetails() {
    const [movie, setMovie] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        moviesService.getMovieDetails(movieId)
            .then(result => setMovie(result))
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
    }, [movie.movie]);

    return (
        <>
            {movie.movie && (
                <section
                    className="single-movie-details space-pb bg-holder bg-overlay-dark-99"
                    style={{ backgroundImage: "url(images/bg/03.jpg)" }}
                >
                    <div className="container position-relative">
                        <div className="row g-0">
                            <div className="movie-details-bg col-12 bg-overlay-dark-4" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.movie?.backdrop_path || ''})` }}>
                                <div className="row position-relative">
                                    <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
                                        <div className="movie-details">
                                            <div className="movie-info">
                                                <h2 className="title">{movie.movie.title}</h2>
                                                <div className="movies-language">
                                                    Language:{" "} English
                                                </div>
                                                <div className="movies-genre">
                                                    Genre:{" "}
                                                    {movie.movie.genres &&
                                                        movie.movie.genres.map((genre, index) => (
                                                            <a key={index} href="#">
                                                                {genre.name}
                                                                {index < movie.movie.genres.length - 1 && ", "}
                                                            </a>
                                                        ))}
                                                </div>
                                                <a className="views" href="#">
                                                    <i className="far fa-eye" /> 55M Views
                                                </a>
                                                <a className="rating" href="#">
                                                    <i className="fa-solid fa-star" />
                                                    {movie.movie.vote_average}/10
                                                </a>
                                                <div className="d-sm-flex">
                                                    <span className="year">{new Date(movie.movie.release_date).getFullYear()}</span>
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        {Math.floor(movie.movie.runtime / 60)}hr : {movie.movie.runtime % 60}mins
                                                    </a>
                                                    <span className="quality">
                                                        Quality: <a href="#">720p, 1080p</a>
                                                    </span>
                                                </div>
                                                <div className="d-sm-flex my-2">
                                                    <a href="javascript:void(0)" className="add-icon me-3"> Add to List</a>
                                                    <div className="share-box">
                                                        <a href="#"><i className="fas fa-share-alt" /> Share</a>
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
                                                <p className="mb-4">{movie.movie.overview}</p>
                                                <a
                                                    className="btn btn-primary popup-youtube"
                                                    href={`https://www.youtube.com/watch?v=${movie.movie.trailer}`}
                                                >
                                                    <i className="fa-solid fa-play" />
                                                    Watch Trailer
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-5 col-lg-6 col-md-4 col-sm-12 align-self-center order-md-2 order-1">
                                        <div className="video movie-video-btn mb-4 mb-md-0">
                                            <a
                                                className="video-btn btn-animation popup-youtube"
                                                href={`https://www.youtube.com/watch?v`}
                                            >
                                                <i className="fa-solid fa-play" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mt-lg-5">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Cast &amp; Crew</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 order-lg-2 mb-4 mb-lg-0">
                                <h6 className="author-title">Cast</h6>
                                <div className="row">
                                    {movie.movie.cast &&
                                        movie.movie.cast.map((actor) => (
                                            <div className="col-md-6" key={actor.id}>
                                                <a href="#" className="movie-author">
                                                    <div className="author-img">
                                                        <img
                                                            className="img-fluid"
                                                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profilePath}`}
                                                            alt={actor.name}
                                                        />
                                                    </div>
                                                    <div className="author-details">
                                                        <h6 className="author-name">{actor.name}</h6>
                                                        <span className="author-designation">{actor.character}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 order-lg-1 mb-4 mb-md-0">
                                <h6 className="author-title">Director &amp; Writers</h6>
                                {movie.movie.crew &&
                                    movie.movie.crew
                                        .filter((crew) => crew.job === "Director" || crew.job === "Screenplay")
                                        .map((crew) => (
                                            <a href="#" className="movie-author" key={crew.id}>
                                                <div className="author-img">
                                                    <img
                                                        className="img-fluid"
                                                        src={`https://image.tmdb.org/t/p/original${crew.profilePath}`}
                                                        alt={crew.name}
                                                    />
                                                </div>
                                                <div className="author-details">
                                                    <h6 className="author-name">{crew.name}</h6>
                                                    <span className="author-designation">{crew.job}</span>
                                                </div>
                                            </a>
                                        ))}
                            </div>
                            <div className="col-lg-3 col-md-6 order-lg-3">
                                <h6 className="author-title">Producers</h6>
                                {movie.movie.production_companies &&
                                    movie.movie.production_companies.map((company, index) => (
                                        <a href="#" className="movie-author" key={index}>
                                            <div className="author-img">
                                                <img
                                                    className="img-fluid"
                                                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                                    alt={company.name}
                                                />
                                            </div>
                                            <div className="author-details">
                                                <h6 className="author-name">{company.name}</h6>
                                                <span className="author-designation">Production</span>
                                            </div>
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* <section className="single-movie-details space-pb bg-holder bg-overlay-dark-99" style={{ backgroundImage: "url(images/bg/03.jpg)" }}>
                <div className="container position-relative">
                    <div className="row g-0">
                        <div className="movie-details-bg col-12 bg-overlay-dark-4">
                            <div className="row position-relative">
                                <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
                                    <div className="movie-details">
                                        <div className="movie-info">
                                            <h2 className="title"> Witness for the Prosecution</h2>
                                            <div className="movies-language">Language: <a href="#">English,</a><a href="#">Hindi</a></div>
                                            <div className="movies-genre">Genre: <a href="#">Crime,</a><a href="#">Drama,</a><a href="#">Mystery</a></div>
                                            <a className="views" href="#"><i className="far fa-eye" /> 55M Views</a>
                                            <a className="rating" href="#"><i className="fa-solid fa-star" />8.4/10</a>
                                            <div className="d-sm-flex"><span className="year">1957</span>
                                                <a className="time" href="#"><i className="far fa-clock me-2" />3hr : 20mins</a>
                                                <span className="quality">Quality: <a href="#">720P, HD, 4K</a></span>
                                            </div>
                                            <div className="d-sm-flex my-2">
                                                <a href="javascript:void(0)" className="add-icon me-3">{" "}Add to List</a>
                                                <div className="share-box">
                                                    <a href="#">{" "}<i className="fas fa-share-alt" />Share</a>
                                                    <ul className="list-unstyled share-box-social">
                                                        <li>{" "}<a href="#"><i className="fab fa-facebook-f" /></a>{" "}</li>
                                                        <li>{" "}<a href="#"><i className="fab fa-twitter" /></a>{" "}</li>
                                                        <li>{" "}<a href="#"><i className="fab fa-linkedin" /></a>{" "}</li>
                                                        <li>{" "}<a href="#"><i className="fab fa-instagram" /></a>{" "}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="mb-4">{movie.movie?.overview}</p>
                                            <a className="btn btn-primary popup-youtube" href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"><i className="fa-solid fa-play" />Watch Trailer</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-5 col-lg-6  col-md-4 col-sm-12 align-self-center order-md-2 order-1">
                                    <div className="video movie-video-btn mb-4 mb-md-0">
                                        <a className="video-btn btn-animation popup-youtube" href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"><i className="fa-solid fa-play" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mt-lg-5">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Cast &amp; crew</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 order-lg-2 mb-4 mb-lg-0">
                            <h6 className="author-title">Cast</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    <a href="#" className="movie-author">
                                        <div className="author-img">
                                            <img
                                                className="img-fluid"
                                                src="images/avatar/01.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-details">
                                            <h6 className="author-name">Alice Williams</h6>
                                            <span className="author-designation">Mrs. Clemenza</span>
                                        </div>
                                    </a>
                                    <a href="#" className="movie-author">
                                        <div className="author-img">
                                            <img
                                                className="img-fluid"
                                                src="images/avatar/02.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-details">
                                            <h6 className="author-name">Aaron Sharp</h6>
                                            <span className="author-designation">Philip Tattaglia</span>
                                        </div>
                                    </a>
                                    <a href="#" className="movie-author">
                                        <div className="author-img">
                                            <img
                                                className="img-fluid"
                                                src="images/avatar/03.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-details">
                                            <h6 className="author-name">Homer Reyes</h6>
                                            <span className="author-designation">Lucy Mancini</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-6">
                                    <a href="#" className="movie-author">
                                        <div className="author-img">
                                            <img
                                                className="img-fluid"
                                                src="images/avatar/04.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-details">
                                            <h6 className="author-name">Felica Queen</h6>
                                            <span className="author-designation">Fruit Vendor</span>
                                        </div>
                                    </a>
                                    <a href="#" className="movie-author">
                                        <div className="author-img">
                                            <img
                                                className="img-fluid"
                                                src="images/avatar/05.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-details">
                                            <h6 className="author-name">Michael Bean</h6>
                                            <span className="author-designation">Wedding Guest</span>
                                        </div>
                                    </a>
                                    <a href="#" className="movie-author">
                                        <div className="author-img">
                                            <img
                                                className="img-fluid"
                                                src="images/avatar/06.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="author-details">
                                            <h6 className="author-name">Paul Flavius</h6>
                                            <span className="author-designation">Elena</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 order-lg-1 mb-4 mb-md-0">
                            <h6 className="author-title">Director &amp; Writers</h6>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/07.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Anne Smith</h6>
                                    <span className="author-designation">Assistant Director</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/08.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Mellissa Doe</h6>
                                    <span className="author-designation">Writers</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/09.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Ben Aguilar</h6>
                                    <span className="author-designation">Director</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6 order-lg-3">
                            <h6 className="author-title">Producer</h6>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/10.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Kim Hamilton</h6>
                                    <span className="author-designation">Lucy Mancini</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/11.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Gwen Bass</h6>
                                    <span className="author-designation">Philip Tattaglia</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/12.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Candice Mcdonald</h6>
                                    <span className="author-designation">Mrs. Clemenza</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
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
                                            Description
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
                                            Reviews (4)
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
                                        <h5 className="mb-2">So why do we do it?</h5>
                                        <p>
                                            The best way is to develop and follow a plan. Start with your
                                            goals in mind and then work. backward to develop the plan.
                                            What steps are required to get you to the goals? Make the plan
                                            as detailed as possible. Try to visualize and then plan for,
                                            every possible setback. Commit the plan to paper and then keep
                                            it with you at all times. Review it regularly and ensure that
                                            every step takes you closer to your Vision and Goals. If the
                                            plan doesn’t support the vision then change it!
                                        </p>
                                        <h5 className="mb-2">Does it need to be done at all?</h5>
                                        <p>
                                            Acres of Diamonds… you’ve read the famous story, or at least
                                            had it related to you. A farmer hears tales of diamonds and
                                            begins dreaming of vast riches. He sells his farm and hikes
                                            off over the horizon, never to be heard from again. Rumors say
                                            that years later he died destitute, never having found the
                                            diamonds he spent his life seeking.{" "}
                                        </p>
                                        <h5 className="mb-2">Can it be done by someone else?</h5>
                                        <p className="mb-0">
                                            It turned out to be the Hope Diamond, the largest such stone
                                            ever found. That stream bed was littered with diamonds, and
                                            the new owner became fabulously wealthy. No doubt he also
                                            lived happily ever after. But doesn’t something in that story
                                            set strangely with you? What about the guy with the burning
                                            desire and the grand vision? He ended up disappointed and
                                            broke.
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
                                                <h4 className="mb-4">
                                                    4 Reviews for women’s fabric mix midi wrap jumpsuit
                                                </h4>
                                                <div className="commentlist">
                                                    <div className="comment-author">
                                                        <img
                                                            className="img-fluid"
                                                            src="images/avatar/01.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="comment-content">
                                                        <div className="reviews">
                                                            <p className="meta">
                                                                <strong>Sara Lisbon </strong> – Apr 8, 2022
                                                            </p>
                                                            <div className="rating">
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star-half-alt" />
                                                                <i className="far fa-star" />
                                                            </div>
                                                        </div>
                                                        <p>
                                                            For those of you who are serious about having more,
                                                            doing more, giving more and being more, success is
                                                            achievable with some understanding of what to do, some
                                                            discipline around planning and execution of those
                                                            plans and belief that you can achieve your desires.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="commentlist ms-sm-5 ms-4">
                                                    <div className="comment-author">
                                                        <img
                                                            className="img-fluid"
                                                            src="images/avatar/02.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="comment-content">
                                                        <div className="reviews">
                                                            <p className="meta">
                                                                <strong>Frank Smith </strong> – May 8, 2022
                                                            </p>
                                                            <div className="rating">
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star-half-alt" />
                                                                <i className="far fa-star" />
                                                            </div>
                                                        </div>
                                                        <p>
                                                            There are basically six key areas to higher
                                                            achievement. Some people will tell you there are four
                                                            while others may tell you there are eight. One thing
                                                            for certain though, is that irrespective of the number
                                                            of steps the experts talk about, they all originate
                                                            from the same roots.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="commentlist ms-sm-5 ms-4">
                                                    <div className="comment-author">
                                                        <img
                                                            className="img-fluid"
                                                            src="images/avatar/03.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="comment-content">
                                                        <div className="reviews">
                                                            <p className="meta">
                                                                <strong>Joanna williams </strong> – Jun 8, 2022
                                                            </p>
                                                            <div className="rating">
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star-half-alt" />
                                                                <i className="far fa-star" />
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Success isn’t really that difficult. There is a
                                                            significant portion of the population here in North
                                                            America, that actually want and need success to be
                                                            hard! Why? So they then have a built-in excuse when
                                                            things don’t go their way! Pretty sad situation, to
                                                            say the least.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="commentlist">
                                                    <div className="comment-author">
                                                        <img
                                                            className="img-fluid"
                                                            src="images/avatar/04.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="comment-content">
                                                        <div className="reviews">
                                                            <p className="meta">
                                                                <strong>Felica Queen </strong> – July 8, 2022
                                                            </p>
                                                            <div className="rating">
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star-half-alt" />
                                                                <i className="far fa-star" />
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Making a decision to do something – this is the first
                                                            step. We all know that nothing moves until someone
                                                            makes a decision. The first action is always in making
                                                            the decision to proceed. This is a fundamental step,
                                                            which most people overlook.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 ">
                                                    <h5>Add a review</h5>
                                                    <p>
                                                        Your email address will not be published. Required
                                                        fields are marked *
                                                    </p>
                                                </div>
                                                <form className="row mt-4 align-items-center">
                                                    <div className="mb-3 col-sm-6">
                                                        <label className="form-label">Name*</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder=""
                                                        />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <label className="form-label">Your review *</label>
                                                        <div className="mb-3">
                                                            <textarea
                                                                className="form-control"
                                                                rows={5}
                                                                id="comment"
                                                                defaultValue={""}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="form-check mb-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultValue=""
                                                                id="flexCheckChecked02"
                                                            />
                                                            <label
                                                                className="form-check-label ps-2"
                                                                htmlFor="flexCheckChecked02"
                                                            >
                                                                Save my name, email, and website in this browser for
                                                                the next time I comment.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <label className="form-label">Your review *</label>
                                                        <div className="product-rating">
                                                            <i className="fas fa-star text-warning" />
                                                            <i className="fas fa-star text-warning" />
                                                            <i className="fas fa-star text-warning" />
                                                            <i className="far fa-star" />
                                                            <i className="far fa-star" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <a className="btn btn-primary mt-4" href="#">
                                                            {" "}
                                                            Submit{" "}
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="bg-secondary space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Recently Updated</h2>
                                <a href="movie.html" className="btn-link">
                                    More Videos
                                </a>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={4}
                                data-xl-items={4}
                                data-lg-items={4}
                                data-md-items={3}
                                data-sm-items={2}
                                data-xs-items={1}
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
                                                src="images/movie/03.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Drama
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 54K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        3hr : 10mins
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    Doctor Zhivago
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
                                                src="images/movie/06.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 58M
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    The Deer Hunter
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
                                                src="images/movie/07.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Comedy
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 74M
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    Close Encounters of the Third Kind
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
                                                src="images/movie/08.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Action
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 52M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        2hr : 35mins
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    The Lord of the Rings
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
                                                src="images/movie/09.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 3M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        2hr : 25mins
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    The Return of the King
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
                                                src="images/movie/03.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Drama
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 54K
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        3hr : 10mins
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    Doctor Zhivago
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
                                                src="images/movie/06.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 58M
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
                                                                <a className="title mt-0" href="movie-single.html">
                                                                    The Deer Hunter
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
    )
}


