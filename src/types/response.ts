export interface APIResult {
  message: string;
  rows: Song[];
}

export interface Song {
  artist_name: string;
  duration: string;
  youtube_url: string;
  genre_names: string[];
  release_id_discogs: string;
  release_year: number;
  song_name: string;
}
