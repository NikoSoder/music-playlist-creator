import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";

interface IDropdown {
  title: string;
  isOpen: boolean;
}

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
  const [toggleDropdowns, setToggleDropdowns] = useState<IDropdown[]>([
    { title: "genre", isOpen: false },
    { title: "decade", isOpen: false },
  ]);
  const [toggleGenres, setToggleGenres] = useState(false);
  const [toggleDecades, setToggleDecades] = useState(false);

  const addToActiveTags = (filter: string) => {
    if (!activeTags.includes(filter) && activeTags.length < 6) {
      setActiveTags([...activeTags, filter]);
    } else {
      // remove from activeTags if already chosen
      setActiveTags((state) => state.filter((item) => item !== filter));
    }
  };

  const removeFromActiveTags = (filter: string) => {
    setActiveTags((state) => state.filter((item) => item !== filter));
  };

  const handleFilterDropdowns = (filter: string) => {
    // close other dropdowns when one filter is clicked
    // todo: make this function cleaner
    if (filter === "genre" && toggleGenres) {
      return setToggleGenres(!toggleGenres);
    }
    if (filter === "decade" && toggleDecades) {
      return setToggleDecades(!toggleDecades);
    }
    if (filter === "genre") {
      setToggleGenres(true);
      setToggleDecades(false);
    } else {
      setToggleDecades(true);
      setToggleGenres(false);
    }
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
          <div className="mb-4 flex items-center justify-between text-white">
            <h2 className="text-lg">Filters</h2>
            <button
              className="hover:underline"
              onClick={() => setActiveTags([])}
            >
              Clear all
            </button>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleFilterDropdowns("genre")}
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
                    <button
                      className="relative"
                      onClick={() => addToActiveTags(genre)}
                    >
                      <p
                        className={`ps-6 ${
                          activeTags.includes(genre) && "text-blue-300"
                        }`}
                      >
                        {genre}
                      </p>
                      {activeTags.includes(genre) && (
                        <span className="absolute inset-y-0 left-0 top-0 flex items-center">
                          <CheckIcon className="h-5 w-5 text-blue-300" />
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => handleFilterDropdowns("decade")}
              className="flex w-full items-center justify-between"
            >
              <p className="font-semibold">Decade</p>
              <ChevronDownIcon
                className={`h-5 w-5 transition-all ${
                  toggleDecades && "rotate-180"
                }`}
              />
            </button>
            {toggleDecades && (
              <ul>
                {decade.map((time) => (
                  <li key={time}>
                    <button
                      className="relative"
                      onClick={() => addToActiveTags(time)}
                    >
                      <p
                        className={`ps-6 ${
                          activeTags.includes(time) && "text-blue-300"
                        }`}
                      >
                        {time}
                      </p>
                      {activeTags.includes(time) && (
                        <span className="absolute inset-y-0 left-0 top-0 flex items-center">
                          <CheckIcon className="h-5 w-5 text-blue-300" />
                        </span>
                      )}
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
