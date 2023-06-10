import 'react-native-gesture-handler';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { en, registerTranslation } from 'react-native-paper-dates';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Routes from '@/routes';
import { MealPlannerProvider } from '@/context/MealPlannerContext';
import { useColorScheme } from 'react-native';
import { PreferencesContext } from '@/context/PreferencesContext';
import themes from '@/themes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

registerTranslation('en', en);

const THEME_DARK = 'isThemeDark';

export default function App() {
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = useState(false);
  const theme = isThemeDark ? themes.dark : themes.light;

  useEffect(() => {
    AsyncStorage.getItem(THEME_DARK).then((value) => {
      if (value) {
        setIsThemeDark(JSON.parse(value));
      } else {
        setIsThemeDark(colorScheme === 'dark');
      }
    });
  }, [colorScheme]);

  useEffect(() => {
    NavigationBar.setButtonStyleAsync(isThemeDark ? 'light' : 'dark');
    NavigationBar.setBackgroundColorAsync(theme.paper.colors.surface);
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, [isThemeDark, theme]);

  const toggleTheme = useCallback(async () => {
    const value = !isThemeDark;
    await AsyncStorage.setItem(THEME_DARK, JSON.stringify(value));
    return setIsThemeDark(value);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <SafeAreaProvider>
      <MealPlannerProvider>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme.paper}>
            <StatusBar style={isThemeDark ? 'light' : 'dark'} translucent backgroundColor="transparent" />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Routes navigationTheme={theme.navigation} />
            </GestureHandlerRootView>
          </PaperProvider>
        </PreferencesContext.Provider>
      </MealPlannerProvider>
    </SafeAreaProvider>
  );
}
