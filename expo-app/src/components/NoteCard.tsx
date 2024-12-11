// NoteCard.tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface NoteProps {
  text: string;
  timestamp?: Date;
  backgroundColor?: string;
  category?: string;
}

export const NoteCard: React.FC<NoteProps> = ({
  text,
  timestamp = new Date(),
  backgroundColor,
  category,
}) => {
  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={styles.noteText}>{text}</ThemedText>
      <ThemedText style={styles.timestamp}>
        {category}
        {timestamp.toLocaleDateString()}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: "flex-end",
  },
});
