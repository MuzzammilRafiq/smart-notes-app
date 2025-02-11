import { useLocalSearchParams } from "expo-router";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "~/src/components/ui/ThemedText";
import { ThemedView } from "~/src/components/ui/ThemedView";
import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { groupsColors } from "~/src/utils/groupsColors";
import { NoteType } from "~/src/utils/types";
import { Route } from "expo-router";
import { Colors } from "~/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { useUpdateNote } from "~/src/api/notes";
import NoteModel from "~/src/components/NoteModel";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState(params.title as string);
  const [editBody, setEditBody] = useState(params.body as string);
  const theme = useColorScheme() ?? "light";

  const handleClose = () => {
    setIsModalVisible(false);
    setEditBody(params.body as string);
    setEditTitle(params.title as string);
  };
  const updateNoteMutation = useUpdateNote({
    id: Array.isArray(params.id) ? params.id[0] : params.id,
    title: editTitle,
    body: editBody,
  });

  const handleSave = async () => {
    try {
      updateNoteMutation.mutateAsync();
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
            <ThemedText style={styles.group}>{params.group}</ThemedText>
          </ThemedView>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Feather name="edit" size={22} color={"white"} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText style={styles.title}>{params.title}</ThemedText>
        <ThemedView style={styles.divider} />
        <ThemedText style={styles.body}>{params.body}</ThemedText>

        <ThemedView style={styles.metaContainer}>
          <ThemedText style={styles.date}>
            Created: {formatDate(new Date(params.created_at as string))}
          </ThemedText>
          {formatDate(new Date(params.created_at as string)) !==
            formatDate(new Date(params.created_at as string)) && (
            <ThemedText style={styles.date}>
              Updated: {formatDate(new Date(params.created_at as string))}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>

      <NoteModel
        body={editBody}
        handleClose={handleClose}
        handleSubmit={handleSave}
        isModalVisible={isModalVisible}
        setBody={setEditBody}
        setIsModalVisible={setIsModalVisible}
        setTitle={setEditTitle}
        title={editTitle}
      />
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
});
