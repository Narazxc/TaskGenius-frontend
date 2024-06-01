import { useSearchParams } from "react-router-dom";

function Filter({ filterdField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  //   const [currentFilter, setCurrentFilter] = useState(
  //     searchParams.get(filterdField) || options.at(0).value,
  //   );

  const currentFilter = searchParams.get(filterdField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterdField, value);
    setSearchParams(searchParams);
    // setCurrentFilter(value);
  }

  return (
    <div className="bg-dashboard-block flex gap-1 self-stretch rounded-lg border border-gray-100 p-1 shadow-sm dark:border-opacity-20">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={currentFilter === option.value}
          className={`text-md rounded-md px-3 py-1 font-medium transition-colors duration-200
          ${
            currentFilter === option.value
              ? "cursor-not-allowed bg-purple-700 text-white"
              : ""
          }   hover:bg-purple-700 hover:text-white`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
