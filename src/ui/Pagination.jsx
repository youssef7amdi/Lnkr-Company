import { useSearchParams } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import Button from './Button';
import ReactPaginate from 'react-paginate';

function Pagination({ page, total }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!page) return null;

  const { current, pages, has_next, has_previous } = page;

  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page')) >= pages
      ? pages
      : Number(searchParams.get('page'))
    : current;

  function handlePageChange(selectedPage) {
    searchParams.set('page', selectedPage.selected + 1);
    setSearchParams(searchParams);
  }

  // if (pages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-[0.8rem] text-[1.4rem]">
        Showing{' '}
        <span className="font-[600]">
          {pages > 1 ? (current - 1) * 10 + 1 : total}
        </span>{' '}
        to{' '}
        <span className="font-[600]">
          {current === pages ? total : current * 10}
        </span>{' '}
        of <span className="font-[600]">{total}</span> results
      </p>
      {pages > 1 && (
        <ReactPaginate
          pageCount={pages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          forcePage={currentPage - 1}
          onPageChange={handlePageChange}
          previousLabel={
            <Button sort="paginationButton" disabled={!has_previous}>
              <HiChevronLeft className="h-[1.8rem] w-[1.8rem]" />{' '}
              <span>Previous</span>
            </Button>
          }
          nextLabel={
            <Button sort="paginationButton" disabled={!has_next}>
              <span>Next</span>
              <HiChevronRight className="h-[1.8rem] w-[1.8rem]" />
            </Button>
          }
          breakLabel={'...'}
          containerClassName="flex gap-[0.4rem] items-center"
          pageLinkClassName="rounded-[7px] text-[1.4rem] font-[500] py-[0.6rem] px-[1.2rem] border-none flex items-center justify-center hover:bg-brand-600 hover:text-brand-50 w-[3.5rem]"
          activeLinkClassName="bg-brand-600 text-brand-50"
          breakClassName="w-[2.5rem] flex items-center justify-center"
        />
      )}
    </div>
  );
}

export default Pagination;
