import axios, { AxiosResponse } from 'axios';
import { API_KEY } from '@env';

import { RecipeRequest, RecipeResponse } from '@/types/FoodApi';

const BASE_URL = 'https://api.spoonacular.com/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
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
  async getRecipes(
    { query, offset, number }: RecipeRequest = {
      query: '',
      offset: 0,
      number: 5,
    }
  ) {
    return this.call<RecipeResponse>(
      'GET',
      `recipes/complexSearch?query=${query}&addRecipeNutrition=true&fillIngredients=true&number=${number}&offset=${offset}`
    );
  },
};
