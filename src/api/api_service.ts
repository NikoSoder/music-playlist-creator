import { splitTagsToOwnCategories } from "../shared/splitActiveTags";
// todo: create response model
const BASEURL = import.meta.env.VITE_API_URL;

// todo: change any from Promise<any[]>
export const getPlaylist = async (activeTags: string[]): Promise<any[]> => {
  const tagsByCategories = splitTagsToOwnCategories(activeTags);
  const response = activeTags.length
    ? await fetch(`${BASEURL}?tags=${activeTags.join(",")}`)
    : await fetch(BASEURL);

  const playlist = await response.json();
  return playlist.rows;
};
