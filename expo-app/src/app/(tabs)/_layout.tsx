import { Platform } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { HapticTab } from "~/src/components/HapticTab";
import TabBarBackground from "~/src/components/ui/TabBarBackground";
import { Colors } from "~/src/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes",
          tabBarIcon: ({}) => (
            <FontAwesome5 name="sticky-note" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          tabBarIcon: ({}) => (
            <MaterialIcons name="search" size={24} color="blue" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({}) => (
            <FontAwesome name="gear" size={24} color="green" active={true} />
          ),
        }}
      />
    </Tabs>
  );
}
