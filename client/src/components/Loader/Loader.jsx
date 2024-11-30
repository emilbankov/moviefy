
export default function Loader() {
    return (
        <>
            <div className="loader">
                <div className="loader__container">
                    <div className="loader__film">
                        <img className="loader__film-img" src="/images/camera loader/film.png" alt="" />
                        <img className="loader__film-img" src="/images/camera loader/film.png" alt="" />
                    </div>
                    <img className="loader__camera" src="/images/camera loader/camera.png" alt="" />
                </div>
            </div>
        </>
    )
}