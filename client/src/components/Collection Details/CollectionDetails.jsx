import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as moviesService from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';
import MetaTags from '../Meta Tags/MetaTags';

export default function CollectionDetails() {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (movieId) {
                setLoading(true);
                try {
                    const data = await moviesService.getCollectionById(movieId);
                    setMovieData(data);
                    console.log(data);
                } catch (error) {
                    console.error('Movie details fetch error:', error);
                    setMovieData(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMovieDetails();
    }, [movieId, setLoading]);

    const collectionMovies = movieData?.movies?.collection || [];
    const currentMovie = movieData?.movies;
    const collection = currentMovie ? [currentMovie, ...collectionMovies] : collectionMovies;
    const collectionTitle = movieData?.collection_name || 'Collection';

    return (
        <>
            <MetaTags
                title={movieData?.collection?.name ? `${movieData.collection.name} | Moviefy` : 'Moviefy | Колекция'}
                description={movieData?.collection?.overview ? `${movieData.collection.overview} Разгледайте колекцията ${movieData.collection.name} на Moviefy.` : 'Разгледайте филмовата колекция на Moviefy.'}
                keywords={movieData?.collection?.name ? `${movieData.collection.name}, филмова колекция, филми, Moviefy` : 'колекция, филми, Moviefy'}
            />
            <section className="space-ptb">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h2 className="title">{collectionTitle}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {movieData?.movies && movieData?.movies?.length > 0 ? (
                        movieData?.movies?.map((movie) => (
                            <div key={movie.id} className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 mb-4">
                                <Link to={`/movie/details/${movie.api_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="movies-categories-style-3">
                                        <div className="movie-image">
                                            <img
                                                className="img-fluid"
                                                src={movie.poster_path 
                                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                                                    : movie.backdrop_path 
                                                        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                                                        : 'images/movie/movie-01.jpg'}
                                                alt={movie.title}
                                            />
                                        </div>
                                        <div className="movie-info-content">
                                            <h6>
                                                <span className="title">
                                                    {movie.title}
                                                </span>
                                            </h6>
                                            <div className="movie-info smaller-text">
                                                <span className="year">{movie.release_date ? new Date(movie.release_date).getFullYear() : movie.year || 'N/A'}</span>
                                                <a className="time" href="#" onClick={(e) => e.preventDefault()}>
                                                    <i className="far fa-clock me-2" />
                                                    {movie.runtime ? `${Math.floor(movie.runtime / 60)}hr : ${movie.runtime % 60}min` : 'N/A'}
                                                </a>
                                                <div className="info-tag">
                                                    <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                                        <i className="far fa-eye" />
                                                    </a>
                                                    <a href="javascript:void(0)" className="like" onClick={(e) => e.preventDefault()} />
                                                    <a className="rating" href="#" onClick={(e) => e.preventDefault()}>
                                                        <i className="fa-solid fa-star" /> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p className="text-white">No movies found in this collection.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

