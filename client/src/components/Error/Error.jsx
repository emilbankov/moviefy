export default function Error() {
    return (
        <>
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">404 error</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-ptb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="error-404 text-center">
                                <img className="img-fluid" src="images/bg/404.png" alt="logo" />
                                <h2>Oops! page not found</h2>
                                <p>
                                    The page you are looking for might have been removed had its name
                                    changed or is temporarily unavailable.
                                </p>
                                <a href="index.html" className="btn btn-primary">
                                    <i className="fa-solid fa-chevron-left" />
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}