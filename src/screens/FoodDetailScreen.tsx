import { useState } from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, Chip, Text, TextInput } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { toFraction } from 'fraction-parser';

import { RootStackParamsList } from '@/routes';
import { Equipment, ExtendedIngredient } from '@/types/FoodApi';
import { summarizeRecipe } from '@/utils/recipes';

export default function FoodDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamsList, 'Food Detail'>>();
  const { recipe } = params;
  const [servings, setServings] = useState(recipe.servings.toFixed(0));

  const summary = summarizeRecipe(recipe);
  const equipments = new Map<number, Equipment>(
    recipe.analyzedInstructions
      .flatMap((instruction) => instruction.steps.flatMap((step) => step.equipment))
      .map((equipment) => [equipment.id, equipment])
  );
  const ingredients = new Map<number, ExtendedIngredient>(
    recipe.extendedIngredients.map((ingredient) => [ingredient.id, ingredient])
  );

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <Card.Cover source={{ uri: recipe.image }} />

          <Card.Content style={styles.chips}>
            <Chip compact textStyle={styles.chipText}>
              {summary.calories.toFixed(0)} cal
            </Chip>
            <Chip compact textStyle={styles.chipText}>
              {summary.fat.toFixed(0)}g fat
            </Chip>
            <Chip compact textStyle={styles.chipText}>
              {summary.carbs.toFixed(0)}g carbs
            </Chip>
            <Chip compact textStyle={styles.chipText}>
              {summary.protein.toFixed(0)}g protein
            </Chip>
          </Card.Content>

          <Card.Content style={styles.chips}>
            <Chip icon="clock-outline">{recipe.readyInMinutes} minutes</Chip>
          </Card.Content>
          <Card.Content style={{ marginTop: 8 }}>
            <TextInput label="Servings" value={servings} onChangeText={setServings} keyboardType="numeric" />
          </Card.Content>
          <Card.Title title="Ingredients" titleVariant="titleLarge" />
          <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {[...ingredients.values()].map((ingredient) => (
              <View key={ingredient.id}>
                <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 5 }}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text variant="bodyLarge" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {toFraction((ingredient.amount / recipe.servings) * Number(servings), { useUnicodeVulgar: true })}{' '}
                  {ingredient.unit}
                </Text>
                <Text variant="bodyMedium" style={{ textAlign: 'center', flexWrap: 'wrap', maxWidth: 100 }}>
                  {ingredient.nameClean}
                </Text>
              </View>
            ))}
          </Card.Content>

          <Card.Title title="Equipments" titleVariant="titleLarge" />
          <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {[...equipments.values()].map((equipment) => (
              <View key={equipment.id}>
                <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 5 }}>
                  <Image
                    source={{ uri: `https://spoonacular.com/cdn/equipment_100x100/${equipment.image}` }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                  />
                </View>
                <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
                  {equipment.name}
                </Text>
              </View>
            ))}
          </Card.Content>

          <Card.Title title="Instructions" titleVariant="titleLarge" />
          <Card.Content>
            {recipe.analyzedInstructions.map((instruction) => (
              <View key={instruction.name} style={{ gap: 20 }}>
                {instruction.steps.map((step) => (
                  <View key={step.number}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text variant="titleMedium">Step {step.number}</Text>

                      <View style={{ flexDirection: 'row', gap: 5 }}>
                        {step.equipment
                          .filter((equipment) => equipment.id !== 0)
                          .map((equipment) => (
                            <View key={equipment.id} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 5 }}>
                              <Image
                                source={{ uri: `https://spoonacular.com/cdn/equipment_100x100/${equipment.image}` }}
                                style={{ width: 25, height: 25 }}
                                resizeMode="contain"
                              />
                            </View>
                          ))}
                      </View>

                      <View style={{ flexDirection: 'row', gap: 5 }}>
                        {step.ingredients
                          .filter((ingredient) => ingredient.id !== 0)
                          .map((ingredient) => (
                            <View key={ingredient.id} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 5 }}>
                              <Image
                                key={ingredient.id}
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }}
                                style={{ width: 25, height: 25 }}
                                resizeMode="contain"
                              />
                            </View>
                          ))}
                      </View>
                    </View>
                    <Text variant="bodyLarge">{step.step}</Text>
                  </View>
                ))}
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  row: {
    flexDirection: 'row',
  },
});
