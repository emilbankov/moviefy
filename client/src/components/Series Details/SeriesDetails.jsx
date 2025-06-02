import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as seriesService from '../../services/seriesService'

export default function SeriesDetails() {
    const [series, setSeries] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null); // Track selected season
    const { seriesId } = useParams();
    const location = useLocation();

    useEffect(() => {
        seriesService.getSeriesDetails(seriesId)
            .then(result => setSeries(result))
            .catch(err => {
                console.log(err);
            });

        return () => {
            setSeries('series');
        };
    }, [location.pathname]);

    const handleSeasonClick = (seasonId, seasonNumber) => {
        setSelectedSeason(seasonNumber);

        seriesService.getEpisodes(seasonId).then(fetchedEpisodes => {
            setEpisodes(fetchedEpisodes);
        });
    };

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
    }, [series.series, series.series?.seasons, episodes, selectedSeason]);

    const handleScroll = (event) => {
        event.preventDefault();
        const episodesSection = document.getElementById('episodes');
        const seasonsSection = document.getElementById('seasons');

        if (episodesSection) {
            const offset = 500;
            const elementPosition = episodesSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else if (seasonsSection) {
            const offset = 500;
            const elementPosition = seasonsSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            {series.series && (
                <section className="single-movie-details space-pb bg-holder bg-overlay-dark-99 overflow-hidden" style={{ backgroundImage: "url(/images/bg/03.jpg)" }}>
                    <div className="container position-relative">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="movie-details-bg bg-overlay-dark-4" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.series.backdrop_path || ''})` }}>
                                    <div className="row position-relative">
                                        <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
                                            <div className="movie-details">
                                                <div className="movie-info">
                                                    <h2 className="title">{series.series.name}</h2>
                                                    <div className="movies-language">Language:{" "} English{" "}
                                                        <a className="rating" href="#"><i className="fa-solid fa-star" />
                                                            {" "}{series.series.vote_average}/10
                                                        </a>
                                                    </div>
                                                    <div className="movies-genre">
                                                        Genre:{" "}
                                                        {series.series.genres.map((genre, index) => (
                                                            <a key={index} href="#">
                                                                {genre.name}
                                                                {index < series.series.genres.length - 1 && ", "}
                                                            </a>
                                                        ))}
                                                    </div>
                                                    <div className="movies-genre">
                                                        Studio:{" "}
                                                        {series.series.production_companies.map((company, index) => (
                                                            <span key={index}>
                                                                {company.name}
                                                                {index < series.series.production_companies.length - 1 && ", "}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="d-sm-flex">
                                                        <span className="year">{new Date(series.series.first_air_date).getFullYear()}</span>
                                                        <a className="time" href="#">
                                                            SS {series.series.seasons[series.series.seasons.length - 1].season_number}
                                                            <span className="dot"></span>
                                                            EPS {series.series.seasons[series.series.seasons.length - 1].episode_count}
                                                        </a>
                                                        <span className="quality">
                                                            Quality: <a href="#">720P, 1080P</a>
                                                        </span>
                                                    </div>
                                                    <div className="d-sm-flex my-2">
                                                        <a href="javascript:void(0)" className="add-icon me-3">
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
                                                    <p className="mb-4">
                                                        {series.series.overview}
                                                    </p>
                                                    <a className="btn btn-primary popup-youtube" href={`https://www.youtube.com/watch?v=${series.series.trailer}`}><i className="fa-solid fa-play" />
                                                        Watch Trailer
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-5 col-lg-6  col-md-4 col-sm-12 align-self-center order-md-2 order-1">
                                            <div className="video movie-video-btn mb-4 mb-md-0">
                                                <button className="video-btn btn-animation" onClick={handleScroll}><i className="fa-solid fa-play" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {series.series.seasons && !selectedSeason && (
                            <div className="row mt-4 mt-lg-5" id="seasons">
                                <div className="col-md-12">
                                    <div className="section-title">
                                        <h2 className="title">Seasons</h2>
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
                                        data-md-items={4}
                                        data-sm-items={3}
                                        data-xs-items={2}
                                        data-space={30}
                                        data-autoheight="true"
                                        data-autoplay="false"
                                        data-loop="false"
                                    >
                                        {series.series.seasons && series.series.seasons.map((season) => (
                                            <Link key={season.id} onClick={() => handleSeasonClick(season.id, season.season_number)}>
                                                <div className="item">
                                                    <div className="episode-item">
                                                        <a href="#" className="popup-youtube tv-episode">
                                                            <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt="#" />
                                                            <div className="episode-info">
                                                                <span className="play-btn"><i className="fa-solid fa-play" /></span>
                                                                <h6 className="title">
                                                                    SS {season.season_number}
                                                                    <span className="dot"></span>
                                                                    EPS {season.episode_count}
                                                                </h6>
                                                                <h6 className="title">/ {new Date(season.air_date).getFullYear()}</h6>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {episodes[selectedSeason] && selectedSeason && (
                            <div className="row mt-4 mt-lg-5" id="episodes">
                                <div className="col-md-12">
                                    <div className="section-title">
                                        <h2 className="title">Episodes</h2>
                                        <button href="" className="btn-link link-yellow" onClick={() => setSelectedSeason(null)}>
                                            Seasons
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div
                                        className="owl-carousel owl-nav-center"
                                        data-nav-dots="false"
                                        data-nav-arrow="true"
                                        data-items={3}
                                        data-xl-items={3}
                                        data-lg-items={3}
                                        data-md-items={3}
                                        data-sm-items={2}
                                        data-xs-items={1}
                                        data-space={30}
                                        data-autoheight="true"
                                        data-autoplay="false"
                                        data-loop="false"
                                    >
                                        {episodes[selectedSeason].map((episode) => {
                                            console.log('Episode:', episode);
                                            return (
                                            <div className="item" key={episode.episode_number}>
                                                <div className="episode-item">
                                                    <a href={`https://vidsrc.net/embed/tv?tmdb=${series.series.api_id}&season=${selectedSeason}&episode=${episode.episode_number}`} className="play-btn-episodes popup-youtube"><i className="fa-solid fa-play" /></a>
                                                    <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt="#" />
                                                    <div className="episode-info">
                                                        <h6 className="title">
                                                            {episode.episode_number}. {episode.name}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
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
                                {series.series.crew &&
                                    series.series.crew
                                        .filter((crew) =>
                                            crew.job === "Director" ||
                                            crew.job === "Creator" ||
                                            crew.job === "Writer" ||
                                            crew.job === "Screenplay" ||
                                            crew.job === "Producer"
                                        )
                                        .slice(0, 3)  // Limit to the first three entries
                                        .map((crew) => (
                                            <a href="#" className="movie-author" key={crew.id}>
                                                <div className="author-img">
                                                    <img
                                                        className="crew img-fluid"
                                                        src={`https://image.tmdb.org/t/p/w138_and_h175_face${crew.profilePath}`}
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
                            <div className="col-lg-9 col-md-12 order-lg-2 mb-4 mb-lg-0">
                                <h6 className="author-title">Cast</h6>
                                <div className="row">
                                    {series.series.cast &&
                                        series.series.cast.filter(actor => actor.profilePath).slice(0, 9).map((actor) => (
                                            <div className="col-md-4" key={actor.id}>
                                                <a href="#" className="movie-author">
                                                    <div className="author-img">
                                                        <img
                                                            className="actor img-fluid"
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
                                                plan doesn't support the vision then change it!
                                            </p>
                                            <h5 className="mb-2">Does it need to be done at all?</h5>
                                            <p>
                                                But haven't you seen people who seem to coast into good
                                                things, like the farmer who found the Hope Diamond? I've known
                                                people like that. In fact, after I'd been in Japan for a while
                                                and had set up a "channel" for business to flow through, I
                                                could just think about receiving more money, and I'd get an
                                                immediate surge of business within hours. This pattern went on
                                                for 16 or 17 years, till I shut down my writing and editing
                                                business.
                                            </p>
                                            <h5 className="mb-2">Can it be done by someone else?</h5>
                                            <p className="mb-0">
                                                Imagine reaching deep inside you for all the strength and
                                                wisdom that you need to make this decision today. As you do
                                                so, imagine that when you choose to make that decision that
                                                deep inside your mind you are switching off the alternative
                                                path, you are switching off the opportunity to drift back to
                                                that place. Then step out and take your future path. Absorb
                                                yourself in the sensations, the feelings.
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
                                                    Really experience that. See what you see, hear what you
                                                    hear, feel the feelings. Disappointment? Anger? Frustration?
                                                    Failure? How does that feel? How do you affect those around
                                                    you? How do they feel? Absorb every aspect of this path that
                                                    you can take today if you so choose. Notice everything that
                                                    you need to know about what it will be like if you carry on
                                                    with the same behaviour, putting off change.
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
                                                        4 Reviews for women's fabric mix midi wrap jumpsuit
                                                    </h4>
                                                    <div className="commentlist">
                                                        <div className="comment-author">
                                                            <img
                                                                className="img-fluid"
                                                                src="/images/avatar/01.jpg"
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
                                                                src="/images/avatar/02.jpg"
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
                                                                src="/images/avatar/03.jpg"
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
                                                                Success isn't really that difficult. There is a
                                                                significant portion of the population here in North
                                                                America, that actually want and need success to be
                                                                hard! Why? So they then have a built-in excuse when
                                                                things don't go their way! Pretty sad situation, to
                                                                say the least.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="commentlist">
                                                        <div className="comment-author">
                                                            <img
                                                                className="img-fluid"
                                                                src="/images/avatar/04.jpg"
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
                </section>
            )}
        </>
    );
}