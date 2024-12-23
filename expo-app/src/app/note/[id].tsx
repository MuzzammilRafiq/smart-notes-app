import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { groupsColors } from "~/src/utils/groupsColors";
import { NoteType } from "~/src/utils/types";
import { Route } from "expo-router";
import { Colors } from "~/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateNote } from "~/src/api/notes";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NoteScreen() {
  const params = useLocalSearchParams<NoteType & Route>();
  const [note, setNote] = useState<NoteType>({
    id: params.id as string,
    title: params.title as string,
    body: params.body as string,
    group: params.group as string,
    created_at: new Date(params.created_at as string),
    updated_at: new Date(params.updated_at as string),
    userId: params.userId as string,
    embed_id: params.embed_id as string,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editBody, setEditBody] = useState(note.body);
  const theme = useColorScheme() ?? "light";
  // console.log(JSON.stringify(updateNoteMutation));

  const handleClose = () => {
    setIsModalVisible(false);
    setEditBody(note.body);
    setEditTitle(note.title);
  };
  const updateNoteMutation = useUpdateNote({
    id: Array.isArray(params.id) ? params.id[0] : params.id,
    title: editTitle,
    body: editBody,
  });

  const handleSave = async () => {
    try {
      const data = await updateNoteMutation.mutateAsync();
      setNote({
        ...note,
        title: data.title,
        body: data.body,
        updated_at: new Date(data.updated_at),
        group: data.group,
        embed_id: data.embed_id,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (updateNoteMutation.isPending) {
    return <ActivityIndicator />;
  }

  return (
    <ThemedView style={styles.container} className="bg-gray-100">
      <ThemedView style={styles.card}>
        <ThemedView style={styles.header}>
          <ThemedView
            style={[
              styles.groupContainer,
              { backgroundColor: groupsColors[theme]["personal"] },
            ]}
          >
            <ThemedText style={styles.group}>{note.group}</ThemedText>
          </ThemedView>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Feather name="edit" size={22} color={"white"} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText style={styles.title}>{note.title}</ThemedText>
        <ThemedView style={styles.divider} />
        <ThemedText style={styles.body}>{note.body}</ThemedText>

        <ThemedView style={styles.metaContainer}>
          <ThemedText style={styles.date}>
            Created: {formatDate(note.created_at)}
          </ThemedText>
          {formatDate(note.updated_at) !== formatDate(note.created_at) && (
            <ThemedText style={styles.date}>
              Updated: {formatDate(note.updated_at)}
            </ThemedText>
          )}
        </ThemedView>
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
                <ThemedView style={{ backgroundColor: "white", width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    value={editTitle}
                    onChangeText={setEditTitle}
                    placeholder="Title"
                  />
                  <TextInput
                    style={[styles.input, styles.bodyInput]}
                    value={editBody}
                    onChangeText={setEditBody}
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
                    onPress={handleSave}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  groupContainer: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  group: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
    // letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 34,
  },
  metaContainer: {
    // marginBottom: 10,
    opacity: 0.5,
  },
  date: {
    fontSize: 10,
  },
  userId: {
    fontSize: 12,
    fontStyle: "italic",
  },
  body: {
    fontSize: 14,
    fontWeight: "500",
    // lineHeight: 28,
    marginBottom: 20,
  },
  embedContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: Colors.light.tint,
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
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
