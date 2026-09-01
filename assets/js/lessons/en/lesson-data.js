import { rawLessons } from "./raw-lessons.js";
import { syntaxLessons } from "./syntax-lessons.js";
import { operatorLessons } from "./operator-lessons.js";
import { inputOutputLesson } from "./input-output-lesson.js";
import { structureLessons } from "./structure-lessons.js";
import { flowLessons } from "./flow-lessons.js";
import { practiceLessons } from "./practice-lessons.js";
import { lessonReferences } from "./lesson-references.js";

const lessonDefinitions = {
  ...rawLessons,
  ...syntaxLessons,
  ...operatorLessons,
  ...inputOutputLesson,
  ...structureLessons,
  ...flowLessons,
  ...practiceLessons,
};

export const lessons = Object.fromEntries(
  Object.entries(lessonDefinitions).map(([slug, lesson]) => [
    slug,
    { ...lesson, sources: lessonReferences[slug] ?? lesson.sources },
  ]),
);
