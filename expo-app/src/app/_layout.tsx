import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthProvider from "../providers/AuthProvider";
import QueryProvider from "../providers/QueryProvider";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  const [loaded] = useFonts({
    SpaceMono: require("~/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={theme}>
      <AuthProvider>
        <QueryProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? theme.colors.background : "#fff",
            }}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="note/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaView>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
