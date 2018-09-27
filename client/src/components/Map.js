import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

export class Map extends Component {
  state = {
    data: []
  }

  render() {
    const position = [35, -20];
    return (
      <LeafletMap className="Map" center={position} zoom={3}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.props.data && this.props.data.map((dataItem, i) => {
          return (
            <Marker position={[dataItem.lat, dataItem.lng]} key={i}>
              <Popup>
                {this.props.popupComponent(dataItem)}
              </Popup>
            </Marker>
          )
        })}
      </LeafletMap>
    );
  }
}