import { splitTagsToOwnCategories } from "../shared/splitActiveTags";
// todo: create response model
const BASEURL = import.meta.env.VITE_API_URL;

// todo: change any from Promise<any[]>
export const getPlaylist = async (activeTags: string[]): Promise<any[]> => {
  const tagsByCategories = splitTagsToOwnCategories(activeTags);
  const response = await fetch(BASEURL, {
    method: "POST",
    body: JSON.stringify(tagsByCategories),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const playlist = await response.json();
  console.log(playlist);
  return playlist.rows;
};
