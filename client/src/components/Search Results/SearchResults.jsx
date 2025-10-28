import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { search } from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const query = searchParams.get('q');
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                setLoading(true);
                try {
                    const data = await search(query);
                    const searchResults = data.results || data;
                    setResults(searchResults);
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchResults();
    }, [query, setLoading]);

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}hr : ${mins}mins`;
    };

    const formatViews = (count) => {
        if (!count) return Math.floor(Math.random() * 100) + 'K';
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
        return count.toString();
    };

    return (
        <>
            <section className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Search Results for "{query}"</h2>
                                <p className="text-white-50">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {results.map((item) => {
                            const isMovie = item.media_type === 'movie' || item.type === 'movie' || item.title;
                            const detailsUrl = isMovie 
                                ? `/movie/details/${item.id}` 
                                : `/series/details/${item.id}`;
                            const title = item.title || item.name;
                            const posterUrl = item.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
                                : '/images/no-image.jpg';
                            const genre = item.genre_ids && item.genre_ids[0] 
                                ? getGenreName(item.genre_ids[0]) 
                                : null;

                            return (
                                <div key={item.id || item._id} className="col-xxl-3 col-lg-4 col-md-6 mb-4">
                                    <div className="movies-categories">
                                        <div className="movies-img">
                                            <img
                                                className="img-fluid"
                                                src={posterUrl}
                                                alt={title}
                                                onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                            />
                                            <div className="info-top">
                                                {genre && (
                                                    <Link className="tag" to="#">
                                                        {genre}
                                                    </Link>
                                                )}
                                                <div className="ms-auto">
                                                    <a href="javascript:void(0)" className="like" />
                                                    <a className="views" href="#">
                                                        <i className="far fa-eye" /> {formatViews(item.popularity)}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="movies-info">
                                                <div className="content">
                                                    <a className="time" href="#">
                                                        <i className="far fa-clock me-2" />
                                                        {item.runtime ? formatRuntime(item.runtime) : '2hr : 30mins'}
                                                    </a>
                                                    <div className="info-content">
                                                        <div className="movies-title">
                                                            {item.video && (
                                                                <a
                                                                    className="play-btn popup-youtube"
                                                                    href={`https://www.youtube.com/watch?v=${item.video}`}
                                                                >
                                                                    <i className="fa-solid fa-play" />
                                                                </a>
                                                            )}
                                                            <h5>
                                                                <Link
                                                                    className="title mt-0"
                                                                    to={detailsUrl}
                                                                >
                                                                    {title}
                                                                </Link>
                                                            </h5>
                                                        </div>
                                                        <div className="share-info">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="add-icon"
                                                            />
                                                            <div className="share-box">
                                                                <a href="#">
                                                                    {" "}
                                                                    <i className="fas fa-share-alt" />{" "}
                                                                </a>
                                                                <ul className="list-unstyled share-box-social">
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-facebook-f" />
                                                                        </a>{" "}
                                                                    </li>
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-twitter" />
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-linkedin" />
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        {" "}
                                                                        <a href="#">
                                                                            <i className="fab fa-instagram" />
                                                                        </a>{" "}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {results.length === 0 && query && (
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="py-5">
                                    <h3 className="text-white-50">No results found for "{query}"</h3>
                                    <p className="text-white-50">Try searching with different keywords</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

// Helper function to get genre name from ID
function getGenreName(genreId) {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Sci-Fi',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    return genres[genreId] || null;
} 