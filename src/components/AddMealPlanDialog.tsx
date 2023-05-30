import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Text, Button, Menu, Portal } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { MealCategory } from '@/types/Meal';

type Props = {
  visible: boolean;
  close: () => void;
  onAddMeal: (date: Date, mealCategory: MealCategory) => void;
};

export default function AddMealPlanDialog({ onAddMeal, close, visible }: Props) {
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [inputDateOpen, setInputDateOpen] = useState(false);
  const [mealCategory, setMealCategory] = useState<MealCategory>(MealCategory.BREAKFAST);
  const [mealCategoryMenuVisible, setMealCategoryMenuVisible] = useState(false);

  const selectDate = (date: Date | undefined) => {
    setInputDate(date);
    setInputDateOpen(false);
  };

  const selectMealCategory = (meal: MealCategory) => {
    setMealCategory(meal);
    setMealCategoryMenuVisible(false);
  };

  const handleAddMeal = () => {
    if (!inputDate) return;
    onAddMeal(inputDate, mealCategory);
    close();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
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
          <Menu
            visible={mealCategoryMenuVisible}
            onDismiss={() => setMealCategoryMenuVisible(false)}
            anchor={<Button onPress={() => setMealCategoryMenuVisible(true)}>choose meal</Button>}>
            {Object.values(MealCategory).map((meal) => (
              <Menu.Item key={meal} onPress={() => selectMealCategory(meal)} title={meal} />
            ))}
          </Menu>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>Cancel</Button>
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
