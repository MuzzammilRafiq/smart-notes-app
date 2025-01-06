import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "~/src/components/ui/ThemedText";
import { ThemedView } from "~/src/components/ui/ThemedView";
import { NoteType } from "~/src/utils/types";
import { Route } from "expo-router";
import ParallaxScrollView from "~/src/components/ui/ParallaxScrollView";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NoteCard } from "~/src/components/NoteCard";

export default function NoteScreen() {
  const params = useLocalSearchParams<NoteType & Route>();
  const notes = JSON.parse(params.data as string) as NoteType[];
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedView
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          {notes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    width: "40%",
    alignSelf: "center",
  },
});
