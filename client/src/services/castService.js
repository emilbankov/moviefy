import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://api.moviefy.live';

export const getActorsMedia = async (actorId, page = 1, size = 30, mediaType) => await get(`${baseUrl}/cast/${actorId}/media?page=${page}&size=${size}&media_type=${mediaType}`);
export const getProductionCompanies = async (prodId, page = 1, size = 30, mediaType) => await get(`${baseUrl}/prod/${prodId}/media?page=${page}&size=${size}&media_type=${mediaType}`);
export const getCrewMedia = async (actorId, page = 1, size = 30, mediaType) => await get(`${baseUrl}/crew/${actorId}/media?page=${page}&size=${size}&media_type=${mediaType}`);