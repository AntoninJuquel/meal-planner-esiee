import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MealPlannerScreen from '@/screens/MealPlannerScreen';

const Stack = createNativeStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MealPlannerScreen"
        component={MealPlannerScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
