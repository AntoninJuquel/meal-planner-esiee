import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Menu, Chip } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMealPlanner } from '@/context/MealPlannerContext';
import DateWheel from '@/components/DateWheel';
import { MealCategory } from '@/types/Meal';
import RecipeCard from '@/components/RecipeCard';

export default function MealPlanningScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealCategory, setMealCategory] = useState<MealCategory>(MealCategory.BREAKFAST);
  const [mealCategoryMenuVisible, setMealCategoryMenuVisible] = useState(false);

  const { dailyMeals, removeMeal } = useMealPlanner();

  const meals = dailyMeals.get(selectedDate.toDateString());

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <DateWheel onDateChange={setSelectedDate} selectedDate={selectedDate} />
      <View style={styles.chipsContainer}>
        <Chip compact>{meals?.calories.toFixed(0) ?? 0} cal</Chip>
        <Chip compact>{meals?.protein.toFixed(0) ?? 0} g</Chip>
        <Chip compact>{meals?.carbs.toFixed(0) ?? 0} g</Chip>
        <Chip compact>{meals?.fat.toFixed(0) ?? 0} g</Chip>
      </View>
      <Menu
        visible={mealCategoryMenuVisible}
        onDismiss={() => setMealCategoryMenuVisible(false)}
        anchor={<Button onPress={() => setMealCategoryMenuVisible(true)}>{mealCategory}</Button>}>
        {Object.values(MealCategory).map((category) => (
          <Menu.Item
            key={category}
            title={category}
            onPress={() => {
              setMealCategory(category);
              setMealCategoryMenuVisible(false);
            }}
          />
        ))}
      </Menu>
      {meals ? (
        <View style={styles.mealContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mealListContainer}
            style={styles.container}
            data={meals[mealCategory]}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                deleteAction={() => {
                  removeMeal(selectedDate, MealCategory.BREAKFAST, item);
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button mode="text" compact>
            Add Meal
          </Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  mealContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mealListContainer: {
    paddingBottom: 16,
  },
});
