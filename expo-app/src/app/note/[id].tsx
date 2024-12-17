import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { useColorScheme } from "~/src/hooks/useColorScheme.web";
import { groupsColors } from "~/src/utils/groupsColors";

export default function NoteScreen() {
  const theme = useColorScheme() ?? "light";
  const { id, title, body, dateCreated, group } = useLocalSearchParams<{
    id: string;
    title: string;
    body: string;
    dateCreated: string;
    group: "work" | "personal" | "health" | "creative" | "default";
  }>();
  const formattedDate = new Date(dateCreated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(group);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedView
          style={[
            styles.groupContainer,
            { backgroundColor: groupsColors[theme]["personal"] },
          ]}
        >
          <ThemedText style={styles.group}>{group}</ThemedText>
        </ThemedView>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.date}>{formattedDate}</ThemedText>
        <ThemedText style={styles.body}>{body}</ThemedText>
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
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});
