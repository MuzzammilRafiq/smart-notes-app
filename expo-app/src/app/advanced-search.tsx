import { Route, useLocalSearchParams } from "expo-router";
import { ThemedView } from "../components/ui/ThemedView";
import { ThemedText } from "../components/ui/ThemedText";
import React from "react";
import { NoteCardSkeleton } from "../components/ui/NoteCardSkeleton";
import { useGetNotesByIds } from "../api/notes";
import ParallaxScrollView from "../components/ui/ParallaxScrollView";
import { NoteCard } from "../components/NoteCard";
import NoteModel from "../components/NoteModel";
import { StyleSheet } from "react-native";
export default function AdvancedSearchScreen() {
  const { searchQuery, user_id } = useLocalSearchParams<
    { searchQuery: string; user_id: string } & Route
  >();
  // console.log(searchQuery, user_id);
  const {
    data: notes,
    error,
    isLoading,
  } = useGetNotesByIds(user_id as string, searchQuery as string);
  if (isLoading) {
    return <NoteCardSkeleton />;
  }

  if (error || notes === undefined) {
    console.error("Error fetching notes:", error?.message);
    return <ThemedText>something went wrong</ThemedText>;
  }

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
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
