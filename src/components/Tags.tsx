import { XMarkIcon } from "@heroicons/react/24/outline";

interface ChildPropsTags {
  activeTags: string[];
  handleRemoveFromActiveTags: (filter: string) => void;
}

const Tags = ({ activeTags, handleRemoveFromActiveTags }: ChildPropsTags) => {
  return (
    <div className="w-full max-w-sm">
      <ul className="flex w-full flex-wrap gap-2 rounded-md border border-sky-700 bg-zinc-900 p-6 shadow-blue">
        {activeTags.length ? (
          activeTags.map((tag) => (
            <li className="group" key={Math.random()}>
              <button
                className="flex items-center gap-2 rounded bg-zinc-800 px-3 py-2"
                onClick={() => handleRemoveFromActiveTags(tag)}
              >
                {tag}
                <div className="rounded-full p-1 transition-all group-hover:bg-zinc-600">
                  <XMarkIcon className="h-4 w-4 group-hover:text-white" />
                </div>
              </button>
            </li>
          ))
        ) : (
          <li>No tags selected</li>
        )}
      </ul>
    </div>
  );
};

export default Tags;
