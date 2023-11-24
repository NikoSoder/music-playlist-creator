import { useState, useEffect } from "react";
import { Song } from "../types/response";
import { PreviousPlaylists } from "../types/previousplaylists";

export const useLocalStorage = () => {
  const [previousPlaylists, setPreviousPlaylists] = useState<
    PreviousPlaylists[]
  >([]);

  useEffect(() => {
    const localStoragePlaylist = localStorage.getItem("playlist");
    if (localStoragePlaylist) {
      setPreviousPlaylists(JSON.parse(localStoragePlaylist));
    }
  }, []);

  const addPlaylistToLocalStorage = (playlist: Song[]) => {
    const newPreviousPlaylist = {
      playlistName: `Playlist ${previousPlaylists.length + 1}`,
      createdAt: new Date(),
      songs: playlist,
    };
    const localStoragePlaylist = localStorage.getItem("playlist");
    if (localStoragePlaylist) {
      const existingPlaylists: PreviousPlaylists[] =
        JSON.parse(localStoragePlaylist);
      const updatedPlaylists = [...existingPlaylists, newPreviousPlaylist];
      localStorage.setItem("playlist", JSON.stringify(updatedPlaylists));
      setPreviousPlaylists(updatedPlaylists);
    } else {
      localStorage.setItem("playlist", JSON.stringify([newPreviousPlaylist]));
      setPreviousPlaylists([newPreviousPlaylist]);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("playlist");
    setPreviousPlaylists([]);
  };

  return {
    previousPlaylists,
    addPlaylistToLocalStorage,
    clearLocalStorage,
  };
};
