import { rawLessons } from "./raw-lessons.js";
import { syntaxLessons } from "./syntax-lessons.js";
import { operatorLessons } from "./operator-lessons.js";
import { structureLessons } from "./structure-lessons.js";
import { flowLessons } from "./flow-lessons.js";
import { practiceLessons } from "./practice-lessons.js";

export const lessons = {
  ...rawLessons,
  ...syntaxLessons,
  ...operatorLessons,
  ...structureLessons,
  ...flowLessons,
  ...practiceLessons,
};
