import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useInsertNote, useNotes } from "~/src/api/notes";

import { NoteCard } from "~/src/components/NoteCard";
import ParallaxScrollView from "~/src/components/ParallaxScrollView";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { Colors } from "~/src/constants/Colors";
import { useAuth } from "~/src/providers/AuthProvider";

export default function Notes() {
  const { profile } = useAuth();
  const { data: notes, error, isLoading } = useNotes(profile?.id as string);
  const insertNote = useInsertNote();
  const [newNoteTitle, setNewNoteTitle] = React.useState("");
  const [newNoteBody, setNewNoteBody] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleAddNote = async () => {
    if (newNoteTitle.trim() && newNoteBody.trim()) {
      const r = insertNote.mutate({
        title: newNoteTitle,
        body: newNoteBody,
        user_id: profile?.id,
      });
      setNewNoteTitle("");
      setNewNoteBody("");
      setIsModalVisible(false);
      console.log("Note added", r);
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <ThemedView style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <ThemedView style={styles.modalContent}>
                  <ThemedView
                    style={{ backgroundColor: "white", width: "100%" }}
                  >
                    <TextInput
                      style={styles.input}
                      value={newNoteTitle}
                      onChangeText={setNewNoteTitle}
                      placeholder="Title"
                    />
                    <TextInput
                      style={[styles.input, styles.bodyInput]}
                      value={newNoteBody}
                      onChangeText={setNewNoteBody}
                      placeholder="Body"
                      multiline
                    />
                  </ThemedView>
                  <ThemedView
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      backgroundColor: "white",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={handleAddNote}
                    >
                      <AntDesign name="save" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={handleClose}
                    >
                      <AntDesign name="closesquare" size={24} color="white" />
                    </TouchableOpacity>
                  </ThemedView>
                </ThemedView>
              </TouchableWithoutFeedback>
            </ThemedView>
          </TouchableWithoutFeedback>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    // height: 20,
    marginBottom: 10,
  },
  bodyInput: {
    height: 200,
    // textAlignVertical: "top",
  },
});
