import { Platform, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { HapticTab } from "~/src/components/HapticTab";
import TabBarBackground from "~/src/components/ui/TabBarBackground";
import { Colors } from "~/src/constants/Colors";
import { useAuth } from "~/src/providers/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? "light"].tint;
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: 10,
            paddingTop: 10,
            height: 70,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          default: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            paddingBottom: 10,
            paddingTop: 10,
            height: 70,
            backgroundColor: Colors[colorScheme ?? "light"].background,
            elevation: 4,
          },
        }),
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          tabBarIcon: () => (
            <FontAwesome5
              name="sticky-note"
              size={24}
              color={tintColor}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: () => (
            <MaterialIcons
              name="search"
              size={24}
              color={tintColor}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => (
            <FontAwesome
              name="gear"
              size={24}
              color={tintColor}
              style={styles.tabIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iosTabBar: {
    paddingBottom: 20,
  },
  androidTabBar: {
    paddingBottom: 10,
  },
  tabBarItem: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    opacity: 0.8,
    transform: [{ scale: 1 }],
  },
});
