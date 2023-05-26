import { Food } from './Food';

export enum Days {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum MealCategory {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

export type DailyMeal = {
  [MealCategory.BREAKFAST]: Food[];
  [MealCategory.LUNCH]: Food[];
  [MealCategory.DINNER]: Food[];
  [MealCategory.SNACK]: Food[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

export type WeeklyMealPlan = {
  [Days.MONDAY]: DailyMeal;
  [Days.TUESDAY]: DailyMeal;
  [Days.WEDNESDAY]: DailyMeal;
  [Days.THURSDAY]: DailyMeal;
  [Days.FRIDAY]: DailyMeal;
  [Days.SATURDAY]: DailyMeal;
  [Days.SUNDAY]: DailyMeal;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};
