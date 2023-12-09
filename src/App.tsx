import "./App.css";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import Modal from "./components/Modal";
import { useState } from "react";
import { Song } from "./types/response";
import { useLocalStorage } from "./hooks/useLocalStorage";
import RecentPlaylists from "./components/PreviousPlaylists";
import { ThemeProvider } from "./components/Theme-provider";
import { Toaster } from "@/components/ui/toaster";

// search 'code' param
const code = new URLSearchParams(window.location.search).get("code");
const accessDenied = new URLSearchParams(window.location.search).get("error");

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="p-4">
        <Header code={code} accessDenied={accessDenied} />
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
        {/* older playlists */}
        <RecentPlaylists {...oldPlaylists} />
        <Toaster />
      </main>
    </ThemeProvider>
  );
}

export default App;
