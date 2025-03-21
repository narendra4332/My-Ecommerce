import React from "react";
import "./Style/Pagination.css"; // ✅ CSS file for styling
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        className="page-button prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1} // Disable on first page
      >
        <FaArrowLeft />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`page-button ${currentPage === number ? "active" : ""}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="page-button next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length} // Disable on last page
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
