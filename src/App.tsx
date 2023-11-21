import "./App.css";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import Modal from "./components/Modal";
import { useState } from "react";
import { Song } from "./types/response";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false); // set this to true when playlist is created
  const [isPlaylistFetchLoading, setIsPlaylistFecthLoading] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState<Song[]>([]);
  const [APIResponseMessage, setAPIResponseMessage] = useState("");

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
    </main>
  );
}

export default App;
