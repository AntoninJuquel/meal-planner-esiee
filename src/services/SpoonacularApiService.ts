import axios, { AxiosResponse } from 'axios';

import { Diet, MealPlan, MealPlanRequest, MealPlanWeek, TimeFrame } from '@/types/Spoonacular';

const BASE_URL = 'https://api.spoonacular.com';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

// instance.interceptors.request.use((request) => {
//   console.log('Starting Request', request);
//   return request;
// });

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
      timeFrame: TimeFrame.Day,
      calories: 2000,
      diet: Diet.None,
      exclude: [],
    }
  ) {
    let params = `?&timeFrame=${timeFrame}&targetCalories=${calories}`;

    if (diet !== Diet.None) {
      params += `&diet=${diet}`;
    }

    if (exclude && exclude.length > 0) {
      params += `&exclude=${exclude.toString()}`;
    }

    return instance.get<MealPlanWeek | MealPlan>(`/mealplanner/generate${params}`);
  },
  async getRecipeInformation(id: number) {
    return instance.get(`/recipes/${id}/information`);
  },
};
