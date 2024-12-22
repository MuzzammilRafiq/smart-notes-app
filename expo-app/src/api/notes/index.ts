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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      await queryClient.invalidateQueries({ queryKey: ["notes", id] });
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
