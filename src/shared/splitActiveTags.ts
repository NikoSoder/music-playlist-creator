import { decades } from "./decades";
import { genresAndStyles } from "./genres_and_styles";

type ISplittedTags = { genres: string[]; decades: string[] };

export const splitTagsToOwnCategories = (tags: string[]) => {
  const splittedTags: ISplittedTags = {
    genres: [],
    decades: [],
  };
  // return early if no tags selected
  if (!tags.length) return splittedTags;

  for (const tag of tags) {
    // determine if the tag is a decade or a genre
    const isDecade = decades.includes(tag);
    const isGenre = genresAndStyles.includes(tag);
    if (isDecade) {
      // remove 's' letter from the decade tag before pushing it
      const cleanedDecade = tag.replace("s", "");
      splittedTags.decades.push(cleanedDecade);
    } else if (isGenre) {
      splittedTags.genres.push(tag);
    }
  }
  return splittedTags;
};
