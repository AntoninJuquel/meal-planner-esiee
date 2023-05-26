import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';

import { DailyMeal, MealCategory } from '@/types/Meal';
import { Recipe } from '@/types/FoodApi';

type MealPlannerContextState = {
  dailyMeals: Map<Date, DailyMeal>;
};

type MealPlannerContextAction = {
  addMeal: (date: Date, mealCategory: MealCategory, recipe: Recipe) => void;
  removeMeal: (date: Date, mealCategory: MealCategory, recipe: Recipe) => void;
};

interface MealPlannerContextType extends MealPlannerContextState, MealPlannerContextAction {}

const MealPlannerContext = createContext<MealPlannerContextType>({
  dailyMeals: new Map(),
  addMeal: () => {},
  removeMeal: () => {},
});

export function MealPlannerProvider({ children }: { children: React.ReactNode }) {
  const [dailyMeals, setDailyMeals] = useState<Map<Date, DailyMeal>>(new Map());

  const addMeal = useCallback(
    (date: Date, mealCategory: MealCategory, recipe: Recipe) => {
      const dailyMeal: DailyMeal = dailyMeals.get(date) ?? {
        [MealCategory.BREAKFAST]: [],
        [MealCategory.LUNCH]: [],
        [MealCategory.DINNER]: [],
        [MealCategory.SNACK]: [],
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      };

      dailyMeal[mealCategory].push(recipe);

      dailyMeal.calories += recipe.nutrition.nutrients.find((n) => n.name === 'Calories')?.amount ?? 0;
      dailyMeal.carbs += recipe.nutrition.nutrients.find((n) => n.name === 'Carbohydrates')?.amount ?? 0;
      dailyMeal.fat += recipe.nutrition.nutrients.find((n) => n.name === 'Fat')?.amount ?? 0;
      dailyMeal.protein += recipe.nutrition.nutrients.find((n) => n.name === 'Protein')?.amount ?? 0;

      setDailyMeals(new Map(dailyMeals.set(date, dailyMeal)));
    },
    [dailyMeals]
  );

  const removeMeal = useCallback(
    (date: Date, mealCategory: MealCategory, recipe: Recipe) => {
      const dailyMeal: DailyMeal = dailyMeals.get(date) ?? {
        [MealCategory.BREAKFAST]: [],
        [MealCategory.LUNCH]: [],
        [MealCategory.DINNER]: [],
        [MealCategory.SNACK]: [],
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      };

      const index = dailyMeal[mealCategory].findIndex((r) => r.id === recipe.id);
      if (index !== -1) {
        dailyMeal[mealCategory].splice(index, 1);

        dailyMeal.calories -= recipe.nutrition.nutrients.find((n) => n.name === 'Calories')?.amount ?? 0;
        dailyMeal.carbs -= recipe.nutrition.nutrients.find((n) => n.name === 'Carbohydrates')?.amount ?? 0;
        dailyMeal.fat -= recipe.nutrition.nutrients.find((n) => n.name === 'Fat')?.amount ?? 0;
        dailyMeal.protein -= recipe.nutrition.nutrients.find((n) => n.name === 'Protein')?.amount ?? 0;

        setDailyMeals(new Map(dailyMeals.set(date, dailyMeal)));
      }
    },
    [dailyMeals]
  );

  const value = useMemo(
    () => ({
      dailyMeals,
      addMeal,
      removeMeal,
    }),
    [dailyMeals, addMeal, removeMeal]
  );

  return <MealPlannerContext.Provider value={value}>{children}</MealPlannerContext.Provider>;
}

export function useMealPlanner() {
  return useContext(MealPlannerContext);
}
