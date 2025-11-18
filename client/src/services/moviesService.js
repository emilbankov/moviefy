import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';
const collection = 'The Avengers Collection';

export const getBannerMovies = async () => await get(`${baseUrl}/movies/collection?name=${collection}`);
export const getLatestMovies = async (page, size) => await get(`${baseUrl}/movies/latest?page=${page}&size=${size}`);
export const getTrendingMovies = async (page, size) => await get(`${baseUrl}/movies/trending?page=${page}&size=${size}`);
export const getPopularMovies = async (page, size) => await get(`${baseUrl}/movies/popular?page=${page}&size=${size}`);
export const getGenres = async (media, genres, size, page = 1) => await get(`${baseUrl}/${media}/genres?genres=${genres}&size=${size}&page=${page}`);
export const getPopularCollections = async (page, size) => await get(`${baseUrl}/movies/collections/popular?page=${page}&size=${size}`);
export const getMovieDetails = async (movieId) => await get(`${baseUrl}/movies/${movieId}`);
export const search = async (media, query) => await get(`${baseUrl}/${media}/search?query=${query}`);
export const getCollectionById = async (collectionId) => await get(`${baseUrl}/movies/collection/${collectionId}`);