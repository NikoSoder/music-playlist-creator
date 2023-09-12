import { MusicalNoteIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <section className="header-bg-image">
      <section className="container mx-auto p-4">
        {/* nav */}
        <nav className="flex items-center gap-2 text-white">
          <MusicalNoteIcon className="h-6 w-6" />
          <h1 className="text-2xl">Playlist creator</h1>
        </nav>
        {/* hero section */}
        <section className="py-20 text-center">
          <h1 className="mb-2 text-2xl text-white">
            <span className="text-blue-300">Create</span> your playlist with
            ease
          </h1>
          <h2 className="text-xl">
            Select your tags to define your musical taste,
            <br className="hidden sm:block" /> then press 'Create' to generate
            your playlist.
          </h2>
        </section>
      </section>
    </section>
  );
};

export default Header;
