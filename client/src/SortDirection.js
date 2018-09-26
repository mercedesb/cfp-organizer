import React from 'react';

export const SortDirection = ({ name, sort }) => {
  if (sort.field !== name) {
    return (
      <div className="Sortable-unsorted">
        <span className="Arrow Arrow--up"></span>
        <span className="Arrow Arrow--down"></span>
      </div>
    )
  }
  else {
    if (sort.direction === 'asc')
      return <span className="Arrow Arrow--up"></span>;
    else
      return <span className="Arrow Arrow--down"></span>;
  }
};