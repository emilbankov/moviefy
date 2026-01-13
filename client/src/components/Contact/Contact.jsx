import MetaTags from '../Meta Tags/MetaTags';

export default function Contact() {
    return (
        <>
            <MetaTags
                title="Moviefy | Свържете се с нас"
                description="Свържете се с екипа на Moviefy. Имате въпроси, предложения или нужда от помощ? Свържете се с нас и ще се радваме да ви помогнем."
                keywords="контакт, свържете се, Moviefy, поддръжка, въпроси, помощ, съобщение, обратна връзка"
            />
            <section className="inner-banner bg-holder bg-overlay-secondary-3" style={{ backgroundImage: "url(images/bg/inner-banner-bg.jpg)" }}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-inner-title">
                                <h2 className="title">contact us</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-secondary space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="contact-section">
                                <div className="contact-form">
                                    <div className="section-title">
                                        <h4 className="title">Get In Touch</h4>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="inputEmail4"
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    type="Number"
                                                    className="form-control"
                                                    id="number"
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Message"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <a className="btn btn-primary" href="#">
                                                    Send a Message
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-md-10 col-lg-8">
                                        <div className="map">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96679.13096673843!2d-74.01984373866289!3d40.779114816185384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24416947c2109%3A0x82765c7404007886!2sBrooklyn%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1661492492974!5m2!1sen!2sin"
                                                style={{ border: 0, width: "100%", height: "100%" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-dark space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center mb-5">
                                <h2 className="title">Additional Contact Info</h2>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="contact-info">
                                <span className="contact-info-icon">
                                    <i className="fa-solid fa-headphones-simple" />
                                </span>
                                <h3 className="contact-info-title">Our Support Center</h3>
                                <p>
                                    For those of you who are serious about having more, doing more,
                                    giving more and being more, success is achievable.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="contact-info">
                                <span className="contact-info-icon">
                                    <i className="fa-solid fa-comments" />
                                </span>
                                <h3 className="contact-info-title">Chat To Us Online</h3>
                                <p>
                                    The first thing to remember about success is that it is a process
                                    – nothing more, nothing less. There is really no magic.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info">
                                <span className="contact-info-icon">
                                    <i className="fa-solid fa-map-location-dot" />
                                </span>
                                <h3 className="contact-info-title">Contact Detail</h3>
                                <div className="contact-detail">
                                    <span className="address">
                                        6580 Allison Turnpike Creminfort, AL 32808-4509
                                    </span>
                                    <span className="call">Call Us: +123 4567 8910</span>
                                    <span className="mail">Mail Us: support@4kstar.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}