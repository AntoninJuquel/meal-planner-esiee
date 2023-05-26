import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { en, registerTranslation } from 'react-native-paper-dates'

import Routes from '@/routes';
import { MealPlannerProvider } from '@/context/MealPlannerContext';

registerTranslation('en', en)

export default function App() {
  return (
    <SafeAreaProvider>
      <MealPlannerProvider>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </MealPlannerProvider>
    </SafeAreaProvider>
  );
}
