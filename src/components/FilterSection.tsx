import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FilterSection = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [genres, setGenres] = useState([
    "Genre 1",
    "Genre 2",
    "Genre 3",
    "Genre 4",
    "Genre 5",
    "Genre 6",
    "Genre 7",
    "Genre 8",
    "Genre 9",
  ]);

  const addToActiveTags = (genre: string) => {
    // if tag is not already chosen
    if (!activeTags.includes(genre)) {
      setActiveTags([...activeTags, genre]);
    }
  };

  const removeFromActiveTags = (genre: string) => {
    setActiveTags((state) => state.filter((item) => item !== genre));
  };

  return (
    <section className="container mx-auto">
      <section className="flex justify-around">
        {/* active tags */}
        <ul className="flex max-w-sm flex-wrap gap-4 bg-zinc-800 p-4">
          {activeTags.length ? (
            activeTags.map((tag) => (
              <li className="flex bg-zinc-900" key={Math.random()}>
                <p>{tag}</p>
                <button onClick={() => removeFromActiveTags(tag)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </li>
            ))
          ) : (
            <li>No tags selected</li>
          )}
        </ul>
        {/* choose genre */}
        <ul>
          {genres.map((genre) => (
            <li key={genre}>
              <button onClick={() => addToActiveTags(genre)}>{genre}</button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default FilterSection;
