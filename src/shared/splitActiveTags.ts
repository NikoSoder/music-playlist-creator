import { decades } from "./decades";
import { genresAndStyles } from "./genres_and_styles";

export const splitTagsToOwnCategories = (tags: string[]) => {
  const splittedTags = new Map<string, string[]>();
  // return early if no tags selected
  if (!tags.length) return splittedTags;

  for (const tag of tags) {
    // determine if the tag is a decade or a genre
    const isDecade = decades.includes(tag);
    const isGenre = genresAndStyles.includes(tag);

    if (isDecade) {
      // if it's a decade, add it to the "Decades" category in the map
      if (!splittedTags.has("Decades")) {
        splittedTags.set("Decades", []);
      }
      // remove 's' letter from the tag before pushing it
      const cleanedDecade = tag.replace("s", "");
      splittedTags.get("Decades")?.push(cleanedDecade);
    } else if (isGenre) {
      // if it's a genre, add it to the "Genres" category in the map
      if (!splittedTags.has("Genres")) {
        splittedTags.set("Genres", []);
      }
      splittedTags.get("Genres")?.push(tag);
    }
  }
  return splittedTags;
};
