import { CheckIcon } from "@heroicons/react/24/outline";
import { fakeArtistData } from "../mockdata/mockArtists";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ChildPropsModal {
  handleCloseModal: () => void;
}

const Modal = ({ handleCloseModal }: ChildPropsModal) => {
  return (
    <section
      onClick={handleCloseModal}
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-zinc-900/90 p-2"
    >
      {/* backdrop-blur-sm lagging ^ */}
      <section className="max-w-lg animate-below rounded-md border border-blue-300 bg-slate-800/80 px-10 py-6 shadow-blue">
        {/* modal header */}
        <div className="relative mb-4 flex flex-col items-center justify-center gap-2">
          <div className="animate-appear rounded-full border-2 border-blue-300 p-1 shadow-blue">
            <CheckIcon className="h-7 w-7 text-blue-300" />
          </div>
          <h2 className="animate-fadeIn text-xl">Playlist created!</h2>
          <button
            onClick={handleCloseModal}
            className="absolute right-0 top-0 animate-fadeIn rounded-md hover:bg-slate-700"
          >
            <XMarkIcon className="h-6 w-6 text-slate-300 hover:text-white" />
          </button>
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
