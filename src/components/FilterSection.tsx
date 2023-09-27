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
      <div className="flex flex-col justify-center gap-4">
        {/* create playlist button */}
        <div className="text-center">
          <button
            disabled={isPlaylistFetchLoading}
            onClick={createPlaylist}
            className="rounded bg-sky-700 px-10 py-3 text-xl transition-all hover:bg-sky-600 hover:shadow-blue active:bg-sky-700"
          >
            {!isPlaylistFetchLoading ? (
              "Create"
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-sky-800 border-t-white"></div>
                <p>Loading...</p>
              </div>
            )}
          </button>
        </div>
        {/* create playlist button second styling */}
        <div className="text-center">
          <button
            disabled={isPlaylistFetchLoading}
            onClick={createPlaylist}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-xl font-medium text-white hover:shadow-blue group-hover:from-cyan-500 group-hover:to-blue-500"
          >
            {!isPlaylistFetchLoading ? (
              <span className="relative rounded bg-gray-900 px-10 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0">
                Create
              </span>
            ) : (
              <div className="relative flex items-center gap-2 rounded px-5 py-2.5">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-cyan-700 border-t-white"></div>
                <span>Loading...</span>
              </div>
            )}
          </button>
        </div>
        {/* create playlist button third styling */}
        <div className="text-center">
          <button
            disabled={isPlaylistFetchLoading}
            onClick={createPlaylist}
            className="rounded bg-gradient-to-r from-cyan-600 to-blue-600 px-10 py-3 text-xl font-medium transition-all hover:shadow-blue"
          >
            {!isPlaylistFetchLoading ? (
              "Create"
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-sky-800 border-t-white"></div>
                <p>Loading...</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
