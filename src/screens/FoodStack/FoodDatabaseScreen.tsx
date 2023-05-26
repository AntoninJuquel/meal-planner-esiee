import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FoodApiService from '@/services/FoodApiService';

import FoodCard from '@/components/FoodCard';
import { fromRecipeInformation } from '@/utils/foodMaker';
import { Recipe } from '@/types/FoodApi';
import { AxiosError } from 'axios';

export default function FoodDatabaseScreen() {
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
  });

  async function search() {
    try {
      const res = await FoodApiService.getRecipes({ query: searchQuery, offset: 0, number: 5 });
      setRecipes(res.data.results);
    } catch (err) {
      const error = err as AxiosError;
      setSnackbar({
        visible: true,
        message: error.message,
      });
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TextInput label="Search" value={searchQuery} onChangeText={setSearchQuery} />
      <Button mode="contained" onPress={search}>
        Search
      </Button>

      <FlatList
        data={recipes.map(fromRecipeInformation)}
        renderItem={({ item }) => <FoodCard food={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
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
});
