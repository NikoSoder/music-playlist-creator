import "./App.css";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import Modal from "./components/Modal";
import { useState } from "react";
import { Song } from "./types/response";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false); // set this to true when playlist is created
  const [isPlaylistFetchLoading, setIsPlaylistFecthLoading] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState<Song[]>([]);
  const [APIResponseMessage, setAPIResponseMessage] = useState("");
  const oldPlaylists = useLocalStorage();

  const closeModal = (playlist: Song[]) => {
    setIsOpenModal(false);
    if (playlist.length) {
      oldPlaylists.addPlaylistToLocalStorage(playlist);
    }
  };

  return (
    <main className="p-4">
      <Header />
      <FilterSection
        setIsOpenModal={setIsOpenModal}
        setIsPlaylistFetchLoading={setIsPlaylistFecthLoading}
        isPlaylistFetchLoading={isPlaylistFetchLoading}
        isOpenModal={isOpenModal}
        setUserPlaylist={setUserPlaylist}
        setAPIResponseMessage={setAPIResponseMessage}
      />
      {isOpenModal && (
        <Modal
          handleCloseModal={closeModal}
          playlist={userPlaylist}
          responseMessage={APIResponseMessage}
        />
      )}
      {/* old playlists */}
      <section>
        <button
          onClick={oldPlaylists.clearLocalStorage}
          className="bg-slate-50 text-black"
        >
          remove localstorage
        </button>
        <h1 className="text-2xl">Previous Playlists</h1>
        {oldPlaylists.previousPlaylists.map((playlist, index) => (
          <div className="mb-2 border" key={index}>
            <h2>{playlist.playlistName}</h2>
            <p>{new Date(playlist.createdAt).toLocaleDateString()}</p>
            {playlist.songs.map((song) => (
              <div key={song.song_id}>
                <p>{song.artist_name}</p>
                <p>{song.song_name}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
