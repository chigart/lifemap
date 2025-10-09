"use client"

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

interface CountryHoverPanelProps {
  countryName: string;
  activeFilter: string;
}

const CountryHoverPanel = ({ countryName, activeFilter }: CountryHoverPanelProps) => {
  const t = useTranslations('CountryPanel');
  const tCountries = useTranslations('Countries');

  const countryData = tCountries.raw(countryName);
  
  const hasRelevantData = 
    (activeFilter === 'worked' && countryData.cv) ||
    (activeFilter === 'visited' && countryData.visited) ||
    (activeFilter === 'experienced' && countryData.experienced);
  
  if (!hasRelevantData) {
    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="
          fixed right-0 top-0
          h-full w-80
          bg-white shadow-2xl
          p-6
          z-50
          overflow-y-auto
        "
      >
        <h2 className="font-semibold text-lg mb-4">{countryName}</h2>
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            {activeFilter === 'worked' && 'No work experience data available'}
            {activeFilter === 'visited' && 'No visit information available'}
            {activeFilter === 'experienced' && 'No experience data available'}
          </p>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="
        fixed right-0 top-0
        h-full w-80
        bg-white shadow-2xl
        p-6
        z-50
        overflow-y-auto
      "
    >
      <h2 className="font-semibold text-lg mb-4">{countryName}</h2>
      <div className="space-y-4">
        {activeFilter === 'worked' && countryData.cv && (
          <div className="border-b pb-3">
            <h3 className="font-medium text-base mb-2 text-blue-600">
              {t('cv.title')}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">{t('cv.place')}:</span> {countryData.cv.place}
              </p>
              <p>
                <span className="font-medium">{t('cv.dates')}:</span> {countryData.cv.dates}
              </p>
            </div>
          </div>
        )}
        
        {activeFilter === 'visited' && countryData.visited && (
          <div className="border-b pb-3">
            <h3 className="font-medium text-base mb-2 text-green-600">
              {t('visited.title')}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">{t('visited.visits')}:</span> 
                {countryData.visited.visits.join(", ")}
              </p>
              <p>
                <span className="font-medium">{t('visited.days')}:</span> 
                {countryData.visited.days}
              </p>
              <p>
                <span className="font-medium">{t('visited.places')}:</span> 
                {countryData.visited.places.join(", ")}
              </p>
            </div>
          </div>
        )}
        
        {activeFilter === 'experienced' && countryData.experienced && (
          <div>
            <h3 className="font-medium text-base mb-2 text-purple-600">
              {t('experienced.title')}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">{t('experienced.dates')}:</span> 
                {countryData.experienced.dates}
              </p>
              <p>
                <span className="font-medium">{t('experienced.description')}:</span> 
                {countryData.experienced.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CountryHoverPanel;
