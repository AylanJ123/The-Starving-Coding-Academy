import { flattenNavigation } from "./navigation.js";
import { lessons } from "./lessons/lesson-data.js";

const lessonRoot = document.querySelector("[data-lesson]");
const STORAGE_KEY = "tsca-completed-lessons";
const lessonItems = flattenNavigation().filter((item) => item.href.startsWith("pages/"));
const lessonSlug = (item) => item.href.replace("pages/", "").replace(".html", "");
const lessonBySlug = new Map(lessonItems.map((item) => [lessonSlug(item), item]));
const keywordPattern =
  "ask|show|read|try|catch|except|finally|throw|raise|propagate|convert|exists|add|to|as|play|open|close|load|create|start|enter|record|preserve|release|wait|through|with|using|activate|report|maximum|otherwise|when|if|else|elseif|elif|while|until|repeat|for|each|in|of|switch|case|default|match|enum|function|method|return|break|continue|class|field|private|property|constructor|new|local|let|const|var|def|string|true|false|null|nil|none|and|or|not";
const keywordRegex = new RegExp(`^(?:${keywordPattern})$`, "i");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlightCode(value) {
  const tokenPattern = new RegExp(
    `(\\/\\/[^\\n]*|# [^\\n]*|--[^\\n]*|"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\\([A-Za-z_][\\w]*\\)|\\b\\d+(?:\\.\\d+)?\\b|\\b(?:${keywordPattern})\\b)`,
    "gi"
  );

  return String(value)
    .split(tokenPattern)
    .map((token) => {
      if (!token) return "";
      const escaped = escapeHtml(token);
      if (/^(?:\/\/|# |--)/.test(token)) return `<span class="code-comment">${escaped}</span>`;
      if (/^["']/.test(token)) return `<span class="code-string">${escaped}</span>`;
      if (/^\([A-Za-z_]\w*\)$/.test(token)) {
        return `(<span class="code-parameter">${escapeHtml(token.slice(1, -1))}</span>)`;
      }
      if (/^\d/.test(token)) return `<span class="code-number">${escaped}</span>`;
      if (keywordRegex.test(token)) {
        return `<span class="code-keyword">${escaped}</span>`;
      }
      return escaped;
    })
    .join("");
}

function highlightMultilanguageCode(value) {
  const tokenPattern = /(^[ \t]*\/#\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|<=|>=|==|!=|&&|\|\||[(){}[\];:,.+\-*/%=<>])/gm;

  return String(value)
    .split(tokenPattern)
    .map((token) => {
      if (!token) return "";
      const escaped = escapeHtml(token);
      if (/^[ \t]*\/#\//.test(token)) {
        return `<span class="code-comment">${escapeHtml(token.replace("/#/", "").trimStart())}</span>`;
      }
      if (/^["']/.test(token)) return `<span class="code-string">${escaped}</span>`;
      if (/^(?:<=|>=|==|!=|&&|\|\||[(){}[\];:,.+\-*/%=<>])$/.test(token)) {
        return `<span class="code-operator">${escaped}</span>`;
      }
      return escaped;
    })
    .join("");
}

function codeWindow(code) {
  const content =
    code.highlighter === "multilanguage"
      ? highlightMultilanguageCode(code.content)
      : highlightCode(code.content);

  return `
    <div class="code-window">
      <div class="code-window-header">
        <span>${escapeHtml(codeLanguageLabel(code))}</span>
        <div class="window-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      </div>
      <pre><code>${content}</code></pre>
    </div>
  `;
}

function codeLanguageLabel(code) {
  const supplied = code.language || code.label || "";
  const content = code.content || "";
  const evidence = `${supplied}\n${content}`;
  const languages = [
    ["JavaScript", /\bJavaScript\b/i],
    ["Python", /\bPython\b/i],
    ["C#", /C#/i],
    ["C++", /C\+\+/i],
    ["Java", /\bJava\b/i],
    ["Lua", /\bLua\b/i],
  ].filter(([, pattern]) => pattern.test(evidence));

  if (/multilanguage/i.test(supplied) || languages.length > 1) return "Multilanguage";
  if (languages.length === 1) return languages[0][0];
  if (/\b(?:const|let)\b|console\.log|addEventListener|createMatch\s*\(/.test(content)) return "JavaScript";
  if (/\b(?:def|lambda|print|range)\b/.test(content) || /^\s*# /m.test(content)) return "Python";
  if (/\b(?:local|repeat)\b/.test(content) && /\b(?:until|then|end)\b/.test(content)) return "Lua";
  return "Pseudocode";
}

function renderTable(table) {
  const headers = table.headers.map((header) => `<th scope="col">${header}</th>`).join("");
  const rows = table.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `<div class="table-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderSection(section) {
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("");
  const bullets = section.bullets
    ? `<ul class="lesson-list">${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : "";
  const steps = section.steps
    ? `<ol class="lesson-list steps">${section.steps.map((item) => `<li>${item}</li>`).join("")}</ol>`
    : "";
  const cards = section.cards
    ? `<div class="concept-grid">${section.cards
        .map((card) => `<article><h3>${card.title}</h3><p>${card.body}</p></article>`)
        .join("")}</div>`
    : "";
  const links = section.links
    ? `<div class="lesson-link-grid">${section.links
        .map((link) => `<a href="${link.href}"><span>${link.title}</span><small>${link.body}</small></a>`)
        .join("")}</div>`
    : "";
  const reveals = section.reveals
    ? `<div class="reveal-list">${section.reveals
        .map(
          (item) =>
            `<details><summary>${item.question}</summary><p>${item.answer}</p>${item.code ? codeWindow(item.code) : ""}</details>`
        )
        .join("")}</div>`
    : "";
  const note = section.note
    ? `<aside class="callout ${section.note.tone || ""}"><strong>${section.note.title}</strong><p>${section.note.body}</p></aside>`
    : "";
  const code = section.code ? codeWindow(section.code) : "";
  const sectionContent = section.codeFirst
    ? `${code}${reveals}`
    : `${reveals}${code}`;

  return `
    <section class="lesson-section${section.joinPrevious ? " joins-previous" : ""}">
      <h2>${section.title}</h2>
      ${paragraphs}${bullets}${steps}${cards}${links}${sectionContent}${section.table ? renderTable(section.table) : ""}
      ${note}
    </section>
  `;
}

function renderCheck(check, slug) {
  if (!check) return "";
  const options = check.options
    .map(
      (option, index) => `
        <label class="quiz-option">
          <input type="radio" name="${slug}-check" value="${index}">
          <span>${option}</span>
        </label>`
    )
    .join("");

  return `
    <section class="quick-check" aria-labelledby="quick-check-title">
      <p class="eyebrow">Quick check</p>
      <h2 id="quick-check-title">${check.question}</h2>
      <form data-answer="${check.answer}">
        <fieldset><legend class="visually-hidden">Choose one answer</legend>${options}</fieldset>
        <button class="button check-answer" type="submit">Check answer</button>
        <p class="quiz-feedback" aria-live="polite"></p>
      </form>
      <template>${check.explanation}</template>
    </section>
  `;
}

function renderChallenge(challenge) {
  if (!challenge) return "";
  return `
    <section class="challenge-card">
      <p class="eyebrow">Try it</p>
      <h2>${challenge.title}</h2>
      <p>${challenge.prompt}</p>
      ${challenge.code ? codeWindow(challenge.code) : ""}
      <details>
        <summary>${challenge.summary ?? "Reveal a possible answer"}</summary>
        ${challenge.solutionCode ? codeWindow(challenge.solutionCode) : `<p>${challenge.solution}</p>`}
      </details>
    </section>
  `;
}

function getCompleted() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored.filter((slug) => lessonBySlug.has(slug)) : []);
  } catch {
    return new Set();
  }
}

function saveCompleted(completed) {
  try {
    const ordered = lessonItems.map(lessonSlug).filter((slug) => completed.has(slug));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordered));
    return true;
  } catch {
    return false;
  }
}

function setProgressStatus(message, tone = "") {
  const status = document.querySelector(".progress-status");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function progressBackup() {
  const completed = getCompleted();
  const completedLessons = lessonItems
    .filter((item) => completed.has(lessonSlug(item)))
    .map((item) => ({ slug: lessonSlug(item), title: item.title }));

  return {
    _comment: "Well hello, you curious little rascal. You opened the JSON file! Excellent instinct: plain text is a wonderful way to learn what software is really doing.",
    _howItWorks: [
      `This site stores completed lesson IDs in your browser under the key '${STORAGE_KEY}'.`,
      "Downloading progress turns those IDs into this human-readable JSON backup.",
      "Importing reads completedLessons, ignores unknown lesson IDs, and adds valid lessons without removing progress already in the browser.",
    ],
    _honesty: "Progress is self-reported. Editing this file or browser storage can change it, and that is okay: this is a learning aid, not a certificate. If a teacher asks, be truthful about what you actually studied. The lessons are free anyway, so why skip them?",
    format: "tsca-progress",
    version: 1,
    exportedAt: new Date().toISOString(),
    completedLessons,
  };
}

function downloadProgress() {
  const backup = progressBackup();
  const blob = new Blob([`${JSON.stringify(backup, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `tsca-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  setProgressStatus("Progress backup downloaded.", "success");
}

async function importProgress(file, activeSlug) {
  if (!file) return;
  if (file.size > 1_000_000) throw new Error("That file is too large to be a progress backup.");

  let backup;
  try {
    backup = JSON.parse(await file.text());
  } catch {
    throw new Error("That file is not valid JSON.");
  }
  if (backup?.format !== "tsca-progress" || backup?.version !== 1 || !Array.isArray(backup.completedLessons)) {
    throw new Error("That is not a recognized Starving Coding Academy progress file.");
  }

  const imported = new Set(
    backup.completedLessons
      .map((entry) => (typeof entry === "string" ? entry : entry?.slug))
      .filter((slug) => lessonBySlug.has(slug))
  );
  if (backup.completedLessons.length && !imported.size) {
    throw new Error("That backup does not contain any lesson IDs recognized by this version of the academy.");
  }
  const completed = getCompleted();
  const previousCount = completed.size;
  imported.forEach((slug) => completed.add(slug));

  if (!saveCompleted(completed)) throw new Error("This browser would not allow progress to be saved.");

  updateProgress(activeSlug);
  const addedCount = completed.size - previousCount;
  setProgressStatus(
    addedCount
      ? `Imported ${addedCount} new completed ${addedCount === 1 ? "lesson" : "lessons"}.`
      : "Import complete. Your progress was already up to date.",
    "success"
  );
}

function initializeProgressTools(activeSlug) {
  const exportButton = document.querySelector("[data-progress-export]");
  const importButton = document.querySelector("[data-progress-import]");
  const fileInput = document.querySelector("[data-progress-file]");

  exportButton?.addEventListener("click", downloadProgress);
  importButton?.addEventListener("click", () => fileInput?.click());
  fileInput?.addEventListener("change", async () => {
    try {
      await importProgress(fileInput.files?.[0], activeSlug);
    } catch (error) {
      setProgressStatus(error instanceof Error ? error.message : "That progress file could not be imported.", "error");
    } finally {
      fileInput.value = "";
    }
  });
}

function updateProgress(slug) {
  const completed = getCompleted();

  document.querySelectorAll(".sidebar-index a").forEach((link) => {
    const match = link.getAttribute("href")?.match(/\/([^/]+)\.html$/);
    link.classList.toggle("is-complete", Boolean(match && completed.has(match[1])));
  });

  const progress = document.querySelector(".course-progress");
  if (progress) {
    const count = lessonItems.filter((item) => completed.has(lessonSlug(item))).length;
    progress.innerHTML = `<span>${count} of ${lessonItems.length} complete</span><progress value="${count}" max="${lessonItems.length}"></progress>`;
  }

  const completeButton = document.querySelector(".complete-button");
  if (completeButton) {
    const isComplete = completed.has(slug);
    completeButton.classList.toggle("is-complete", isComplete);
    completeButton.textContent = isComplete ? "✓ Lesson complete" : "Mark lesson complete";
    completeButton.setAttribute("aria-pressed", String(isComplete));
  }
}

function navigationFor(slug) {
  const pages = flattenNavigation().filter((item) => item.href.startsWith("pages/"));
  const index = pages.findIndex((item) => item.href.endsWith(`/${slug}.html`));
  return { previous: pages[index - 1], next: pages[index + 1] };
}

function renderPage(slug, lesson) {
  const { previous, next } = navigationFor(slug);
  const goals = lesson.goals || [];
  const goalSummary = goals.length
    ? `<p class="lesson-summary">In this lesson you will learn to ${goals.length === 1 ? goals[0] : `${goals.slice(0, -1).join(", ")} and ${goals.at(-1)}`}.</p>`
    : "";
  const sources = lesson.sources
    ? `<details class="source-notes"><summary>Reference notes</summary><ul>${lesson.sources
        .map((source) => `<li><a href="${source.href}" target="_blank" rel="noreferrer">${source.title}</a></li>`)
        .join("")}</ul></details>`
    : "";
  const introNote = lesson.introNote
    ? `<aside class="callout lesson-intro-note ${lesson.introNote.tone || ""}"><strong>${lesson.introNote.title}</strong><p>${lesson.introNote.body}</p></aside>`
    : "";

  lessonRoot.innerHTML = `
    <header class="lesson-hero">
      <p class="eyebrow">${lesson.kicker}</p>
      <h1>${lesson.title}</h1>
      <p class="lead">${lesson.lead}</p>
      ${goalSummary}
    </header>
    ${introNote}
    ${lesson.sections.map(renderSection).join("")}
    ${renderChallenge(lesson.challenge)}
    ${renderCheck(lesson.check, slug)}
    ${sources}
    <section class="lesson-finish">
      <button class="button complete-button" type="button" aria-pressed="false">Mark lesson complete</button>
      <nav class="lesson-pager" aria-label="Lesson pagination">
        ${previous ? `<a class="previous" href="${previous.href.replace("pages/", "")}"><small>Previous</small>${previous.title}</a>` : "<span></span>"}
        ${next ? `<a class="next" href="${next.href.replace("pages/", "")}"><small>Next</small>${next.title}</a>` : ""}
      </nav>
    </section>
  `;

  document.title = `${lesson.title} | The Starving Coding Academy`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", lesson.description || lesson.lead.replace(/<[^>]+>/g, ""));
}

let activeSlug = null;
if (lessonRoot) {
  const slug = lessonRoot.dataset.lesson;
  const lesson = lessons[slug];

  if (!lesson) {
    lessonRoot.innerHTML = `<h1>Lesson not found</h1><p>This page exists, but its lesson data is missing.</p>`;
    console.error(`No lesson data found for: ${slug}`);
  } else {
    activeSlug = slug;
    renderPage(slug, lesson);

    document.querySelector(".complete-button")?.addEventListener("click", () => {
      const completed = getCompleted();
      completed.has(slug) ? completed.delete(slug) : completed.add(slug);
      if (saveCompleted(completed)) {
        updateProgress(slug);
      } else {
        setProgressStatus("This browser would not allow progress to be saved.", "error");
      }
    });

    document.querySelector(".quick-check form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const selected = form.querySelector("input:checked");
      const feedback = form.querySelector(".quiz-feedback");
      const explanation = form.parentElement.querySelector("template").innerHTML;

      if (!selected) {
        feedback.className = "quiz-feedback is-visible";
        feedback.textContent = "Pick an answer first. Guessing is allowed here.";
        return;
      }

      const correct = Number(selected.value) === Number(form.dataset.answer);
      feedback.className = `quiz-feedback is-visible ${correct ? "is-correct" : "is-wrong"}`;
      feedback.innerHTML = `<strong>${correct ? "Correct." : "Not quite."}</strong> ${explanation}`;
    });
  }
}

initializeProgressTools(activeSlug);
updateProgress(activeSlug);
