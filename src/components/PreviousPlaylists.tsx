import { PreviousPlaylists } from "../types/previousplaylists";
import { Song } from "../types/response";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ChildPropsPreviousPlaylists {
  previousPlaylists: PreviousPlaylists[];
  addPlaylistToLocalStorage: (playlist: Song[]) => void;
  clearLocalStorage: () => void;
}

const RecentPlaylists = (props: ChildPropsPreviousPlaylists) => {
  const [expandedPlaylists, setExpandedPlaylists] = useState<number>();

  const togglePlaylist = (index: number) => {
    if (index === expandedPlaylists) {
      setExpandedPlaylists(undefined);
    } else {
      setExpandedPlaylists(index);
    }
  };

  return (
    <section className="container mx-auto py-20">
      <div className="mb-8 flex items-center justify-center gap-6">
        <h1 className="text-2xl">Previous Playlists</h1>
        <button onClick={props.clearLocalStorage} className="hover:underline">
          Clear all
        </button>
      </div>
      <section className="flex flex-col items-center justify-center gap-4">
        {props.previousPlaylists.map((playlist, index) => (
          <div
            className="w-full rounded-md border-2 border-zinc-500 p-6 md:w-[600px]"
            key={index}
          >
            <div
              onClick={() => togglePlaylist(index)}
              className="cursor-pointer border-b border-zinc-700 pb-2 text-xl"
            >
              <div className="flex items-center justify-between">
                <h2>{playlist.playlistName}</h2>
                <PlusIcon
                  className={`h-7 w-7 transition-all ${
                    expandedPlaylists === index && "rotate-45"
                  }`}
                />
              </div>
              <p>{new Date(playlist.createdAt).toLocaleDateString()}</p>
            </div>
            <div
              className={`${
                expandedPlaylists === index ? "max-h-[900px]" : "max-h-0"
              } flex flex-col gap-4 overflow-hidden pt-2 transition-all duration-500 ease-in-out`}
            >
              {playlist.songs.map((song) => (
                <div key={song.song_id}>
                  <p>{song.artist_name}</p>
                  <p>{song.song_name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default RecentPlaylists;
