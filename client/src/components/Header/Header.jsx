import { useEffect } from "react";

function Header() {
    return (
        <>
            <header className="header header-style-02 header-sticky">
                <nav className="navbar navbar-static-top navbar-expand-lg">
                    <div className="container main-header position-relative">
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse"><i className="fas fa-align-left"></i></button>
                        <a className="navbar-brand" href="index.html">
                            <img className="img-fluid" src="images/logo.png" alt="logo" />
                        </a>
                        <div className="navbar-collapse collapse justify-content-end justify-content-lg-center">
                            <ul className="nav navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">Home<i
                                            className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="index.html"><span>Home</span></a>
                                        </li>
                                        <li><a className="dropdown-item" href="most-popular.html"><span>Most Popular</span></a></li>
                                        <li><a className="dropdown-item" href="landing-page.html"><span>Landing Page</span></a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Movie<i
                                        className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="movies.html"><span>Movie</span></a></li>
                                        <li><a className="dropdown-item" href="movies-details.html"><span>Movie Single</span></a></li>
                                    </ul>
                                </li>
                                <li className=" nav-item dropdown">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Tv Shows<i
                                        className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="series.html"><span>Tv Show</span></a></li>
                                        <li><a className="dropdown-item" href="series-details.html"><span>Tv Show Single</span></a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Web Series<i
                                        className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="web-series.html"><span>Web Series</span></a></li>
                                        <li><a className="dropdown-item" href="web-series-single.html"><span>Web Series
                                            Single</span></a></li>
                                    </ul>
                                </li>
                                <li className="dropdown nav-item mega-menu ">
                                    <a className="nav-link" href="javascript:void(0)" data-bs-toggle="dropdown">Pages<i
                                        className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-md megamenu">
                                        <li>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <span className="nav-title">Pages</span>
                                                    <ul className="list-unstyled">
                                                        <li><a className="dropdown-item" href="about.html"><span>About
                                                            us</span></a></li>
                                                        <li><a className="dropdown-item" href="faqs.html"><span>Faqs</span></a></li>
                                                        <li><a className="dropdown-item"
                                                            href="pricing.html"><span>Pricing</span></a></li>
                                                        <li><a className="dropdown-item" href="blog.html"><span>Blog</span></a></li>
                                                        <li><a className="dropdown-item" href="blog-single.html"><span>Blog
                                                            Single</span></a></li>
                                                        <li><a className="dropdown-item" href="contact-us.html"><span>Contact
                                                            us</span></a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-6 mt-3 mt-sm-0">
                                                    <span className="nav-title">Authentication</span>
                                                    <ul className="list-unstyled">
                                                        <li><a className="dropdown-item" href="login.html"><span>Login</span></a>
                                                        </li>
                                                        <li><a className="dropdown-submenu" href="my-account.html"><span>My
                                                            Account</span></a></li>
                                                        <li><a className="dropdown-submenu" href="coming-soon.html"><span>Coming
                                                            Soon</span></a></li>
                                                        <li><a className="dropdown-submenu" href="404.html"><span>Error
                                                            404</span></a></li>
                                                        <li><a className="dropdown-submenu" href="privacy-policy.html"><span>Privacy
                                                            Policy</span></a></li>
                                                        <li><a className="dropdown-submenu"
                                                            href="terms-and-conditions.html"><span>T&C</span></a></li>
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
                                    <a href="javascript:void(0)" className="notifications dropdown-toggle" id="dropdownMenuButton2"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                                            className="fa-regular fa-bell"></i><span className="count">3</span></a>
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