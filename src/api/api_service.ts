import { splitTagsToOwnCategories } from "../shared/splitActiveTags";
import { APIResult } from "../types/response";
const BASEURL = import.meta.env.VITE_API_URL;

export const getPlaylist = async (activeTags: string[]): Promise<APIResult> => {
  const tagsByCategories = splitTagsToOwnCategories(activeTags);
  const response = await fetch(BASEURL, {
    method: "POST",
    body: JSON.stringify(tagsByCategories),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const playlist = await response.json();
  return playlist;
};
