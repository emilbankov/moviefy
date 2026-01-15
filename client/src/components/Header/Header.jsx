import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationContext";

const Header = ({ onSearchOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { notifications, clearAllNotifications, clearNotification } = useNotifications();
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
        } else if (pathname.includes("/movie/details/") || pathname.includes("/series/details/")) {
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
                        <Link className="navbar-brand" to="/"><img className="img-fluid" src="/images/logo.png" alt="logo" /></Link>
                        <div className="navbar-collapse collapse justify-content-end justify-content-lg-center">
                            <ul className="nav navbar-nav">
                                <li className="nav-item dropdwn">
                                    <Link className="nav-link" to="/"><span>Home</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/most-popular"><span>Most Popular</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/movies"><span>Movies</span></Link>
                                </li>
                                <li className="dropdown nav-item">
                                    <a className="nav-link" href="#" data-bs-toggle="dropdown">
                                        Series<i className="fas fa-chevron-down fa-xs"></i>
                                    </a>
                                    <ul className="dropdown-menu series-dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/catalog?media=series&category=latest">
                                                <span>All Series</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/catalog?media=series&category=latest&types=scripted">
                                                <span>Scripted</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/catalog?media=series&category=latest&types=miniseries">
                                                <span>Mini-Series</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/catalog?media=series&category=latest&types=reality">
                                                <span>Reality</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/catalog?media=series&category=latest&types=documentary">
                                                <span>Documentary</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown nav-item mega-menu ">
                                    <a className="nav-link" href="#" data-bs-toggle="dropdown">Pages<i className="fas fa-chevron-down fa-xs"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-md megamenu">
                                        <li>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <span className="nav-title">Pages</span>
                                                    <ul className="list-unstyled">
                                                        <li><Link className="dropdown-item" to="/about"><span>About us</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/pricing"><span>Pricing</span></Link></li>
                                                        <li><Link className="dropdown-item" to="/contact"><span>Contact us</span></Link></li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-6 mt-3 mt-sm-0">
                                                    <span className="nav-title">Authentication</span>
                                                    <ul className="list-unstyled">
                                                        <li><Link className="dropdown-item" to="/login-register"><span>Login</span></Link></li>
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
                                <li className="search"><a href="#search" onClick={(e) => { e.preventDefault(); onSearchOpen(); }}><i className="fa fa-search"></i></a></li>
                                <li><Link to="/account"><i className="fa-regular fa-user"></i></Link></li>
                                <li className="dropdown">
                                    <a
                                        href="#"
                                        className="notifications dropdown-toggle"
                                        id="dropdownMenuButton2"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa-regular fa-bell"></i>
                                        {notifications.length > 0 && (
                                            <span className="count">{notifications.length}</span>
                                        )}
                                    </a>
                                    <div className="dropdown-menu mt-0 notifications-menu" aria-labelledby="dropdownMenuButton2">
                                        <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-1">
                                            <h6 className="notifications-title mb-0">Notifications</h6>
                                            {notifications.length > 0 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-0 text-muted"
                                                    style={{ fontSize: '12px' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        clearAllNotifications();
                                                    }}
                                                >
                                                    Clear all
                                                </button>
                                            )}
                                        </div>
                                        {notifications.length === 0 ? (
                                            <div className="px-3 pb-2">
                                                <p className="mb-0 text-muted" style={{ fontSize: '13px' }}>
                                                    No notifications yet.
                                                </p>
                                            </div>
                                        ) : (
                                            notifications.slice(0, 5).map((n) => (
                                                <div 
                                                    className="notifications-list" 
                                                    key={n.id}
                                                    style={{ 
                                                        cursor: 'pointer',
                                                        position: 'relative',
                                                        transition: 'background-color 0.2s ease'
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        clearNotification(n.id);
                                                        navigate(`/favorites?favorites=${n.mediaType === 'series' ? 'series' : 'movies'}`);
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'rgba(246, 190, 0, 0.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <div className="notifications-info">
                                                        <div className="notifications-author" style={{ display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                            <img
                                                                className="img-fluid"
                                                                src={n.imageUrl || '/images/no-image.jpg'}
                                                                alt={n.title}
                                                                onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                                style={{ borderRadius: '0' }}
                                                            />
                                                        </div>
                                                        <div className="notifications-details">
                                                            <p className="mb-1">
                                                                <strong>{n.title}</strong>
                                                            </p>
                                                            <p className="mb-0" style={{ fontSize: '12px' }}>
                                                                {n.subtitle}
                                                            </p>
                                                            <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>
                                                                {n.meta}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-link p-0"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            right: '8px',
                                                            color: '#f6be00',
                                                            fontSize: '16px',
                                                            lineHeight: '1',
                                                            zIndex: 10
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            clearNotification(n.id);
                                                        }}
                                                        title="Clear notification"
                                                    >
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            ))
                                        )}
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