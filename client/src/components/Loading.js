import React from 'react';
import './Loading.css';

export const Loading = () => (
  <React.Fragment>
    <div className="Loading">
      <div className="Loading-spinner">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
        <div className="four"></div>
        <div className="five"></div>
        <div className="six"></div>
        <div className="seven"></div>
        <div className="eight"></div>
        <div className="nine"></div>
        <div className="ten"></div>
        <div className="eleven"></div>
        <div className="twelve"></div>
      </div>
      <p>Loading...</p>
    </div>
  </React.Fragment>
);