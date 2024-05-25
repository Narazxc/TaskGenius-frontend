import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-x-hidden">
      <div className="flex flex-col gap-10">
        <p className="text-4xl font-bold">
          The page you are looking for could not be found 😢
        </p>
        <button
          onClick={moveBack}
          className="self-center rounded-md bg-gray-300 px-4 py-1 text-xl"
        >
          &larr; Go back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
