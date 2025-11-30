import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';

export const getReviews = async (mediaId, mediaType, page = 1) => await get(`${baseUrl}/${mediaType}/${mediaId}/reviews?page=${page}`);