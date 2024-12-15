import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const [headerClass, setHeaderClass] = useState("header header-sticky");
    const [containerClass, setContainerClass] = useState("container main-header position-relative");

    useEffect(() => {
        const { pathname } = location;

        let baseHeaderClass = "header header-sticky";
        let baseContainerClass = "container main-header position-relative";

        if (pathname === "/") {
            baseHeaderClass += " header-style-01";
        } else if (pathname === "/most-popular") {
            baseHeaderClass += " header-style-02";
        } else if (pathname === "/movie-details" || pathname === "/series-details") {
            baseHeaderClass += " header-transparent";
        } else if (pathname === "/movies" || pathname === "/series") {
            baseContainerClass = "container-fluid main-header position-relative";
        }

        setHeaderClass(baseHeaderClass);
        setContainerClass(baseContainerClass);
    }, [location]);

    return (
        <>
            <header className={headerClass}>
                <nav className="navbar navbar-static-top navbar-expand-lg">
                    <div className={containerClass}>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"><i className="fas fa-align-left"></i></button>
                        <Link className="navbar-brand" to="/"><img className="img-fluid" src="images/logo.png" alt="logo" /></Link>
                        <div className="navbar-collapse collapse justify-content-end justify-content-lg-center">
                            <ul className="nav navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home<i className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/"><span>Home</span></Link></li>
                                        <li><Link className="dropdown-item" to="/most-popular"><span>Most Popular</span></Link></li>
                                        <li><Link className="dropdown-item" to="/landing-page"><span>Landing Page</span></Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Movie<i className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/movies"><span>Movie</span></Link></li>
                                        <li><Link className="dropdown-item" to="/movie-details"><span>Movie Single</span></Link></li>
                                    </ul>
                                </li>
                                <li className=" nav-item dropdown">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Tv Shows<i className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/series"><span>Tv Show</span></Link></li>
                                        <li><Link className="dropdown-item" to="/series-details"><span>Tv Show Single</span></Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Web Series<i className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/web-series"><span>Web Series</span></Link></li>
                                        <li><Link className="dropdown-item" to="/web-series-single"><span>Web Series Single</span></Link></li>
                                    </ul>
                                </li>
                                <li className="dropdown nav-item mega-menu ">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Pages<i className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-md megamenu">
                                        <li>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <span className="nav-title">Pages</span>
                                                    <ul className="list-unstyled">
                                                        <li><Link className="dropdown-item" to="/about"><span>About us</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/faqs"><span>Faqs</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/pricing"><span>Pricing</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/blog"><span>Blog</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/blog-single"><span>Blog Single</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/contact"><span>Contact us</span></Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-6 mt-3 mt-sm-0">
                                                    <span className="nav-title">Authentication</span>
                                                    <ul className="list-unstyled">
                                                        <li><Link className="dropdown-item" to="/login-register"><span>Login</span></Link></li>
                                                        <li><Link className="dropdown-submenu" to="/account"><span>My Account</span></Link></li>
                                                        <li><Link className="dropdown-submenu" to="/coming-soon"><span>Coming Soon</span></Link></li>
                                                        <li><Link className="dropdown-submenu" to="/error"><span>Error 404</span></Link></li>
                                                        <li><Link className="dropdown-submenu" to="/privacy-policy"><span>Privacy Policy</span></Link></li>
                                                        <li><Link className="dropdown-submenu" to="/terms-and-conditions"><span>T&C</span></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="add-listing">
                            <ul className="list-unstyled mb-0">
                                <li className="search"><a href="#search"><i className="fa fa-search"></i></a></li>
                                <li><a href="my-account.html"><i className="fa-regular fa-user"></i></a></li>
                                <li className="dropdown">
                                    <a href="javascript:void(0)" className="notifications dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa-regular fa-bell"></i>
                                        <span className="count">3</span>
                                    </a>
                                    <div className="dropdown-menu mt-0 notifications-menu" aria-labelledby="dropdownMenuButton2">
                                        <h6 className="notifications-title">Notifications</h6>
                                        <div className="notifications-list">
                                            <a href="#" className="notifications-info">
                                                <div className="notifications-author">
                                                    <img className="img-fluid" src="images/avatar/01.jpg" alt="" />
                                                </div>
                                                <div className="notifications-details">
                                                    <p>sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                </div>
                                                <div className="movie-img">
                                                    <img className="img-fluid" src="images/movie/single-categories/17.jpg" alt="" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="notifications-list">
                                            <a href="#" className="notifications-info">
                                                <div className="notifications-author">
                                                    <img className="img-fluid" src="images/avatar/02.jpg" alt="" />
                                                </div>
                                                <div className="notifications-details">
                                                    <p>sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                </div>
                                                <div className="movie-img">
                                                    <img className="img-fluid" src="images/movie/single-categories/18.jpg" alt="" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="notifications-list">
                                            <a href="#" className="notifications-info">
                                                <div className="notifications-author">
                                                    <img className="img-fluid" src="images/avatar/03.jpg" alt="" />
                                                </div>
                                                <div className="notifications-details">
                                                    <p>sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                </div>
                                                <div className="movie-img">
                                                    <img className="img-fluid" src="images/movie/single-categories/19.jpg" alt="" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;