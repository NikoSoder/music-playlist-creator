import { PreviousPlaylists } from "../types/previousplaylists";
import { Song } from "../types/response";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
interface ChildPropsPreviousPlaylists {
  previousPlaylists: PreviousPlaylists[];
  addPlaylistToLocalStorage: (playlist: Song[]) => void;
  clearLocalStorage: () => void;
}

const RecentPlaylists = (props: ChildPropsPreviousPlaylists) => {
  if (props.previousPlaylists.length === 0) {
    return (
      <section className="container mx-auto py-20 text-center">
        <h1 className="mb-4 text-2xl">Previous Playlists</h1>
        <em>No previous playlists</em>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-20">
      <div className="mb-8 flex items-center justify-center gap-6">
        <h1 className="text-2xl">Previous Playlists</h1>
        <Button variant={"outline"} onClick={props.clearLocalStorage}>
          Clear all
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {props.previousPlaylists.map((playlist, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger>
              <div>
                <h2>{playlist.playlistName}</h2>
                <p>{new Date(playlist.createdAt).toLocaleDateString()}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              {playlist.songs.map((song) => (
                <div key={song.song_id}>
                  <p>{song.artist_name}</p>
                  <p>{song.song_name}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default RecentPlaylists;
