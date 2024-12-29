import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/src/supabase/supabase";
import { NoteType } from "~/src/utils/types";

export const useNotes = (user_id: string) => {
  return useQuery<NoteType[]>({
    queryKey: ["notes"],
    queryFn: async () => {
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

export const useInsertNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newNote } = await supabase
        .from("notes")
        .insert({
          title: data.title,
          body: data.body,
          user_id: data.user_id,
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
