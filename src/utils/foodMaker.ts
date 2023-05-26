import { Food } from '@/types/Food';
import { Recipe } from '@/types/FoodApi';

export function fromRecipeInformation(recipeInformation: Recipe): Food {
  return {
    id: recipeInformation.id,
    title: recipeInformation.title,
    image: recipeInformation.image,
    imageType: recipeInformation.imageType,
    servings: recipeInformation.servings,
    readyInMinutes: recipeInformation.readyInMinutes,
    calories: recipeInformation.nutrition.nutrients.find((nutrient) => nutrient.name === 'Calories')?.amount ?? 0,
    protein: recipeInformation.nutrition.nutrients.find((nutrient) => nutrient.name === 'Protein')?.amount ?? 0,
    fat: recipeInformation.nutrition.nutrients.find((nutrient) => nutrient.name === 'Fat')?.amount ?? 0,
    carbs: recipeInformation.nutrition.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates')?.amount ?? 0,
  };
}
