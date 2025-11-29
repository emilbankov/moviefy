import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';

export const getActorsMedia = async (actorId, page = 1, size = 30, mediaType) => await get(`${baseUrl}/cast/${actorId}/media?page=${page}&size=${size}&media_type=${mediaType}`);