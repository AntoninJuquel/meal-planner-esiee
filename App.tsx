import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from '@/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
