import { RecipeSummary } from '@/types/RecipeSummary';
import { Nutrient, Recipe } from '@/types/FoodApi';

export function summarizeRecipe(recipe: Recipe): RecipeSummary {
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    imageType: recipe.imageType,
    servings: recipe.servings,
    readyInMinutes: recipe.readyInMinutes,
    calories: recipe.nutrition.nutrients.find((nutrient) => nutrient.name === 'Calories')?.amount ?? 0,
    protein: recipe.nutrition.nutrients.find((nutrient) => nutrient.name === 'Protein')?.amount ?? 0,
    fat: recipe.nutrition.nutrients.find((nutrient) => nutrient.name === 'Fat')?.amount ?? 0,
    carbs: recipe.nutrition.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates')?.amount ?? 0,
  };
}

export function getNutrients(recipe: Recipe, nutrientName: string): Nutrient | undefined {
  return recipe.nutrition.nutrients.find((nutrient) => nutrient.name === nutrientName);
}
