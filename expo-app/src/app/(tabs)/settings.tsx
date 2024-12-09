import { StyleSheet } from "react-native";

import ParallaxScrollView from "~/src/components/ParallaxScrollView";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView title="Settings">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
