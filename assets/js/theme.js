const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");

// If someone already picked a theme, we keep using that choice next time.
const savedTheme = localStorage.getItem("theme");

// If they have not picked yet, we follow their computer's light or dark setting.
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  // The CSS looks at this attribute and swaps all the color variables.
  document.documentElement.dataset.theme = theme;

  // Keep the button text honest so people know what mode they are in.
  themeIcon.textContent = theme === "dark" ? "☾" : "☀";
  themeLabel.textContent = theme === "dark" ? "Dark" : "Light";

  // Save the choice so the page does not forget after a refresh.
  localStorage.setItem("theme", theme);
}

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;

  // Flip to the other theme when the button is clicked.
  setTheme(currentTheme === "dark" ? "light" : "dark");
});
