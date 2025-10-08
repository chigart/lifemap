"use client"

import MapChart from "../components/MapChart";
import { Tooltip } from 'react-tooltip';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <MapChart />
      <Tooltip id="countryInfo" />
    </div>
  );
}
