import { navigation } from "./navigation.js";
import "./theme.js";

const appShell = document.querySelector(".app-shell");
const sidebar = document.querySelector(".sidebar-index");
const mainScript = document.querySelector('script[src$="script.js"]');
const siteRoot = new URL(".", mainScript.src);

function normalizePath(path) {
  const cleanPath = path.replace(/\/$/, "");
  return cleanPath.endsWith("/index.html") ? cleanPath.replace("/index.html", "") : cleanPath;
}

function linkIsCurrent(href) {
  const link = new URL(href, siteRoot);
  const currentPath = normalizePath(window.location.pathname);
  const linkPath = normalizePath(link.pathname);

  return currentPath === linkPath || (currentPath === "" && linkPath === "");
}

function renderNavItem(item) {
  const isCurrent = linkIsCurrent(item.href);
  const children = item.children || [];
  const childLinks = children.map(renderNavItem).join("");
  const href = new URL(item.href, siteRoot).pathname;

  return `
    <li>
      <a class="${isCurrent ? "is-current" : ""}" href="${href}" ${isCurrent ? 'aria-current="page"' : ""}>
        ${item.title}
      </a>
      ${childLinks ? `<ul>${childLinks}</ul>` : ""}
    </li>
  `;
}

if (sidebar) {
  sidebar.innerHTML = `
    <p class="sidebar-label">Explore</p>
    <nav aria-label="Lesson index">
      <ul>${navigation.map(renderNavItem).join("")}</ul>
    </nav>
  `;
}

if (appShell) {
  appShell.classList.add("is-ready");
}
