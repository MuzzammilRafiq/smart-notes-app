import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { groupsColors } from "~/src/utils/groupsColors";
import { NoteType } from "~/src/utils/types";
import { Route } from "expo-router";
import { Colors } from "~/src/constants/Colors";
import Feather from "@expo/vector-icons/Feather";

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
            onPress={() => {
              // Navigation logic will go here
              console.log("Edit pressed");
            }}
          >
            <Feather name="edit" size={22} color={"white"} />
            {/* <ThemedText style={styles.editButtonText}>Edit</ThemedText> */}
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
