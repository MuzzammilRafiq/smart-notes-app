// NoteCard.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { Link } from "expo-router";
import { NoteType } from "../utils/types";
import { COLORS, SPACING } from "../utils/constants";

export const NoteCard = ({ note }: { note: NoteType }) => {
  // note.created_at = new Date(note.created_at);
  // note.updated_at = new Date(note.updated_at);

  const previewText =
    note.body.substring(0, 40) + (note.body.length > 40 ? "..." : "");
  const { id, ...other } = note;
  return (
    <Link
      href={{
        // @ts-ignore
        pathname: `/note/${note.id}`,
        params: {
          ...other,
          created_at: new Date(note.created_at).toISOString(),
          updated_at: new Date(note.updated_at).toISOString(),
        },
      }}
      style={styles.card}
    >
      <View>
        <ThemedText style={styles.title}>{note.title}</ThemedText>
        <ThemedText style={styles.preview}>{previewText}</ThemedText>
        <ThemedText style={styles.date}>
          {new Date(note.updated_at).toLocaleString(undefined, {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </ThemedText>
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
