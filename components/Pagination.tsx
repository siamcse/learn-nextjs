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
        router.push(`/allcompany?page=${currentPage + 1}&size=${pageSize}&query=${getQuery}`);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
        router.push(`/allcompany?page=${currentPage - 1}&size=${pageSize}&query=${getQuery}`);
    };
    console.log("🚀 ~ file: Pagination.tsx:35 ~ onPrevious ~ currentPage:", currentPage)

    let lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : totalCount / pageSize;
    return (
        <ul className="flex gap-2 items-center">
            <li
                className={`${currentPage === 1 ? 'opacity-50' : "cursor-pointer"}`}
                onClick={currentPage === 1 ? () => { } : onPrevious}>
                <CaretLeft size={20} />
            </li>
            {paginationRange?.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">...</li>;
                }
                return (
                    <li
                        className={`${pageNumber === currentPage ? "bg-teal-600 px-2 py-1 rounded-sm text-white" : ""} cursor-pointer`}
                        onClick={() => {
                            onPageChange(pageNumber)
                            router.push(`/allcompany?page=${pageNumber}&size=${pageSize}&query=${getQuery}`);
                        }}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={`${currentPage === lastPage ? "opacity-50" : "cursor-pointer"}`}
                onClick={currentPage === lastPage ? () => { } : onNext}
            >
                <CaretRight size={20} />
            </li>
        </ul>
    );
};

export default Pagination;