import MetaTags from '../Meta Tags/MetaTags';

export default function Series() {
    return (
        <>
            <MetaTags
                title="Moviefy | Сериали"
                description="Разгледайте огромна колекция от сериали на Moviefy. Най-новите премиери, тенденциите, популярните и топ рейтинговите сериали на едно място."
                keywords="сериали, телевизия, най-нови сериали, популярни сериали, тенденции, топ рейтинг, сериали онлайн, гледане на сериали, каталог сериали"
            />
            <section className="tv-banner bg-secondary overflow-hidden">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div
                                className="owl-carousel owl-nav-center arrow-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={1}
                                data-xl-items={1}
                                data-lg-items={1}
                                data-md-items={1}
                                data-sm-items={1}
                                data-xs-items={1}
                                data-space={24}
                                data-autoheight="true"
                            >
                                <div className="item">
                                    <div
                                        className="tv-slider"
                                        style={{
                                            backgroundImage: "url(images/banner/tv-show/01.jpg)",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    >
                                        <div className="single-banner-info">
                                            <h1 className="title">Music Show</h1>
                                            <div className="imdb">
                                                <img
                                                    className="img-fluid"
                                                    src="images/imdb-logo.png"
                                                    alt="#"
                                                />
                                                <span>
                                                    <i className="fa-solid fa-star" />
                                                    4.9
                                                </span>
                                            </div>
                                            <h2 className="show-title">TV Show</h2>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div>
                                                    <a href="javascript:void(0)" className="add-icon">
                                                        Add to List
                                                    </a>
                                                </div>
                                                <a
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                    className="btn btn-light play-btn popup-youtube mx-4"
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
                                <div className="item">
                                    <div
                                        className="tv-slider"
                                        style={{
                                            backgroundImage: "url(images/banner/tv-show/02.jpg)",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    >
                                        <div className="single-banner-info">
                                            <h1 className="title">Casey Remoulade</h1>
                                            <div className="imdb">
                                                <img
                                                    className="img-fluid"
                                                    src="images/imdb-logo.png"
                                                    alt="#"
                                                />
                                                <span>
                                                    <i className="fa-solid fa-star" />
                                                    8.0
                                                </span>
                                            </div>
                                            <h2 className="show-title">TV Show</h2>
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                data-swiper-animation="fadeInUp"
                                                data-duration="1.0s"
                                                data-delay="1.0s"
                                            >
                                                <div>
                                                    <a href="javascript:void(0)" className="add-icon">
                                                        Add to List
                                                    </a>
                                                </div>
                                                <a
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                    className="btn btn-light play-btn popup-youtube mx-4"
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
                                <div className="item">
                                    <div
                                        className="tv-slider"
                                        style={{
                                            backgroundImage: "url(images/banner/tv-show/03.jpg)",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    >
                                        <div className="single-banner-info">
                                            <h1 className="title">Planet Earth</h1>
                                            <div className="imdb">
                                                <img
                                                    className="img-fluid"
                                                    src="images/imdb-logo.png"
                                                    alt="#"
                                                />
                                                <span>
                                                    <i className="fa-solid fa-star" />
                                                    7.2
                                                </span>
                                            </div>
                                            <h2 className="show-title">TV Show</h2>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div>
                                                    <a href="javascript:void(0)" className="add-icon">
                                                        Add to List
                                                    </a>
                                                </div>
                                                <a
                                                    href="https://www.youtube.com/watch?v=n_Cn8eFo7u8"
                                                    className="btn btn-light play-btn popup-youtube mx-4"
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
                </div>
            </section>
            <section className="space-pt overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Trending TV Show</h2>
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
                                                    src="images/tv-show/tv-show01.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Crime
                                                    </a>
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
                                                    src="images/tv-show/tv-show02.jpg"
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
                                                    src="images/tv-show/tv-show03.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Horror
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 25K
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
                                                    src="images/tv-show/tv-show04.jpg"
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
                                                    src="images/tv-show/tv-show05.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Drama
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 2M
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
                                                    src="images/tv-show/tv-show06.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 31K
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
                                                                        Hershey squirts
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
                                                    src="images/tv-show/tv-show07.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Crime
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 14M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 36mins
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
                                                                        Always has been.
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
                                                    src="images/tv-show/tv-show01.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Crime
                                                    </a>
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
                                                    src="images/tv-show/tv-show02.jpg"
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
            <section className="space-sm-ptb overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Blockbuster TV Show</h2>
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
                                                    src="images/tv-show/tv-show08.jpg"
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
                                                                        Scooter (Bill) vs Teddy
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
                                                    src="images/tv-show/tv-show09.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Horror
                                                    </a>
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
                                                            0hr : 31mins
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
                                                                        Never ever noticed this detail!
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
                                                    src="images/tv-show/tv-show10.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
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
                                                            0hr : 36mins
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
                                                                        That feeling when the series ends
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
                                                    src="images/tv-show/tv-show11.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Documentary
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
                                                                        Try to ruin Ted for me guys
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
                                                    src="images/tv-show/tv-show12.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 18K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 18mins
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
                                                                        Getting major Marshall vibes
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
                                                    src="images/tv-show/tv-show13.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Family
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 23M
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
                                                                        Reverend Bernie Disaster
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
                                                    src="images/tv-show/tv-show14.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 9M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 22mins
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
                                                    src="images/tv-show/tv-show08.jpg"
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
                                                                        Scooter (Bill) vs Teddy
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
                                                    src="images/tv-show/tv-show09.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Horror
                                                    </a>
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
                                                            0hr : 31mins
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
                                                                        Never ever noticed this detail!
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
            <section className="space-sm-pb overflow-hidden">
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
                                                    src="images/tv-show/tv-show15.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Action
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 4M
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
                                                                        Detective Toledo Brown
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
                                                    src="images/tv-show/tv-show16.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 19K
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
                                                                        Ichabod Knickerbocker
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
                                                    src="images/tv-show/tv-show17.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Horror
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 26M
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
                                                                        Casey Remoulade
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
                                                    src="images/tv-show/tv-show18.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 48M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 27mins
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
                                                                        Princess Heloise Decathlon
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
                                                    src="images/tv-show/tv-show19.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Animation
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 21K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 38mins
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
                                                                        Rexella Flipcup, Esquire
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
                                                    src="images/tv-show/tv-show20.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 7M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 31mins
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
                                                                        Beatrix Cumulonimbus
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
                                                    src="images/tv-show/tv-show21.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Drama
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 14M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 27mins
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
                                                                        Veronica Hammerhead
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
                                                    src="images/tv-show/tv-show15.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Action
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 4M
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
                                                                        Detective Toledo Brown
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
                                                    src="images/tv-show/tv-show16.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 19K
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
                                                                        Ichabod Knickerbocker
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
            <section className="space-pb overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Popular Horror TV Show</h2>
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
                                                    src="images/tv-show/tv-show22.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 45M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 22mins
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
                                                                        Jacqueline Dynasty
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
                                                    src="images/tv-show/tv-show23.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Biography
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 28K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 17mins
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
                                                                        Peggy Madagascar
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
                                                    src="images/tv-show/tv-show07.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 13M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 29mins
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
                                                                        Brittany Condor
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
                                                    src="images/tv-show/tv-show10.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Crime
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 34K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 27mins
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
                                                                        Detective Toledo Brown
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
                                                    src="images/tv-show/tv-show04.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 42M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 26mins
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
                                                                        Vincent van Gogh-Kart
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
                                                    src="images/tv-show/tv-show09.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Adventure
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 11M
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
                                                                        Lexington Frankfurter
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
                                                    src="images/tv-show/tv-show12.jpg"
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
                                                            0hr : 36mins
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
                                                                        Detective Toledo Brown
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
                                                    src="images/tv-show/tv-show22.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 45M
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 22mins
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
                                                                        Jacqueline Dynasty
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
                                                    src="images/tv-show/tv-show23.jpg"
                                                    alt="#"
                                                />
                                                <div className="info-top">
                                                    <a className="tag" href="#">
                                                        Biography
                                                    </a>
                                                    <div className="ms-auto">
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" /> 28K
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="movies-info">
                                                    <div className="content">
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            0hr : 17mins
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
                                                                        Peggy Madagascar
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

