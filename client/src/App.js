import React, { Component } from 'react';
import logo from './logo.svg';
import { EventRow } from './EventRow.js';
import './App.css';

class App extends Component {
  state = {
    data: [],
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

        return res.events
      })
      .then(events => this.setState({ data: events }))
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
      const aText = a[key].toString().toLowerCase();
      const bText = b[key].toString().toLowerCase();

      if (aText < bText) return comparator * -1;
      if (aText > bText) return comparator * 1;
      return 0;
    };
  }

  sortBy = (key) => {
    let arrayCopy = [...this.state.data];
    const sortAsc = !this.state.sortAsc[key];
    arrayCopy.sort(this.compareBy(key, sortAsc));
    // need to set state of sort
    let newSortAscState = { ...this.state.sortAsc };
    newSortAscState[key] = sortAsc;
    this.setState({ data: arrayCopy, sortAsc: newSortAscState });
  }

  render() {
    const rows = this.state.data.map((papercallEvent, i) => <EventRow key={i} {...papercallEvent} />);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="Table">
          <div className="Table-header">
            <div className="Table-headerCell" onClick={() => this.sortBy('name')}>Name</div>
            <div className="Table-headerCell" onClick={() => this.sortBy('location')}>Location</div>
            <div className="Table-headerCell">Event Date</div>
            <div className="Table-headerCell">CFP Close Date</div>
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