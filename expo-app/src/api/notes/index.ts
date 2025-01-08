import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/src/supabase/supabase";
import { NoteType } from "~/src/utils/types";
import { makeEmbed } from "./make_embed";
import { searchEmbed } from "./search_embed";

export const useGetNotes = (user_id: string | undefined) => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!user_id) {
        return [];
      }
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data as NoteType[];
    },
  });
};

export const useGetNotesByIds = (
  user_id: string | undefined,
  searchQuery: string
) => {
  return useQuery({
    queryKey: ["notes", user_id, searchQuery], // Include searchQuery in the query key
    queryFn: async () => {
      if (!user_id || !searchQuery) {
        return [];
      }
      const noteIds = await searchEmbed({
        query: String(encodeURIComponent(searchQuery)),
      });

      if (noteIds.length === 0) {
        return [];
      }

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user_id)
        .in("id", noteIds) // Filter by note IDs
        .order("created_at", { ascending: false });

      if (error) {
        // console.log("52", error);
        throw new Error(error.message);
      }

      return data as NoteType[];
    },
    enabled: !!user_id && !!searchQuery, // Only run the query if user_id and searchQuery are provided
  });
};

export const useInsertNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const { error, data: newNote } = await supabase
        .from("notes")
        .insert({
          title: data.title,
          body: data.body,
          user_id: data.user_id,
        })
        .select("*")
        .single();

      if (error) {
        console.log("useInsertProductError", error);
        throw new Error(error.message);
      }
      const embed_id = await makeEmbed(newNote as NoteType);
      await supabase
        .from("notes")
        .update({ embed_id: embed_id[0], updated_at: new Date() })
        .eq("id", (newNote as NoteType).id)
        .select("*")
        .single();

      return newNote;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
};

export const useUpdateNote = ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error, data: updatedNote } = await supabase
        .from("notes")
        .update({
          body: body,
          title: title,
          updated_at: new Date(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      const embed_id = await makeEmbed(updatedNote as NoteType);
      console.log("embed_ID", embed_id);
      const updatedEmbedNote = await supabase
        .from("notes")
        .update({ embed_id: embed_id[0], updated_at: new Date() })
        .eq("id", (updatedNote as NoteType).id)
        .select("*")
        .single();
      return updatedEmbedNote;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", id] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
};
