import { useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AxiosError } from 'axios';

import MealPlannerForm from '@/components/MealPlannerForm';
import MealPlannerSection from '@/components/MealPlannerSection';
import MealCard from '@/components/MealCard';

import MealPlanApiService from '@/services/SpoonacularApiService';
import { Diet, MealPlanSection, TimeFrame } from '@/types/Spoonacular';

export default function SearchScreen() {
  const [sections, setSections] = useState<MealPlanSection[]>([]);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    duration: 3000,
    action: {
      label: '',
      onPress: () => {},
    },
  });

  const insets = useSafeAreaInsets();

  async function getMealPlan(calories: number, timeFrame: TimeFrame, diet: Diet) {
    try {
      const { data } = await MealPlanApiService.getMealPlan({ timeFrame, calories: Number(calories), diet });

      if ('week' in data) {
        setSections(
          Object.keys(data.week).map<MealPlanSection>((d) => {
            const day = d as keyof typeof data.week;
            return {
              day,
              data: data.week[day].meals,
              nutrients: data.week[day].nutrients,
            };
          })
        );
      } else {
        setSections([
          {
            day: 'Today',
            data: data.meals,
            nutrients: data.nutrients,
          },
        ]);
      }
    } catch (e) {
      const error = e as AxiosError;
      setSnackbar({
        visible: true,
        message: error.message,
        duration: 3000,
        action: {
          label: 'Retry',
          onPress: () => getMealPlan(calories, timeFrame, diet),
        },
      });
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MealPlannerForm getMealPlan={getMealPlan} />
      <SectionList
        sections={sections}
        renderSectionHeader={MealPlannerSection.Header}
        renderItem={({ item }) => <MealCard meal={item} />}
        renderSectionFooter={MealPlannerSection.Footer}
        SectionSeparatorComponent={MealPlannerSection.SectionSeparator}
        ItemSeparatorComponent={MealPlannerSection.ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom, paddingHorizontal: 10 }}
      />
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
