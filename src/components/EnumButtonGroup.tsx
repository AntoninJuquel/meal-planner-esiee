import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';

type Props<T> = {
  title?: string;
  values: T[];
  selected: T;
  icons: (value: T) => string;
  setSelected: (value: T) => void;
  style?: ViewStyle;
};

export default function EnumButtonGroup<T>({ values, icons, selected, setSelected, title, style }: Props<T>) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { borderColor: colors.scrim }, style]}>
      {title ? (
        <Text style={styles.text} variant="titleLarge">
          {title}
        </Text>
      ) : null}
      <View style={styles.buttonRow}>
        {values.map((value) => (
          <IconButton
            key={value as string}
            icon={icons(value)}
            onPress={() => setSelected(value)}
            iconColor={selected === value ? colors.background : colors.onBackground}
            containerColor={selected === value ? colors.tertiary : colors.elevation.level0}
          />
        ))}
      </View>
      <Text style={styles.text} variant="titleSmall">
        {selected as string}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  text: {
    textAlign: 'center',
  },
});
