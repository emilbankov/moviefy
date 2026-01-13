import MetaTags from '../Meta Tags/MetaTags';

export default function About() {
    return (
        <>
            <MetaTags
                title="Moviefy | За нас"
                description="Научете повече за Moviefy - вашият водещ портал за филми и сериали. Открийте нашата мисия и визия за предоставяне на най-доброто развлекателно съдържание."
                keywords="за нас, Moviefy, филми, сериали, онлайн платформа, развлечения, информация, мисия, визия"
            />
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">ABOUT US</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-secondary space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="about-section">
                                <div className="about-img">
                                    <img className="img-fluid" src="images/bg/about-bg.jpg" alt="" />
                                </div>
                                <div className="about-info">
                                    <h4 className="about-title">See Videos How It Works</h4>
                                    <p className="about-content">
                                        Commitment is something that comes from understanding that
                                        everything has its price and then having the willingness to pay
                                        that price. This is important because nobody wants to put
                                        significant effort into something, only to find out after the
                                        fact that the price was too high. Try to visualize and then plan
                                        for, every possible setback. doesn’t support the vision then
                                        change it!
                                    </p>
                                    <div className="about-counter">
                                        <div className="counter counter-02">
                                            <div className="counter-content">
                                                <div className="timers">
                                                    <span className="timer" data-to={120} data-speed={10000}>
                                                        120
                                                    </span>
                                                    <span>K</span>
                                                    <span className="plus">+</span>
                                                </div>
                                                <label>Active Customer</label>
                                            </div>
                                        </div>
                                        <div className="counter counter-02 border-0 me-0">
                                            <div className="counter-content">
                                                <div className="timers">
                                                    <span className="timer" data-to={50} data-speed={10000}>
                                                        50
                                                    </span>
                                                    <span>M</span>
                                                    <span className="plus">+</span>
                                                </div>
                                                <label>Users</label>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" className="btn btn-primary">
                                        Subscribe Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="space-ptb bg-holder bg-overlay-secondary-95"
                style={{ backgroundImage: "url(images/bg/footer-bg.jpg)" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">What they’re talking about Moviefy</h2>
                                <a href="#" className="btn-link">
                                    View All
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-2 pt-lg-4">
                        <div className="col-md-12">
                            <div
                                className="owl-carousel owl-nav-center"
                                data-nav-dots="false"
                                data-nav-arrow="true"
                                data-items={3}
                                data-xl-items={3}
                                data-lg-items={3}
                                data-md-items={2}
                                data-sm-items={2}
                                data-xs-items={1}
                                data-space={30}
                                data-autoheight="true"
                            >
                                <div className="item">
                                    <div className="testimonial">
                                        <span className="testimonial-quote">
                                            <img
                                                className="img-fluid"
                                                src="images/icon/quote.png"
                                                alt=""
                                            />
                                        </span>
                                        <div className="testimonial-ratings">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                        </div>
                                        <div className="testimonial-content">
                                            Thanks to Potenza, we've just launched our 5th website! I
                                            would gladly pay over 600 dollars for Potenza. Keep up the
                                            excellent work. Really good.
                                        </div>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar">
                                                <img
                                                    className="img-fluid"
                                                    src="images/avatar/01.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="testimonial-name">
                                                <span className="author-tittle">Sara Lisbon</span>
                                                <span className="">- Director</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial">
                                        <span className="testimonial-quote">
                                            <img
                                                className="img-fluid"
                                                src="images/icon/quote.png"
                                                alt=""
                                            />
                                        </span>
                                        <div className="testimonial-ratings">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                        </div>
                                        <div className="testimonial-content">
                                            I love your system. Nice work on your Potenza. Great job, I
                                            will definitely be ordering again! I would like to personally
                                            thank you for your outstanding product.
                                        </div>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar">
                                                <img
                                                    className="img-fluid"
                                                    src="images/avatar/02.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="testimonial-name">
                                                <h6 className="author-tittle">Alice Williams</h6>
                                                <span className="">- Producer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial">
                                        <span className="testimonial-quote">
                                            <img
                                                className="img-fluid"
                                                src="images/icon/quote.png"
                                                alt=""
                                            />
                                        </span>
                                        <div className="testimonial-ratings">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                        </div>
                                        <div className="testimonial-content">
                                            Just what I was looking for. I will let my mum know about
                                            this, she could really make use of Potenza! Since I invested
                                            in Potenza I made over 100,000 dollars profits
                                        </div>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar">
                                                <img
                                                    className="img-fluid"
                                                    src="images/avatar/03.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="testimonial-name">
                                                <h6 className="author-tittle">Felica Queen</h6>
                                                <span className="">- Actor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial">
                                        <span className="testimonial-quote">
                                            <img
                                                className="img-fluid"
                                                src="images/icon/quote.png"
                                                alt=""
                                            />
                                        </span>
                                        <div className="testimonial-ratings">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                        </div>
                                        <div className="testimonial-content">
                                            I would gladly pay over 600 dollars for Potenza. Since I
                                            invested in Potenza I made over 100,000 dollars profits. Your
                                            company is truly upstanding and is behind its product 100%.
                                        </div>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar">
                                                <img
                                                    className="img-fluid"
                                                    src="images/avatar/04.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="testimonial-name">
                                                <h6 className="author-tittle">Harry Russell</h6>
                                                <span className="">- Writers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-dark space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="counter">
                                <div className="counter-icon videos">
                                    <img className="img-fluid" src="images/counter/01.png" alt="" />
                                </div>
                                <div className="counter-content">
                                    <div className="timers">
                                        <span className="timer" data-to={100} data-speed={10000}>
                                            100
                                        </span>
                                        <span className="plus">+</span>
                                        <span>M</span>
                                    </div>
                                    <label>Total Videos</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="counter">
                                <div className="counter-icon subscribers">
                                    <img className="img-fluid" src="images/counter/02.png" alt="" />
                                </div>
                                <div className="counter-content">
                                    <div className="timers">
                                        <span className="timer" data-to={185} data-speed={10000}>
                                            185
                                        </span>
                                        <span className="plus">+</span>
                                        <span>M</span>
                                    </div>
                                    <label>Subscribers</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="counter">
                                <div className="counter-icon awards">
                                    <img className="img-fluid" src="images/counter/03.png" alt="" />
                                </div>
                                <div className="counter-content">
                                    <div className="timers">
                                        <span className="timer awards" data-to={150} data-speed={10000}>
                                            150
                                        </span>
                                        <span className="plus">+</span>
                                    </div>
                                    <label>Awards</label>
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
                                <h2 className="title">Meet Our Team</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 col-sm-6 mb-4 mb-md-0">
                            <div className="team">
                                <div className="team-img">
                                    <img className="img-fluid" src="images/team/01.jpg" alt="" />
                                    <div className="team-info">
                                        <h5 className="title">
                                            <a href="#">Ricardo Marshall</a>
                                        </h5>
                                        <a className="team-designation" href="#">
                                            Digital Marketing
                                        </a>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-facebook-f" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-twitter" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-instagram" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-youtube" />{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4 mb-md-0">
                            <div className="team">
                                <div className="team-img">
                                    <img className="img-fluid" src="images/team/02.jpg" alt="" />
                                    <div className="team-info">
                                        <h5 className="title">
                                            <a href="#">Ricardo Marshall</a>
                                        </h5>
                                        <a className="team-designation" href="#">
                                            Digital Marketing
                                        </a>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-facebook-f" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-twitter" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-instagram" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-youtube" />{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="team">
                                <div className="team-img">
                                    <img className="img-fluid" src="images/team/03.jpg" alt="" />
                                    <div className="team-info">
                                        <h5 className="title">
                                            <a href="#">Ricardo Marshall</a>
                                        </h5>
                                        <a className="team-designation" href="#">
                                            Digital Marketing
                                        </a>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-facebook-f" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-twitter" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-instagram" />{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    {" "}
                                                    <i className="fab fa-youtube" />{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb bg-dark overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Your Apps</h2>
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
                                    data-items={9}
                                    data-xl-items={9}
                                    data-lg-items={7}
                                    data-md-items={5}
                                    data-sm-items={4}
                                    data-xs-items={3}
                                    data-xx-items={2}
                                    data-space={30}
                                    data-autoheight="true"
                                >
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/01.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/02.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/03.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/04.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/05.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/06.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/07.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/08.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/09.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/10.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="images/apps/11.png" alt="" />
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