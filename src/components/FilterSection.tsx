import { useState } from "react";
import Tags from "./Tags";
import Filters from "./Filters";
import { Dispatch } from "react";
import { genresAndStyles } from "../shared/genres_and_styles";
import { decades } from "../shared/decades";
import { getPlaylist } from "../api/api_service";

interface ChildPropsFilterSection {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
  setIsPlaylistFetchLoading: Dispatch<React.SetStateAction<boolean>>;
  isPlaylistFetchLoading: boolean;
}

const FilterSection = ({
  isOpenModal,
  setIsOpenModal,
  setIsPlaylistFetchLoading,
  isPlaylistFetchLoading,
}: ChildPropsFilterSection) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [toggleGenres, setToggleGenres] = useState(false);
  const [toggleDecades, setToggleDecades] = useState(false);

  const createPlaylist = async () => {
    setIsPlaylistFetchLoading(true);
    const playlistResponse = await getPlaylist(activeTags);
    // here goes logic to create playlist
    // send tags to server == > set some kind of loading to 'create' button
    // when playlist comes from server, open modal and show playlist to user
    // pass playlist to modal
    setIsPlaylistFetchLoading(false);
    setIsOpenModal(!isOpenModal);
  };

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
    if (filter === "Genre & Style" && toggleGenres) {
      return setToggleGenres(!toggleGenres);
    }
    if (filter === "Decade" && toggleDecades) {
      return setToggleDecades(!toggleDecades);
    }
    if (filter === "Genre & Style") {
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
              title="Genre & Style"
              activeTags={activeTags}
              handleFilterDropdowns={handleFilterDropdowns}
              handleAddToActiveTags={addToActiveTags}
              filterArray={genresAndStyles}
              isToggleActive={toggleGenres}
            />
            <Filters
              title="Decade"
              activeTags={activeTags}
              handleFilterDropdowns={handleFilterDropdowns}
              handleAddToActiveTags={addToActiveTags}
              filterArray={decades}
              isToggleActive={toggleDecades}
            />
          </div>
        </section>
      </section>
      {/* create playlist button */}
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
            <div className="relative flex items-center gap-2 rounded px-5 py-3">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-cyan-700 border-t-white"></div>
              <span>Loading...</span>
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default FilterSection;
