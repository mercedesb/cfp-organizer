import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

export class Map extends Component {
  state = {
    data: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.length > 0) {
      this.setState({ data: nextProps.data })
    }
  }
  render() {
    const position = [20, -20];
    return (
      <LeafletMap className="Map" center={position} zoom={3}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { this.state.data.map((dataItem, i) => {
          console.log([dataItem.lat, dataItem.lng])
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