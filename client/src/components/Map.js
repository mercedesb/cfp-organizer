import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

const position = [35, -20];
export const Map = ({ data, popupComponent }) => (
  <LeafletMap className="Map" center={position} zoom={3}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    />
    { data && data.map((dataItem, i) => {
      return (
        <Marker position={[dataItem.lat, dataItem.lng]} key={i}>
          <Popup>
            {popupComponent(dataItem)}
          </Popup>
        </Marker>
      )
    })}
  </LeafletMap>
);