import React from 'react';
import { SortDirection } from './SortDirection.js';

export const TableHeader = ({header, onSort, onFilter, currentSort}) => (
  <div className="Table-cell Table-cell--header">
    <div className={header.sortable ? 'Sortable' : ''} onClick={() => header.sortable ? onSort(header.sortKey || header.name) : null}>
      <span>{header.label}</span>
      {header.sortable &&
        <SortDirection
          name={header.sortKey || header.name}
          sort={currentSort}
        />
      }
    </div>
    {header.filterable &&
      <input
        type='text'
        name={header.name}
        onChange={(event) => onFilter(event, header.filterKeys ? header.filterKeys : [header.name])}
        placeholder='Search'
      />
    }
  </div>
);