import { Button } from "./ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ChildPropsTags {
  activeTags: string[];
  handleRemoveFromActiveTags: (filter: string) => void;
  clearAllActiveTags: () => void;
}

const Tags = ({
  activeTags,
  handleRemoveFromActiveTags,
  clearAllActiveTags,
}: ChildPropsTags) => {
  return (
    <div className="w-full max-w-sm">
      <ul className="flex w-full flex-wrap gap-2 rounded-md border p-6">
        {activeTags.length ? (
          activeTags.map((tag, index) => (
            <li className="group" key={index}>
              <Button
                variant={"secondary"}
                onClick={() => handleRemoveFromActiveTags(tag)}
              >
                {tag}
                <div className="ms-2 rounded-full p-1 transition-all group-hover:bg-gray-200 dark:group-hover:bg-zinc-700">
                  <Cross1Icon className="h-3 w-3" />
                </div>
              </Button>
            </li>
          ))
        ) : (
          <li>No tags selected</li>
        )}
      </ul>
      {activeTags.length !== 0 ? (
        <Button
          className="text-base text-muted-foreground"
          variant={"link"}
          onClick={clearAllActiveTags}
        >
          Clear all
        </Button>
      ) : null}
    </div>
  );
};

export default Tags;
