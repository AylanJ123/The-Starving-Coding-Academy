import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { lessons } from "../assets/js/lessons/lesson-data.js";
import { flattenNavigation } from "../assets/js/navigation.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const colonExemptLessons = new Set(["raw-programming", "what-is-coding", "syntax-rules", "when-code-breaks"]);

function plainText(value) {
  return value
    .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, "CODE")
    .replace(/<[^>]+>/g, "")
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, "ENTITY")
    .trim();
}

function startsWithCapital(value) {
  const firstLetter = plainText(value).match(/[A-Za-z]/)?.[0];
  return !firstLetter || firstLetter === firstLetter.toUpperCase();
}

function inspectVisibleText(value, location) {
  const text = plainText(value);
  if (text.includes("—")) failures.push(`${location}: contains an em dash`);
  if (text.includes(";")) failures.push(`${location}: contains a semicolon outside code`);
  const lessonSlug = location.split(".")[0];
  if (text.includes(":") && !colonExemptLessons.has(lessonSlug)) failures.push(`${location}: contains a colon outside code`);
  if (/\b(?:it is|it's) not\b[^.!?]{0,100}\b(?:it is|it's)\b/i.test(text)) {
    failures.push(`${location}: contains an avoided contrast phrase`);
  }
  if (/\bnot only\b/i.test(text)) failures.push(`${location}: contains “not only”`);
  if (/\b(?:does|do) not mean\b/i.test(text)) failures.push(`${location}: contains an avoided contrast phrase`);
  if (/\bnot\b[^.!?]{0,80}\bbut\b/i.test(text)) failures.push(`${location}: contains an avoided contrast construction`);
}

function inspectObject(value, location, parentKey = "") {
  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    const childLocation = `${location}.${key}`;

    if (key === "code" || key === "solutionCode" || key === "sources" || key === "href") continue;

    if (typeof child === "string") {
      inspectVisibleText(child, childLocation);

      const isHeading = key === "title" && parentKey !== "sources";
      if (isHeading && /[,.]/.test(plainText(child))) {
        failures.push(`${childLocation}: title contains a comma or full stop`);
      }
    } else if (Array.isArray(child)) {
      child.forEach((item, index) => {
        if (typeof item === "string") {
          inspectVisibleText(item, `${childLocation}[${index}]`);
          if ((key === "bullets" || key === "steps") && !startsWithCapital(item)) {
            failures.push(`${childLocation}[${index}]: bullet does not start with a capital`);
          }
        } else {
          inspectObject(item, `${childLocation}[${index}]`, key);
        }
      });
    } else {
      inspectObject(child, childLocation, key);
    }
  }
}

for (const [slug, lesson] of Object.entries(lessons)) inspectObject(lesson, slug);

for (const [slug, lesson] of Object.entries(lessons)) {
  for (const [sectionIndex, section] of (lesson.sections || []).entries()) {
    for (const [rowIndex, row] of (section.table?.rows || []).entries()) {
      const firstCell = row[0];
      if (typeof firstCell !== "string" || /^\s*<code[\s>]/i.test(firstCell)) continue;
      if (!startsWithCapital(firstCell)) {
        failures.push(`${slug}.sections[${sectionIndex}].table.rows[${rowIndex}][0]: first column does not start with a capital`);
      }
    }
  }
}

for (const item of flattenNavigation()) {
  if (/[,.]/.test(item.title)) failures.push(`navigation.${item.href}: title contains a comma or full stop`);
  if (!startsWithCapital(item.title)) failures.push(`navigation.${item.href}: title does not start with a capital`);
}

for (const file of ["index.html"]) {
  const source = await readFile(path.join(projectRoot, file), "utf8");
  const visibleApproximation = source
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, "ENTITY");

  inspectVisibleText(visibleApproximation, file);

  for (const [, heading] of source.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)) {
    if (/[,.]/.test(plainText(heading))) failures.push(`${file}: heading contains a comma or full stop`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Editorial rules passed for all visible curriculum text.");
}
