"use client"

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState<[[number, number], [number, number]]>([[0, 0], [0, 0]]);

  useEffect(() => {
    const updateBounds = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;

      setBounds([
        [- h * 0.1, - h * 0.1],
        [h * 0.8, h * 0.6],  
      ]);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);
  
  return (
    <div ref={containerRef}>
      <ComposableMap 
        projection="geoMercator"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ZoomableGroup 
          center = {[50, 50]} 
          zoom = {2}
          minZoom = {2}
          maxZoom = {5}
          translateExtent = {bounds}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fillColor = getColor(geo.properties.name)
                return (
                  <Geography 
                    key = {geo.rsmKey} 
                    geography = {geo} 
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