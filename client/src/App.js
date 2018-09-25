import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import { EventRow } from './EventRow.js';
import './App.css';

class App extends Component {
  state = {
    data: [],
    filteredData: [],
    sortAsc: {
      name: undefined,
      location: undefined,
      date: undefined,
      cfpClose: undefined
    }
  };

  componentDidMount() {
    this.callApi()
      .then((res) => {
        // data cleanup
        return res.events.map((e) => {
          return {
            ...e,
            momentDate: !!e.date ? moment(e.date, 'MMMM DD, YYYY') : null,
            momentCfpClose: !!e.cfpClose ? moment(e.cfpClose, 'MMMM DD, YYYY HH: mm UTC') : null
          }
        })
      })
      .then(events => this.setState({ data: events, filteredData: events }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/openCfps');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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

  sortBy = (key) => {
    let arrayCopy = [...this.state.filteredData];
    const sortAsc = !this.state.sortAsc[key];
    arrayCopy.sort(this.compareBy(key, sortAsc));
    // need to set state of sort
    let newSortAscState = { ...this.state.sortAsc };
    newSortAscState[key] = sortAsc;
    this.setState({ filteredData: arrayCopy, sortAsc: newSortAscState });
  }

  filterBy = (event, keys) => {
    let arrayCopy = [...this.state.data];
    arrayCopy = arrayCopy.filter((cfpEvent) => {
      return keys.some(key => cfpEvent[key].toLowerCase().includes(event.target.value.toLowerCase()))
    })
    this.setState({ filteredData: arrayCopy })
  }

  render() {
    const rows = this.state.filteredData.map((papercallEvent, i) => <EventRow key={i} {...papercallEvent} />);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="Table">
          <div className="Table-header">
            <div className="Table-headerCell">
              <p onClick={() => this.sortBy('name')}>Name</p> 
              <input type='text' onChange={(event) => this.filterBy(event, ['name'])} />
            </div>
            <div className="Table-headerCell">
              <p onClick={() => this.sortBy('location')}>Location</p> 
              <input type='text' onChange={(event) => this.filterBy(event, ['location', 'country', 'countryCode', 'city'])} />
            </div>
            <div className="Table-headerCell">
              <p onClick={() => this.sortBy('momentDate')}>Event Date</p>
            </div>
            <div className="Table-headerCell">
              <p onClick={() => this.sortBy('momentCfpClose')}>CFP Close Date</p>
            </div>
          </div>
          <div className="Table-body">
            {rows}
          </div>
        </div>
      </div>
    );
  }
}

export default App;