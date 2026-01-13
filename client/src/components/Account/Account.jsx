import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthProvider';
import { getUserProfile } from '../../services/authService';
import Loader from '../Loader/Loader';

export default function Account() {
    const { user, logoutHandler } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form state for edit profile
    const [editForm, setEditForm] = useState({
        email: '',
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getUserProfile();
                setProfile(profileData);
                console.log(profileData);

            } catch (error) {
                console.error('Failed to fetch profile:', error);
                // Fallback to AuthContext user data if profile fetch fails
                setProfile(user);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [user]);

    // Populate form when profile data is available
    useEffect(() => {
        if (profile || user) {
            const userData = profile?.data || user?.data;
            setEditForm({
                email: userData?.email || '',
                first_name: userData?.first_name || '',
                last_name: userData?.last_name || ''
            });
        }
    }, [profile, user]);

    // Also populate form immediately if we have user data from AuthContext
    useEffect(() => {
        if (user && !profile) {
            setEditForm({
                email: user?.data.email || '',
                first_name: user?.data.first_name || '',
                last_name: user?.data.last_name || ''
            });
        }
    }, [user, profile]);

    // Handle form input changes
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0a0a0a',
                minHeight: '100vh'
            }}>
                <Loader />
            </div>
        );
    }

    return (
        <>
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">My Account</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="my-account">
                                <div className="row">
                                    <div className="col-xl-3 col-md-4">
                                        <div className="profile-side-bar">
                                            <div className="profile-info">
                                                <div className="profile-avatar">
                                                    <img
                                                        className="img-fluid"
                                                        src="images/avatar/profile-avatar.jpg"
                                                        alt=""
                                                    />
                                                    <i className="fas fa-pencil-alt" />
                                                </div>
                                                <h5 className="title">{profile?.data?.first_name || user?.data?.first_name} {profile?.data?.last_name || user?.data?.last_name}</h5>
                                                <span>{profile?.data?.email || user?.data?.email}</span>
                                            </div>
                                            <div className="profile-tabs tabs">
                                                <ul
                                                    className="nav nav-tabs nav-pills mb-3 flex-column"
                                                    id="pills-tab"
                                                    role="tablist"
                                                >
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className="nav-link active"
                                                            id="pills-subscriptions"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-subscriptions-tab"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="pills-subscriptions-tab"
                                                            aria-selected="true"
                                                        >
                                                            <i className="fa-solid fa-sliders" />
                                                            Subscriptions
                                                        </button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className="nav-link"
                                                            id="pills-edit-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-edit"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="pills-edit"
                                                            aria-selected="false"
                                                        >
                                                            <i className="fa-regular fa-rectangle-list" /> Edit
                                                            Profile
                                                        </button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className="nav-link"
                                                            id="pills-favorites-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-favorites"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="pills-favorites"
                                                            aria-selected="false"
                                                        >
                                                            <i className="fa-solid fa-heart" /> Favorites
                                                        </button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className="nav-link"
                                                            id="pills-payment-tab"
                                                            data-bs-toggle="pill"
                                                            data-bs-target="#pills-payment"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="pills-payment"
                                                            aria-selected="false"
                                                        >
                                                            <i className="fa-regular fa-bookmark" /> Payment
                                                        </button>
                                                    </li>
                                                </ul>
                                                <button
                                                    onClick={logoutHandler}
                                                    className="btn btn-link text-danger"
                                                    style={{ border: 'none', background: 'none', padding: 0 }}
                                                >
                                                    <i className="fa-solid fa-arrow-right-from-bracket" />
                                                    Log Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-md-8 border-left">
                                        <div
                                            className="subscriptions-info tab-content"
                                            id="pills-tabContent"
                                        >
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-subscriptions-tab"
                                                role="tabpanel"
                                                aria-labelledby="pills-subscriptions"
                                                tabIndex={0}
                                            >
                                                <div className="section-title">
                                                    <h4>Subscriptions</h4>
                                                </div>
                                                <table className="subscriptions-info-table table table-dark table-responsive">
                                                    <tbody>
                                                        <tr className="table-active">
                                                            <td>Subscription Plan</td>
                                                            <td>Free</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Status</td>
                                                            <td>Active</td>
                                                        </tr>
                                                        <tr className="table-active">
                                                            <td>Member Since</td>
                                                            <td>{profile?.data?.created_at ? new Date(profile.data.created_at).toLocaleDateString() : 'N/A'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Favorite Movies</td>
                                                            <td>{profile?.data?.favorite_movies?.length || 0}</td>
                                                        </tr>
                                                        <tr className="table-active">
                                                            <td>Favorite TV Series</td>
                                                            <td>{profile?.data?.favorite_tv_series?.length || 0}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Actions</td>
                                                            <td>
                                                                <a className="me-3" href="#">
                                                                    Upgrade
                                                                </a>{" "}
                                                                <a href="#">Manage</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                className="tab-pane fade edit-form"
                                                id="pills-edit"
                                                role="tabpanel"
                                                aria-labelledby="pills-edit-tab"
                                                tabIndex={0}
                                            >
                                                <div className="section-title">
                                                    <h4>Edit Profile</h4>
                                                </div>
                                                <form className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Email Address:</label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Email Address"
                                                            value={editForm.email}
                                                            onChange={handleEditFormChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Member Since:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={profile?.data?.created_at ? new Date(profile.data.created_at).toLocaleDateString() : 'N/A'}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">First Name:</label>
                                                        <input
                                                            type="text"
                                                            name="first_name"
                                                            className="form-control"
                                                            placeholder="First name"
                                                            value={editForm.first_name}
                                                            onChange={handleEditFormChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Last Name:</label>
                                                        <input
                                                            type="text"
                                                            name="last_name"
                                                            className="form-control"
                                                            placeholder="Last name"
                                                            value={editForm.last_name}
                                                            onChange={handleEditFormChange}
                                                        />
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <button type="submit" className="btn btn-primary me-2">
                                                            Save
                                                        </button>
                                                        <button type="submit" className="btn btn-light">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="pills-favorites"
                                                role="tabpanel"
                                                aria-labelledby="pills-favorites-tab"
                                                tabIndex={0}
                                            >
                                                <div className="section-title">
                                                    <h4>My Favorites</h4>
                                                </div>
                                                <div className="favorites-content">
                                                    <div className="mb-4">
                                                        <h5 className="text-white mb-3">
                                                            <i className="fa-solid fa-film me-2"></i>
                                                            Favorite Movies ({profile?.data?.favorite_movies?.length || 0})
                                                        </h5>
                                                        {profile?.data?.favorite_movies?.length > 0 ? (
                                                            <>
                                                                <div className="row">
                                                                    {profile.data.favorite_movies.slice(0, 8).map((movie, index) => (
                                                                        <div key={movie.id || index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
                                                                            <Link to={`/movie/details/${movie.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                                <div className="movies-categories br-20">
                                                                                    <div className="movies-img">
                                                                                        <img
                                                                                            className="img-fluid"
                                                                                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'images/movie/movie-01.jpg'}
                                                                                            alt={movie.title || movie.name}
                                                                                        />
                                                                                        <div className="info-top">
                                                                                            {movie.genre && (
                                                                                                <a className="tag" href="#">{movie.genre}</a>
                                                                                            )}
                                                                                            <div className="ms-auto">
                                                                                                <a className="views" href="#" onClick={e => e.preventDefault()}>
                                                                                                    <i className="fa-solid fa-star" /> {movie.vote_average.toFixed(1)}
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="movies-info">
                                                                                            <div className="content">
                                                                                                <span className="time" style={{ fontSize: '13px' }}>
                                                                                                    <span className="year">{movie.year}</span>{" "}
                                                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                                                    {Math.floor(movie.runtime / 60)}hr : {movie.runtime % 60}min
                                                                                                </span>
                                                                                                <div className="info-content">
                                                                                                    <div className="movies-title">
                                                                                                        <a
                                                                                                            className="play-btn popup-youtube"
                                                                                                            href={movie.trailer ? `https://www.youtube.com/watch?v=${movie.trailer}` : "#"}
                                                                                                            onClick={(e) => e.stopPropagation()}
                                                                                                            target="_blank"
                                                                                                            rel="noopener noreferrer"
                                                                                                            style={{ marginRight: '10px !important' }}
                                                                                                        >
                                                                                                            <i className="fa-solid fa-play" />
                                                                                                        </a>
                                                                                                        <h5>
                                                                                                            <span className="title mt-0" style={{ fontSize: '16px' }}>
                                                                                                                {movie.title}
                                                                                                            </span>
                                                                                                        </h5>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {profile.data.favorite_movies.length > 8 && (
                                                                    <div className="text-center mt-3">
                                                                        <button className="btn btn-primary">
                                                                            View All Favorite Movies ({profile.data.favorite_movies.length})
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <p className="text-muted">No favorite movies yet.</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h5 className="text-white mb-3">
                                                            <i className="fa-solid fa-tv me-2"></i>
                                                            Favorite TV Series ({profile?.data?.favorite_tv_series?.length || 0})
                                                        </h5>
                                                        {profile?.data?.favorite_tv_series?.length > 0 ? (
                                                            <>
                                                                <div className="row">
                                                                    {profile.data.favorite_tv_series.slice(0, 8).map((series, index) => (
                                                                        <div key={series.id || index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
                                                                            <Link to={`/series/details/${series.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                                <div className="movies-categories br-20">
                                                                                    <div className="movies-img">
                                                                                        <img
                                                                                            className="img-fluid"
                                                                                            src={series.poster_path ? `https://image.tmdb.org/t/p/w500/${series.poster_path}` : 'images/movie/movie-01.jpg'}
                                                                                            alt={series.title || series.name}
                                                                                        />
                                                                                        <div className="info-top">
                                                                                            {series.genre && (
                                                                                                <a className="tag" href="#">{series.genre}</a>
                                                                                            )}
                                                                                            <div className="ms-auto">
                                                                                                <a className="views" href="#" onClick={e => e.preventDefault()}>
                                                                                                    <i className="fa-solid fa-star" /> {series.vote_average.toFixed(1)}
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="movies-info">
                                                                                            <div className="content">
                                                                                                <span className="time" style={{ fontSize: '13px' }}>
                                                                                                    <span className="year">{series.year}</span>{" "}
                                                                                                    <i className="far fa-clock me-2" style={{ marginLeft: "8px" }} />
                                                                                                    {Math.floor(series.runtime / 60)}hr : {series.runtime % 60}min
                                                                                                </span>
                                                                                                <div className="info-content">
                                                                                                    <div className="movies-title">
                                                                                                        <a
                                                                                                            className="play-btn popup-youtube"
                                                                                                            href={series.trailer ? `https://www.youtube.com/watch?v=${series.trailer}` : "#"}
                                                                                                            onClick={(e) => e.stopPropagation()}
                                                                                                            target="_blank"
                                                                                                            rel="noopener noreferrer"
                                                                                                            style={{ marginRight: '10px !important' }}
                                                                                                        >
                                                                                                            <i className="fa-solid fa-play" />
                                                                                                        </a>
                                                                                                        <h5>
                                                                                                            <span className="title mt-0" style={{ fontSize: '16px' }}>
                                                                                                                {series.title}
                                                                                                            </span>
                                                                                                        </h5>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {profile.data.favorite_tv_series.length > 8 && (
                                                                    <div className="text-center mt-3">
                                                                        <button className="btn btn-primary">
                                                                            View All Favorite TV Series ({profile.data.favorite_tv_series.length})
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <p className="text-muted">No favorite TV series yet.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="pills-payment"
                                                role="tabpanel"
                                                aria-labelledby="pills-payment-tab"
                                                tabIndex={0}
                                            >
                                                <div className="section-title">
                                                    <h4>Payment Options</h4>
                                                </div>
                                                <div className="payment-info">
                                                    <div className="payment-header">
                                                        <h6>Credit Card and Debit Card</h6>
                                                        <div className="payment-card">
                                                            <span className="text-muted">Credit/Debit Cards Accepted</span>
                                                        </div>
                                                    </div>
                                                    <form className="row">
                                                        <div className="col-lg-6 mb-3">
                                                            <label className="form-label">
                                                                Card Holder Name:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                maxLength={19}
                                                                placeholder="Card Holder Name"
                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                            <label className="form-label">Card Number:</label>
                                                            <input
                                                                type="Number"
                                                                className="form-control"
                                                                placeholder="Card Number"
                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                            <label className="form-label">Expiration Date:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="MM/YY"
                                                            />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                            <label className="form-label">CVV:</label>
                                                            <input
                                                                type="Number"
                                                                className="form-control"
                                                                placeholder="CVV"
                                                            />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button type="submit" className="btn btn-primary">
                                                                Pay Now
                                                            </button>
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
                </div>
            </section>
        </>
    )
}