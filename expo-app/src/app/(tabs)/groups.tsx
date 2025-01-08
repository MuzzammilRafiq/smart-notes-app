import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useGetNotes } from "~/src/api/notes";

import ParallaxScrollView from "~/src/components/ui/ParallaxScrollView";
import { ThemedText } from "~/src/components/ui/ThemedText";
import { ThemedView } from "~/src/components/ui/ThemedView";
import { useAuth } from "~/src/providers/AuthProvider";
import { SPACING } from "~/src/utils/constants";
import { NoteType } from "~/src/utils/types";

export default function Notes() {
  const { profile } = useAuth();
  const { data: notes, error, isLoading } = useGetNotes(profile?.id as string);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || notes === undefined) {
    console.error("Error fetching notes:", error?.message);
    return <ThemedText>something went wrong</ThemedText>;
  }
  let group = new Map<string, NoteType[]>();
  notes?.map((note) => {
    if (group.has(note.group)) {
      group.get(note.group)?.push(note);
    } else {
      group.set(note.group, [note]);
    }
  });
  return (
    <ParallaxScrollView>
      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 7,
          justifyContent: "space-evenly",
        }}
      >
        {Array.from(group.keys()).map((key, index) => (
          <NoteBlock key={index} title={key} data={group.get(key)!} />
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}
const NoteBlock = ({ title, data }: { title: string; data: NoteType[] }) => {
  // console.log(title);

  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 60%, 70%)`;

  return (
    <Link
      href={{
        // @ts-ignore
        pathname: `/group/${title}`,
        params: { data: JSON.stringify(data) },
      }}
    >
      <ThemedView style={[styles.block, { backgroundColor: randomColor }]}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
      </ThemedView>
    </Link>
  );
};
const styles = StyleSheet.create({
  block: {
    width: 100, // reduced size
    height: 100, // reduced size
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
