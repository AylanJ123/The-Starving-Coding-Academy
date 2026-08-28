import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { lessons } from "../assets/js/lessons/lesson-data.js";
import { flattenNavigation } from "../assets/js/navigation.js";

const require = createRequire(import.meta.url);
let sharp;

try {
  sharp = require("sharp");
} catch {
  throw new Error("The social card generator needs the sharp package. Install it with npm install sharp or expose it through NODE_PATH.");
}

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backgroundPath = path.join(projectRoot, "assets", "images", "social-card-background.png");
const outputDirectory = path.join(projectRoot, "assets", "images", "social");
const textAreaLeft = 0;
const textAreaRight = 760;
const textAreaPadding = 120;
const textCenterX = (textAreaLeft + textAreaRight) / 2;
const textCenterY = 355;
const textMaximumWidth = textAreaRight - textAreaLeft - textAreaPadding * 2;
const fontSize = 46;
const lineHeight = 56;
const fontFamily = '"Segoe Print", "Segoe Script", "Segoe UI", sans-serif';
const navigationTitles = new Map(
  flattenNavigation()
    .map((item) => {
      const match = item.href?.match(/^pages\/(.+)\.html$/);
      return match ? [match[1], item.title] : null;
    })
    .filter(Boolean),
);
const lessonEntries = Object.entries(lessons);
const availableTargets = new Set(["home", ...lessonEntries.map(([slug]) => slug)]);
const requestedTargets = process.argv.slice(2);
const generateEverything = requestedTargets.length === 0 || requestedTargets.includes("--all");
const targets = new Set(generateEverything ? availableTargets : requestedTargets);

for (const target of targets) {
  if (!availableTargets.has(target)) {
    throw new Error(`Unknown social card target "${target}". Use home or a lesson slug.`);
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const measuredTextWidths = new Map();

async function measureTextWidth(value) {
  if (measuredTextWidths.has(value)) return measuredTextWidths.get(value);

  const measurement = Buffer.from(`
    <svg width="1600" height="120" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="70" fill="#000000" font-family='${fontFamily}' font-size="${fontSize}" font-weight="400">${escapeXml(value)}</text>
    </svg>
  `);
  const { info } = await sharp(measurement).trim().png().toBuffer({ resolveWithObject: true });
  measuredTextWidths.set(value, info.width);
  return info.width;
}

async function wrapText(value) {
  const words = value.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (!line || (await measureTextWidth(candidate)) <= textMaximumWidth) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

async function createTextOverlay(label, className) {
  const lines = await wrapText(label);
  const firstLineCenter = textCenterY - ((lines.length - 1) * lineHeight) / 2;
  const textLines = lines
    .map((line, index) => `<text x="${textCenterX}" y="${firstLineCenter + index * lineHeight}" text-anchor="middle" dominant-baseline="middle" class="${className}">${escapeXml(line)}</text>`)
    .join("");

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <style>
        .${className} { fill: #000000; font: 400 ${fontSize}px ${fontFamily}; }
      </style>
      ${textLines}
    </svg>
  `);
}

async function textOverlay(navigationTitle, lessonNumber) {
  const label = `Lesson ${String(lessonNumber).padStart(2, "0")}: ${navigationTitle}`;
  return createTextOverlay(label, "title");
}

async function homeOverlay() {
  return createTextOverlay("42 lessons and completely free :D", "home-copy");
}

await mkdir(outputDirectory, { recursive: true });
if (targets.has("home")) {
  await sharp(backgroundPath)
    .resize(1200, 630, { fit: "fill" })
    .composite([{ input: await homeOverlay(), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, "home.png"));
}

for (const [[slug], index] of lessonEntries.map((entry, index) => [entry, index])) {
  if (!targets.has(slug)) continue;

  const navigationTitle = navigationTitles.get(slug);
  if (!navigationTitle) throw new Error(`No navigation title found for ${slug}.`);

  await sharp(backgroundPath)
    .resize(1200, 630, { fit: "fill" })
    .composite([{ input: await textOverlay(navigationTitle, index + 1), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, `${slug}.png`));
}

const generatedLessonCount = [...targets].filter((target) => target !== "home").length;
const generatedHomeCount = targets.has("home") ? 1 : 0;
console.log(`Generated ${generatedLessonCount} lesson social card${generatedLessonCount === 1 ? "" : "s"} and ${generatedHomeCount} landing card${generatedHomeCount === 1 ? "" : "s"}.`);
