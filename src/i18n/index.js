import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../locales/en/common.json";
import faCommon from "../locales/fa/common.json";
import psCommon from "../locales/ps/common.json";

import { DEFAULT_LANGUAGE } from "./config";

const resources = {
  en: {
    common: enCommon,
  },
  fa: {
    common: faCommon,
  },
  ps: {
    common: psCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,

    supportedLngs: ["en", "fa", "ps"],

    defaultNS: "common",
    ns: ["common"],

    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "app-lang",
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;