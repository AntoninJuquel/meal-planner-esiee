import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MealPlanSection } from '@/types/Spoonacular';

type Props = {
  section: MealPlanSection;
};

function Header({ section }: Props) {
  return <Text variant="titleLarge">{section.day}</Text>;
}

function Footer({ section: { nutrients } }: Props) {
  return (
    <View>
      {Object.keys(nutrients).map((n) => {
        const nutrient = n as keyof typeof nutrients;
        return (
          <Text key={nutrient}>
            {nutrient}: {nutrients[nutrient]}
          </Text>
        );
      })}
    </View>
  );
}

function ItemSeparator() {
  return (
    <View
      style={{
        height: 10,
        width: '100%',
      }}
    />
  );
}

function SectionSeparator() {
  return (
    <View
      style={{
        height: 10,
        width: '100%',
      }}
    />
  );
}

export default {
  Header,
  Footer,
  ItemSeparator,
  SectionSeparator
};
