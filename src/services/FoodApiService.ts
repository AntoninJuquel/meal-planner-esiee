import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.edamam.com/api/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export default {
  async call<T>(method: string, url: string, data?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return instance<T>({
      method,
      url,
      data,
    });
  },
};
