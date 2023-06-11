import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Chip, IconButton, useTheme, Badge, ActivityIndicator, FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useMealPlanner } from '@/context/MealPlannerContext';
import DateWheel from '@/components/DateWheel';
import { MealCategory } from '@/types/Meal';
import RecipeCard from '@/components/RecipeCard';
import { BottomTabParamsList, RootStackParamsList } from '@/routes';
import { mealCategoryIcon } from '@/utils/mealCategory';
import { interpolateColor } from '@/utils/interpolateColor';
import { Recipe } from '@/types/FoodApi';

export default function MealPlanningScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<BottomTabParamsList, 'Meal Planning'>>();
  const { dailyMeals, bmr, removeMeal } = useMealPlanner();

  const [selectedDate, setSelectedDate] = useState(new Date(params?.date ?? Date.now()));
  const [mealCategory, setMealCategory] = useState<MealCategory>(params?.mealCategory ?? MealCategory.BREAKFAST);
  const [loading, setLoading] = useState(false);

  const meals = dailyMeals.get(selectedDate.toDateString());

  function gotToFoodDatabase() {
    navigation.navigate('BottomTabs', {
      screen: 'Food database',
      params: {
        date: selectedDate.toDateString(),
        mealCategory,
      },
    });
  }

  function onClickOpenRecipe(recipe: Recipe) {
    navigation.navigate('Food Detail', { recipe });
  }

  const ratio = meals && bmr > 0 ? meals.calories / bmr : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingHorizontal: 8 }]}>
      <ActivityIndicator
        animating={loading}
        hidesWhenStopped
        size="large"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: -20,
          marginTop: -20,
          zIndex: 1,
        }}
      />
      <DateWheel onDateChange={setSelectedDate} selectedDate={selectedDate} />
      <View style={styles.chipsContainer}>
        <Chip
          compact
          style={{
            backgroundColor: interpolateColor(ratio),
          }}>
          Total {meals?.calories.toFixed(0) ?? 0} cal
        </Chip>
        <Chip compact>Goal {bmr.toFixed(0)} cal</Chip>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {Object.values(MealCategory).map((category) => (
          <View key={category}>
            <IconButton
              icon={mealCategoryIcon(category)}
              onPress={() => setMealCategory(category)}
              iconColor={category === mealCategory ? colors.background : colors.onBackground}
              containerColor={category === mealCategory ? colors.tertiary : colors.elevation.level0}
            />
            <Badge
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
              {meals?.[category].length ?? 0}
            </Badge>
          </View>
        ))}
      </View>
      <View style={styles.mealContainer}>
        {meals ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mealListContainer}
            style={styles.container}
            data={meals[mealCategory]}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item, index }) => (
              <RecipeCard
                recipe={item}
                deleteAction={async () => {
                  setLoading(true);
                  await removeMeal(selectedDate.toDateString(), mealCategory, index);
                  setLoading(false);
                }}
                openAction={() => onClickOpenRecipe(item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.container} />
        )}
        <FAB
          icon="plus"
          onPress={gotToFoodDatabase}
          style={{
            position: 'absolute',
            marginBottom: 8,
            right: 0,
            bottom: 0,
          }}
        />
      </View>
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
  },
  mealListContainer: {
    paddingBottom: 16,
  },
});
