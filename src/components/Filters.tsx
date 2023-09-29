import { CheckIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ChildPropsFilters {
  title: string;
  activeTags: string[];
  handleFilterDropdowns: (filter: string) => void;
  handleAddToActiveTags: (filter: string) => void;
  filterArray: string[];
  isToggleActive: boolean;
}

const Filters = ({
  title,
  activeTags,
  handleFilterDropdowns,
  handleAddToActiveTags,
  filterArray,
  isToggleActive,
}: ChildPropsFilters) => {
  return (
    <>
      <button
        onClick={() => handleFilterDropdowns(title)}
        className="flex w-full items-center justify-between"
      >
        <p className="font-semibold">{title}</p>
        <ChevronDownIcon
          className={`h-5 w-5 transition-all ${isToggleActive && "rotate-180"}`}
        />
      </button>
      {isToggleActive && (
        <ul className="animate-[fadeIn_400ms]">
          {filterArray.map((filter) => (
            <li key={filter}>
              <button
                className="relative"
                onClick={() => handleAddToActiveTags(filter)}
              >
                <p
                  className={`ps-6 ${
                    activeTags.includes(filter) && "text-blue-200"
                  }`}
                >
                  {filter}
                </p>
                {activeTags.includes(filter) && (
                  <span className="absolute inset-y-0 left-0 top-0 flex items-center">
                    <CheckIcon className="h-5 w-5 text-blue-200" />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Filters;
