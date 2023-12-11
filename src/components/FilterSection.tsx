import { useState } from "react";
import Tags from "./Tags";
import { Dispatch } from "react";
import { getPlaylist } from "../api/api_service";
import { APIResult } from "../types/response";
import { Song } from "../types/response";
import { filters } from "../shared/filters";
import { CheckIcon } from "@radix-ui/react-icons";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChildPropsFilterSection {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
  setIsPlaylistFetchLoading: Dispatch<React.SetStateAction<boolean>>;
  isPlaylistFetchLoading: boolean;
  setUserPlaylist: Dispatch<React.SetStateAction<Song[]>>;
  setAPIResponseMessage: Dispatch<React.SetStateAction<string>>;
  handleAddPlaylist: (playlist: Song[]) => void;
}

const FilterSection = ({
  isOpenModal,
  setIsOpenModal,
  setIsPlaylistFetchLoading,
  isPlaylistFetchLoading,
  setUserPlaylist,
  setAPIResponseMessage,
  handleAddPlaylist,
}: ChildPropsFilterSection) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const createPlaylist = async () => {
    setIsOpenModal(false);
    setIsPlaylistFetchLoading(true);
    try {
      const playlistResponse: APIResult = await getPlaylist(activeTags);
      if (
        playlistResponse.message === "Success" &&
        playlistResponse.rows.length
      ) {
        toast({
          title: "Success!",
          description: "Playlist created successfully",
        });
        handleAddPlaylist(playlistResponse.rows);
      }

      if (playlistResponse.message === "Success") {
        setUserPlaylist(playlistResponse.rows);
        setAPIResponseMessage(playlistResponse.message);
        setIsOpenModal(true);
      } else {
        setAPIResponseMessage(playlistResponse.message);
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
    setIsPlaylistFetchLoading(false);
  };

  const addToActiveTags = (filter: string) => {
    if (!activeTags.includes(filter) && activeTags.length > 5) {
      toast({
        title: "Uh oh!",
        description: "Can't add more than 6 filters",
      });
    }

    if (!activeTags.includes(filter) && activeTags.length < 6) {
      setActiveTags([...activeTags, filter]);
    } else {
      // remove from activeTags if already chosen
      setActiveTags((state) => state.filter((item) => item !== filter));
    }
  };

  const removeFromActiveTags = (filter: string) => {
    setActiveTags((state) => state.filter((item) => item !== filter));
  };

  const clearAllActiveTags = () => {
    setActiveTags([]);
  };

  return (
    <section className="container mx-auto border-b py-20">
      <section className="mb-16 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
        {/* active tags */}
        <Tags
          activeTags={activeTags}
          handleRemoveFromActiveTags={removeFromActiveTags}
          clearAllActiveTags={clearAllActiveTags}
        />
        {/* choose filters */}
        <div className="flex w-full max-w-sm items-center justify-between rounded-md border px-4 py-3">
          <p className="text-sm font-medium leading-none">Search filters</p>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <DotsHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filters</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                {filters.map((filterType, index) => (
                  <DropdownMenuSub key={index}>
                    <DropdownMenuSubTrigger>
                      {filterType.title}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Filter ${filterType.title}`}
                          autoFocus={true}
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No filters found.</CommandEmpty>
                          <CommandGroup>
                            {filterType.filtersArr.map((filter, index) => (
                              <CommandItem key={index} value={filter}>
                                <Button
                                  className="w-full"
                                  variant={"ghost"}
                                  onClick={() => addToActiveTags(filter)}
                                >
                                  {activeTags.includes(filter) && (
                                    <span className="absolute inset-y-0 left-2 top-0 flex items-center">
                                      <CheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </span>
                                  )}
                                  {filter}
                                </Button>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      {/* create playlist button */}
      <div className="text-center">
        <Button
          className="text-lg"
          size={"lg"}
          disabled={isPlaylistFetchLoading || isOpenModal}
          onClick={createPlaylist}
        >
          {!isPlaylistFetchLoading ? (
            <p>Create</p>
          ) : (
            <div className="relative flex items-center gap-2 rounded">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-cyan-700 border-t-white"></div>
              <span>Loading...</span>
            </div>
          )}
        </Button>
      </div>
    </section>
  );
};

export default FilterSection;
