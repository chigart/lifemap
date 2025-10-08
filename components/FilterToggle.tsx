"use client"

import { useTranslations } from 'next-intl';
import { myCountries } from "../logic/mapLogic";

interface FilterToggleProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterToggle = ({ activeFilter, onFilterChange }: FilterToggleProps) => {
  const t = useTranslations('Filters');
  const availableFilters = Object.keys(myCountries).filter(key => 
    myCountries[key as keyof typeof myCountries].length > 0
  );

  return (
    <div className="absolute top-4 left-4 flex flex-col sm:flex-row gap-1 sm:gap-2 z-50">
      {availableFilters.map(filterKey => {
        const isActive = activeFilter === filterKey;
        return (
          <button
            key={filterKey}
            onClick={() => onFilterChange(filterKey)}
            className={`
              filter-toggle-button
              filter-toggle-button--${filterKey}
              ${isActive ? 'filter-toggle-button--active' : 'filter-toggle-button--inactive'}
            `}
          >
            {t(filterKey as keyof typeof myCountries)}
          </button>
        );
      })}
    </div>
  );
};

export default FilterToggle;
