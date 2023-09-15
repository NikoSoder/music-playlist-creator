import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FilterSection = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [genres, setGenres] = useState([
    "Genre 1",
    "Genre 2",
    "Genre 3",
    "Genre 4",
    "Genre 54954758475",
    "Genre 65735",
    "Genre 70080282028028",
    "Genre 832",
    "Genre 9",
  ]);
  const [decade, setDecade] = useState([
    "70s",
    "80s",
    "90s",
    "2000s",
    "2010s",
    "2020s",
  ]);
  const [toggleDropdowns, setToggleDropdowns] = useState([
    { title: "genre", isOpen: false },
    { title: "decade", isOpen: false },
  ]);
  const [toggleGenres, setToggleGenres] = useState(false);
  const [toggleDecade, setToggleDecade] = useState(false);

  const addToActiveTags = (genre: string) => {
    // if tag is not already chosen
    if (!activeTags.includes(genre) && activeTags.length < 6) {
      setActiveTags([...activeTags, genre]);
    }
  };

  const removeFromActiveTags = (genre: string) => {
    setActiveTags((state) => state.filter((item) => item !== genre));
  };

  const handleFilterDropdowns = () => {
    // close other dropdowns when one filter is clicked
    setToggleGenres(!toggleGenres);
  };

  return (
    <section className="container mx-auto">
      <section className="flex justify-around">
        {/* active tags */}
        <div className="w-full max-w-sm">
          <ul className="flex w-full flex-wrap gap-2 bg-zinc-800 p-4">
            {activeTags.length ? (
              activeTags.map((tag) => (
                <li
                  className="flex items-center justify-center gap-2 rounded bg-zinc-900 px-3 py-2"
                  key={Math.random()}
                >
                  <p>{tag}</p>
                  <button
                    className="rounded-full bg-zinc-700 p-1"
                    onClick={() => removeFromActiveTags(tag)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </li>
              ))
            ) : (
              <li>No tags selected</li>
            )}
          </ul>
        </div>
        {/* choose filters */}
        <section className="w-full max-w-sm bg-zinc-800 p-4">
          <h2 className="mb-4 text-lg text-white">Filters</h2>
          <div className="space-y-1">
            <button
              onClick={() => setToggleGenres(!toggleGenres)}
              className="flex w-full items-center justify-between"
            >
              <p className="font-semibold">Genres</p>
              <ChevronDownIcon
                className={`h-5 w-5 transition-all ${
                  toggleGenres && "rotate-180"
                }`}
              />
            </button>
            {toggleGenres && (
              <ul>
                {genres.map((genre) => (
                  <li key={genre}>
                    <button onClick={() => addToActiveTags(genre)}>
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setToggleDecade(!toggleDecade)}
              className="flex w-full items-center justify-between"
            >
              <p className="font-semibold">Decade</p>
              <ChevronDownIcon
                className={`h-5 w-5 transition-all ${
                  toggleDecade && "rotate-180"
                }`}
              />
            </button>
            {toggleDecade && (
              <ul>
                {decade.map((time) => (
                  <li key={time}>
                    <button onClick={() => addToActiveTags(time)}>
                      {time}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default FilterSection;
