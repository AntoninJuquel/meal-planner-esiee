import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';

import MealPlanApiService from '@/services/MealPlanApiService';
import { AxiosError } from 'axios';

export default function App() {
  const [calories, setCalories] = useState('');
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    duration: 3000,
    action: {
      label: '',
      onPress: () => {},
    },
  });

  async function getMealPlan() {
    try {
      const res = await MealPlanApiService.getMealPlan({ calories: Number(calories) });
      console.log(res);
    } catch (e) {
      const error = e as AxiosError;
      setSnackbar({
        visible: true,
        message: error.message,
        duration: 3000,
        action: {
          label: 'Retry',
          onPress: getMealPlan,
        },
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="decimal-pad"
        />
        <Button mode="contained" onPress={getMealPlan}>
          Calculate
        </Button>
      </View>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        action={snackbar.action}
        duration={snackbar.duration}>
        {snackbar.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
});
