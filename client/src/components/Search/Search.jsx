export default function Search() {
    return (
        <>
            <div id="search">
                <button type="button" className="close">
                    <i className="fa-solid fa-xmark" />
                </button>
                <form>
                    <input type="search" defaultValue="" placeholder="type keyword(s) here" />
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </form>
            </div>
        </>
    )
}