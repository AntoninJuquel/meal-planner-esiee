import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { startOfWeek, endOfWeek, format } from 'date-fns';

export default function MealPlanningScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* <HorizontalDatepicker
        pickerType="date"
        minDate={startOfWeek(selectedDate)}
        maxDate={endOfWeek(selectedDate)}
        isShowYear={false}
        onDateSelected={(date) => {
          console.log(date);
          setSelectedDate(new Date(date));
        }}
      /> */}
      <Text>{format(selectedDate, 'dd/MM/yyyy')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedItemTextStyle: {
    color: '#fff',
  },
});
