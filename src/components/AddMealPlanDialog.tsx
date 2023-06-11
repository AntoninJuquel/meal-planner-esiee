import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Text, Button, Menu, Portal, IconButton, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { MealCategory } from '@/types/Meal';
import { mealCategoryIcons } from '@/utils/mealCategory';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onAddMeal: (date: Date, mealCategory: MealCategory) => void;
};

export default function AddMealPlanDialog({ onAddMeal, onDismiss, visible }: Props) {
  const { colors } = useTheme();
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [inputDateOpen, setInputDateOpen] = useState(false);
  const [mealCategory, setMealCategory] = useState<MealCategory>(MealCategory.BREAKFAST);

  const selectDate = (date: Date | undefined) => {
    setInputDate(date);
    setInputDateOpen(false);
  };

  const handleAddMeal = () => {
    if (!inputDate) return;
    onAddMeal(inputDate, mealCategory);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Add to meal plan</Dialog.Title>
        <Dialog.Content style={{ alignItems: 'center' }}>
          <Button onPress={() => setInputDateOpen(true)} uppercase={false} mode="outlined">
            {inputDate?.toLocaleDateString() ?? 'Select date'}
          </Button>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={inputDateOpen}
            onDismiss={() => setInputDateOpen(false)}
            date={inputDate}
            onConfirm={(e) => selectDate(e.date)}
          />
          <Text style={styles.text} variant="titleLarge">
            {mealCategory}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {Object.values(MealCategory).map((category) => (
              <IconButton
                key={category}
                icon={mealCategoryIcons[category]}
                onPress={() => setMealCategory(category)}
                iconColor={category === mealCategory ? colors.background : colors.onBackground}
                containerColor={category === mealCategory ? colors.tertiary : colors.elevation.level0}
              />
            ))}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleAddMeal}>Add</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  inputDateContainer: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
