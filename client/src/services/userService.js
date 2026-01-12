import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

export const getFavoriteMoviesIds = async () => await get(`${baseUrl}/users/favorites/movies/ids`);
export const getFavoriteSeriesIds = async () => await get(`${baseUrl}/users/favorites/series/ids`);
export const addMovieToFavorites = async (movieId) => await post(`${baseUrl}/users/favorites/movies/${movieId}`);
export const addSeriesToFavorites = async (seriesId) => await post(`${baseUrl}/users/favorites/series/${seriesId}`);
export const removeMovieFromFavorites = async (movieId) => await del(`${baseUrl}/users/favorites/movies/${movieId}`);
export const removeSeriesFromFavorites = async (seriesId) => await del(`${baseUrl}/users/favorites/series/${seriesId}`);