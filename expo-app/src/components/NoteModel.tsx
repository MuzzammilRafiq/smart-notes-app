import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedView } from "./ui/ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../constants/Colors";

interface ModelProps {
  body: string;
  title: string;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  setTitle: (value: string) => void;
  setBody: (value: string) => void;
  handleSubmit: () => void;
  handleClose: () => void;
}
export default function NoteModel({
  title,
  body,
  isModalVisible,
  handleClose,
  handleSubmit,
  setBody,
  setIsModalVisible,
  setTitle,
}: ModelProps) {
  return (
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
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Title"
                />
                <TextInput
                  style={[styles.input, styles.bodyInput]}
                  value={body}
                  onChangeText={setBody}
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
                  onPress={handleSubmit}
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
  );
}

const styles = StyleSheet.create({
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
