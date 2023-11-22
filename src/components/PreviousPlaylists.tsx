import { PreviousPlaylists } from "../types/previousplaylists";
import { Song } from "../types/response";

interface ChildPropsPreviousPlaylists {
  previousPlaylists: PreviousPlaylists[];
  addPlaylistToLocalStorage: (playlist: Song[]) => void;
  clearLocalStorage: () => void;
}

const RecentPlaylists = (props: ChildPropsPreviousPlaylists) => {
  return (
    <section className="container mx-auto">
      <button
        onClick={props.clearLocalStorage}
        className="bg-slate-50 text-black"
      >
        remove localstorage
      </button>
      <h1 className="text-2xl">Previous Playlists</h1>
      {props.previousPlaylists.map((playlist, index) => (
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
  );
};

export default RecentPlaylists;
