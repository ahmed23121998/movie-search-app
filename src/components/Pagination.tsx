interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-6 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 sm:px-6 sm:py-2 rounded-md bg-gray-200 text-gray-700 
                   font-medium hover:bg-gray-300 transition
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-sm sm:text-base"
      >
        Prev
      </button>

      <span className="text-base sm:text-lg font-semibold text-gray-800 text-center min-w-[80px]">
        <span className="sm:hidden">
          {/* Mobile */}
          <span className="text-blue-600">{currentPage}</span> of {totalPages}
        </span>

        <span className="hidden sm:inline">
          {/* Desktop */}
          <span className="text-blue-600">{currentPage}</span> of {totalPages}
        </span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 sm:px-6 sm:py-2 rounded-md bg-gray-200 text-gray-700 
                   font-medium hover:bg-gray-300 transition
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-sm sm:text-base"
      >
        Next
      </button>
    </div>
  );
}
