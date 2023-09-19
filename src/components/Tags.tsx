import { XMarkIcon } from "@heroicons/react/24/outline";

interface ChildPropsTags {
  activeTags: string[];
  handleRemoveFromActiveTags: (filter: string) => void;
}

const Tags = ({ activeTags, handleRemoveFromActiveTags }: ChildPropsTags) => {
  return (
    <div className="w-full max-w-sm">
      <ul className="flex w-full flex-wrap gap-2 bg-zinc-800 p-4">
        {activeTags.length ? (
          activeTags.map((tag) => (
            <li
              className="flex items-center justify-center gap-2 rounded bg-zinc-900 px-3 py-2"
              key={Math.random()}
            >
              <p>{tag}</p>
              <button
                className="rounded-full bg-zinc-700 p-1"
                onClick={() => handleRemoveFromActiveTags(tag)}
              >
                <XMarkIcon className="h-4 w-4" />
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
