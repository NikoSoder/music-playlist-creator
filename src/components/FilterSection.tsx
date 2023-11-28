import { useState } from "react";
import Tags from "./Tags";
import { Dispatch } from "react";
import { getPlaylist } from "../api/api_service";
import { APIResult } from "../types/response";
import { Song } from "../types/response";
import { filters } from "../shared/filters";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

interface ChildPropsFilterSection {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
  setIsPlaylistFetchLoading: Dispatch<React.SetStateAction<boolean>>;
  isPlaylistFetchLoading: boolean;
  setUserPlaylist: Dispatch<React.SetStateAction<Song[]>>;
  setAPIResponseMessage: Dispatch<React.SetStateAction<string>>;
}

const FilterSection = ({
  isOpenModal,
  setIsOpenModal,
  setIsPlaylistFetchLoading,
  isPlaylistFetchLoading,
  setUserPlaylist,
  setAPIResponseMessage,
}: ChildPropsFilterSection) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expandedFilter, setExpandeFilter] = useState<number>();

  const togglePlaylist = (index: number) => {
    if (index === expandedFilter) {
      setExpandeFilter(undefined);
    } else {
      setExpandeFilter(index);
    }
  };

  const createPlaylist = async () => {
    setIsOpenModal(false);
    setIsPlaylistFetchLoading(true);
    try {
      const playlistResponse: APIResult = await getPlaylist(activeTags);
      console.log(playlistResponse); // todo delete this later

      if (
        playlistResponse.message === "Success" &&
        playlistResponse.rows.length
      ) {
        toast.success("Playlist created successfully", { duration: 4000 });
      }

      if (playlistResponse.message === "Success") {
        setUserPlaylist(playlistResponse.rows);
        setAPIResponseMessage(playlistResponse.message);
        setIsOpenModal(true);
      } else {
        setAPIResponseMessage(playlistResponse.message);
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
    setIsPlaylistFetchLoading(false);
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

  return (
    <section className="container mx-auto border-b border-b-zinc-700 py-20">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#1f2937",
              color: "white",
              padding: "15px",
            },
          },
          error: {
            style: {
              background: "#1f2937",
              color: "white",
              padding: "15px",
            },
          },
        }}
      />
      <section className="mb-16 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
        {/* active tags */}
        <Tags
          activeTags={activeTags}
          handleRemoveFromActiveTags={removeFromActiveTags}
        />
        {/* choose filters */}
        <section className="w-full max-w-sm rounded-md border border-sky-700 bg-zinc-900 p-6 shadow-blue">
          <div className="mb-6 flex items-center justify-between text-white">
            <h2 className="text-lg">Filters</h2>
            <button
              className="hover:underline"
              onClick={() => setActiveTags([])}
            >
              Clear all
            </button>
          </div>
          <section className="flex flex-col items-center justify-center gap-4">
            {filters.map((filtertype, index) => (
              <div className="w-full rounded-md" key={index}>
                <div
                  onClick={() => togglePlaylist(index)}
                  className="cursor-pointer border-b border-zinc-700 pb-2 text-xl"
                >
                  <div className="flex items-center justify-between">
                    <h2>{filtertype.title}</h2>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-all ${
                        expandedFilter === index && "rotate-180"
                      }`}
                    />
                  </div>
                </div>
                <ul
                  className={`${
                    expandedFilter === index ? "max-h-96" : "max-h-0"
                  } my-2 flex flex-col gap-2 overflow-hidden overflow-y-auto transition-all duration-500 ease-in-out`}
                >
                  {filtertype.filtersArr.map((filter, index) => (
                    <li key={index}>
                      <button
                        className="relative"
                        onClick={() => addToActiveTags(filter)}
                      >
                        <p
                          className={`ps-6 ${
                            activeTags.includes(filter) && "text-blue-200"
                          }`}
                        >
                          {filter}
                        </p>
                        {activeTags.includes(filter) && (
                          <span className="absolute inset-y-0 left-0 top-0 flex items-center">
                            <CheckIcon className="h-5 w-5 text-blue-200" />
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>
      </section>
      {/* create playlist button */}
      <div className="text-center">
        <button
          disabled={isPlaylistFetchLoading || isOpenModal}
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
