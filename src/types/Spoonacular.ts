export enum TimeFrame {
  Day = 'day',
  Week = 'week',
}

export enum Diet {
  None = 'No diet',
  GlutenFree = 'gluten free',
  Ketogenic = 'ketogenic',
  Vegetarian = 'vegetarian',
  LactoVegetarian = 'lacto-vegetarian',
  OvoVegetarian = 'ovo-vegetarian',
  Vegan = 'vegan',
  Pescatarian = 'pescatarian',
  Paleo = 'paleo',
  Primal = 'primal',
  LowFodmap = 'low-fodmap',
  Whole30 = 'whole30',
}

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

export type MealPlanWeek = {
  week: {
    monday: MealPlan;
    tuesday: MealPlan;
    wednesday: MealPlan;
    thursday: MealPlan;
    friday: MealPlan;
    saturday: MealPlan;
    sunday: MealPlan;
  };
};

export type MealPlanSection = {
  day: string;
  data: Meal[];
  nutrients: Nutrient;
};
