import React, { createContext, useState, useCallback, useMemo, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DailyMeal, MealCategory } from '@/types/Meal';
import { Recipe } from '@/types/FoodApi';

const DAILY_MEALS_KEY = 'dailyMeals';

type MealPlannerContextState = {
  dailyMeals: Map<string, DailyMeal>;
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
  const [dailyMeals, setDailyMeals] = useState<Map<string, DailyMeal>>(new Map());

  useEffect(() => {
    AsyncStorage.getItem(DAILY_MEALS_KEY).then((value) => {
      if (value) {
        setDailyMeals(new Map(JSON.parse(value)));
      }
    });
  }, []);

  const addMeal = useCallback(
    (date: Date, mealCategory: MealCategory, recipe: Recipe) => {
      const dailyMeal: DailyMeal = dailyMeals.get(date.toDateString()) ?? {
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

      const newDailyMeals = new Map(dailyMeals.set(date.toDateString(), dailyMeal));

      AsyncStorage.setItem(DAILY_MEALS_KEY, JSON.stringify(Array.from(newDailyMeals.entries())));

      setDailyMeals(newDailyMeals);
    },
    [dailyMeals]
  );

  const removeMeal = useCallback(
    (date: Date, mealCategory: MealCategory, recipe: Recipe) => {
      const dailyMeal: DailyMeal = dailyMeals.get(date.toDateString()) ?? {
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

        const newDailyMeals = new Map(dailyMeals.set(date.toDateString(), dailyMeal));

        AsyncStorage.setItem(DAILY_MEALS_KEY, JSON.stringify(Array.from(newDailyMeals.entries())));

        setDailyMeals(newDailyMeals);
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
