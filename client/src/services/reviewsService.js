import { get, post, put, del } from '../lib/request.js';

// const baseUrl = 'https://moviefy-vwnq.onrender.com';
const baseUrl = 'https://p01--moviefy--kc4tkpjph9bk.code.run';

export const getReviews = async (mediaId, mediaType, page = 1) => await get(`${baseUrl}/${mediaType}/${mediaId}/reviews?page=${page}`);