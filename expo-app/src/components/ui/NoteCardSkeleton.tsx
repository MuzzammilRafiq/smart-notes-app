import { COLORS, SPACING } from "~/src/utils/constants";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";

export const NoteCardSkeleton = () => {
  return (
    <ThemedView
      style={{
        flexDirection: "column",
        gap: 20,
        width: "80%",
        alignSelf: "center",
        marginTop: 30,
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <ThemedView key={i} style={styles.card}>
          <ThemedView style={styles.title} />
          <ThemedView style={styles.preview} />
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    height: 150,
  },
  title: {
    width: "40%",
    height: 20,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.border,
    borderRadius: SPACING.xs,
  },

  preview: {
    width: "100%",
    height: 40,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.border,
    borderRadius: SPACING.xs,
  },
});
