import { URI } from "~/src/utils/serverurl";
import { NoteType } from "~/src/utils/types";

export const makeEmbed = async (note: NoteType): Promise<string[]> => {
  const { title, body, id } = note;

  const text = `TITLE:"${title}"\n BODY:"${body}"`;
  try {
    const response = await fetch(`${URI}/embeddings/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteIds: [id], texts: [text] }),
    });

    const res = await response.json();
    return res["ids"];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
