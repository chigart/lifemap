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
    (activeFilter === 'worked' && 
     countryData.worked && 
     Array.isArray(countryData.worked) && 
     countryData.worked.length > 0) ||
    (activeFilter === 'experienced' && 
     countryData.experienced && 
     Array.isArray(countryData.experienced) && 
     countryData.experienced.length > 0)
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
          bg-white
          shadow-2xl
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
        bg-white
        shadow-2xl
        p-6
        z-50
      "
    >
      <h2 className="font-semibold text-lg mb-4">{tCountryNames(countryName)}</h2>
      <div className="space-y-4">
        {activeFilter === 'worked' && 
         countryData.worked && 
         Array.isArray(countryData.worked) && (
          <div>
            <h3 className="font-medium text-base mb-2 text-blue-600">
              {t('worked.title')}
            </h3>
            <div className="space-y-3">
              {countryData.worked.map((work: any, index: number) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">
                        {t('worked.place')}:
                      </span> {work.place}
                    </p>
                    <p>
                      <span className="font-medium">
                        {t('worked.dates')}:
                      </span> {work.dates}
                    </p>
                    <p>
                      <span className="font-medium">
                        {t('worked.description')}:
                      </span> {work.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeFilter === 'experienced' && 
         countryData.experienced && 
         Array.isArray(countryData.experienced) && (
          <div>
            <h3 className="font-medium text-base mb-2 text-purple-600">
              {t('experienced.title')}
            </h3>
            <div className="space-y-3">
              {countryData.experienced.map((experience: any, index: number) => (
                <div key={index} className="bg-purple-50 p-3 rounded-lg">
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">
                        {t('experienced.dates')}:
                      </span> 
                      {experience.dates}
                    </p>
                    <p>
                      <span className="font-medium">
                        {t('experienced.description')}:
                      </span> 
                      {experience.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CountryHoverPanel;
