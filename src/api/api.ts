import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': process.env.API_KEY,
  },
});

export default api;
