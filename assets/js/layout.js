import { flattenNavigation, navigation } from "./navigation.js";
import { lessons } from "./lessons/lesson-data.js";
import "./theme.js";

const appShell = document.querySelector(".app-shell");
const sidebar = document.querySelector(".sidebar-index");
const mainScript = document.querySelector('script[src$="script.js"]');
const siteRoot = new URL(".", mainScript.src);
const mobileNavQuery = window.matchMedia("(max-width: 850px)");

const excludedSearchKeys = new Set([
  "answer",
  "content",
  "explanation",
  "href",
  "solution",
  "solutionCode",
  "sources",
]);

function normalizeSearchText(value) {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function collectSearchText(value, key = "") {
  if (excludedSearchKeys.has(key) || value == null) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((item) => collectSearchText(item, key));
  if (typeof value === "object") {
    return Object.entries(value).flatMap(([childKey, childValue]) => collectSearchText(childValue, childKey));
  }
  return [];
}

const lessonSearchIndex = new Map(
  flattenNavigation().map((item) => {
    const slug = item.href.replace("pages/", "").replace(".html", "");
    const lesson = lessons[slug];
    return [item.href, normalizeSearchText([item.title, ...collectSearchText(lesson)].join(" "))];
  })
);

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
    <li class="${containsCurrent ? "contains-current" : ""}" data-nav-title="${item.title.toLowerCase()}" data-nav-href="${item.href}">
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
    <div class="course-progress"></div>
    <details class="progress-tools">
      <summary>Back up progress</summary>
      <div class="progress-tools-body">
        <p>Move completed lessons between browsers with a small, readable JSON file.</p>
        <div class="progress-actions">
          <button class="progress-action" type="button" data-progress-export>Download</button>
          <button class="progress-action" type="button" data-progress-import>Import</button>
          <input class="visually-hidden" type="file" accept=".json,application/json" data-progress-file>
        </div>
        <p class="progress-status" aria-live="polite"></p>
      </div>
    </details>
    <label class="lesson-search">
      <span class="visually-hidden">Filter lessons</span>
      <input type="search" placeholder="Search lesson content…" autocomplete="off">
    </label>
    <p class="lesson-search-status" aria-live="polite"></p>
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
const lessonSearchStatus = document.querySelector(".lesson-search-status");

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
  const query = normalizeSearchText(lessonSearch.value);
  const rootItems = [...sidebar.querySelectorAll("nav > ul > li")];

  function filterItem(item) {
    const searchText = lessonSearchIndex.get(item.dataset.navHref) || item.dataset.navTitle;
    const directMatch = searchText.includes(query);
    const children = [...item.querySelectorAll(":scope > ul > li")];
    const childMatch = children.map(filterItem).some(Boolean);
    const visible = !query || directMatch || childMatch;
    item.hidden = !visible;
    item.dataset.searchMatch = String(Boolean(query && directMatch));
    return visible;
  }

  rootItems.forEach(filterItem);

  if (lessonSearchStatus) {
    const matchCount = query
      ? sidebar.querySelectorAll('li[data-search-match="true"]').length
      : 0;
    lessonSearchStatus.textContent = !query
      ? ""
      : matchCount
        ? `${matchCount} ${matchCount === 1 ? "lesson" : "lessons"} found`
        : "No lessons found";
  }
});
mobileNavQuery.addEventListener("change", syncSidebarMode);
syncSidebarMode();
requestAnimationFrame(revealCurrentLesson);
