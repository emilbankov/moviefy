export default function LoginRegister() {
    return (
        <>
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">Login</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-lg-9 col-xxl-7">
                            <div className="section-title text-center">
                                <h2 className="title">What they’re talking about 4K Star</h2>
                            </div>
                            <div className="bg-dark login-tabs tabs">
                                <ul
                                    className="nav nav-tabs justify-content-center"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="login-tab"
                                            data-bs-toggle="tab"
                                            href="#login"
                                            role="tab"
                                            aria-controls="login"
                                            aria-selected="false"
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="register-tab"
                                            data-bs-toggle="tab"
                                            href="#register"
                                            role="tab"
                                            aria-controls="register"
                                            aria-selected="true"
                                        >
                                            Register
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="login"
                                        role="tabpanel"
                                        aria-labelledby="login-tab"
                                    >
                                        <form className="row mt-4 mb-4 mb-sm-5 align-items-center form-flat-style">
                                            <div className="mb-3 col-sm-12">
                                                <label className="form-label">Username:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="mb-3 col-sm-12">
                                                <label className="form-label">Password:</label>
                                                <input
                                                    type="Password"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
                                                </button>
                                            </div>
                                            <div className="col-sm-6">
                                                <ul className="list-unstyled d-flex justify-content-sm-end mb-0 mt-md-0 mt-3">
                                                    <li>
                                                        Don't have an account? <a href="#">Click here</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </form>
                                        <div className="login-social-media bg-secondary">
                                            <div className="mb-4 d-block text-center">
                                                <b>Login or Sign in with</b>
                                            </div>
                                            <form className="row">
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark facebook-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-facebook-f me-2" />
                                                            Login with Facebook
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark twitter-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-twitter me-2" />
                                                            Login with Twitter
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark instagram-bg social-bg-hover d-block mb-3 mb-md-0"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-instagram me-2" />
                                                            Login with Instagram
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark linkedin-bg social-bg-hover d-block"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-linkedin-in me-2" />
                                                            Login with Linkedin
                                                        </span>
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="register"
                                        role="tabpanel"
                                        aria-labelledby="register-tab"
                                    >
                                        <form className="row mt-4 mb-4 mb-sm-5 align-items-center form-flat-style">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Username:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Email Address:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Firstname:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Lastname:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Password:</label>
                                                <input
                                                    type="Password"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Confirm Password:</label>
                                                <input
                                                    type="Password"
                                                    className="form-control"
                                                    placeholder=""
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheck02"
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheck02">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <ul className="list-unstyled d-flex justify-content-md-end mb-0">
                                                    <li>
                                                        Already Registered User?{" "}
                                                        <a href="#">Click here to login</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </form>
                                        <div className="login-social-media bg-secondary">
                                            <div className="mb-4 d-block text-center">
                                                <b>Login or Sign in with</b>
                                            </div>
                                            <form className="row">
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark facebook-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-facebook-f me-2" />
                                                            Login with Facebook
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark twitter-bg social-bg-hover d-block mb-3"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-twitter me-2" />
                                                            Login with Twitter
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark instagram-bg social-bg-hover d-block mb-3 mb-md-0"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-instagram me-2" />
                                                            Login with Instagram
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a
                                                        className="btn btn-dark linkedin-bg social-bg-hover d-block"
                                                        href="#"
                                                    >
                                                        <span>
                                                            <i className="fab fa-linkedin-in me-2" />
                                                            Login with Linkedin
                                                        </span>
                                                    </a>
                                                </div>
                                            </form>
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