"use client"

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

const LangToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const languages = [
    { key: 'en', label: 'English' },
    { key: 'ru', label: 'Русский' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Set the locale cookie
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      // If we're on the welcome page, force a full page reload to apply locale change
      if (pathname === '/welcome') {
        window.location.href = '/welcome?lang=' + newLocale;
      } else {
        // Use router.refresh() for other pages
        router.refresh();
      }
    });
  };

  return (
    <div className="absolute top-4 right-2 sm:right-4 flex flex-col sm:flex-row gap-1 sm:gap-2 z-50">
      {languages.map(lang => {
        const isActive = locale === lang.key;
        return (
          <button
            key={lang.key}
            onClick={() => handleLanguageChange(lang.key)}
            disabled={isPending}
            className={`
              lang-toggle-button
              lang-toggle-button--${lang.key}
              ${isActive ? 'lang-toggle-button--active' : 'lang-toggle-button--inactive'}
              ${isPending ? 'lang-toggle-button--loading' : ''}
            `}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LangToggle;
