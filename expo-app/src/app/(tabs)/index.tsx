import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useInsertNote, useGetNotes } from "~/src/api/notes";

import { NoteCard } from "~/src/components/NoteCard";
import NoteModel from "~/src/components/NoteModel";
import ParallaxScrollView from "~/src/components/ui/ParallaxScrollView";
import { ThemedText } from "~/src/components/ui/ThemedText";
import { ThemedView } from "~/src/components/ui/ThemedView";
import { Colors } from "~/src/constants/Colors";
import { useAuth } from "~/src/providers/AuthProvider";

export default function Notes() {
  const { profile } = useAuth();
  const { data: notes, error, isLoading } = useGetNotes(profile?.id as string);
  const insertNote = useInsertNote();
  const [newNoteTitle, setNewNoteTitle] = React.useState("");
  const [newNoteBody, setNewNoteBody] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleAddNote = async () => {
    if (newNoteTitle.trim() && newNoteBody.trim()) {
      insertNote.mutate({
        title: newNoteTitle,
        body: newNoteBody,
        user_id: profile?.id,
      });
      setNewNoteTitle("");
      setNewNoteBody("");
      setIsModalVisible(false);
    }
  };
  const handleClose = () => {
    setIsModalVisible(false);
    setNewNoteTitle("");
    setNewNoteBody("");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || notes === undefined) {
    console.error("Error fetching notes:", error?.message);
    return <ThemedText>something went wrong</ThemedText>;
  }

  return (
    <ParallaxScrollView title="Notes">
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <ThemedText style={styles.addButtonText}>Add Note</ThemedText>
      </TouchableOpacity>
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
        <NoteModel
          body={newNoteBody}
          handleClose={handleClose}
          handleSubmit={handleAddNote}
          isModalVisible={isModalVisible}
          setBody={setNewNoteBody}
          setIsModalVisible={setIsModalVisible}
          setTitle={setNewNoteTitle}
          title={newNoteTitle}
        />
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
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    width: "40%",
    alignSelf: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
