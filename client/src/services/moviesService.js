import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'https://moviefy-vwnq.onrender.com';

export const getBanner = async () => await get(`${baseUrl}/movie/collection?name=home alone collection`);