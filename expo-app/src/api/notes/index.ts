import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/src/supabase/supabase";

export const useNotes = (userId: string) => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("userId", userId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useNotesById = (id: string) => {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("useNotesByIdError", error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newNote } = await supabase
        .from("notes")
        .insert({
          title: data.title,
          body: data.body,
          userId: data.userId,
        })
        .single();

      if (error) {
        console.log("useInsertProductError", error);
        throw new Error(error.message);
      }
      return newNote;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
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
      return updatedNote;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
