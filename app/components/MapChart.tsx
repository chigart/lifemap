"use client"

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import FilterToggle from "./FilterToggle";
import { getColor, shouldShowCountry } from "../logic/mapLogic";
import { COUNTRY_COLORS, INTERACTION_COLORS } from "../constants/colors";

const geoUrl = "/maps/countries-50m.json";

const MapChart = () => {
  const [activeFilter, setActiveFilter] = useState("worked");

  return (
    <div className="relative">
      <FilterToggle 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />

      <ComposableMap 
        projection="geoMercator"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ZoomableGroup 
          center = {[50, 50]} 
          zoom = {2}
          minZoom = {2}
          maxZoom = {5}
          translateExtent = {[[ -100, -100], [900, 700]]}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { properties: { name } } = geo;
                const isFiltered = shouldShowCountry(name, activeFilter);
                const fillColor = isFiltered ? getColor(name) : COUNTRY_COLORS.default;
                
                return (
                  <Geography 
                    key = {geo.rsmKey} 
                    geography = {geo} 
                    data-tooltip-id = {isFiltered ? "countryInfo" : undefined}
                    data-tooltip-content = {isFiltered ? name : undefined}
                    data-tooltip-place = {isFiltered ? "top-start" : undefined}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: isFiltered ? {
                        fill: INTERACTION_COLORS.hover,
                        outline: "none"
                      } : {
                        fill: COUNTRY_COLORS.default,
                        outline: "none"
                      },
                      pressed: isFiltered ? {
                        fill: INTERACTION_COLORS.pressed,
                        outline: "none"
                      } : {
                        fill: COUNTRY_COLORS.default,
                        outline: "none"
                      }
                    }}
                    fill = {fillColor}
                    fillOpacity="0.7"
                    stroke={INTERACTION_COLORS.stroke}
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