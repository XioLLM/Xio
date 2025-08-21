// Xio i18n Setup
// Initializes internationalization for the Xio platform with auto-detected language support.

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultNS, resources } from "./locales/resources";

i18next
  .use(initReactI18next) // Connect i18n with React
  .use(LanguageDetector) // Detect browser language for Xio
  .init({
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    defaultNS,
    resources,
    lowerCaseLng: true,
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18next;
