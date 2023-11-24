import { Song } from "./response";

export interface PreviousPlaylists {
  playlistName: string;
  createdAt: Date;
  songs: Song[];
}
