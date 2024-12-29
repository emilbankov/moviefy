import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';
const collection = 'Home Alone Collection'
const collections = 'The Fast and the Furious Collection, Die Hard Collection, The Avengers Collection, Harry Potter Collection, The Dark Knight Collection, Star Wars Collection, Spider-Man Collection, Jurassic Park Collection'

export const getBannerMovies = async () => await get(`${baseUrl}/movies/collection?name=${collection}`);
export const getLatestMovies = async () => await get(`${baseUrl}/movies/latest`);
export const getTrendingMovies = async () => await get(`${baseUrl}/movies/trending`);
export const getPopularMovies = async () => await get(`${baseUrl}/movies/popular`);
export const getPopularCollections = async () => await get(`${baseUrl}/movies/collections?names=${collections}`);
export const getMovieDetails = async (movieId) => await get(`${baseUrl}/movies/${movieId}`);
export const getTrendingSeries = async () => await get(`${baseUrl}/series/trending`);
export const getPopularSeries = async () => await get(`${baseUrl}/series/popular`);
export const getSeriesDetails = async (seriesId) => await get(`${baseUrl}/series/${seriesId}`);