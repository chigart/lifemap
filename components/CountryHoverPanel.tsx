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
  const tCountryNames = useTranslations('CountryNames');

  const countryData = countryName && tCountries.has(countryName)
      ? tCountries.raw(countryName)
    : null;
  
  const hasRelevantData = countryData && (
    (activeFilter === 'worked' && countryData.worked) ||
    (activeFilter === 'experienced' && countryData.experienced)
  );
  
  if (!hasRelevantData) {
    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="
          fixed right-0 top-0
          w-80
          bg-white shadow-2xl
          p-6
          z-50
        "
      >
        <h2 className="font-semibold text-lg mb-4">{tCountryNames(countryName)}</h2>
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
        w-80
        bg-white shadow-2xl
        p-6
        z-50
      "
    >
      <h2 className="font-semibold text-lg mb-4">{tCountryNames(countryName)}</h2>
      <div className="space-y-4">
        {activeFilter === 'worked' && countryData.worked && (
          <div className="border-b pb-3">
            <h3 className="font-medium text-base mb-2 text-blue-600">
              {t('worked.title')}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">{t('worked.place')}:</span> {countryData.worked.place}
              </p>
              <p>
                <span className="font-medium">{t('worked.dates')}:</span> {countryData.worked.dates}
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
