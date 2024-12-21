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
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../components/ThemedView";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import AuthProvider from "../providers/AuthProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const theme = isDarkMode ? DarkTheme : DefaultTheme;
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? theme.colors.background : "#fff",
          }}
        >
          {/* {session && session.user ? ( */}
          <>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="note/[id]" />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </>
          {/* ) : ( */}
          {/* <Auth /> */}
          {/* )} */}
        </SafeAreaView>
      </AuthProvider>
    </ThemeProvider>
  );
}
