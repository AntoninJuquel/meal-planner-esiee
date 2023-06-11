import { Recipe } from './FoodApi';

export enum MealCategory {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  SNACK = 'snack',
  DINNER = 'dinner',
}

export type DailyMeal = {
  [MealCategory.BREAKFAST]: Recipe[];
  [MealCategory.LUNCH]: Recipe[];
  [MealCategory.DINNER]: Recipe[];
  [MealCategory.SNACK]: Recipe[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};
