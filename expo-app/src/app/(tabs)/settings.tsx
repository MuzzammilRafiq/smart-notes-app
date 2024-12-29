import { StyleSheet } from "react-native";
import Button from "~/src/components/Button";

import ParallaxScrollView from "~/src/components/ParallaxScrollView";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { supabase } from "~/src/supabase/supabase";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView title="Settings">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
        <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
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
