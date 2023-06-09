import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HealthGoalScreen from '@/screens/HealthGoalScreen';
import MealPlanningScreen from '@/screens/MealPlanningScreen';
import FoodDatabaseScreen from '@/screens/FoodStack/FoodDatabaseScreen';
import FoodDetailScreen from '@/screens/FoodStack/FoodDetailScreen';

import { Recipe } from '@/types/FoodApi';
import { MealCategory } from '@/types/Meal';
import { NavigationTheme } from 'react-native-paper/lib/typescript/src/types';

export type FoodStackParamList = {
  'Food database': { date: Date; mealCategory: MealCategory } | undefined;
  'Food detail': { recipe: Recipe };
};

const Stack = createNativeStackNavigator<FoodStackParamList>();

function FoodStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Food database"
        component={FoodDatabaseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Food detail" component={FoodDetailScreen} />
    </Stack.Navigator>
  );
}

export type RootTabParamList = {
  'Health Goals': undefined;
  FoodStack: NavigatorScreenParams<FoodStackParamList>;
  'Meal Planning': { date: Date; mealCategory: MealCategory } | undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

function RootTabs() {
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
        name="FoodStack"
        component={FoodStack}
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

type Props = {
  navigationTheme: NavigationTheme;
};

export default function Routes({ navigationTheme }: Props) {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootTabs />
    </NavigationContainer>
  );
}
