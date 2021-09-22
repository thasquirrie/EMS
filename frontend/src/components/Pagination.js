import React from 'react';
import { Link } from 'react-router-dom';
import { usePagination } from './usePagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    countOnPage,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  console.log({
    pageSize,
    totalCount,
    siblingCount,
    currentPage,
    lastPage,
    paginationRange,
  });

  console.log('From', { countOnPage });

  let classNames =
    'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer';
  if (currentPage === lastPage) {
    classNames += 'disabled cursor-not-allowed';
  }

  /* This example requires Tailwind CSS v2.0+ */
  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <li
          onClick={currentPage !== 1 ? onPrevious : undefined}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 `}
        >
          Previous
        </li>
        <li
          onClick={onNext}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
            currentPage === lastPage && 'hidden'
          }`}
        >
          Next
        </li>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {currentPage === 1 ? 1 : pageSize * (currentPage - 1) + 1}
            </span>{' '}
            to{' '}
            {currentPage !== lastPage ? (
              <span className='font-medium'>{pageSize * currentPage}</span>
            ) : (
              <span className='font-medium'>
                {pageSize * (currentPage - 1) + countOnPage}
              </span>
            )}{' '}
            of <span className='font-medium'>{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            {/* <ul> */}
            <li
              onClick={currentPage !== 1 ? onPrevious : undefined}
              className='cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </li>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {paginationRange.map((pageNumber) => {
              if (pageNumber === '...') {
                return (
                  <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                    ...
                  </span>
                );
              }
              return (
                <li
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  aria-current='page'
                  className={`${
                    currentPage === pageNumber
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                  } `}
                >
                  {pageNumber}
                </li>
              );
            })}

            <li
              onClick={currentPage !== lastPage ? onNext : undefined}
              className={classNames}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </li>
            {/* </ul> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
