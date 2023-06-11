import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Chip, IconButton, useTheme } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Recipe } from '@/types/FoodApi';
import { summarizeRecipe } from '@/utils/recipes';

type Props = {
  recipe: Recipe;
  addAction?: (recipe: Recipe) => void;
  deleteAction?: () => void;
  openAction?: (recipe: Recipe) => void;
};

export default function RecipeCard({ recipe, addAction, deleteAction, openAction }: Props) {
  const recipeSummary = summarizeRecipe(recipe);
  const swipeableRef = useRef<Swipeable>(null);

  const renderLeftActions = () => (
    <View>
      {deleteAction ? (
        <IconButton
          icon="delete"
          onPress={() => {
            swipeableRef.current?.close();
            deleteAction();
          }}
        />
      ) : null}
      {openAction ? (
        <IconButton
          icon="chef-hat"
          onPress={() => {
            swipeableRef.current?.close();
            openAction(recipe);
          }}
        />
      ) : null}
    </View>
  );

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={renderLeftActions}>
      <Card onLongPress={() => swipeableRef.current?.openLeft()} onPress={() => openAction?.(recipe)}>
        <Card.Title title={recipeSummary.title} titleStyle={{ textAlignVertical: 'center' }} />
        <Card.Cover source={{ uri: recipeSummary.image }} resizeMode="cover" />
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
        <Card.Content style={styles.chips}>
          <Chip icon="clock-outline">{recipeSummary.readyInMinutes} minutes</Chip>
        </Card.Content>
        <Card.Actions>
          {addAction ? (
            <Button icon="plus" onPress={() => addAction(recipe)}>
              Add to meal plan
            </Button>
          ) : null}
        </Card.Actions>
      </Card>
    </Swipeable>
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
