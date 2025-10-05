"use client"

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "/countries-50m.json"

const MapChart = () => {
  return (
    <div>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={[45, 55]} zoom={3}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;