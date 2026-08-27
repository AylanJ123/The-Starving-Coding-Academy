const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = theme === "dark" ? "☾" : "☀";
  themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
  localStorage.setItem("theme", theme);
}

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "dark" ? "light" : "dark");
});
