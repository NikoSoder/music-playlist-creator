import { CheckIcon } from "@heroicons/react/24/outline";
import { fakeArtistData } from "../mockdata/mockArtists";

const Modal = () => {
  return (
    <section className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-zinc-900/80 p-2">
      {/* backdrop-blur-sm lagging ^ */}
      <section className="max-w-lg animate-below rounded-md border border-blue-300 bg-slate-800/80 px-10 py-6 shadow-blue">
        {/* modal header */}
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <div className="animate-appear rounded-full border-2 border-blue-300 p-1 shadow-blue">
            <CheckIcon className="h-7 w-7 text-blue-300" />
          </div>
          <h2 className="animate-fadeIn text-xl">Playlist created!</h2>
        </div>
        {/* modal body */}
        <div className="flex animate-fadeIn justify-center">
          <table className="border-separate border-spacing-4">
            <thead>
              <tr>
                <th className="text-start">Song</th>
                <th className="text-start">Artist</th>
                <th className="text-start">Year</th>
              </tr>
            </thead>
            <tbody>
              {fakeArtistData.map((artist) => (
                <tr key={artist.song}>
                  <td>{artist.song}</td>
                  <td>{artist.artist}</td>
                  <td>{artist.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Modal;
