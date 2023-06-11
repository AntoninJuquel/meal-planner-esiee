import React, { createContext, useState, useCallback, useMemo, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DailyMeal, MealCategory } from '@/types/Meal';
import { Recipe } from '@/types/FoodApi';

const MEAL_PLAN_KEY = 'dailyMeals';

type MealPlannerContextState = {
  dailyCaloriesGoal: number;
  mealPlan: Map<string, DailyMeal>;
};

type MealPlannerContextAction = {
  setDailyCaloriesGoal: (dailyCaloriesGoal: number) => void;
  addMeal: (date: string, mealCategory: MealCategory, recipe: Recipe) => Promise<void>;
  removeMeal: (date: string, mealCategory: MealCategory, index: number) => Promise<void>;
};

interface MealPlannerContextType extends MealPlannerContextState, MealPlannerContextAction {}

const MealPlannerContext = createContext<MealPlannerContextType>({
  dailyCaloriesGoal: 0,
  mealPlan: new Map(),
  setDailyCaloriesGoal: () => {},
  addMeal: () => Promise.resolve(),
  removeMeal: () => Promise.resolve(),
});

export function MealPlannerProvider({ children }: { children: React.ReactNode }) {
  const [dailyCaloriesGoal, setDailyCaloriesGoal] = useState(0);
  const [mealPlan, setMealPlan] = useState<Map<string, DailyMeal>>(new Map());

  useEffect(() => {
    AsyncStorage.getItem(MEAL_PLAN_KEY).then((value) => {
      if (value) {
        try {
          const load = JSON.parse(value);
          setMealPlan(new Map(load));
        } catch (e) {
          AsyncStorage.removeItem(MEAL_PLAN_KEY);
        }
      }
    });
  }, []);

  const addMeal = useCallback(
    async (date: string, mealCategory: MealCategory, recipe: Recipe) => {
      const dailyMeal: DailyMeal = mealPlan.get(date) ?? {
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

      const newMealPlan = new Map(mealPlan.set(date, dailyMeal));
      const save = JSON.stringify(Array.from(newMealPlan.entries()));
      await AsyncStorage.setItem(MEAL_PLAN_KEY, save);

      setMealPlan(newMealPlan);
    },
    [mealPlan]
  );

  const removeMeal = useCallback(
    async (date: string, mealCategory: MealCategory, index: number) => {
      const dailyMeal: DailyMeal = mealPlan.get(date) ?? {
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

        const newMealPlan = new Map(mealPlan.set(date, dailyMeal));
        const save = JSON.stringify(Array.from(newMealPlan.entries()));
        await AsyncStorage.setItem(MEAL_PLAN_KEY, save);

        setMealPlan(newMealPlan);
      }
    },
    [mealPlan]
  );

  const value = useMemo(
    () => ({
      dailyCaloriesGoal,
      mealPlan,
      setDailyCaloriesGoal,
      addMeal,
      removeMeal,
    }),
    [dailyCaloriesGoal, mealPlan, setDailyCaloriesGoal, addMeal, removeMeal]
  );

  return <MealPlannerContext.Provider value={value}>{children}</MealPlannerContext.Provider>;
}

export function useMealPlanner() {
  return useContext(MealPlannerContext);
}
