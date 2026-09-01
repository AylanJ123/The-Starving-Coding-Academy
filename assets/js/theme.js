import { ui } from "./i18n.js";

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");

const initialTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";

function setTheme(theme) {
  // The CSS looks at this attribute and swaps all the color variables.
  document.documentElement.dataset.theme = theme;

  // Keep the button text honest so people know what mode they are in.
  themeIcon.textContent = theme === "dark" ? "☾" : "☀";
  themeLabel.textContent = theme === "dark" ? ui.themeDark : ui.themeLight;

  // Save the choice so the page does not forget after a refresh.
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

setTheme(initialTheme);
themeToggle.setAttribute("aria-label", ui.themeToggleLabel);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;

  // Flip to the other theme when the button is clicked.
  setTheme(currentTheme === "dark" ? "light" : "dark");
});
