import { StyleSheet } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';

import MealPlanApiService from '@/services/SpoonacularApiService';
import { Meal } from '@/types/Spoonacular';
import { useEffect, useState } from 'react';

type Props = {
  meal: Meal;
};

export default function MealCard({ meal }: Props) {
  const [image, setImage] = useState<string>('https://picsum.photos/700');

  // useEffect(() => {
  //   async function getImage() {
  //     const res = await MealPlanApiService.getRecipeInformation(meal.id);
  //     setImage(res.data.image);
  //   }
  //   getImage();
  // }, []);

  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{meal.title}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: image }} />
      <Card.Content style={styles.chipsContainer}>
        <Chip icon="account-multiple" onPress={() => console.log('Pressed')}>
          {meal.servings}
        </Chip>
        <Chip icon="timer-outline" onPress={() => console.log('Pressed')}>
          {meal.readyInMinutes} minutes
        </Chip>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});
