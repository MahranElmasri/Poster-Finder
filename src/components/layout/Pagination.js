import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./pagination.css";

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  let [next, setNext] = useState(1);
  let [prev, setPrev] = useState(null);
  const handleNext = () => {
    if (next < pageNumbers.length) {
      setNext(++next);
      paginate(next);
      setPrev(next);
    }
  };

  const handlePrev = () => {
    if (prev > 1) {
      setPrev(--prev);
      paginate(prev);
      setNext(prev);
    }
  };

  return (
    <div className="container">
      <ul className="pagination  text-center">
        {totalPosts > 5 && (
          <button onClick={handlePrev} className="page-link">{`<<Prev`}</button>
        )}
        {pageNumbers.map(number => (
          <Link to={"/"} key={number} className="page-item text-center">
            <button
              className="page-link"
              onClick={() => {
                paginate(number);
                setPrev(number);
                setNext(number);
              }}
            >
              {" "}
              {number}
            </button>
          </Link>
        ))}
        {totalPosts > 5 && (
          <button onClick={handleNext} className="page-link">
            {`Next>>`}
          </button>
        )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};
