import { defaultLanguage, locales } from "./locale-registry.js";

const LANGUAGE_STORAGE_KEY = "tsca-language";

function readLanguage() {
  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (Object.hasOwn(locales, storedLanguage)) return storedLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, defaultLanguage);
    return defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export const language = readLanguage();
document.documentElement.lang = language;

const locale = await locales[language].load();

export const { home, lessons, navigation, ui } = locale;

export function initializeLanguageSelects() {
  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.replaceChildren(
      ...Object.entries(locales).map(([code, { label }]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = label;
        return option;
      }),
    );
    select.value = language;
    select.setAttribute("aria-label", ui.languageSelectorLabel);
    select.addEventListener("change", () => {
      const nextLanguage = select.value;
      if (!Object.hasOwn(locales, nextLanguage)) return;

      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      } catch {
        select.value = language;
        return;
      }

      window.location.reload();
    });
  });
}

export function updateMetaContent(selector, content) {
  if (!content) return;
  document.querySelector(selector)?.setAttribute("content", content);
}
