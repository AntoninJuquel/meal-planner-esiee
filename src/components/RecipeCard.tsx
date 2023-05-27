import { StyleSheet } from 'react-native';
import { Card, Chip, IconButton } from 'react-native-paper';

import { Recipe } from '@/types/FoodApi';
import { summarizeRecipe } from '@/utils/recipes';
import { useMealPlanner } from '@/context/MealPlannerContext';

import AddMealPlanDialog from './AddMealPlanDialog';

type Props = {
  recipe: Recipe;
  addAction?: boolean;
  deleteAction?: () => void;
};

export default function RecipeCard({ recipe, addAction, deleteAction }: Props) {
  const recipeSummary = summarizeRecipe(recipe);

  const { addMeal } = useMealPlanner();

  return (
    <Card>
      <Card.Title title={recipeSummary.title} />
      <Card.Cover source={{ uri: recipeSummary.image }} resizeMode="cover" />
      <Card.Content style={styles.chips}>
        <Chip icon="silverware-fork-knife">{recipeSummary.servings} servings</Chip>
        <Chip icon="clock-outline">{recipeSummary.readyInMinutes} minutes</Chip>
      </Card.Content>
      <Card.Content style={styles.chips}>
        <Chip compact textStyle={styles.chipText}>
          {recipeSummary.calories.toFixed(0)} cal
        </Chip>
        <Chip compact textStyle={styles.chipText}>
          {recipeSummary.fat.toFixed(0)}g fat
        </Chip>
        <Chip compact textStyle={styles.chipText}>
          {recipeSummary.carbs.toFixed(0)}g carbs
        </Chip>
        <Chip compact textStyle={styles.chipText}>
          {recipeSummary.protein.toFixed(0)}g protein
        </Chip>
      </Card.Content>
      <Card.Actions>
        {addAction ? (
          <AddMealPlanDialog onAddMeal={(date, mealCategory) => addMeal(date, mealCategory, recipe)} />
        ) : null}
        {deleteAction ? <IconButton icon="delete" onPress={deleteAction} /> : null}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  chipText: {
    fontSize: 12,
  },
});
