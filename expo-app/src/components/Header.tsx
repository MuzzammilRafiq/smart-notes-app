import { StyleSheet } from "react-native";

import { useColorScheme } from "~/src/hooks/useColorScheme";
import Animated from "react-native-reanimated";
import { ThemedText } from "~/src/components/ThemedText";

export default function Header({ title }: { title: string }) {
  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor = colorScheme == "light" ? "#f873ea" : "#98148b";
  return (
    <Animated.View style={[styles.header, { backgroundColor }]}>
      <ThemedText style={styles.header}>{title}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "500",
  },
});
