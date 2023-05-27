import { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, TextInput as TextInputBase } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AxiosError } from 'axios';

import FoodApiService from '@/services/FoodApiService';

import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/FoodApi';

export default function FoodDatabaseScreen() {
  const insets = useSafeAreaInsets();

  const inputRef = useRef<TextInputBase>(null);

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
      inputRef.current?.blur();
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
      <View style={styles.content}>
        <TextInput
          ref={inputRef}
          mode="outlined"
          label="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          right={<TextInput.Icon icon="magnify" onPress={search} />}
        />
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} addAction />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View>
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
