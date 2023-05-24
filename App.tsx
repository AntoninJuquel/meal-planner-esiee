import { PaperProvider } from 'react-native-paper';

import Routes from '@/routes';

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
