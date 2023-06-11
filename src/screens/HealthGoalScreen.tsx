import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { TextInput, IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Gender } from '@/types/Gender';
import { ActivityLevel } from '@/types/ActivityLevel';
import { HealthGoal } from '@/types/HealthGoal';

import { calculateBMR } from '@/utils/calculateBMR';
import { activityLevelIcon } from '@/utils/activityLevel';
import { healthGoalIcon } from '@/utils/healthGoal';
import { genderIcon } from '@/utils/gender';
import EnumButtonGroup from '@/components/EnumButtonGroup';
import { useMealPlanner } from '@/context/MealPlannerContext';

const HEALTH_GOALS = 'healthGoals';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const { bmr, setBMR } = useMealPlanner();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.MODERATE);
  const [healthGoal, setHealthGoal] = useState<HealthGoal>(HealthGoal.MAINTAIN);

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
    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
          paddingHorizontal: 16,
        }}>
        <Text style={styles.text} variant="titleLarge">
          Meal Shape
        </Text>
        <View>
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="decimal-pad"
              style={{ flex: 1 }}
            />
            <IconButton icon={genderIcon(gender)} onPress={toggleGender} />
          </View>
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
          <EnumButtonGroup<ActivityLevel>
            title="Activity Level"
            values={Object.values(ActivityLevel)}
            selected={activityLevel}
            setSelected={setActivityLevel}
            icons={activityLevelIcon}
          />
          <EnumButtonGroup<HealthGoal>
            title="Health Goal"
            values={Object.values(HealthGoal)}
            selected={healthGoal}
            setSelected={setHealthGoal}
            icons={healthGoalIcon}
          />
        </View>
        <View>
          <Text style={styles.text} variant="titleLarge">
            BMR
          </Text>
          <Text style={styles.text}>{bmr.toFixed(0)} calories/day</Text>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});
