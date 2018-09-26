import React, { Component } from 'react';
import './Table.css';
import { TableHeader } from './TableHeader.js';

export class Table extends Component {
  state = {
    data: [],
    filteredData: [],
    filter: [], // [{ fields: [''], value: ''}]
    sort: {
      field: '',
      direction: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.length > 0) {
      console.log(nextProps.data)
      this.setState({data: nextProps.data, filteredData: nextProps.data })
    }
  }

  compareBy = (key, sortAsc) => {
    let comparator;
    if (sortAsc) comparator = 1;
    if (!sortAsc) comparator = -1;

    return function (a, b) {
      let aValue = a[key];
      let bValue = b[key];
      if (typeof (aValue) === "string") aValue = aValue.toLowerCase();
      if (typeof (bValue) === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return comparator * -1;
      if (aValue > bValue) return comparator * 1;
      return 0;
    };
  }

  sortBy = (sortKey) => {
    let arrayCopy = [...this.state.data];
    const sortAsc = this.state.sort.field === sortKey ? this.state.sort.direction !== 'asc' : true;
    arrayCopy.sort(this.compareBy(sortKey, sortAsc));

    this.setState({ filteredData: arrayCopy, sort: { field: sortKey, direction: sortAsc ? 'asc' : 'desc' } });
  }

  filterBy = (event, keys) => {
    let filters = [...this.state.filter]
    // remove existing filters for the keys
    filters = filters.filter(oldFilter => !oldFilter.fields.every(f => keys.includes(f)))

    if (event.target.value) {
      filters.push({ fields: keys, value: event.target.value.toLowerCase() })
    }

    function reducer(accumulator, filter) {
      accumulator = accumulator.filter((dataItem) => {
        return filter.fields.some(field => dataItem[field].toLowerCase().includes(filter.value))
      })
      return accumulator
    }

    const filteredData = filters.reduce(reducer, [...this.state.data])

    this.setState({ filteredData, filter: filters })
  }

  render() {

    return (
      <div className="Table">
        <header className="Table-row Table-row--header">
          { this.props.headers.map((header, i) => {
            return (
              <TableHeader
                key={i} 
                header={header}
                onSort={this.sortBy}
                onFilter={this.filterBy} 
                currentSort={this.state.sort}
              />
              )
            })
          }
        </header>
        <div className="Table-body">
         { this.state.filteredData.map((dataItem, i) => this.props.rowComponent(dataItem, i)) }
        </div>
      </div>
    )
  }
}