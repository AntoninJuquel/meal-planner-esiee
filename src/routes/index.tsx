import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HealthGoalScreen from '@/screens/HealthGoalScreen';
import MealPlanningScreen from '@/screens/MealPlanningScreen';
import FoodDatabaseScreen from '@/screens/FoodDatabaseScreen';
import FoodDetailScreen from '@/screens/FoodDetailScreen';

import { Recipe } from '@/types/FoodApi';
import { MealCategory } from '@/types/Meal';
import { NavigationTheme } from 'react-native-paper/lib/typescript/src/types';

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
  'Food Detail': { recipe: Recipe };
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
      <Stack.Screen name="Food Detail" component={FoodDetailScreen} />
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
