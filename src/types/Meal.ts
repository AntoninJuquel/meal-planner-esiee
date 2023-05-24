export type TimeFrame = 'day' | 'week';

export type Diet =
  | ''
  | 'gluten free'
  | 'ketogenic'
  | 'vegetarian'
  | 'lacto-vegetarian'
  | 'ovo-vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'paleo'
  | 'primal'
  | 'low-fodmap'
  | 'whole30';

export type Meal = {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

export type Nutrient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
};

export type MealPlanRequest = {
  timeFrame?: TimeFrame;
  calories?: number;
  diet?: Diet;
  exclude?: string[];
};

export type MealPlan = {
  meals: Meal[];
  nutrients: Nutrient;
};
