import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { Song } from "../types/response";
import ErrorMessage from "./ErrorMessage";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { copyToClipboard } from "../shared/clipboard";

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
  function convertToEmbedUrl(watchUrl: string) {
    const videoId = watchUrl.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embedUrl;
  }

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
      <div className="fixed left-1/2 top-1/2 w-11/12 max-w-xl -translate-x-1/2 -translate-y-1/2">
        <section className="max-h-[80vh] animate-below overflow-auto rounded-md border border-blue-300 bg-slate-800/80 px-2 py-6 shadow-blue">
          {/* modal header */}
          <div className="relative mb-4 flex flex-col items-center justify-center gap-2">
            <div className="animate-appear rounded-full border-2 border-blue-300 p-1 shadow-blue">
              <CheckIcon className="h-7 w-7 text-blue-300" />
            </div>
            <h2 className="animate-fadeIn text-xl">Playlist created!</h2>
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-0 animate-fadeIn rounded-md hover:bg-slate-700"
            >
              <XMarkIcon className="h-6 w-6 text-slate-300 hover:text-white" />
            </button>
          </div>
          {/* modal body */}
          <div className="flex max-w-xl animate-fadeIn justify-center">
            <table className="border-separate border-spacing-4">
              <thead>
                <tr className="block rounded-md bg-slate-800">
                  <th>Artist</th>
                  <th>Song</th>
                  <th>Year</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlist.map((song) => (
                  <Fragment key={song.song_id}>
                    <tr className="mb-4 block rounded-md bg-slate-800 p-2">
                      <td className="block w-full p-2">
                        <div className="flex justify-between">
                          <p>{song.artist_name}</p>
                          <button
                            onClick={() =>
                              copyToClipboard(song.artist_name, song.song_name)
                            }
                            className="rounded-md p-1 hover:bg-slate-700 active:outline active:outline-2"
                          >
                            <ClipboardIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                      <td className="block w-full p-2">{song.song_name}</td>
                      {song.release_year ? (
                        <td className="block w-full p-2">
                          {song.release_year}
                        </td>
                      ) : null}
                      {song.duration ? (
                        <td className="block w-full p-2">{song.duration}</td>
                      ) : null}
                      {song.youtube_url ? (
                        <td className="block w-full p-2">
                          <iframe
                            className="w-full"
                            height="200"
                            src={convertToEmbedUrl(song.youtube_url)}
                            title={song.song_name}
                            allowFullScreen
                          ></iframe>
                        </td>
                      ) : null}
                      <td className="block w-full p-2">
                        <div className="flex flex-wrap">
                          {song.genre_names.map((genre) => (
                            <span
                              key={genre}
                              className="mb-2 me-2 rounded-full bg-blue-800 px-3 py-1 text-sm"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
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
