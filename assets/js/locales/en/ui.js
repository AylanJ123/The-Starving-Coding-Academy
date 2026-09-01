export const ui = {
  languageSelectorLabel: "Language",
  brandHomeLabel: "The Starving Coding Academy home",
  brandIconAlt: "The Starving Coding Academy official icon",
  themeToggleLabel: "Switch color theme",
  themeDark: "Dark",
  themeLight: "Light",
  explore: "Explore",
  close: "Close",
  backupProgress: "Back up progress",
  backupProgressDescription: "Move completed lessons between browsers with a small, readable JSON file.",
  download: "Download",
  import: "Import",
  filterLessons: "Filter lessons",
  searchPlaceholder: "Search lesson content…",
  lessonIndex: "Lesson index",
  noLessonsFound: "No lessons found",
  lessonsFound(count) {
    return `${count} ${count === 1 ? "lesson" : "lessons"} found`;
  },
  progress(count, total) {
    return `${count} of ${total} complete`;
  },
  quickCheck: "Quick check",
  chooseOneAnswer: "Choose one answer",
  checkAnswer: "Check answer",
  tryIt: "Try it",
  revealPossibleAnswer: "Reveal a possible answer",
  referenceNotes: "Reference notes",
  lessonCardAlt(title) {
    return `${title} lesson card`;
  },
  markLessonComplete: "Mark lesson complete",
  lessonComplete: "✓ Lesson complete",
  lessonPagination: "Lesson pagination",
  previous: "Previous",
  next: "Next",
  pseudocode: "Pseudocode",
  multilanguage: "Multilanguage",
  lessonNotFoundTitle: "Lesson not found",
  lessonNotFoundBody: "This page exists, but its lesson data is missing.",
  pickAnswer: "Pick an answer first. Guessing is allowed here.",
  correct: "Correct.",
  notQuite: "Not quite.",
  storageSaveError: "This browser would not allow progress to be saved.",
  progressDownloaded: "Progress backup downloaded.",
  fileTooLarge: "That file is too large to be a progress backup.",
  invalidJson: "That file is not valid 'JSON'.",
  unrecognizedBackup: "That is not a recognized Starving Coding Academy progress file.",
  noRecognizedLessons: "That backup does not contain any lesson 'id' values recognized by this version of the academy.",
  importFailure: "That progress file could not be imported.",
  importComplete: "Import complete. Your progress was already up to date.",
  importedLessons(count) {
    return `Imported ${count} new completed ${count === 1 ? "lesson" : "lessons"}.`;
  },
  goalSummary(goals) {
    const list = goals.length === 1 ? goals[0] : `${goals.slice(0, -1).join(", ")} and ${goals.at(-1)}`;
    return `In this lesson you will learn to ${list}.`;
  },
  progressBackupComment: "Well hello, you curious little rascal. You opened the 'JSON' file! Excellent instinct. Plain text is a wonderful way to learn what software is really doing.",
  progressBackupHowItWorks(storageKey) {
    return [
      `This site stores completed lesson 'id' values in your browser's 'localStorage' under the key '${storageKey}'.`,
      "Downloading progress turns those 'id' values into this human-readable 'JSON' backup.",
      "Importing reads each 'id' inside 'completedLessons', ignores unknown values, and adds valid lessons without removing progress already stored in the browser.",
    ];
  },
  progressBackupHonesty: [
    "Progress is self-reported. Editing this file or the browser's 'localStorage' can change it, and that is okay.",
    "This is a learning aid, not a certificate.",
    "If a teacher asks, be truthful about what you actually studied. The lessons are free anyway, so why skip them?",
  ],
};
