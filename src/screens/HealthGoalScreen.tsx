import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, Menu, Chip, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    AsyncStorage.getItem('goals').then((value) => {
      if (value) {
        const goals = JSON.parse(value);
        setAge(goals.age.toString());
        setGender(goals.gender);
        setHeight(goals.height.toString());
        setWeight(goals.weight.toString());
        setActivityLevel(goals.activityLevel);
        setGoal(goals.goal);
      }
    });
  }, []);

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

    AsyncStorage.setItem(
      'goals',
      JSON.stringify({
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
        activityLevel,
        goal,
      })
    );

    setBMR(bmr);
  }, [age, height, weight, gender, activityLevel, goal]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ flex: 1 }}>
        <TextInput mode="outlined" label="Age" value={age} onChangeText={setAge} keyboardType="decimal-pad" />
        <IconButton mode="outlined" icon={genderIcons[gender]} onPress={toggleGender} />
        <TextInput
          mode="outlined"
          label="Height"
          value={height}
          onChangeText={setHeight}
          keyboardType="decimal-pad"
          placeholder="in (cm)"
        />
        <TextInput
          mode="outlined"
          label="Weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
          placeholder="in (kg)"
        />
        <View style={{ flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <Menu
            visible={activityLevelMenuOpen}
            onDismiss={() => setActivityLevelMenuOpen(false)}
            anchor={
              <Chip mode="outlined" onPress={() => setActivityLevelMenuOpen(true)}>
                {activityLevel}
              </Chip>
            }>
            {Object.values(ActivityLevel).map((level) => (
              <Menu.Item key={level} title={level} onPress={() => selectActivityLevel(level)} />
            ))}
          </Menu>
          <Menu
            visible={goalMenuOpen}
            onDismiss={() => setGoalMenuOpen(false)}
            anchor={
              <Chip mode="outlined" onPress={() => setGoalMenuOpen(true)}>
                {goal}
              </Chip>
            }>
            {Object.values(HealthGoal).map((goal) => (
              <Menu.Item key={goal} title={goal} onPress={() => selectGoal(goal)} />
            ))}
          </Menu>
        </View>
      </View>
      <View>
        <Text style={styles.text} variant="titleLarge">
          BMR
        </Text>
        <Text style={styles.text}>{bmr.toFixed(0)} calories/day</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    textAlign: 'center',
  },
});
