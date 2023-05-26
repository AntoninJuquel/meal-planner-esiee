import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HealthGoalScreen from '@/screens/HealthGoalScreen';
import FoodDatabaseScreen from '@/screens/FoodStack/FoodDatabaseScreen';
import FoodDetailScreen from '@/screens/FoodStack/FoodDetailScreen';

import { Recipe } from '@/types/FoodApi';

type FoodStackParamList = {
  'Food database': undefined;
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

const Tab = createMaterialBottomTabNavigator();

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
        component={HealthGoalScreen}
        options={{
          tabBarIcon: 'calendar',
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <RootTabs />
    </NavigationContainer>
  );
}
