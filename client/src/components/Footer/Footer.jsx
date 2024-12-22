import { Link, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function Footer() {
    const location = useLocation();
    const currentPath = location.pathname;

    const isBgSecondary = ['/about', '/contact-us', '/movies', '/series'].includes(currentPath);
    const isContainerFluid = ['/movies', '/series'].includes(currentPath);

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
    }, [location]);

    return (
        <>
            <footer className={`footer ${isBgSecondary ? 'bg-secondary' : 'bg-dark'}`}>
                <div className="min-footer">
                    <div className={isContainerFluid ? 'container-fluid' : 'container'}>
                        <div className="row align-items-center">
                            <div className="col-sm-3">
                                <Link className="footer-logo" to="/">
                                    <img className="img-fluid" src="/images/logo.png" alt="logo" />
                                </Link>
                            </div>
                            <div className="col-sm-9 text-sm-end mt-3 mt-sm-0">
                                <a href="#"><img className="img-fluid me-3 my-2" src="/images/google-pay.jpg" alt="#" /></a>
                                <a href="#"><img className="img-fluid my-2" src="/images/apps-store.jpg" alt="#" /></a>
                            </div>
                        </div>
                        <hr className="mt-4 mb-4 mb-md-5" />
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <h4 className="footer-title">You enjoy watching on TV</h4>
                                <p>There are basically six key areas to higher achievement. Some people will tell you there are
                                    four while others may tell you there are eight.</p>
                                <div className="social-icon mt-lg-4">
                                    <ul>
                                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-3 col mt-4 mt-md-5 mt-lg-0">
                                <div className="footer-link">
                                    <h4 className="footer-title">Explore More</h4>
                                    <ul className="list-unstyled mb-0">
                                        <li><Link to="/series">Shows</Link></li>
                                        <li><Link to="/movies">Movies</Link></li>
                                        <li><Link to="/sports">Sports</Link></li>
                                        <li><Link to="/live-tv">Live TV</Link></li>
                                        <li><Link to="/premium">Premium</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-3 col mt-4 mt-md-5 mt-lg-0">
                                <div className="footer-link">
                                    <h4 className="footer-title">Company</h4>
                                    <ul className="list-unstyled mb-0">
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/careers">Careers</Link></li>
                                        <li><Link to="/advertise">Advertise With Us</Link></li>
                                        <li><Link to="/contact">Contact US</Link></li>
                                        <li><Link to="/faq">FAQ</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 mt-4 mt-md-5 mt-lg-0">
                                <div className="footer-link">
                                    <h4 className="footer-title">Shows & Movies by Genres</h4>
                                    <div className="footer-menu d-flex">
                                        <ul className="list-unstyled mb-0">
                                            <li><Link to="/drama">Drama Shows</Link></li>
                                            <li><Link to="/comedy">Comedy Shows</Link></li>
                                            <li><Link to="/animation">Animation</Link></li>
                                            <li><Link to="/reality">Reality Shows</Link></li>
                                            <li><Link to="/romantic">Romantic Shows</Link></li>
                                        </ul>
                                        <ul className="list-unstyled mb-0">
                                            <li><Link to="/action">Action Movies</Link></li>
                                            <li><Link to="/drama">Drama Movies</Link></li>
                                            <li><Link to="/romantic">Romantic Movies</Link></li>
                                            <li><Link to="/comedy">Comedy Movies</Link></li>
                                            <li><Link to="/horror">Horror Movies</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="footer-hr" />
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="owl-carousel owl-nav-bottom-center client-logo" data-nav-arrow="false"
                                    data-items="6" data-md-items="4" data-sm-items="3" data-xs-items="3" data-xx-items="2"
                                    data-space="40" data-autoheight="true">
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/01.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/02.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/03.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/04.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/05.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/01.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/02.png" alt="" />
                                    </div>
                                    <div className="item">
                                        <img className="img-fluid" src="/images/client-logo/03.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom bg-black text-center">
                    <div className="container">
                        <div className="row copyright">
                            <div className="col-md-12">
                                <p className="mb-0"> &copy; Copyright <span id="copyright">
                                    {new Date().getFullYear()}
                                </span> <Link to="/"> 4K Star </Link> All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
