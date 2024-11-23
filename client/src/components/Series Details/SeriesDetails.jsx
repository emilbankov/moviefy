export default function SeriesDetails() {
    return (
        <>
            <section className="single-movie-details space-pb bg-holder bg-overlay-dark-99 overflow-hidden" style={{ backgroundImage: "url(images/bg/03.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="movie-details-bg bg-overlay-dark-4" style={{ backgroundImage: "url(images/tv-show/details-bg.jpg)" }}>
                                <div className="row position-relative">
                                    <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
                                        <div className="movie-details">
                                            <div className="movie-info">
                                                <h2 className="title">That feeling when the series ends</h2>
                                                <div className="movies-language">
                                                    Language: <a href="#">English,</a>
                                                    <a href="#">Hindi</a>
                                                </div>
                                                <div className="movies-genre">
                                                    Genre: <a href="#">Action,</a>
                                                    <a href="#">Drama</a>
                                                </div>
                                                <a className="views" href="#">
                                                    <i className="far fa-eye" /> 50M Views
                                                </a>
                                                <a className="rating" href="#">
                                                    <i className="fa-solid fa-star" /> 8.3/10
                                                </a>
                                                <div className="d-sm-flex">
                                                    <span className="year">2022</span>
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 35mins
                                                    </a>
                                                    <span className="quality">
                                                        Quality: <a href="#">720P, HD, 4K</a>
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
                                                    I want you to think about how you will feel in 10 years if
                                                    you continue doing the exact same things you have done to
                                                    date. What will your daily life be like.
                                                </p>
                                                <a
                                                    className="btn btn-primary popup-youtube"
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                >
                                                    <i className="fa-solid fa-play" />
                                                    Watch Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-5 col-lg-6  col-md-4 col-sm-12 align-self-center order-md-2 order-1">
                                        <div className="video movie-video-btn mb-4 mb-md-0">
                                            <a
                                                className="video-btn btn-animation popup-youtube"
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                            >
                                                <i className="fa-solid fa-play" />
                                            </a>
                                            <h6>Watch Trailer</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mt-lg-5">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Watch Full Episode</h2>
                            </div>
                            <div className="categories-slider episode">
                                <div
                                    className="owl-carousel owl-nav-center"
                                    data-nav-dots="false"
                                    data-nav-arrow="true"
                                    data-items={6}
                                    data-xl-items={5}
                                    data-lg-items={5}
                                    data-md-items={4}
                                    data-sm-items={3}
                                    data-xs-items={2}
                                    data-space={30}
                                    data-autoheight="true"
                                >
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show01.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show02.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show03.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show04.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show05.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show06.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="episode-item">
                                            <a
                                                href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                className="popup-youtube tv-episode"
                                            >
                                                <img
                                                    className="img-fluid"
                                                    src="images/tv-show/tv-show07.jpg"
                                                    alt="#"
                                                />
                                                <div className="episode-info">
                                                    <span className="play-btn">
                                                        <i className="fa-solid fa-play" />
                                                    </span>
                                                    <h6 className="title">S1 E1</h6>
                                                    <span className="date">14 Sep</span>
                                                </div>
                                            </a>
                                        </div>
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
                                            <h6 className="author-name">Olive Yew</h6>
                                            <span className="author-designation">Lucy Mancini</span>
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
                                            <h6 className="author-name">Teri Dactyl</h6>
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
                                            <h6 className="author-name">Lee A. Sun</h6>
                                            <span className="author-designation">Mrs. Clemenza</span>
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
                                            <h6 className="author-name">Rod Knee</h6>
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
                                            <h6 className="author-name">Fay Daway</h6>
                                            <span className="author-designation">Elena</span>
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
                                            <h6 className="author-name">Lee Nonmi</h6>
                                            <span className="author-designation">Wedding Guest</span>
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
                                    <h6 className="author-name">Stanley Knife</h6>
                                    <span className="author-designation">assistant director</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/08.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Laura Biding</h6>
                                    <span className="author-designation">Director</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/09.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Willie Findit</h6>
                                    <span className="author-designation">Writers</span>
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
                                    <h6 className="author-name">Ben Dover</h6>
                                    <span className="author-designation">Producer</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/11.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Willie Makit</h6>
                                    <span className="author-designation">Producer</span>
                                </div>
                            </a>
                            <a href="#" className="movie-author">
                                <div className="author-img">
                                    <img className="img-fluid" src="images/avatar/12.jpg" alt="" />
                                </div>
                                <div className="author-details">
                                    <h6 className="author-name">Anne Ortha</h6>
                                    <span className="author-designation">Producer</span>
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
                                            But haven’t you seen people who seem to coast into good
                                            things, like the farmer who found the Hope Diamond? I’ve known
                                            people like that. In fact, after I’d been in Japan for a while
                                            and had set up a “channel” for business to flow through, I
                                            could just think about receiving more money, and I’d get an
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
            </section>
            <section className="bg-secondary space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Recently Updated</h2>
                                <a href="tv-show.html" className="btn-link">
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
                                                src="images/tv-show/tv-show01.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Action
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 38M
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
                                                                    Serenity Hitler
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
                                                src="images/tv-show/tv-show08.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 27M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 35mins
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
                                                                    Yolanda Flounce
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
                                                src="images/tv-show/tv-show04.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Animation
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 19M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 24mins
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
                                                                    Fitzgerald Plopp
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
                                                src="images/tv-show/tv-show17.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 1M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 33mins
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
                                                                    Leonardo DiCraprio
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
                                                src="images/tv-show/tv-show22.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Biography
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 10M
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
                                                                    Travis Pineapple
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
                                                src="images/tv-show/tv-show01.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <a className="tag" href="#">
                                                    Action
                                                </a>
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 38M
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
                                                                    Serenity Hitler
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
                                                src="images/tv-show/tv-show08.jpg"
                                                alt="#"
                                            />
                                            <div className="info-top">
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> 27M
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        0hr : 35mins
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
                                                                    Yolanda Flounce
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