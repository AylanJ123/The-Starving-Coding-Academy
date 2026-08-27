import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { lessons } from "../assets/js/lessons/lesson-data.js";

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

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapTitle(title, maximumCharacters) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maximumCharacters || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function textOverlay(lesson, lessonNumber) {
  const label = `Lesson ${String(lessonNumber).padStart(2, "0")}: ${lesson.title}`;
  const fontSize = label.length > 60 ? 36 : 40;
  const lines = wrapTitle(label, fontSize === 36 ? 31 : 28);
  const titleLines = lines
    .map((line, index) => `<text x="58" y="${355 + index * 50}" class="title">${escapeXml(line)}</text>`)
    .join("");

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { fill: #484848; font: 400 ${fontSize}px "Comic Sans MS", "Segoe Print", cursive; }
      </style>
      ${titleLines}
    </svg>
  `);
}

await mkdir(outputDirectory, { recursive: true });
await copyFile(backgroundPath, path.join(outputDirectory, "home.png"));

for (const [[slug, lesson], index] of Object.entries(lessons).map((entry, index) => [entry, index])) {
  await sharp(backgroundPath)
    .resize(1200, 630, { fit: "fill" })
    .composite([{ input: textOverlay(lesson, index + 1), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, `${slug}.png`));
}

console.log(`Generated ${Object.keys(lessons).length} lesson social cards and one landing card.`);
