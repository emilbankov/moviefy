import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://api.moviefy.live';

export const getReviews = async (mediaId, mediaType, page = 1) => await get(`${baseUrl}/${mediaType}/${mediaId}/reviews?page=${page}`);