import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NoteScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useColorScheme() ?? "light";
  const { id, body, created_at, embed_id, group, title, updated_at, userId } =
    useLocalSearchParams<NoteType & Route>();
  const createAtFormat = formatDate(created_at);
  const updatedAtFormat = formatDate(updated_at);
  console.log("embed_id", created_at, updated_at);
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.header}>
          <ThemedView
            style={[
              styles.groupContainer,
              { backgroundColor: groupsColors[theme]["personal"] },
            ]}
          >
            <ThemedText style={styles.group}>{group}</ThemedText>
          </ThemedView>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Feather name="edit" size={22} color={"white"} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedView style={styles.divider} />
        <ThemedText style={styles.body}>{body}</ThemedText>

        <ThemedView style={styles.metaContainer}>
          <ThemedText style={styles.date}>Created: {createAtFormat}</ThemedText>
          {updatedAtFormat !== createAtFormat && (
            <ThemedText style={styles.date}>
              Updated: {updatedAtFormat}
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
                <ThemedText style={styles.modalTitle}>Edit Note</ThemedText>
                {/* Add your edit form components here */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                </TouchableOpacity>
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
    width: "80%",
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
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
