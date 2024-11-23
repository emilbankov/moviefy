export default function Movies() {
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
            <section className="space-pt bg-dark overflow-hidden">
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
                                                    src="images/movie/movie-01.jpg"
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
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
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
                                                    src="images/movie/movie-02.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 87M
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
                                                    src="images/movie/movie-03.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Comedy
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 24M
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
                                                    src="images/movie/movie-04.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
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
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
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
                                                    src="images/movie/movie-05.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Action
                                                    </a>
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
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
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
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 20M
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
                                                                        Beauty and the Beast
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
                                                    src="images/movie/movie-07.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 20M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 05mins
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
                                                                        Forrest Gump
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
                                                    src="images/movie/movie-01.jpg"
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
                                                                    <a
                                                                        className="title mt-0"
                                                                        href="movie-single.html"
                                                                    >
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
                                                    src="images/movie/movie-02.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 87M
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
                                                    src="images/movie/movie-03.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Comedy
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 24M
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
            <section className="space-sm-ptb bg-dark overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Blockbuster Movies</h2>
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
                                                    src="images/movie/movie-08.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 91K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        The Fellowship of the Ring
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
                                                    src="images/movie/movie-09.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Drama
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 15M
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
                                                                        Monty Python and The Holy Grail
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
                                                    src="images/movie/movie-10.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 74K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 20mins
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
                                                                        Wall-E
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
                                                    src="images/movie/movie-11.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Adventure
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 70M
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
                                                                        12 Angry Men
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
                                                    src="images/movie/movie-12.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 160M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        Ghostbusters
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
                                                    src="images/movie/movie-13.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Comedy
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 60M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        The Bridge on the River Kwai
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
                                                    src="images/movie/movie-14.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 90M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        Brokeback Mountain
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
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 91K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        The Fellowship of the Ring
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
                                                    src="images/movie/movie-09.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Drama
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 15M
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
                                                                        Monty Python and The Holy Grail
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
            Oscar Winners --&gt;
            <section className="space-sm-pb bg-dark overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Oscar Winners</h2>
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
                                                    src="images/movie/movie-07.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Action
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 10K
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
                                                                        Forrest Gump
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
                                                    src="images/movie/movie-02.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 41M
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
                                                                        To Kill a Mockingbird
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
                                                    src="images/movie/movie-05.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        History
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 99M
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
                                                                        It's a Wonderful Life
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
                                                    src="images/movie/movie-10.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 54M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        Raiders of the Lost Ark
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
                                                    src="images/movie/movie-14.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Drama
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 50M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            2hr : 57mins
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
                                                                        Brokeback Mountain
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
                                                    src="images/movie/movie-03.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 70M
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
                                                    <a className="tag" href="#">
                                                        Biography
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 50M
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
                                                                        Gone With the Wind
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
                                                    src="images/movie/movie-07.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Action
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 10K
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
                                                                        Forrest Gump
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
                                                    src="images/movie/movie-02.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 41M
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
                                                                        To Kill a Mockingbird
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
                                                    src="images/movie/movie-05.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        History
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 99M
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
                                                                        It's a Wonderful Life
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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
                                                        <a href="javascript:void(0)" className="like" />
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