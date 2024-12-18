import { get, post, put, del } from '../lib/request.js';

const baseUrl = 'http://watchitnow-435010.lm.r.appspot.com';

export const getBanner = async () => await get(`${baseUrl}/movie/collection?name=home alone collection`);