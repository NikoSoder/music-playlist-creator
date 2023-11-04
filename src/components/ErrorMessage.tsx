import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const ErrorMessage = () => {
  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-red-700 bg-gray-800 p-4 text-sm text-red-300 md:text-lg">
      <ExclamationCircleIcon className="h-6 w-6" />
      <p>Something went wrong</p>
    </div>
  );
};

export default ErrorMessage;
