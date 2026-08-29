import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { flattenNavigation } from "../assets/js/navigation.js";
import { lessons } from "../assets/js/lessons/lesson-data.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDirectory = path.join(projectRoot, "pages");
const pageItems = flattenNavigation().filter((item) => item.href.startsWith("pages/"));
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

function robotsTemplate() {
  return `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap.xml", siteUrl).href}
`;
}

function plainText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&")
    .replace(/\s+/g, " ")
    .trim();
}

function llmsTemplate(items) {
  const lessonsMarkdown = items
    .map((item) => {
      const slug = item.href.replace("pages/", "").replace(".html", "");
      const lesson = lessons[slug];
      const lessonUrl = new URL(item.href, siteUrl).href;
      const goals = (lesson.goals || []).map(plainText).join("; ");
      const topics = (lesson.sections || []).map((section) => plainText(section.title)).join("; ");
      const sources = (lesson.sources || [])
        .map((source) => `[${plainText(source.title)}](${source.href})`)
        .join("; ");
      const details = [
        `  - **Summary** — ${plainText(lesson.description || lesson.lead)}`,
        goals ? `  - **Learning goals** — ${goals}` : "",
        topics ? `  - **Key topics** — ${topics}` : "",
        sources ? `  - **References** — ${sources}` : "",
      ].filter(Boolean);

      return [`- [${plainText(lesson.title)}](${lessonUrl})`, ...details].join("\n");
    })
    .join("\n\n");

  return `# The Starving Coding Academy

> A completely free, ad-free beginner course for learning how programming works before becoming attached to one language's syntax.

The academy teaches transferable programming concepts with examples from Python, JavaScript, Java, C#, C++ and Lua. It is designed for complete beginners and uses short lessons, comparisons, quick checks and small practice exercises.

The public website is ${siteUrl}

The material is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). People may share and adapt it with attribution for noncommercial use, and adaptations must use the same license.

## Course facts

- The course contains ${items.length} lessons.
- The curriculum begins with raw programming concepts, then covers syntax, values, operators, program structure, functions, objects, control flow, loops and cumulative practice.
- The lessons compare six languages without asking learners to memorize all six at once.
- Progress is stored locally in the learner's browser and can be exported as a human-readable JSON backup.
- The course is free, contains no advertisements and does not require an account.
- The site source is public on [GitHub](https://github.com/aylanj123/The-Starving-Coding-Academy).
- The community link is [The Starving Coding Academy Discord](https://discord.gg/KzPR9cRBgs).

## Lesson catalog

${lessonsMarkdown}
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
    <link rel="describedby" href="${new URL("llms.txt", siteUrl).href}" type="text/markdown">
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

      <button class="theme-toggle" type="button" aria-label="Switch color theme">
        <span class="theme-icon" aria-hidden="true">☀</span>
        <span class="theme-label">Light</span>
      </button>
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

await Promise.all([
  writeFile(path.join(projectRoot, "sitemap.xml"), sitemapTemplate(pageItems), "utf8"),
  writeFile(path.join(projectRoot, "robots.txt"), robotsTemplate(), "utf8"),
  writeFile(path.join(projectRoot, "llms.txt"), llmsTemplate(pageItems), "utf8"),
]);

console.log(`Generated ${pageItems.length} lesson pages, sitemap.xml, robots.txt, and llms.txt.`);
