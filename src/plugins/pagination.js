import React from 'react';
import * as Reactstrap from "reactstrap";

function PaginationData({
  userPerPage,
  currentPage,
  setCurrentPage,
  totalData
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / userPerPage); i++) {   
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSpecificPage = (page) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    if (pageNumbers.length <= 4) {
      return pageNumbers.map((noPage) => (
          <Reactstrap.PaginationItem key={noPage} className={`${noPage === currentPage ? 'active' : ''}`}>
            <Reactstrap.PaginationLink
              href="#pablo"
              onClick={(e) => { e.preventDefault(); onSpecificPage(noPage) }}
            >
              {noPage}
            </Reactstrap.PaginationLink>
          </Reactstrap.PaginationItem>
      ));
    } else {
      let left = Math.max(1, currentPage - 2);
      let right = Math.min(currentPage + 2, pageNumbers.length);
      let buttons = [];
      for (let i = left; i <= right; i++) {
        buttons.push(
          <Reactstrap.PaginationItem key={i} className={`${i === currentPage ? 'active' : ''}`}>
            <Reactstrap.PaginationLink
              href="#pablo"
              onClick={(e) => { e.preventDefault(); onSpecificPage(i) }}
            >
              {i}
            </Reactstrap.PaginationLink>
          </Reactstrap.PaginationItem>
        );
      }
      if (left > 1) {
        buttons.unshift(
          <li key="start-ellipsis">
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        );
      }
      if (right < pageNumbers.length) {
        buttons.push(
          <li key="end-ellipsis">
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        );
      }

      return buttons;
    }
  };

  return (
    <nav aria-label="...">
      <Reactstrap.Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
        <Reactstrap.PaginationItem>
          <Reactstrap.PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              onPreviousPage();
            }}
            className={`${currentPage === 1 ? 'disabled' : ''}`}
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </Reactstrap.PaginationLink>
        </Reactstrap.PaginationItem>

        <Reactstrap.PaginationItem>
          <ul className="pagination-list">{getPaginationButtons()}</ul>
        </Reactstrap.PaginationItem>

        <Reactstrap.PaginationItem>
          <Reactstrap.PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              onNextPage();
            }}
            className={`${currentPage >= pageNumbers.length ? 'disabled' : ''}`}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </Reactstrap.PaginationLink>
        </Reactstrap.PaginationItem>
      </Reactstrap.Pagination>
    </nav>
  );
}

export default PaginationData;