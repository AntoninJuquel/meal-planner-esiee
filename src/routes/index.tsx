import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HealthGoalScreen from '@/screens/HealthGoalScreen';
import MealPlanningScreen from '@/screens/MealPlanningScreen';
import FoodDatabaseScreen from '@/screens/FoodDatabaseScreen';
import RecipeScreen from '@/screens/RecipeScreen';

import { Recipe } from '@/types/FoodApi';
import { MealCategory } from '@/types/Meal';
import { NavigationTheme } from 'react-native-paper/lib/typescript/src/types';
import StackNavigatorHeader from '@/components/StackNavigatorHeader';

export type BottomTabParamsList = {
  'Health Goals': undefined;
  'Food database': { date: string; mealCategory: MealCategory } | undefined;
  'Meal Planning': { date: string; mealCategory: MealCategory } | undefined;
};

const Tab = createMaterialBottomTabNavigator<BottomTabParamsList>();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Health Goals"
        component={HealthGoalScreen}
        options={{
          tabBarIcon: 'heart-pulse',
        }}
      />
      <Tab.Screen
        name="Food database"
        component={FoodDatabaseScreen}
        options={{
          tabBarIcon: 'food-apple',
          tabBarLabel: 'Food',
        }}
      />
      <Tab.Screen
        name="Meal Planning"
        component={MealPlanningScreen}
        options={{
          tabBarIcon: 'calendar',
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export type RootStackParamsList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamsList>;
  Recipe: { recipe: Recipe };
};

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ route }) => {
          const params = route?.params as { recipe: Recipe };
          return {
            title: params.recipe.title,
            header: (props) => <StackNavigatorHeader {...props} />,
          };
        }}
      />
    </Stack.Navigator>
  );
}

type Props = {
  navigationTheme: NavigationTheme;
};

export default function Routes({ navigationTheme }: Props) {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack />
    </NavigationContainer>
  );
}
