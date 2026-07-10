export const SUPPORTED_LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeName: "English",
    flag: "🇺🇸",
    dir: "ltr",
  },
  { code: "fa", label: "Dari", nativeName: "دری", flag: "🇦🇫", dir: "rtl" },
  { code: "ps", label: "Pashto", nativeName: "پښتو", flag: "🇦🇫", dir: "rtl" },
];

export const SUPPORTED_CALENDARS = [
  { code: "gregorian", label: "Gregorian", nativeName: "Miladi" },
  { code: "jalali", label: "Jalali", nativeName: "Shamsi" },
];

export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_CALENDAR = "gregorian";
export const DEFAULT_CURRENCY = "USD";
export const DEFAULT_TIME_ZONE = "Asia/Kabul";
