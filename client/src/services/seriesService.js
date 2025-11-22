import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';
const collection = 'Peaky Blinders, Squid Game, Money Heist, Hawaii Five-0';

export const getBannerSeries = async () => await get(`${baseUrl}/series/collection?names=${collection}`);
export const getLatestSeries = async (types, page, size, genres) => await get(`${baseUrl}/series/latest?types=${types}&page=${page}&size=${size}&genres=${genres || ''}`);
export const getTrendingSeries = async (types, page, size, genres) => await get(`${baseUrl}/series/trending?types=${types}&page=${page}&size=${size}&genres=${genres || ''}`);
export const getPopularSeries = async (types, page, size, genres) => await get(`${baseUrl}/series/popular?types=${types}&page=${page}&size=${size}&genres=${genres || ''}`);
export const getTopRatedSeries = async (types, page, size, genres) => await get(`${baseUrl}/series/top_rated?types=${types}&page=${page}&size=${size}&genres=${genres || ''}`);
export const getSeriesDetails = async (seriesId) => await get(`${baseUrl}/series/${seriesId}`);
export const getEpisodes = async (seasonId) => await get(`${baseUrl}/series/season/${seasonId}`);