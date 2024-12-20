import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';

export const getBannerMovies = async () => await get(`${baseUrl}/movie/collection?name=home alone collection`);
export const getTrendingMovies = async () => await get(`${baseUrl}/movie/trending`);
export const getPopularMovies = async () => await get(`${baseUrl}/movie/popular`);
export const getMovieDetails = async (movieId) => await get(`${baseUrl}/movie/${movieId}`);
export const getTrendingSeries = async () => await get(`${baseUrl}/tv/trending`);
export const getPopularSeries = async () => await get(`${baseUrl}/tv/popular`);
export const getSeriesDetails = async (seriesId) => await get(`${baseUrl}/tv/${seriesId}`);