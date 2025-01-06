import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useNotes } from "~/src/api/notes";
// import { NoteCard } from "~/src/components/NoteCard";
import ParallaxScrollView from "~/src/components/ui/ParallaxScrollView";
import { ThemedView } from "~/src/components/ui/ThemedView";
import { useAuth } from "~/src/providers/AuthProvider";
import { NoteType } from "~/src/utils/types";

const HighlightedText = ({ text, searchQuery, style, isBody = false }: any) => {
  if (!searchQuery) {
    return (
      <Text style={style}>{isBody ? text.slice(0, 100) + "..." : text}</Text>
    );
  }

  const getPreviewText = ({
    text,
    searchQuery,
  }: {
    text: string;
    searchQuery: string;
  }) => {
    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index === -1) return { text, startEllipsis: false, endEllipsis: false };

    const start = Math.max(0, index - 30);
    const end = Math.min(text.length, index + searchQuery.length + 30);

    return {
      text: `${start > 0 ? "..." : ""}${text.slice(start, end)}${
        end < text.length ? "..." : ""
      }`,
      startEllipsis: start > 0,
      endEllipsis: end < text.length,
    };
  };

  if (isBody) {
    const {
      text: previewText,
      startEllipsis,
      endEllipsis,
    } = getPreviewText({ text, searchQuery });
    const parts: string[] = previewText.split(
      new RegExp(`(${searchQuery})`, "gi")
    );

    return (
      <Text style={style}>
        {parts.map((part, index) => (
          <Text
            key={index}
            style={
              part.toLowerCase() === searchQuery.toLowerCase()
                ? [style, styles.highlightedText]
                : style
            }
          >
            {part}
          </Text>
        ))}
      </Text>
    );
  }

  const parts: [string] = text.split(new RegExp(`(${searchQuery})`, "gi"));
  return (
    <Text style={style}>
      {parts.map((part, index) => (
        <Text
          key={index}
          style={
            part.toLowerCase() === searchQuery.toLowerCase()
              ? [style, styles.highlightedText]
              : style
          }
        >
          {part}
        </Text>
      ))}
    </Text>
  );
};

const HighlightedNoteCard = ({
  note,
  searchQuery,
}: {
  note: NoteType;
  searchQuery: string;
}) => {
  return (
    <View style={styles.noteCard}>
      <HighlightedText
        text={note.title}
        searchQuery={searchQuery}
        style={styles.noteTitle}
      />
      <HighlightedText
        text={note.body}
        searchQuery={searchQuery}
        style={styles.noteBody}
        isBody={true}
      />
    </View>
  );
};

export default function TabTwoScreen() {
  const { session } = useAuth();
  const { data: notes } = useNotes(session?.user?.id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes?.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.body.toLowerCase().includes(query)
    );
  });

  return (
    <ParallaxScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Search</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes title and content..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Button
          title="Advanced Search"
          onPress={() => {
            /* handle advanced search */
          }}
        />
        <ThemedView
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          {filteredNotes?.map((note) => (
            <HighlightedNoteCard
              key={note.id}
              note={note}
              searchQuery={searchQuery}
            />
          ))}
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 16,
  },
  highlightedText: {
    backgroundColor: "#FFEB3B",
    color: "#000000",
  },
  noteCard: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteBody: {
    fontSize: 14,
    color: "#666666",
  },
});
