import axios, { AxiosResponse } from 'axios';

import { MealPlan, MealPlanRequest } from '@/types/Meal';

const BASE_URL = 'https://api.spoonacular.com';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

instance.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

export default {
  async call<T>(method: string, url: string, data?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return instance<T>({
      method,
      url,
      data,
    });
  },
  async getMealPlan(
    { timeFrame, calories, diet, exclude }: MealPlanRequest = {
      timeFrame: 'day',
      calories: 2000,
      diet: '',
      exclude: [],
    }
  ) {
    let params = `?&timeFrame=${timeFrame}&targetCalories=${calories}`;

    if (diet) {
      params += `&diet=${diet}`;
    }

    if (exclude && exclude.length > 0) {
      params += `&exclude=${exclude.toString()}`;
    }

    return instance.get<MealPlan>(`/mealplanner/generate${params}`);
  },
};
