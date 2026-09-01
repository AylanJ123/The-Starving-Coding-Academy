import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { flattenNavigation } from "../assets/js/navigation.js";
import { lessons } from "../assets/js/lessons/en/lesson-data.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDirectory = path.join(projectRoot, "pages");
const pageItems = flattenNavigation().filter((item) => item.href.startsWith("pages/"));
const rootSiteUrl = "https://aylanj123.github.io/";
const siteUrl = "https://aylanj123.github.io/The-Starving-Coding-Academy/";
const lastModified = "2026-08-29";

function sitemapTemplate(items) {
  const urls = [siteUrl, ...items.map((item) => new URL(item.href, siteUrl).href)];
  const entries = urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastModified}</lastmod>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function stripMarkup(value) {
  return value.replace(/<[^>]+>/g, "").replaceAll('"', "&quot;");
}

function pageTemplate(slug, lesson) {
  const description = stripMarkup(lesson.description || lesson.lead);
  const pageUrl = new URL(`pages/${slug}.html`, siteUrl).href;

  return `<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark light">
    <meta name="description" content="${description}">
    <link rel="canonical" href="${pageUrl}">
    <link rel="alternate" hreflang="en" href="${pageUrl}">
    <link rel="describedby" href="${new URL("llms.txt", rootSiteUrl).href}" type="text/markdown">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="The Starving Coding Academy">
    <meta property="og:title" content="${stripMarkup(lesson.title)}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${siteUrl}assets/images/social/${slug}.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${stripMarkup(lesson.title)} lesson card">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${stripMarkup(lesson.title)}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${siteUrl}assets/images/social/${slug}.png">
    <title>${stripMarkup(lesson.title)} | The Starving Coding Academy</title>
    <script>
      try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          document.documentElement.dataset.theme = savedTheme;
        }
      } catch {}
    </script>
    <link rel="icon" href="../assets/images/academy-icon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="../styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../index.html" aria-label="The Starving Coding Academy home">
        <img class="brand-mark" src="../assets/images/academy-icon.svg" alt="The Starving Coding Academy official icon">
        <span>The Starving Coding Academy</span>
      </a>

      <div class="header-actions">
        <label class="language-control">
          <span class="visually-hidden">Language</span>
          <select data-language-select aria-label="Language">
            <option value="en">English</option>
          </select>
        </label>

        <button class="theme-toggle" type="button" aria-label="Switch color theme">
          <span class="theme-icon" aria-hidden="true">☀</span>
          <span class="theme-label">Light</span>
        </button>
      </div>
    </header>

    <div class="app-shell">
      <aside class="sidebar-index"></aside>
      <main class="page-content lesson-page" data-lesson="${slug}">
        <noscript>
          <h1>JavaScript is needed for the lesson reader</h1>
          <p>Please enable JavaScript to load this lesson and its interactive checks.</p>
        </noscript>
      </main>
    </div>

    <script type="module" src="../script.js"></script>
  </body>
</html>
`;
}

await mkdir(pagesDirectory, { recursive: true });

for (const item of pageItems) {
  const slug = item.href.replace("pages/", "").replace(".html", "");
  const lesson = lessons[slug];

  if (!lesson) {
    throw new Error(`Missing lesson data for ${slug}`);
  }

  await writeFile(path.join(projectRoot, item.href), pageTemplate(slug, lesson), "utf8");
}

await writeFile(path.join(projectRoot, "sitemap.xml"), sitemapTemplate(pageItems), "utf8");

console.log(`Generated ${pageItems.length} lesson pages and sitemap.xml.`);
