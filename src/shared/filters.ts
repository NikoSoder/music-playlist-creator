import { genresAndStyles } from "./genres_and_styles";
import { decades } from "./decades";

export const filters = [
  {
    title: "Genre & Style",
    filtersArr: genresAndStyles,
  },
  {
    title: "Decade",
    filtersArr: decades,
  },
];
