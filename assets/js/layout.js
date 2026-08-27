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

function branchIsCurrent(item) {
  return linkIsCurrent(item.href) || (item.children || []).some(branchIsCurrent);
}

function renderNavItem(item) {
  const isCurrent = linkIsCurrent(item.href);
  const children = item.children || [];
  const childLinks = children.map(renderNavItem).join("");
  const href = new URL(item.href, siteRoot).pathname;
  const containsCurrent = !isCurrent && children.some(branchIsCurrent);

  return `
    <li class="${containsCurrent ? "contains-current" : ""}" data-nav-title="${item.title.toLowerCase()}">
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
    <label class="lesson-search">
      <span class="visually-hidden">Filter lessons</span>
      <input type="search" placeholder="Find a lesson…" autocomplete="off">
    </label>
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
const lessonSearch = document.querySelector(".lesson-search input");

function setMobileSidebar(open) {
  document.body.classList.toggle("mobile-sidebar-open", open);
  sidebarToggle?.setAttribute("aria-expanded", String(open));
  if (open) requestAnimationFrame(revealCurrentLesson);
}

function revealCurrentLesson() {
  if (!mobileNavQuery.matches) return;
  const currentLink = sidebar?.querySelector("a.is-current");
  if (!sidebar || !currentLink) return;

  const sidebarRect = sidebar.getBoundingClientRect();
  const currentRect = currentLink.getBoundingClientRect();
  const currentTop = currentRect.top - sidebarRect.top + sidebar.scrollTop;
  const targetTop = currentTop - sidebar.clientHeight / 2 + currentRect.height / 2;
  sidebar.scrollTop = Math.max(0, targetTop);
}

function syncSidebarMode() {
  setMobileSidebar(false);
}

sidebarToggle?.addEventListener("click", () => {
  setMobileSidebar(!document.body.classList.contains("mobile-sidebar-open"));
});

sidebarClose?.addEventListener("click", () => setMobileSidebar(false));
sidebar?.addEventListener("transitionend", (event) => {
  if (event.propertyName === "height" && document.body.classList.contains("mobile-sidebar-open")) {
    revealCurrentLesson();
  }
});
sidebar?.addEventListener("click", (event) => {
  if (mobileNavQuery.matches && event.target.closest("a")) setMobileSidebar(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("mobile-sidebar-open")) {
    setMobileSidebar(false);
    sidebarToggle?.focus();
  }
});
lessonSearch?.addEventListener("input", () => {
  const query = lessonSearch.value.trim().toLowerCase();
  const rootItems = [...sidebar.querySelectorAll("nav > ul > li")];

  function filterItem(item) {
    const directMatch = item.dataset.navTitle.includes(query);
    const children = [...item.querySelectorAll(":scope > ul > li")];
    const childMatch = children.map(filterItem).some(Boolean);
    const visible = !query || directMatch || childMatch;
    item.hidden = !visible;
    return visible;
  }

  rootItems.forEach(filterItem);
});
mobileNavQuery.addEventListener("change", syncSidebarMode);
syncSidebarMode();
requestAnimationFrame(revealCurrentLesson);
