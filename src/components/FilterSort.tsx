import { Filter, ArrowUpDown } from "lucide-react";

interface FilterSortProps {
  typeFilter: string;
  sortBy: string;
  onTypeFilterChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

export function FilterSort({
  typeFilter,
  sortBy,
  onTypeFilterChange,
  onSortChange,
}: FilterSortProps) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center w-full">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Filter className="w-4 h-4 text-gray-600" />
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     bg-white text-gray-900"
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <ArrowUpDown className="w-4 h-4 text-gray-600" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     bg-white text-gray-900"
        >
          <option value="none">No Sorting</option>
          <option value="year-desc">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
}
