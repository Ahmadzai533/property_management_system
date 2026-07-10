import { useEffect, useMemo, useState , useCallback} from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_CALENDAR,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  SUPPORTED_CALENDARS,
  SUPPORTED_LANGUAGES,
} from "../i18n/config";

const STORAGE_KEYS = {
  language: "app-lang",
  calendar: "app-calendar",
  currency: "app-currency",
  dir: "app-dir",
};

// Official Afghan Solar Hijri month names (Dari/Pashto)
const AFGHAN_MONTHS = [
  "حمل",
  "ثور",
  "جوزا",
  "سرطان",
  "اسد",
  "سنبله",
  "میزان",
  "عقرب",
  "قوس",
  "جدی",
  "دلو",
  "حوت",
];

/**
 * Convert Gregorian date to Jalali (Solar Hijri) date
 * Returns [year, month (1-based), day]
 */
const gregorianToJalali = (gy, gm, gd) => {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm, jd;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  return [jy, jm, jd];
};

export const useLocalization = () => {
  const { i18n, t } = useTranslation("common");

  // i18next is the single source of truth for language
  const language = i18n.language || DEFAULT_LANGUAGE;

  const [calendar, setCalendarState] = useState(
    () => localStorage.getItem(STORAGE_KEYS.calendar) || DEFAULT_CALENDAR,
  );

  const [currency, setCurrencyState] = useState(
    () => localStorage.getItem(STORAGE_KEYS.currency) || DEFAULT_CURRENCY,
  );

  const [dir, setDirState] = useState(
    () => localStorage.getItem(STORAGE_KEYS.dir) || "ltr",
  );

  // Handle language direction and storage
  useEffect(() => {
    const selectedLanguage =
      SUPPORTED_LANGUAGES.find((item) => item.code === language) ||
      SUPPORTED_LANGUAGES[0];

    const selectedCalendar =
      SUPPORTED_CALENDARS.find((item) => item.code === calendar) ||
      SUPPORTED_CALENDARS[0];

    document.documentElement.lang = language;
    document.documentElement.dir = selectedLanguage.dir;
    document.body.dir = selectedLanguage.dir;

    localStorage.setItem(STORAGE_KEYS.language, language);
    localStorage.setItem(STORAGE_KEYS.calendar, selectedCalendar.code);
    localStorage.setItem(STORAGE_KEYS.currency, currency);
    localStorage.setItem(STORAGE_KEYS.dir, selectedLanguage.dir);

    setDirState(selectedLanguage.dir);

    console.log("Current language:", language);
    console.log("Direction:", selectedLanguage.dir);
  }, [language, calendar, currency]);

  // Change language globally
  const setLanguage = async (nextLanguage) => {
    await i18n.changeLanguage(nextLanguage);
    localStorage.setItem(STORAGE_KEYS.language, nextLanguage);
  };

  const setCalendar = (nextCalendar) => {
    setCalendarState(nextCalendar);
  };

  const setCurrency = (nextCurrency) => {
    setCurrencyState(nextCurrency);
  };

  const formatDate = useCallback(
    (value, options = {}) => {
      if (!value) return "";

      try {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return "";

        // Jalali formatting for Dari and Pashto
        if (language === "fa" || language === "ps") {
          const gy = date.getFullYear();
          const gm = date.getMonth() + 1; // 1-based month
          const gd = date.getDate();

          const [jy, jm, jd] = gregorianToJalali(gy, gm, gd);

          const monthName = AFGHAN_MONTHS[jm - 1]; // jm is 1-based

          const { format = "full", showTime = false } = options;

          let result = "";

          switch (format) {
            case "short":
              result = `${jd} ${monthName} ${jy}`;
              break;
            case "numeric":
              result = `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
              break;
            case "full":
            default:
              result = `${jd} ${monthName} ${jy}`;
          }

          if (showTime) {
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            result += ` ${hours}:${minutes}`;
          }

          return result;
        }

        // Gregorian fallback (English)
    const defaultOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

        const formatOptions = {
        ...defaultOptions,
        };

        if (options.showTime) {
          formatOptions.hour = "2-digit";
          formatOptions.minute = "2-digit";
        }

        return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
      } catch (error) {
        console.error("Date formatting error:", error);
        return "";
      }
    },
    [language],
  );

  const formatNumber = (value, options = {}) => {
    const number = Number(value);

    if (Number.isNaN(number)) return "";

    return new Intl.NumberFormat(
      language === "fa" || language === "ps" ? "fa-IR" : "en-US",
      options,
    ).format(number);
  };

  const formatCurrency = (value, currencyOverride = currency) => {
    const number = Number(value);

    if (Number.isNaN(number)) return "";

    return new Intl.NumberFormat(
      language === "fa" || language === "ps" ? "fa-IR" : "en-US",
      {
        style: "currency",
        currency: currencyOverride,
      },
    ).format(number);
  };

  const currentLanguage = useMemo(
    () =>
      SUPPORTED_LANGUAGES.find((item) => item.code === language) ||
      SUPPORTED_LANGUAGES[0],
    [language],
  );

  const currentCalendar = useMemo(
    () =>
      SUPPORTED_CALENDARS.find((item) => item.code === calendar) ||
      SUPPORTED_CALENDARS[0],
    [calendar],
  );

  return {
    t,

    language,
    setLanguage,

    calendar,
    setCalendar,

    currency,
    setCurrency,

    dir,

    currentLanguage,
    currentCalendar,

    supportedLanguages: SUPPORTED_LANGUAGES,
    supportedCalendars: SUPPORTED_CALENDARS,

    formatDate,
    formatNumber,
    formatCurrency,
  };
};