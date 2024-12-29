import { StyleSheet } from "react-native";
import Button from "~/src/components/ui/Button";

import ParallaxScrollView from "~/src/components/ui/ParallaxScrollView";
import { ThemedText } from "~/src/components/ui/ThemedText";
import { ThemedView } from "~/src/components/ui/ThemedView";
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
