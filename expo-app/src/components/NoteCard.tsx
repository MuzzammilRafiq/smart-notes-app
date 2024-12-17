// NoteCard.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";
import { Note } from "../utils/types";

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

const COLORS = {
  cardBg: "#ffffff",
  border: "#e0e0e0",
  title: "#2d3748",
  preview: "#718096",
};

export const NoteCard: React.FC<Note> = (note) => {
  const previewText =
    note.body.substring(0, 40) + (note.body.length > 40 ? "..." : "");
  const formattedDate = new Date(note.dateCreated).toLocaleDateString();

  return (
    <Link
      href={{
        // @ts-ignore
        pathname: `/note/${note.id}`,
        params: {
          title: note.title,
          body: note.body,
          dateCreated: note.dateCreated.toISOString(),
          group: note.group,
        },
      }}
      style={styles.card}
    >
      <View>
        <ThemedText style={styles.title}>{note.title}</ThemedText>
        <ThemedText style={styles.preview}>{previewText}</ThemedText>
        <ThemedText style={styles.date}>{formattedDate}</ThemedText>
      </View>
    </Link>
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
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.title,
    marginBottom: SPACING.xs,
  },
  preview: {
    fontSize: 14,
    color: COLORS.preview,
    marginBottom: SPACING.sm,
  },
  date: {
    fontSize: 12,
    color: COLORS.preview,
    marginTop: SPACING.xs,
  },
});
