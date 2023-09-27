import { useState } from "react";
import Tags from "./Tags";
import Filters from "./Filters";
import { Dispatch } from "react";

interface ChildPropsFilterSection {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

const FilterSection = ({
  isOpenModal,
  setIsOpenModal,
}: ChildPropsFilterSection) => {
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
  const [toggleGenres, setToggleGenres] = useState(false);
  const [toggleDecades, setToggleDecades] = useState(false);
  const [isPlaylistFetchLoading, setIsPlaylistFecthLoading] = useState(false);

  const createPlaylist = async () => {
    setIsPlaylistFecthLoading(true);
    // here goes logic to create playlist
    // send tags to server == > set some kind of loading to 'create' button
    // when playlist comes from server, open modal and show playlist to user
    const result = await mockPromise(activeTags);
    // pass playlist to modal
    setIsOpenModal(!isOpenModal);
    setIsPlaylistFecthLoading(false);
  };

  // todo: delete function this later
  function mockPromise(value: string[]): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  }

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
    if (filter === "Genre" && toggleGenres) {
      return setToggleGenres(!toggleGenres);
    }
    if (filter === "Decade" && toggleDecades) {
      return setToggleDecades(!toggleDecades);
    }
    if (filter === "Genre") {
      setToggleGenres(true);
      setToggleDecades(false);
    } else {
      setToggleDecades(true);
      setToggleGenres(false);
    }
  };

  return (
    <section className="container mx-auto border-b border-b-zinc-700 py-20">
      <section className="mb-16 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
        {/* active tags */}
        <Tags
          activeTags={activeTags}
          handleRemoveFromActiveTags={removeFromActiveTags}
        />
        {/* choose filters */}
        <section className="w-full max-w-sm rounded-md border border-sky-400 bg-zinc-800 p-6 shadow-blue">
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
            <Filters
              title="Genre"
              activeTags={activeTags}
              handleFilterDropdowns={handleFilterDropdowns}
              handleAddToActiveTags={addToActiveTags}
              filterArray={genres}
              isToggleActive={toggleGenres}
            />
            <Filters
              title="Decade"
              activeTags={activeTags}
              handleFilterDropdowns={handleFilterDropdowns}
              handleAddToActiveTags={addToActiveTags}
              filterArray={decade}
              isToggleActive={toggleDecades}
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default FilterSection;
