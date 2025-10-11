"use client"

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const LoadingSpinner = () => {
  const t = useTranslations('Loading');
  
  return (
    <div 
      className="
        absolute 
        inset-0 
        flex 
        items-center 
        justify-center 
        bg-gray-100 
        z-10
      "
    >
      <div 
        className="
          flex 
          flex-col 
          items-center 
          space-y-4
        "
      >
        <motion.div
          className="
            w-12 
            h-12 
            border-4 
            border-gray-300 
            border-t-blue-600 
            rounded-full
          "
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.p
          className="
            text-gray-600 
            text-sm 
            font-medium
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('map')}
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
