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
  const [expandedPlaylists, setExpandedPlaylists] = useState<number[]>([]);

  const togglePlaylist = (index: number) => {
    setExpandedPlaylists((prevExpanded) => {
      if (prevExpanded.includes(index)) {
        // If the playlist is already expanded, remove it from the list
        return prevExpanded.filter((i) => i !== index);
      } else {
        // If the playlist is not expanded, add it to the list
        return [...prevExpanded, index];
      }
    });
  };

  return (
    <section className="container mx-auto py-20">
      <div className="flex items-center justify-center gap-6">
        <h1 className="text-2xl">Previous Playlists</h1>
        <button onClick={props.clearLocalStorage} className="hover:underline">
          Clear all
        </button>
      </div>
      <section className="flex flex-col items-center justify-center">
        {props.previousPlaylists.map((playlist, index) => (
          <div className="w-full border md:w-[600px]" key={index}>
            <div
              onClick={() => togglePlaylist(index)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h2>{playlist.playlistName}</h2>
                <PlusIcon
                  className={`h-7 w-7 transition-all ${
                    expandedPlaylists.includes(index) && "rotate-45"
                  }`}
                />
              </div>
              <p>{new Date(playlist.createdAt).toLocaleDateString()}</p>
            </div>
            {expandedPlaylists.includes(index) && (
              <>
                {playlist.songs.map((song) => (
                  <div key={song.song_id}>
                    <p>{song.artist_name}</p>
                    <p>{song.song_name}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </section>
    </section>
  );
};

export default RecentPlaylists;
