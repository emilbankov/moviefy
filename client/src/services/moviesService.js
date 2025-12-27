import { get, post, put, del } from '../lib/request.js';

// const baseUrl = 'https://moviefy-vwnq.onrender.com';
const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';
const collection = 'The Avengers Collection';

export const getBannerMovies = async () => await get(`${baseUrl}/movies/collection?name=${collection}`);
export const getLatestMovies = async (media, page, size, genres) => await get(`${baseUrl}/${media}/latest?page=${page}&size=${size}&genres=${genres}`);
export const getTrendingMovies = async (media, page, size, genres) => await get(`${baseUrl}/${media}/trending?page=${page}&size=${size}&genres=${genres}`);
export const getPopularMovies = async (media, page, size, genres) => await get(`${baseUrl}/${media}/popular?page=${page}&size=${size}&genres=${genres}`);
export const getTopRatedMovies = async (media, page, size, genres) => await get(`${baseUrl}/${media}/top_rated?page=${page}&size=${size}&genres=${genres}`);
export const getGenres = async (media, genres, size, page = 1) => await get(`${baseUrl}/${media}/genres?genres=${genres}&size=${size}&page=${page}`);
export const getPopularCollections = async (page, size) => await get(`${baseUrl}/movies/collections/popular?page=${page}&size=${size}`);
export const searchPopularCollections = async (query, page, size) => await get(`${baseUrl}/movies/collections/search?query=${query}&page=${page}&size=${size}`);
export const getMovieDetails = async (movieId) => await get(`${baseUrl}/movies/${movieId}`);
export const search = async (media, query) => await get(`${baseUrl}/${media}/search?query=${query}`);
export const getCollectionById = async (collectionId) => await get(`${baseUrl}/movies/collection/${collectionId}`);