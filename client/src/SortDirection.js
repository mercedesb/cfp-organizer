import React from 'react';

export const SortDirection = ({ sortAsc }) => {
  if (sortAsc)
    return <span className="Arrow Arrow--up"></span>; 
  else
    return <span className="Arrow Arrow--down"></span>;
};