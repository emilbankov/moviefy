import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';

export const getBannerMovies = async () => await get(`${baseUrl}/movies/collection?name=home alone collection`);
export const getTrendingMovies = async () => await get(`${baseUrl}/movies/trending`);
export const getPopularMovies = async () => await get(`${baseUrl}/movies/popular`);
export const getMovieDetails = async (movieId) => await get(`${baseUrl}/movies/${movieId}`);
export const getTrendingSeries = async () => await get(`${baseUrl}/series/trending`);
export const getPopularSeries = async () => await get(`${baseUrl}/series/popular`);
export const getSeriesDetails = async (seriesId) => await get(`${baseUrl}/series/${seriesId}`);