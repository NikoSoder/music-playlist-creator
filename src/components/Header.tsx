import { MusicalNoteIcon } from "@heroicons/react/24/outline";

  return (
    <section className="container mx-auto border-b border-b-zinc-700">
      {/* nav */}
      <nav className="flex items-center justify-between gap-2 text-white">
        <div className="flex items-center gap-2">
          <MusicalNoteIcon className="h-6 w-6" />
          <h1 className="text-lg md:text-2xl">Playlist creator</h1>
        </div>
        {/* connect to spotify */}
        {userProfile ? <Avatar {...userProfile} /> : <SpotifyAuthLink />}
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
