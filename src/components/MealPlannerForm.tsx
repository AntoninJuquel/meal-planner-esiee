import { Diet, TimeFrame } from '@/types/Spoonacular';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, TextInput } from 'react-native-paper';

type Props = {
  getMealPlan: (calories: number, timeFrame: TimeFrame, diet: Diet) => void;
};

export default function MealForm({ getMealPlan }: Props) {
  const [calories, setCalories] = useState('');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.Day);
  const [timeFrameMenuVisible, setTimeFrameMenuVisible] = useState(false);
  const [diet, setDiet] = useState<Diet>(Diet.None);
  const [dietMenuVisible, setDietMenuVisible] = useState(false);

  function onPress() {
    getMealPlan(Number(calories), timeFrame, diet);
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        label="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="decimal-pad"
        placeholder='e.g. "2000"'
      />
      <View style={styles.menuRow}>
        <Menu
          visible={timeFrameMenuVisible}
          onDismiss={() => setTimeFrameMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              icon="chevron-down"
              contentStyle={styles.menuButtonContent}
              onPress={() => setTimeFrameMenuVisible(true)}>
              {timeFrame}
            </Button>
          }>
          {Object.values(TimeFrame).map((timeFrame) => (
            <Menu.Item
              key={timeFrame}
              onPress={() => {
                setTimeFrame(timeFrame);
                setTimeFrameMenuVisible(false);
              }}
              title={timeFrame}
            />
          ))}
        </Menu>
        <Menu
          visible={dietMenuVisible}
          onDismiss={() => setDietMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              icon="chevron-down"
              contentStyle={styles.menuButtonContent}
              onPress={() => setDietMenuVisible(true)}>
              {diet}
            </Button>
          }>
          {Object.values(Diet).map((diet) => (
            <Menu.Item
              key={diet}
              onPress={() => {
                setDiet(diet);
                setDietMenuVisible(false);
              }}
              title={diet}
            />
          ))}
        </Menu>
        <Button mode="contained" onPress={onPress}>
          Calculate
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  menuRow: {
    flexDirection: 'row',
    gap: 5,
  },
  menuButtonContent: {
    flexDirection: 'row-reverse',
  },
});
