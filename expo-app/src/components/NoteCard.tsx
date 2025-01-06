// NoteCard.tsx
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { Link } from "expo-router";
import { NoteType } from "../utils/types";
import { COLORS, SPACING } from "../utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDeleteNote } from "../api/notes";

export const NoteCard = ({ note }: { note: NoteType }) => {
  const usedeleteNote = useDeleteNote();
  const handelDelete = async () => {
    usedeleteNote.mutate(note.id as string);
  };
  const createTwoButtonAlert = () =>
    Alert.alert(`Delete "${note.title}" ?`, "", [
      {
        text: "Cancel",
      },
      { text: "Delete", onPress: handelDelete },
    ]);

  const previewText =
    note.body.substring(0, 100) + (note.body.length > 100 ? "..." : "");
  const { id, ...other } = note;
  return (
    <View style={styles.card}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // backgroundColor: "red",
        }}
      >
        <ThemedText style={styles.title}>{note.title}</ThemedText>
        <AntDesign
          name="delete"
          size={24}
          color="black"
          onPress={createTwoButtonAlert}
          style={{ color: "brown" }}
        />
      </View>
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
      >
        <ThemedText style={styles.preview}>{previewText}</ThemedText>
        {"\n"}
        <ThemedText style={styles.date}>
          {new Date(note.updated_at).toLocaleString(undefined, {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </ThemedText>
      </Link>
    </View>
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
    // position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
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
