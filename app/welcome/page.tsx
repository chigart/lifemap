"use client"

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LangToggle from '../../components/LangToggle';

export default function WelcomePage() {
  const t = useTranslations('WelcomePage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      <LangToggle />
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('description')}
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {t('viewMap')}
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
