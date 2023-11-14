import { CheckIcon } from "@heroicons/react/24/outline";
import { fakeArtistData } from "../mockdata/mockArtists";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Song } from "../types/response";
import ErrorMessage from "./ErrorMessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

interface ChildPropsModal {
  handleCloseModal: () => void;
  playlist: Song[];
  responseMessage: string;
}

const Modal = ({
  handleCloseModal,
  playlist,
  responseMessage,
}: ChildPropsModal) => {
  if (responseMessage !== "Success") {
    return (
      <section className="fixed right-0 top-0 m-5 animate-error">
        <ErrorMessage />
      </section>
    );
  }
  if (responseMessage === "Success" && !playlist.length) {
    return (
      <>
        <section
          onClick={handleCloseModal}
          className="fixed left-0 top-0 h-full w-full bg-zinc-900/90 p-2"
        ></section>
        <div className="fixed left-1/2 top-1/2 w-4/5 max-w-sm -translate-x-1/2 -translate-y-1/2">
          <section className="flex animate-below flex-col items-center rounded-md border-2 border-blue-800 bg-slate-800 py-6 text-sm text-blue-300 md:text-lg">
            <ExclamationCircleIcon className="mb-2 h-6 w-6" />
            <p className="font-medium">No matching results</p>
            <p>Try again with different tags</p>
          </section>
        </div>
      </>
    );
  }
  return (
    <>
      {/* modal background window */}
      <section
        onClick={handleCloseModal}
        className="fixed left-0 top-0 h-full w-full bg-zinc-900/90 p-2"
      ></section>
      {/* close modal when clicking outside of it or don't close */}
      {/* backdrop-blur-sm lagging ^ */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <section className="max-h-[80vh] animate-below overflow-auto rounded-md border border-blue-300 bg-slate-800/80 px-10 py-6 shadow-blue">
          {/* modal header */}
          <div className="relative mb-4 flex flex-col items-center justify-center gap-2">
            <div className="animate-appear rounded-full border-2 border-blue-300 p-1 shadow-blue">
              <CheckIcon className="h-7 w-7 text-blue-300" />
            </div>
            <h2 className="animate-fadeIn text-xl">Playlist created!</h2>
            <button
              onClick={handleCloseModal}
              className="absolute right-0 top-0 animate-fadeIn rounded-md hover:bg-slate-700"
            >
              <XMarkIcon className="h-6 w-6 text-slate-300 hover:text-white" />
            </button>
          </div>
          {/* modal body */}
          <div className="flex animate-fadeIn justify-center">
            <table className="border-separate border-spacing-4">
              <thead>
                <tr>
                  <th className="text-start">Artist</th>
                  <th className="text-start">Song</th>
                  <th className="text-start">Year</th>
                  <th className="text-start">Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlist.map((song) => (
                  // todo change key to unique song id
                  <Fragment key={Math.random() * 10000}>
                    <tr>
                      <td>{song.artist_name}</td>
                      <td>{song.song_name}</td>
                      <td>{song.release_year}</td>
                      <td>{song.duration}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        {song.genre_names.map((genre) => (
                          <span
                            key={genre}
                            className="me-3 rounded-full bg-blue-800 px-3 py-1 text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Modal;
