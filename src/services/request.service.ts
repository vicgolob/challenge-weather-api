import axios from 'axios';

import { BASE_URL, API_KEY } from '../config/index';

const get = async (url: string) => (await axios.get(`${BASE_URL}/data/2.5/onecall?${url}&appid=${API_KEY}`)).data;

export default get;
