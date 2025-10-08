"use client"

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import FilterToggle from "./FilterToggle";
import LangToggle from "./LangToggle";
import { getColor, shouldShowCountry } from "../logic/mapLogic";

const geoUrl = "/maps/countries-50m.json";

const MapChart = () => {
  const [activeFilter, setActiveFilter] = useState("worked");

  return (
    <div className="relative">
      <FilterToggle 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />
      <LangToggle />

      <ComposableMap 
        projection="geoMercator"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ZoomableGroup 
          center = {[50, 50]} 
          zoom = {2}
          minZoom = {1}
          maxZoom = {5}
          translateExtent = {[[ -100, -100], [900, 700]]}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { properties: { name } } = geo;
                const isFiltered = shouldShowCountry(name, activeFilter);
                const fillColor = isFiltered ? getColor(name, activeFilter) : "var(--color-default)";
                
                return (
                  <Geography 
                    key = {geo.rsmKey} 
                    geography = {geo} 
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: isFiltered ? {
                        fill: "var(--color-hover)",
                        outline: "none"
                      } : {
                        fill: "var(--color-default)",
                        outline: "none"
                      },
                      pressed: isFiltered ? {
                        fill: "var(--color-pressed)",
                        outline: "none"
                      } : {
                        fill: "var(--color-default)",
                        outline: "none"
                      }
                    }}
                    fill = {fillColor}
                    fillOpacity="0.7"
                    stroke="var(--color-stroke)"
                    strokeWidth="0.2"
                    strokeOpacity="0.3"
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;