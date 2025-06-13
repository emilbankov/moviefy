import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://direct-wanda-boklucite2-df93158d.koyeb.app/';
const collection = 'Home Alone Collection'
const collections = 'The Fast and the Furious Collection, Die Hard Collection, The Avengers Collection, Harry Potter Collection, The Dark Knight Collection, Star Wars Collection, The Godfather Collection, Jurassic Park Collection, Venom Collection, Top Gun Collection'
const seriesCollection = 'The Penguin, Squid Game, Money Heist, Hawaii Five-0';

export const getBannerMovies = async () => await get(`${baseUrl}/movies/collection?name=${collection}`);
export const getLatestMovies = async () => await get(`${baseUrl}/movies/latest?size=12`);
export const getTrendingMovies = async () => await get(`${baseUrl}/movies/trending`);
export const getPopularMovies = async () => await get(`${baseUrl}/movies/popular`);
export const getPopularCollections = async () => await get(`${baseUrl}/movies/collections?names=${collections}`);
export const getMovieDetails = async (movieId) => await get(`${baseUrl}/movies/${movieId}`);
export const search = async (query) => await get(`${baseUrl}/search?query=${query}`);