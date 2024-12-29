import { StyleSheet } from "react-native";

import ParallaxScrollView from "~/src/components/ui/ParallaxScrollView";
import { ThemedText } from "~/src/components/ui/ThemedText";
import { ThemedView } from "~/src/components/ui/ThemedView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView title="Search">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
