import React from 'react';

  const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 2;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2);
    }
  }

  const pages = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);

  return (
    <nav className="flex justify-center mt-6 mb-8 overflow-x-auto p-2">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {startPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800"
            >
              1
            </button>
          </li>
        )}
        {startPage > 2 && (
          <li>
            <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">...</span>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white ${
                page === currentPage
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:text-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700'
                  : 'text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800'
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {endPage < totalPages - 1 && (
          <li>
            <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">...</span>
          </li>
        )}
        {endPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-800"
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
