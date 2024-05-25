import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count, pageSize }) {
  // Number of result (count)

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // We need to know the number of pages
  const pageCount = Math.ceil(count / pageSize); // 25/10 = ciel(2.5) = 3

  // To compute next or previous we need to know the current page

  function prevPage() {
    // if we are already on the first page
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    // if we are already on the last page
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-md bg-white px-4 py-2">
      <p>
        Showing{" "}
        <span className="font-[500]">{(currentPage - 1) * pageSize + 1}</span>{" "}
        to{" "}
        <span className="font-[500]">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        out of <span className="font-[500]">{count}</span> results
      </p>

      <div className="flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className="rounded-md bg-gray-300 px-2 py-1 transition-colors duration-150 hover:bg-gray-200 active:bg-gray-400 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            <span className="text-md">
              <IoChevronBackOutline />
            </span>
            Previous
          </div>
        </button>
        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className="rounded-md bg-gray-300 px-3 py-1.5 transition-colors duration-150 hover:bg-gray-200 active:bg-gray-400 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            Next
            <span className="text-md">
              <IoChevronForwardOutline />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
