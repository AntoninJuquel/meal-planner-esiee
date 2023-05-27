import { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { startOfWeek, endOfWeek, format, eachDayOfInterval, addDays } from 'date-fns';

type DateWheelItemProps = {
  date: Date;
  selectedDate: Date;
  onPress: (date: Date) => void;
};

function DateWheelItem({ date, selectedDate, onPress }: DateWheelItemProps) {
  const { colors } = useTheme();

  const selected = selectedDate.toDateString() === date.toDateString();

  const textStyle = [styles.text, { color: selected ? colors.onPrimary : colors.onBackground }];

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: selected ? colors.primary : 'transparent',
        },
      ]}
      onPress={() => onPress(date)}>
      <View>
        <Text style={textStyle} variant="labelLarge">
          {format(date, 'EEE').toUpperCase()}
        </Text>
        <Text style={textStyle} variant="labelLarge">
          {format(date, 'd')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type DateWheelProps = {
  onDateChange: (date: Date) => void;
  selectedDate: Date;
};

export default function DateWheel({ onDateChange, selectedDate }: DateWheelProps) {
  const { colors } = useTheme();

  const [dates, setDates] = useState<Date[]>(
    eachDayOfInterval({
      start: startOfWeek(new Date(), { weekStartsOn: 1 }),
      end: endOfWeek(new Date(), { weekStartsOn: 1 }),
    })
  );

  const addWeek = () => {
    const nextDate = addDays(dates[dates.length - 1], 1);

    const newDates = eachDayOfInterval({
      start: startOfWeek(nextDate, { weekStartsOn: 1 }),
      end: endOfWeek(nextDate, { weekStartsOn: 1 }),
    });

    setDates((prev) => [...prev, ...newDates]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={dates}
        renderItem={({ item }) => <DateWheelItem date={item} selectedDate={selectedDate} onPress={onDateChange} />}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.separator} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={addWeek}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginHorizontal: '2.5%',
    height: 75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  separator: {
    width: 10,
  },
  item: {
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
