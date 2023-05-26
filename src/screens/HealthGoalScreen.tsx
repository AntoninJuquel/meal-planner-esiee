import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, Menu, Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Gender } from '@/types/Gender';
import { ActivityLevel } from '@/types/ActivityLevel';
import { HealthGoal } from '@/types/HealthGoal';

import { calculateBMR } from '@/utils/calculateBMR';

const genderIcons: Record<Gender, string> = {
  [Gender.Male]: 'gender-male',
  [Gender.Female]: 'gender-female',
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.SEDENTARY);
  const [activityLevelMenuOpen, setActivityLevelMenuOpen] = useState(false);
  const [goal, setGoal] = useState<HealthGoal>(HealthGoal.LOSE);
  const [goalMenuOpen, setGoalMenuOpen] = useState(false);

  const [bmr, setBMR] = useState(0);

  function toggleGender() {
    setGender((prev) => {
      if (prev === Gender.Male) {
        return Gender.Female;
      }
      return Gender.Male;
    });
  }

  function selectActivityLevel(level: ActivityLevel) {
    setActivityLevel(level);
    setActivityLevelMenuOpen(false);
  }

  function selectGoal(goal: HealthGoal) {
    setGoal(goal);
    setGoalMenuOpen(false);
  }

  useEffect(() => {
    if (!age || !height || !weight) {
      return;
    }

    const bmr = calculateBMR({
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      activityLevel,
      goal,
    });

    setBMR(bmr);
  }, [age, height, weight, gender, activityLevel, goal]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TextInput label="Age" value={age} onChangeText={setAge} keyboardType="decimal-pad" />
      <IconButton icon={genderIcons[gender]} onPress={toggleGender} />
      <TextInput
        label="Height"
        value={height}
        onChangeText={setHeight}
        keyboardType="decimal-pad"
        placeholder="in (cm)"
      />
      <TextInput
        label="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="in (kg)"
      />
      <Menu
        visible={activityLevelMenuOpen}
        onDismiss={() => setActivityLevelMenuOpen(false)}
        anchor={<Button onPress={() => setActivityLevelMenuOpen(true)}>{activityLevel}</Button>}>
        {Object.values(ActivityLevel).map((level) => (
          <Menu.Item key={level} title={level} onPress={() => selectActivityLevel(level)} />
        ))}
      </Menu>
      <Menu
        visible={goalMenuOpen}
        onDismiss={() => setGoalMenuOpen(false)}
        anchor={<Button onPress={() => setGoalMenuOpen(true)}>{goal}</Button>}>
        {Object.values(HealthGoal).map((goal) => (
          <Menu.Item key={goal} title={goal} onPress={() => selectGoal(goal)} />
        ))}
      </Menu>
      <Text style={styles.textStyle} variant="bodyLarge">
        Goal : {bmr.toFixed(0)} kcal per day
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});
