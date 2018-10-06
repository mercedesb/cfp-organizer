import React, { Component } from 'react';
import moment from 'moment';
import { Loading } from './components/Loading.js';
import { Table } from './components/Table.js';
import { EventRow } from './components/EventRow.js';
import { MobileEventRow } from './components/MobileEventRow.js';
import { Map } from './components/Map.js';
import { EventPopup } from './components/EventPopup.js';
import './App.css';

class App extends Component {
  state = {
    data: null, 
    activeView: 'list',
    loading: true,
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
    ],
    mobileHeaders: [
      {
        name: 'events',
        label: 'Events',
        sortable: true,
        sortKey: 'name',
        filterable: true,
        filterKeys: ['name', 'location', 'continent', 'country', 'countryCode', 'city', 'eventTags']
      }
    ]
  }
  
  componentDidMount() {
    this.callApi()
      .then((response) => {
        // data cleanup
        return response.events.map((e, i) => {
          return {
            ...e,
            momentDate: !!e.date ? moment(e.date, 'MMMM DD, YYYY') : null,
            momentCfpClose: !!e.cfpClose ? moment(e.cfpClose, 'MMMM DD, YYYY') : null,
            key: i
          }
        })
      })
      .then(events => this.setState({ data: events, loading: false }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/openCfps');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  setActiveView = (view) => {
    this.setState({ activeView: view })
  }

  setActiveDataItem = (dataItemKey) => {
    if (this.state.activeDataItem === dataItemKey) {
      this.setState({ activeDataItem: null })
    } else {
      this.setState({ activeDataItem: dataItemKey })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>CFP Organizer</h1>
          <h2>Sort and filter open CFPs</h2>
          <ul className='ViewList'>
            <li className={`ViewList-item ${this.state.activeView === 'list' ? 'ViewList-item--active' : ''}`} onClick={() => this.setActiveView('list')}>List</li>
            <li className={`ViewList-item ${this.state.activeView === 'map' ? 'ViewList-item--active' : ''}`} onClick={() => this.setActiveView('map')}>Map</li>
          </ul>
        </div>
        { this.state.loading &&
          <Loading />
        }
        { !this.state.loading && this.state.activeView === 'list' &&
          <React.Fragment>
            <Table
              className='Table--mobile'
              headers={this.state.mobileHeaders}
              data={this.state.data}
              rowComponent={(dataItem, i) => (
                <MobileEventRow 
                  className='' 
                  cellClassName='MobileCell' 
                  key={dataItem.key} 
                  event={dataItem} 
                  isActive={this.state.activeDataItem === dataItem.key}
                  onClick={() => this.setActiveDataItem(dataItem.key)} 
                />
              )}
            />
  
            <Table
              headers={this.state.tableHeaders}
              data={this.state.data}
              rowComponent={(dataItem, i) => <EventRow className='Table-row' cellClassName='Table-cell' key={dataItem.key} event={dataItem} />}
            />
          </React.Fragment>
        }
        { !this.state.loading && this.state.activeView === 'map' &&
          <Map
            data={this.state.data}
            popupComponent={(dataItem) => <EventPopup event={dataItem} />}
          />
        }
        <p className='Created u-small'>Created by Mercedes Bernard | <a href="https://github.com/mercedesb">Github</a> | <a href="https://twitter.com/mercedescodes">Twitter</a></p>
      </div>
    );
  }
}

export default App;