import MetaTags from '../Meta Tags/MetaTags';

export default function Pricing() {
    return (
        <>
            <MetaTags
                title="Moviefy | Цени и планове"
                description="Изберете вашия стрийминг план на Moviefy. Разгледайте нашите цени и планове за достъп до огромна колекция от филми и сериали."
                keywords="цени, планове, стрийминг, абонамент, Moviefy, премиум, достъп, филми, сериали"
            />
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">Pricing Plans</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-dark space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Choose Your Streaming Plan</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-4 mb-4 mb-lg-0 bg-secondary">
                            <div className="pricing">
                                <div className="pricing-header pricing-titel-header">
                                    <nav className="pricing-tab">
                                        <span className="monthly-tab">Monthly Plans</span>
                                        <span className="pricing-tab-switcher" />
                                        <span className="yearly-tab">Yearly Plans</span>
                                    </nav>
                                </div>
                                <div className="pricing-body d-none d-lg-block">
                                    <ul className="list-unstyled pricing-titel-list">
                                        <li>HD available</li>
                                        <li>Ultra HD available</li>
                                        <li>Unlimited movies, TV shows</li>
                                        <li>Watch on your TV, laptop, phone, or tablet</li>
                                    </ul>
                                </div>
                                <div className="pricing-footer pricing-titel-footer d-none d-lg-block">
                                    <a href="#" className="btn btn-dark">
                                        Continue With Premium <i className="fa-solid fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row g-0">
                                <div className="col-lg-4 mb-4 mb-lg-0">
                                    <div className="pricing">
                                        <div className="pricing-header">
                                            <h3 className="pricing-title">Basic</h3>
                                            <div className="pricing-price">
                                                <div className="yearly-price">
                                                    <span>$300</span>/year
                                                </div>
                                                <div className="monthly-price">
                                                    <span>$125</span>/month
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pricing-body">
                                            <ul className="list-unstyled pricing-list">
                                                <li data-label="HD available">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                                <li data-label="Ultra HD available">
                                                    <i className="fa-solid fa-circle-xmark" />
                                                </li>
                                                <li data-label="Unlimited movies, TV shows">
                                                    <i className="fa-solid fa-circle-xmark" />
                                                </li>
                                                <li data-label="Unlimited mobile games">
                                                    <i className="fa-solid fa-circle-xmark" />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="pricing-footer">
                                            <a href="#" className="btn">
                                                Select Plan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-4 mb-lg-0">
                                    <div className="pricing active">
                                        <div className="pricing-header">
                                            <h3 className="pricing-title">Standard (No Ads)</h3>
                                            <div className="pricing-price">
                                                <div className="yearly-price">
                                                    <span>$750</span>/year
                                                </div>
                                                <div className="monthly-price">
                                                    <span>$250</span>/month
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pricing-body">
                                            <ul className="list-unstyled pricing-list">
                                                <li data-label="HD available">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                                <li data-label="Ultra HD available">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                                <li data-label="Unlimited movies, TV shows">
                                                    <i className="fa-solid fa-circle-xmark" />
                                                </li>
                                                <li data-label="Unlimited mobile games">
                                                    <i className="fa-solid fa-circle-xmark" />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="pricing-footer">
                                            <a href="#" className="btn">
                                                Select Plan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="pricing">
                                        <div className="pricing-header">
                                            <h3 className="pricing-title">Premium + Live TV</h3>
                                            <div className="pricing-price">
                                                <div className="yearly-price">
                                                    <span>$1000</span>/year
                                                </div>
                                                <div className="monthly-price">
                                                    <span>$300</span>/month
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pricing-body">
                                            <ul className="list-unstyled pricing-list">
                                                <li data-label="HD available">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                                <li data-label="Ultra HD available">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                                <li data-label="Unlimited movies, TV shows">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                                <li data-label="Unlimited mobile games">
                                                    <i className="fa-solid fa-circle-check" />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="pricing-footer">
                                            <a href="#" className="btn">
                                                Select Plan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb bg-secondary overflow-hidden">
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