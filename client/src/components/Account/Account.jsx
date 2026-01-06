import { useContext } from 'react';
import AuthContext from '../../contexts/AuthProvider';

export default function Account() {
    const { user, logoutHandler } = useContext(AuthContext);

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
                                                <h5 className="title">{user?.first_name} {user?.last_name}</h5>
                                                <span>{user?.email}</span>
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
                                                            <td>Start Date</td>
                                                            <td>September 01, 2022</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Expiration Date</td>
                                                            <td>September 30, 2022</td>
                                                        </tr>
                                                        <tr className="table-active">
                                                            <td>Actions</td>
                                                            <td>
                                                                <a className="me-3" href="#">
                                                                    Change
                                                                </a>{" "}
                                                                <a href="#">Cancel</a>
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
                                                        <label className="form-label">User Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="User name"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Email Address:</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Email Address"
                                                            defaultValue={user?.email}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">First Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="First name"
                                                            defaultValue={user?.first_name}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Last Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Last name"
                                                            defaultValue={user?.last_name}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Password:</label>
                                                        <input
                                                            type="Password"
                                                            className="form-control"
                                                            placeholder="********"
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Confirm Password:</label>
                                                        <input
                                                            type="Password"
                                                            className="form-control"
                                                            placeholder="********"
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