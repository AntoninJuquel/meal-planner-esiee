import React, { createContext, useState, useCallback, useMemo, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DailyMeal, MealCategory } from '@/types/Meal';
import { Recipe } from '@/types/FoodApi';

const DAILY_MEALS_KEY = 'dailyMeals';

type MealPlannerContextState = {
  bmr: number;
  dailyMeals: Map<string, DailyMeal>;
};

type MealPlannerContextAction = {
  setBMR: (bmr: number) => void;
  addMeal: (date: string, mealCategory: MealCategory, recipe: Recipe) => Promise<void>;
  removeMeal: (date: string, mealCategory: MealCategory, index: number) => Promise<void>;
};

interface MealPlannerContextType extends MealPlannerContextState, MealPlannerContextAction {}

const MealPlannerContext = createContext<MealPlannerContextType>({
  bmr: 0,
  dailyMeals: new Map(),
  setBMR: () => {},
  addMeal: () => Promise.resolve(),
  removeMeal: () => Promise.resolve(),
});

export function MealPlannerProvider({ children }: { children: React.ReactNode }) {
  const [bmr, setBMR] = useState(0);
  const [dailyMeals, setDailyMeals] = useState<Map<string, DailyMeal>>(new Map());

  useEffect(() => {
    AsyncStorage.getItem(DAILY_MEALS_KEY).then((value) => {
      if (value) {
        try {
          const load = JSON.parse(value);
          setDailyMeals(new Map(load));
        } catch (e) {
          AsyncStorage.removeItem(DAILY_MEALS_KEY);
        }
      }
    });
  }, []);

  const addMeal = useCallback(
    async (date: string, mealCategory: MealCategory, recipe: Recipe) => {
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

      const newDailyMeals = new Map(dailyMeals.set(date, dailyMeal));
      const save = JSON.stringify(Array.from(newDailyMeals.entries()));
      await AsyncStorage.setItem(DAILY_MEALS_KEY, save);

      setDailyMeals(newDailyMeals);
    },
    [dailyMeals]
  );

  const removeMeal = useCallback(
    async (date: string, mealCategory: MealCategory, index: number) => {
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

      if (index < dailyMeal[mealCategory].length) {
        const recipe = dailyMeal[mealCategory][index];

        dailyMeal[mealCategory].splice(index, 1);
        dailyMeal.calories -= recipe.nutrition.nutrients.find((n) => n.name === 'Calories')?.amount ?? 0;
        dailyMeal.carbs -= recipe.nutrition.nutrients.find((n) => n.name === 'Carbohydrates')?.amount ?? 0;
        dailyMeal.fat -= recipe.nutrition.nutrients.find((n) => n.name === 'Fat')?.amount ?? 0;
        dailyMeal.protein -= recipe.nutrition.nutrients.find((n) => n.name === 'Protein')?.amount ?? 0;

        const newDailyMeals = new Map(dailyMeals.set(date, dailyMeal));
        const save = JSON.stringify(Array.from(newDailyMeals.entries()));
        await AsyncStorage.setItem(DAILY_MEALS_KEY, save);

        setDailyMeals(newDailyMeals);
      }
    },
    [dailyMeals]
  );

  const value = useMemo(
    () => ({
      bmr,
      dailyMeals,
      setBMR,
      addMeal,
      removeMeal,
    }),
    [bmr, dailyMeals, setBMR, addMeal, removeMeal]
  );

  return <MealPlannerContext.Provider value={value}>{children}</MealPlannerContext.Provider>;
}

export function useMealPlanner() {
  return useContext(MealPlannerContext);
}
