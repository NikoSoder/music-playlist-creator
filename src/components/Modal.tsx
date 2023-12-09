import { CopyIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Dispatch } from "react";
import { Song } from "@/types/response";
import { copyToClipboard } from "@/shared/clipboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChildPropsModal {
  open: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
  playlist: Song[];
  responseMessage: string;
}

export function Modal({
  open,
  setIsOpenModal,
  playlist,
  responseMessage,
}: ChildPropsModal) {
  function convertToEmbedUrl(watchUrl: string) {
    const videoId = watchUrl.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embedUrl;
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpenModal}>
      {/* if no results show this */}
      {responseMessage === "Success" && !playlist.length ? (
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
              <DialogTitle>No matching results</DialogTitle>
            </div>
            <DialogDescription>Try again with different tags</DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        // if results
        <DialogContent className="max-h-[70vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Playlist</DialogTitle>
            {/* <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription> */}
          </DialogHeader>
          {playlist.map((song) => (
            <Card className="border border-primary" key={song.song_id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{song.song_name}</CardTitle>
                  <CardDescription>{song.artist_name}</CardDescription>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      copyToClipboard(song.artist_name, song.song_name)
                    }
                    size="sm"
                    className="px-3"
                  >
                    <span className="sr-only">Copy</span>
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <div className="my-4 border-b"></div>
              <CardContent className="flex flex-col gap-2">
                {song.release_year ? <p>{song.release_year}</p> : null}
                {song.duration ? <p>{song.duration}</p> : null}
                <div className="flex flex-wrap">
                  {song.genre_names.map((genre, index) => (
                    <span
                      key={index}
                      className="mb-2 me-2 rounded-full bg-sky-800 px-3 py-1 text-sm text-white dark:bg-blue-800"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </CardContent>
              {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>
          ))}
          <div className="flex items-center space-x-2"></div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
