import { PlayIcon } from "@radix-ui/react-icons";
import Avatar from "./Avatar";
import SpotifyAuthLink from "./SpotifyAuthLink";
import useSpotify from "@/hooks/useSpotify";
import { ModeToggle } from "./Mode-toggle";

const Header = () => {
  const spotify = useSpotify();

  return (
    <section className="container mx-auto border-b">
      {/* nav */}
      <nav className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PlayIcon className="h-6 w-6" />
          <h1 className="text-lg md:text-2xl">Playlist creator</h1>
        </div>
        {/* connect to spotify */}
        <div className="flex gap-2 sm:gap-4">
          {spotify.userProfile ? (
            <Avatar {...spotify.userProfile} />
          ) : (
            <SpotifyAuthLink />
          )}
          <ModeToggle />
        </div>
      </nav>
      {/* hero section */}
      <section className="py-20 text-center">
        <h1 className="mb-2 text-2xl text-white">
          Create your playlist with ease
        </h1>
        <h2 className="text-xl">
          Select your tags to define your musical taste,
          <br className="hidden sm:block" /> then press 'Create' to generate
          your playlist.
        </h2>
      </section>
    </section>
  );
};

export default Header;
