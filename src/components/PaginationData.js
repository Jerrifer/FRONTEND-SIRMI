/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function PaginationData({ userPerPage, currentPage, setCurrentPage, totalUsers}) {

    const pageNumbers = [];

    for (
            let i = 1; 
            i <= Math.ceil(totalUsers / userPerPage); 
            i++
        ){
            pageNumbers.push(i);
    }

    const onPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const onNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    }

    const onSpecificPage = (page) => {
        setCurrentPage(page);
    }

    return (
            <nav className="pagination is-centered m-1" 
            role="navigation" 
            aria-label="pagination">
                <a 
                    className={`pagination-previous ${
                        currentPage === 1 ? 'is-disabled' : ''
                    }`} 
                    onClick={onPreviousPage}
                >
                    Previous
                </a>
                <a 
                    className={`pagination-next ${
                        currentPage >= pageNumbers.length ? 'is-disabled' : ''
                    }`} 
                    onClick={onNextPage}
                >
                    Next page
                </a>
                <ul className="pagination-list">
                    {pageNumbers.map(noPage => (
                            <li key={noPage}>
                                <a 
                                    className={`pagination-link ${
                                        noPage === currentPage ? 'is-current' : ''
                                    }`}
                                    onClick={() => onSpecificPage(noPage)}
                                >
                                    {noPage}
                                </a>
                            </li>
                        )
                    )}
                </ul>
            </nav>
    )
}

export default PaginationData
