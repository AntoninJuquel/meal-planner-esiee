import { StyleSheet } from 'react-native';
import { Button, Card, Chip, IconButton } from 'react-native-paper';

import { Recipe } from '@/types/FoodApi';
import { summarizeRecipe } from '@/utils/recipes';

type Props = {
  recipe: Recipe;
  addAction?: (recipe: Recipe) => void;
  deleteAction?: () => void;
};

export default function RecipeCard({ recipe, addAction, deleteAction }: Props) {
  const recipeSummary = summarizeRecipe(recipe);

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
          <Button icon="plus" onPress={() => addAction(recipe)}>
            Add to meal plan
          </Button>
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
