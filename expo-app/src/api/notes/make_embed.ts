import { NoteType } from "~/src/utils/types";

export const makeEmbed = async (note: NoteType): Promise<string[]> => {
  const { title, body, id } = note;
  // const host =
  //   process.env.NODE_ENV === "development"
  //     ? process.env.PYTHON_SERVER_URL_DEV!
  //     : process.env.PYTHON_SERVER_URL_PROD!;

  const text = `"${title}" is title\n "${body}" is body`;
  try {
    const response = await fetch(
      "https://e728-43-231-58-157.ngrok-free.app/embeddings/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteIds: [id], texts: [text] }),
      }
    );

    const res = await response.json();
    // console.log("Success:", res);
    return res["ids"];
    // return res["ids"][0];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
