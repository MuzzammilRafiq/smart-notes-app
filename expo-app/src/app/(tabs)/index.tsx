import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet } from "react-native";

import Button from "~/src/components/Button";
import { NoteCard } from "~/src/components/NoteCard";
import ParallaxScrollView from "~/src/components/ParallaxScrollView";
import { ThemedText } from "~/src/components/ThemedText";
import { ThemedView } from "~/src/components/ThemedView";
import { supabase } from "~/src/supabase/supabase";
import { NoteType} from "~/src/utils/types";

export default function Notes() {
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery<NoteType[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data as NoteType[];
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || notes === undefined) {
    console.error("Error fetching notes:", error?.message);
    return <ThemedText>something went wrong</ThemedText>;
  }

  // console.log("notes", notes[0].created_at);

  return (
    <ParallaxScrollView title="Search">
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
        <ThemedView
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          {notes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
          <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
        </ThemedView>

        {/* <Link href="/note/bacon">View user</Link> */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
