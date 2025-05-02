'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-teal-600 hover:bg-teal-50'
          }`}
        >
          Previous
        </button>
        
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded ${
              currentPage === number
                ? 'bg-teal-600 text-white'
                : 'text-teal-600 hover:bg-teal-50'
            }`}
          >
            {number}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-teal-600 hover:bg-teal-50'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
} 