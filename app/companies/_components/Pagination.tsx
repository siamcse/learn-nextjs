import React from 'react';
import { usePagination, DOTS } from './usePagination';
import { SpinnerGap, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';

const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        currentPage,
        pageSize
    } = props;

    let siblingCount = 1;
    const router = useRouter();
    const searchParams = useSearchParams();
    const getQuery = searchParams.get('query');

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });
    console.log("🚀 ~ file: Pagination.tsx:21 ~ Pagination ~ paginationRange:", paginationRange)

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
        router.push(`/companies?page=${currentPage + 1}&size=${pageSize}&query=${getQuery}`);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
        router.push(`/companies?page=${currentPage - 1}&size=${pageSize}&query=${getQuery}`);
    };
    console.log("🚀 ~ file: Pagination.tsx:35 ~ onPrevious ~ currentPage:", currentPage)

    let lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : totalCount / pageSize;

    const btnClass = `relative inline-flex items-center text-sm hover:bg-teal-700 hover:text-white font-semibold  px-4 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`

    return (
        <ul className="flex items-center">
            <li
                className={`${currentPage === 1 ? 'hidden' : "cursor-pointer"} ${btnClass}`}
                onClick={currentPage === 1 ? () => { } : onPrevious}>
                <CaretLeft size={20} />
            </li>
            {paginationRange?.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className={`px-4 py-2`}>...</li>;
                }
                return (
                    <li
                        className={`${pageNumber === currentPage ? "bg-teal-700 rounded-sm text-white" : "font-semibold"} cursor-pointer ${btnClass}`}
                        onClick={() => {
                            onPageChange(pageNumber)
                            router.push(`/companies?page=${pageNumber}&size=${pageSize}&query=${getQuery}`);
                        }}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={`${currentPage === lastPage ? "hidden" : "cursor-pointer"} ${btnClass}`}
                onClick={currentPage === lastPage ? () => { } : onNext}
            >
                <CaretRight size={20} />
            </li>
        </ul>
    );
};

export default Pagination;