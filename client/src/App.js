import React, { Component } from 'react';
import moment from 'moment';
import { Table } from './components/Table.js';
import { EventRow } from './components/EventRow.js';
import './App.css';

class App extends Component {
  state = {
    data: [], 
    activeView: 'list',
    tableHeaders: [
      {
        name: 'name',
        label: 'Name',
        sortable: true,
        filterable: true,
      },
      {
        name: 'location',
        label: 'Location',
        sortable: true,
        filterable: true,
        filterKeys: ['location', 'continent', 'country', 'countryCode', 'city']
      },
      {
        name: 'date',
        label: 'Date',
        sortable: true,
        sortKey: 'momentDate',
        filterable: false,
      },
      {
        name: 'cfpClose',
        label: 'CFP Close Date',
        sortable: true,
        sortKey: 'momentCfpClose',
        filterable: false,
      },
      {
        name: 'eventTags',
        label: 'Event Tags',
        sortable: false,
        filterable: true,
      }
    ]
  }
  
  componentDidMount() {
    this.callApi()
      .then((response) => {
        // data cleanup
        return response.events.map((e) => {
          return {
            ...e,
            momentDate: !!e.date ? moment(e.date, 'MMMM DD, YYYY') : null,
            momentCfpClose: !!e.cfpClose ? moment(e.cfpClose, 'MMMM DD, YYYY HH: mm UTC') : null
          }
        })
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

  setActiveView(view) {
    this.setState({activeView: view})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>CFP Organizer</h1>
          <h2>Sort and filter Papercall CFPs</h2>
          <ul className='ViewList'>
            <li className={`ViewList-item ${this.state.activeView === 'list' ? 'ViewList-item--active' : ''}`} onClick={() => this.setActiveView('list')}>List</li>
            <li className={`ViewList-item ${this.state.activeView === 'map' ? 'ViewList-item--active' : ''}`} onClick={() => this.setActiveView('map')}>Map</li>
          </ul>
        </div>
        { this.state.activeView === 'list' &&
          <Table 
            headers={this.state.tableHeaders}
            data={this.state.data}
            rowComponent={(dataItem, i) => <EventRow className='Table-row' rowClassName='Table-cell' key={i} event={dataItem} />}
          />
        }
      </div>
    );
  }
}

export default App;