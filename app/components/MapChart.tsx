"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "/maps/countries-50m.json"
const myCountries = {
  worked : ["Russia", "Georgia", "Hungary"],
  visited : ["Vietnam", "Uzbekistan", "United Arab Emirates", "Ukraine", "Turkey", 
    "Spain", "Singapore", "Portugal", "Poland", "Philippines", "Netherlands", 
    "Morocco", "Mongolia", "Malaysia", "Lithuania", "Latvia", "Laos", "Kyrgyzstan", "Japan", "Italy", 
    "Israel", "Iran", "Indonesia", "Greece", "France", "Finland", "Estonia", "Czechia", "Croatia", 
    "China", "Cambodia", "Bulgaria", "Brazil", "Belarus", "Azerbaijan", "Armenia", "Argentina"],
  experienced : ["Kazakhstan", "Thailand", "Tajikistan", "Nepal", "India"]
}

function getColor(country: string) {
  if (myCountries.worked.includes(country)) {
    return "#60a5fa"
  }
  if (myCountries.visited.includes(country)) {
    return "#4ade80"
  }
  if (myCountries.experienced.includes(country)) {
    return "#f472b6"
  }
  return "#cbd5e1"
}

const MapChart = () => {
  return (
    <div>
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
                const fillColor = getColor(name)
                return (
                  <Geography 
                    key = {geo.rsmKey} 
                    geography = {geo} 
                    data-tooltip-id = "countryInfo"
                    data-tooltip-content = {name}
                    data-tooltip-place = "top-start"
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                    fill = {fillColor}
                    fillOpacity="0.7"
                    stroke="#222222"
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