import { Song } from "@/types/response";

export const mockSongs: Song[] = [
  {
    song_id: 1,
    artist_name: "Artist 1",
    duration: "3:45",
    youtube_url: "https://www.youtube.com/watch?v=abc123",
    genre_names: ["Pop", "Rock", "Indie", "Drum & Bass", "Hip Hop"],
    release_id_discogs: "123456",
    release_year: 2010,
    song_name: "Song 1",
  },
  {
    song_id: 2,
    artist_name: "Artist 2",
    duration: "4:20",
    youtube_url: "https://www.youtube.com/watch?v=def456",
    genre_names: ["Pop", "R&B"],
    release_id_discogs: "789012",
    release_year: 2009,
    song_name: "Song 2",
  },
  {
    song_id: 3,
    artist_name: "Artist 3",
    duration: "2:55",
    youtube_url: "https://www.youtube.com/watch?v=ghi789",
    genre_names: ["Electronic", "Dance"],
    release_id_discogs: "345678",
    release_year: 2013,
    song_name: "Song 3",
  },
];
