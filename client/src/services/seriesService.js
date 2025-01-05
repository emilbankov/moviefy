import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';
const collection = 'Peaky Blinders, Squid Game, Money Heist, Hawaii Five-0';

export const getBannerSeries = async () => await get(`${baseUrl}/series/collection?names=${collection}`);
export const getLatestSeries = async () => await get(`${baseUrl}/series/latest?size=12`);
export const getTrendingSeries = async () => await get(`${baseUrl}/series/trending`);
export const getPopularSeries = async () => await get(`${baseUrl}/series/popular`);
export const getSeriesDetails = async (seriesId) => await get(`${baseUrl}/series/${seriesId}`);
export const getEpisodes = async (seasonId) => await get(`${baseUrl}/series/season/${seasonId}`);