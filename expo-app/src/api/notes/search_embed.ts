import { URI } from "~/src/utils/serverurl";

export const searchEmbed = async ({
  query,
}: {
  query: string;
}): Promise<string[]> => {
  console.log(query);
  try {
    const response = await fetch(
      `${URI}/embeddings/get-similar?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
    const metadata: {
      timestamp: number;
      userId: string;
    }[] = res["metadatas"][0];

    const ids = metadata.map((meta) => meta["userId"]);
    // console.log(metadata);

    // console.log(JSON.stringify(res, null, 2));
    // console.log(ids);
    return ids;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
