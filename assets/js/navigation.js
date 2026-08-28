export const navigation = [
  { title: "Start", href: "index.html" },
  {
    title: "Raw Programming",
    href: "pages/raw-programming.html",
    children: [
      { title: "What Is Coding For?", href: "pages/what-is-coding.html" },
      { title: "Why Syntax Matters", href: "pages/syntax-rules.html" },
      {
        title: "When Code Breaks",
        href: "pages/when-code-breaks.html",
        children: [
          { title: "Errors And Debugging", href: "pages/errors-debugging.html" },
          { title: "Exceptions And Recovery", href: "pages/exceptions-recovery.html" },
        ],
      },
      { title: "Starting A Project", href: "pages/starting-project.html" },
    ],
  },
  {
    title: "Syntax Elements",
    href: "pages/syntax-elements.html",
    children: [
      {
        title: "Values And Variables",
        href: "pages/values-variables.html",
        children: [{ title: "Comments", href: "pages/comments.html" }],
      },
      { title: "Primitive Values", href: "pages/primitive-values.html" },
      { title: "Strong Typing", href: "pages/strong-typing.html" },
      { title: "Complex Types", href: "pages/complex-types.html" },
      { title: "Why Booleans Matter", href: "pages/booleans.html" },
    ],
  },
  {
    title: "Operators",
    href: "pages/operators.html",
    children: [
      { title: "String Concatenation", href: "pages/string-concatenation.html" },
      { title: "Mathematical Operators", href: "pages/mathematical-operators.html" },
      { title: "Logical Operators", href: "pages/logical-operators.html" },
      { title: "Shorthand Operators", href: "pages/shorthand-operators.html" },
    ],
  },
  { title: "Input And Output", href: "pages/input-output.html" },
  {
    title: "Code Structure",
    href: "pages/code-structure.html",
    children: [
      { title: "Scope And Code Blocks", href: "pages/scope-code-blocks.html" },
      {
        title: "Functions",
        href: "pages/functions.html",
        children: [
          { title: "Parameters And Arguments", href: "pages/parameters-arguments.html" },
          { title: "Return Values", href: "pages/return-values.html" },
          { title: "Lambdas", href: "pages/lambdas.html" },
        ],
      },
      {
        title: "Objects",
        href: "pages/objects.html",
        children: [
          { title: "Fields", href: "pages/fields.html" },
          { title: "Methods", href: "pages/methods.html" },
        ],
      },
      { title: "Dot Notation", href: "pages/dot-notation.html" },
      { title: "Parentheses", href: "pages/parentheses.html" },
    ],
  },
  {
    title: "Control Flow",
    href: "pages/control-flow.html",
    children: [
      { title: "If Else If And Else", href: "pages/if-else.html" },
      {
        title: "Loops",
        href: "pages/loops.html",
        children: [
          { title: "While Loops", href: "pages/while-loops.html" },
          { title: "Do While / Repeat Until", href: "pages/do-while.html" },
          { title: "For Loops", href: "pages/for-loops.html" },
          { title: "Foreach Loops", href: "pages/foreach-loops.html" },
        ],
      },
      { title: "Switch Cases", href: "pages/switch-cases.html" },
    ],
  },
  {
    title: "Practice",
    href: "pages/practice.html",
    children: [
      { title: "Tiny Examples", href: "pages/tiny-examples.html" },
      { title: "Quiz Time", href: "pages/quiz-time.html" },
    ],
  },
];

export function flattenNavigation(items = navigation) {
  return items.flatMap((item) => [item, ...flattenNavigation(item.children || [])]);
}
