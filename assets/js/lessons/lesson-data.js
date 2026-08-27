import { rawLessons } from "./raw-lessons.js?v=2";
import { syntaxLessons } from "./syntax-lessons.js?v=2";
import { operatorLessons } from "./operator-lessons.js?v=2";
import { structureLessons } from "./structure-lessons.js?v=2";
import { flowLessons } from "./flow-lessons.js?v=2";
import { practiceLessons } from "./practice-lessons.js?v=2";

export const lessons = {
  ...rawLessons,
  ...syntaxLessons,
  ...operatorLessons,
  ...structureLessons,
  ...flowLessons,
  ...practiceLessons,
};
