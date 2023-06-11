import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput as TextInputBase } from 'react-native';
import { TextInput, Snackbar, ActivityIndicator, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AxiosError } from 'axios';
import { useRoute, RouteProp, useNavigation, CommonActions } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import FoodApiService from '@/services/FoodApiService';

import FoodCard from '@/components/FoodCard';
import { Recipe, RecipeResponse } from '@/types/FoodApi';
import { BottomTabParamsList, RootStackParamsList } from '@/routes';
import { useMealPlanner } from '@/context/MealPlannerContext';
import AddMealPlanDialog from '@/components/AddMealPlanDialog';

export default function FoodDatabaseScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const { params } = useRoute<RouteProp<BottomTabParamsList, 'Food database'>>();
  const { addMeal } = useMealPlanner();

  const [currentRecipe, setCurrentRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<RecipeResponse>();
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
  });

  const inputRef = useRef<TextInputBase>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.dispatch(
        CommonActions.setParams({
          date: undefined,
          mealCategory: undefined,
        })
      );
    });

    return unsubscribe;
  }, [navigation]);

  async function search() {
    setLoading(true);
    try {
      inputRef.current?.blur();
      const res = await FoodApiService.getRecipes({ query: searchQuery, offset: 0, number: 5 });
      if (res.data.results.length === 0) {
        setSnackbar({
          visible: true,
          message: 'No results found',
        });
        setLoading(false);
      }
      setRecipes(res.data);
    } catch (err) {
      const error = err as AxiosError;
      setSnackbar({
        visible: true,
        message: error.message,
      });
    }
    setLoading(false);
  }

  async function onClickAddToMealPlan(recipe: Recipe) {
    setLoading(true);
    const { date, mealCategory } = params || {};
    if (date && mealCategory) {
      await addMeal(date, mealCategory, recipe);
      navigation.navigate('BottomTabs', {
        screen: 'Meal Planning',
        params: {
          date,
          mealCategory,
        },
      });
    } else {
      setCurrentRecipe(recipe);
    }
    setLoading(false);
  }

  function onClickOpenRecipe(recipe: Recipe) {
    navigation.navigate('Recipe', { recipe });
  }

  async function loadMore() {
    if (recipes && recipes.totalResults > 0) {
      setLoading(true);
      try {
        const res = await FoodApiService.getRecipes({
          query: searchQuery,
          offset: recipes.offset + recipes.number,
          number: 5,
        });
        const newRecipes = {
          ...res.data,
          results: [...recipes.results, ...res.data.results],
        };
        if (newRecipes.totalResults === 0) {
          setSnackbar({
            visible: true,
            message: 'No more results',
          });
        }
        setRecipes(newRecipes);
      } catch (err) {
        const error = err as AxiosError;
        setSnackbar({
          visible: true,
          message: error.message,
        });
      }
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
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
        <TextInput
          ref={inputRef}
          mode="outlined"
          label="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          right={<TextInput.Icon icon="magnify" onPress={search} />}
          onSubmitEditing={search}
        />
        <FlatList
          data={recipes?.results}
          renderItem={({ item }) => (
            <FoodCard recipe={item} addAction={onClickAddToMealPlan} openAction={onClickOpenRecipe} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ paddingVertical: 16 }}
          ListEmptyComponent={() => (recipes ? <Text>No results found</Text> : null)}
          onEndReached={loadMore}
        />
      </View>
      <AddMealPlanDialog
        visible={Boolean(currentRecipe)}
        onDismiss={() => setCurrentRecipe(undefined)}
        onAddMeal={(date, mealCategory) => {
          if (currentRecipe) {
            addMeal(date.toDateString(), mealCategory, currentRecipe);
          }
        }}
      />
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
        duration={3000}>
        {snackbar.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
