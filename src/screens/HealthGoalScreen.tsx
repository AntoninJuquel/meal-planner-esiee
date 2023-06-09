import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, IconButton, Menu, Chip, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Gender } from '@/types/Gender';
import { ActivityLevel } from '@/types/ActivityLevel';
import { HealthGoal } from '@/types/HealthGoal';

import { calculateBMR } from '@/utils/calculateBMR';
import { activityLevelIcon } from '@/utils/activityLevel';
import { healthGoalIcon } from '@/utils/healthGoal';
import { genderIcon } from '@/utils/gender';

const HEALTH_GOALS = 'healthGoals';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.MODERATE);
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(HealthGoal.MAINTAIN);

  const [bmr, setBMR] = useState(0);

  function toggleGender() {
    setGender((prev) => {
      if (prev === Gender.Male) {
        return Gender.Female;
      }
      return Gender.Male;
    });
  }

  useEffect(() => {
    AsyncStorage.getItem(HEALTH_GOALS).then((value) => {
      if (value) {
        const goals = JSON.parse(value);
        setAge(goals.age.toString());
        setGender(goals.gender);
        setHeight(goals.height.toString());
        setWeight(goals.weight.toString());
        setActivityLevel(goals.activityLevel);
        setHealthGoal(goals.goal);
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
      goal: healthGoal,
    });

    AsyncStorage.setItem(
      HEALTH_GOALS,
      JSON.stringify({
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
        activityLevel,
        goal: healthGoal,
      })
    );

    setBMR(bmr);
  }, [age, height, weight, gender, activityLevel, healthGoal]);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={{ flex: 1 }}>
          <TextInput mode="outlined" label="Age" value={age} onChangeText={setAge} keyboardType="decimal-pad" />
          <IconButton icon={genderIcon(gender)} onPress={toggleGender} />
          <TextInput
            mode="outlined"
            label="Height"
            value={height}
            onChangeText={setHeight}
            keyboardType="decimal-pad"
            placeholder="(cm)"
            right={<TextInput.Affix text="cm" />}
          />
          <TextInput
            mode="outlined"
            label="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            placeholder="(kg)"
            right={<TextInput.Affix text="kg" />}
          />
          <View style={{ flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <Text style={styles.text} variant="titleLarge">
              Activity Level
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {Object.values(ActivityLevel).map((level) => (
                <IconButton
                  key={level}
                  icon={activityLevelIcon(level)}
                  onPress={() => setActivityLevel(level)}
                  iconColor={level === activityLevel ? colors.background : colors.onBackground}
                  containerColor={level === activityLevel ? colors.tertiary : colors.elevation.level0}
                />
              ))}
            </View>
            <Text style={styles.text} variant="titleSmall">
              {activityLevel}
            </Text>
            <Text style={styles.text} variant="titleLarge">
              Health Goal
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {Object.values(HealthGoal).map((goal) => (
                <IconButton
                  key={goal}
                  icon={healthGoalIcon(goal)}
                  onPress={() => setHealthGoal(goal)}
                  iconColor={goal === healthGoal ? colors.background : colors.onBackground}
                  containerColor={goal === healthGoal ? colors.tertiary : colors.elevation.level0}
                />
              ))}
            </View>
            <Text style={styles.text} variant="titleSmall">
              {healthGoal}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.text} variant="titleLarge">
            BMR
          </Text>
          <Text style={styles.text}>{bmr.toFixed(0)} calories/day</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
