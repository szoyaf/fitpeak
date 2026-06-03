import {
  LibreBodoni_400Regular,
  useFonts,
} from "@expo-google-fonts/libre-bodoni";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    LibreBodoni_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
    </GluestackUIProvider>
  );
}
