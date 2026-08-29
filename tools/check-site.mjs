import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { flattenNavigation } from "../assets/js/navigation.js";
import { lessons } from "../assets/js/lessons/lesson-data.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = flattenNavigation().filter((item) => item.href.startsWith("pages/"));
const expectedSlugs = pages.map((item) => item.href.replace("pages/", "").replace(".html", ""));
const failures = [];
const siteUrl = "https://aylanj123.github.io/The-Starving-Coding-Academy/";

for (const item of pages) {
  const slug = item.href.replace("pages/", "").replace(".html", "");
  const absolutePath = path.join(projectRoot, item.href);

  try {
    await access(absolutePath);
    const html = await readFile(absolutePath, "utf8");
    if (!html.includes(`data-lesson="${slug}"`)) failures.push(`${item.href}: wrong or missing data-lesson`);
    if (!html.includes('../script.js')) failures.push(`${item.href}: missing shared script`);
    if (!html.includes('../styles.css')) failures.push(`${item.href}: missing shared stylesheet`);
  } catch {
    failures.push(`${item.href}: file missing`);
  }
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

try {
  const robots = await readFile(path.join(projectRoot, "robots.txt"), "utf8");
  const sitemapUrl = new URL("sitemap.xml", siteUrl).href;
  if (!robots.includes("User-agent: *")) failures.push("robots.txt: missing wildcard user agent");
  if (!robots.includes("Allow: /")) failures.push("robots.txt: site is not explicitly crawlable");
  if (!robots.includes(`Sitemap: ${sitemapUrl}`)) failures.push("robots.txt: missing sitemap URL");
} catch {
  failures.push("robots.txt: file missing");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} routes and ${Object.keys(lessons).length} lessons: all matched.`);
}
