import { MealCategory } from '@/types/Meal';

export function mealCategoryIcon(mealCategory: MealCategory) {
  switch (mealCategory) {
    case MealCategory.BREAKFAST:
      return 'food-croissant';
    case MealCategory.LUNCH:
      return 'food';
    case MealCategory.SNACK:
      return 'cookie';
    case MealCategory.DINNER:
      return 'food-variant';
    default:
      return '';
  }
}
