import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { flattenNavigation } from "../assets/js/navigation.js";
import { lessons } from "../assets/js/lessons/lesson-data.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = flattenNavigation().filter((item) => item.href.startsWith("pages/"));
const expectedSlugs = pages.map((item) => item.href.replace("pages/", "").replace(".html", ""));
const failures = [];
const rootSiteUrl = "https://aylanj123.github.io/";
const siteUrl = "https://aylanj123.github.io/The-Starving-Coding-Academy/";

for (const item of pages) {
  const slug = item.href.replace("pages/", "").replace(".html", "");
  const absolutePath = path.join(projectRoot, item.href);

  try {
    await access(absolutePath);
    const html = await readFile(absolutePath, "utf8");
    const pageUrl = new URL(item.href, siteUrl).href;
    if (!html.includes(`data-lesson="${slug}"`)) failures.push(`${item.href}: wrong or missing data-lesson`);
    if (!html.includes('../script.js')) failures.push(`${item.href}: missing shared script`);
    if (!html.includes('../styles.css')) failures.push(`${item.href}: missing shared stylesheet`);
    if (!html.includes('alt="The Starving Coding Academy official icon"')) failures.push(`${item.href}: missing academy icon alt text`);
    if (!html.includes(`<link rel="canonical" href="${pageUrl}">`)) failures.push(`${item.href}: wrong or missing canonical URL`);
    if (!html.includes(`<link rel="alternate" hreflang="en" href="${pageUrl}">`)) failures.push(`${item.href}: wrong or missing English hreflang`);
    if (!html.includes(`<link rel="describedby" href="${new URL("llms.txt", rootSiteUrl).href}" type="text/markdown">`)) failures.push(`${item.href}: missing root llms.txt discovery link`);
  } catch {
    failures.push(`${item.href}: file missing`);
  }
}

try {
  const home = await readFile(path.join(projectRoot, "index.html"), "utf8");
  if (!home.includes(`<link rel="canonical" href="${siteUrl}">`)) failures.push("index.html: wrong or missing canonical URL");
  if (!home.includes(`<link rel="alternate" hreflang="en" href="${siteUrl}">`)) failures.push("index.html: wrong or missing English hreflang");
  if (!home.includes(`<link rel="describedby" href="${new URL("llms.txt", rootSiteUrl).href}" type="text/markdown">`)) failures.push("index.html: missing root llms.txt discovery link");
  if (!home.includes('alt="The Starving Coding Academy official icon"')) failures.push("index.html: missing academy icon alt text");
  if (!home.includes('alt="Discord\'s official social media icon"')) failures.push("index.html: missing Discord icon alt text");

  const jsonLdMatch = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonLdMatch) {
    failures.push("index.html: JSON-LD missing");
  } else {
    try {
      const jsonLd = JSON.parse(jsonLdMatch[1]);
      const types = (jsonLd["@graph"] || []).map((item) => item["@type"]);
      if (!types.includes("WebSite")) failures.push("index.html: WebSite JSON-LD missing");
      if (!types.includes("Course")) failures.push("index.html: Course JSON-LD missing");
      if (types.includes("FAQPage")) failures.push("index.html: unexpected FAQPage JSON-LD");
    } catch {
      failures.push("index.html: invalid JSON-LD");
    }
  }
} catch {
  failures.push("index.html: file missing");
}

for (const slug of expectedSlugs) {
  const lesson = lessons[slug];
  if (!lesson) {
    failures.push(`${slug}: lesson content missing`);
    continue;
  }
  if (!lesson.title || !lesson.lead || !lesson.sections?.length) failures.push(`${slug}: required content missing`);
  if (!lesson.check) failures.push(`${slug}: quick check missing`);

  for (const section of lesson.sections || []) {
    for (const link of section.links || []) {
      const target = path.join(projectRoot, "pages", link.href);
      try {
        await access(target);
      } catch {
        failures.push(`${slug}: internal lesson link missing (${link.href})`);
      }
    }
  }
}

for (const slug of Object.keys(lessons)) {
  if (!expectedSlugs.includes(slug)) failures.push(`${slug}: content exists without navigation route`);
}

try {
  const sitemap = await readFile(path.join(projectRoot, "sitemap.xml"), "utf8");
  const expectedUrls = [siteUrl, ...pages.map((item) => new URL(item.href, siteUrl).href)];
  const lastModified = "2026-08-29";

  for (const url of expectedUrls) {
    const expectedEntry = `<loc>${url}</loc>\n    <lastmod>${lastModified}</lastmod>`;
    if (!sitemap.includes(expectedEntry)) failures.push(`sitemap.xml: missing or outdated ${url}`);
  }
} catch {
  failures.push("sitemap.xml: file missing");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} routes and ${Object.keys(lessons).length} lessons: all matched.`);
}
