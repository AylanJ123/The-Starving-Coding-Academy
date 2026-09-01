export const defaultLanguage = "en";

export const locales = {
  en: {
    label: "English",
    load: () => import("./locales/en/index.js"),
  },
};
