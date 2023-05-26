import { StyleSheet } from 'react-native';
import { Card, Chip, Button } from 'react-native-paper';

import { Food } from '@/types/Food';

type Props = {
  food: Food;
};

export default function FoodCard({ food }: Props) {
  return (
    <Card>
      <Card.Title title={food.title} />
      <Card.Cover source={{ uri: food.image }} resizeMode="cover" />
      <Card.Content style={styles.chips}>
        <Chip icon="silverware-fork-knife">{food.servings} servings</Chip>
        <Chip icon="clock-outline">{food.readyInMinutes} minutes</Chip>
      </Card.Content>
      <Card.Content style={styles.chips}>
        <Chip>{food.calories.toFixed(0)} calories</Chip>
        <Chip>{food.fat.toFixed(0)}g fat</Chip>
        <Chip>{food.carbs.toFixed(0)}g carbs</Chip>
        <Chip>{food.protein.toFixed(0)}g protein</Chip>
      </Card.Content>
      <Card.Actions>
        <Button icon="plus">Add to meal plan</Button>
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
});
