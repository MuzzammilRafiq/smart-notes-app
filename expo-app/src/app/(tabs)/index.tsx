import { Href, Link } from "expo-router";
import { StyleSheet } from "react-native";
import { NoteCard } from "~/src/components/NoteCard";

import ParallaxScrollView from "~/src/components/ParallaxScrollView";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { dummyNotes } from "~/src/utils/dummdata";

export default function TabTwoScreen() {
  const notes = dummyNotes;
  return (
    <ParallaxScrollView title="Search">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
        <ThemedView
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          {notes?.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              dateCreated={note.dateCreated}
              group={note.group}
            />
          ))}
        </ThemedView>

        {/* <Link href="/note/bacon">View user</Link> */}
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
    flexDirection: "column",
    gap: 8,
  },
});
