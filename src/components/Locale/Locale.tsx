import locale_ES from '@locale/es.json';
import useLocalStorage from '@saleor/hooks/useLocalStorage';
import React from 'react';
import { IntlProvider } from 'react-intl';


export enum Locale {
  EN = "en",
  ES = "es",
}

type LocaleMessages = Record<string, string>;
const localeData: Record<Locale, LocaleMessages> = {
  // Default language
  [Locale.EN]: undefined,
  [Locale.ES]: locale_ES
};

export const localeNames: Record<Locale, string> = {
  [Locale.EN]: "English",
  [Locale.ES]: "Español",
};

export function getMatchingLocale(languages: readonly string[]): Locale {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const localeEntry of localeEntries) {
      if (localeEntry[1].toLowerCase() === preferredLocale.toLowerCase()) {
        return Locale[localeEntry[0]];
      }
    }
  }

  return undefined;
}

const defaultLocale = Locale.EN;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useLocalStorage(
    "locale",
    getMatchingLocale(navigator.languages) || defaultLocale
  );

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={localeData[locale]}
      onError={err => {
        if (!err.includes("[React Intl] Missing message: ")) {
          console.error(err);
        }
      }}
      key={locale}
    >
      <RawLocaleProvider
        value={{
          locale,
          setLocale
        }}
      >
        {children}
      </RawLocaleProvider>
    </IntlProvider>
  );
};

export { LocaleConsumer, LocaleProvider, RawLocaleProvider };
