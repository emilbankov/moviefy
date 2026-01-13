import { Link } from 'react-router-dom';
import MetaTags from '../Meta Tags/MetaTags';

export default function Error() {
    return (
        <>
            <MetaTags
                title="Moviefy | Страницата не е намерена"
                description="Страницата, която търсите, не съществува. Върнете се към началната страница или разгледайте нашите каталози с филми и сериали."
                keywords="грешка 404, страница не е намерена, Moviefy, филми, сериали, онлайн развлечения, error, error page, ерор, грешка"
            />
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
                                <p>The page you’re looking for may have been removed, renamed, or is temporarily unavailable.</p>
                                <Link to="/" className="btn btn-primary">
                                    <i className="fa-solid fa-chevron-left" />
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}