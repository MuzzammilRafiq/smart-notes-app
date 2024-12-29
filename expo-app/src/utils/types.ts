export type NoteType = {
  id: string;
  title: string;
  body: string;
  embed_id: string | null;
  group: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};
