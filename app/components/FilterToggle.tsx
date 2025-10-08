"use client"

import { myCountries } from "../logic/mapLogic";

interface FilterToggleProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterToggle = ({ activeFilter, onFilterChange }: FilterToggleProps) => {
  const availableFilters = Object.keys(myCountries).filter(key => 
    myCountries[key as keyof typeof myCountries].length > 0
  );

  return (
    <>
      {availableFilters.map(filterKey => {
        return (
          <button
            key={filterKey}
            onClick={() => onFilterChange(filterKey)}
          >
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
          </button>
        );
      })}
    </>
  );
};

export default FilterToggle;
