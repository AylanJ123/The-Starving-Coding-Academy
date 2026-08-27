import { navigation } from "./navigation.js";
import "./theme.js";

const appShell = document.querySelector(".app-shell");
const sidebar = document.querySelector(".sidebar-index");
const mainScript = document.querySelector('script[src$="script.js"]');
const siteRoot = new URL(".", mainScript.src);
const mobileNavQuery = window.matchMedia("(max-width: 850px)");

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
    <div class="sidebar-top">
      <p class="sidebar-label">Explore</p>
      <button class="sidebar-close" type="button">Close</button>
    </div>
    <nav aria-label="Lesson index">
      <ul>${navigation.map(renderNavItem).join("")}</ul>
    </nav>
  `;
}

if (appShell) {
  appShell.insertAdjacentHTML(
    "afterbegin",
    '<button class="sidebar-toggle" type="button" aria-expanded="false">Lesson index</button>'
  );
  appShell.classList.add("is-ready");
}

const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebarClose = document.querySelector(".sidebar-close");

function setMobileSidebar(open) {
  document.body.classList.toggle("mobile-sidebar-open", open);
  sidebarToggle?.setAttribute("aria-expanded", String(open));
}

function syncSidebarMode() {
  setMobileSidebar(false);
}

sidebarToggle?.addEventListener("click", () => {
  setMobileSidebar(!document.body.classList.contains("mobile-sidebar-open"));
});

sidebarClose?.addEventListener("click", () => setMobileSidebar(false));
mobileNavQuery.addEventListener("change", syncSidebarMode);
syncSidebarMode();
