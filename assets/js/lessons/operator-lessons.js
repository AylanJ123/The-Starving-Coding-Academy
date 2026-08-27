const sources = [
  { title: "Python: using Python as a calculator", href: "https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator" },
  { title: "MDN: expressions and operators", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators" },
  { title: "Java: operators", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html" },
  { title: "C# operators and expressions", href: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/" },
  { title: "Lua 5.4: expressions", href: "https://www.lua.org/manual/5.4/manual.html#3.4" },
];

export const operatorLessons = {
  operators: {
    kicker: "Course 03 · Operators",
    title: "Operators make values do work",
    lead: "Operators calculate, compare, combine, assign and transform values. Their symbols look compact because programmers use them constantly. Each language still defines its own behavior.",
    goals: ["identify unary, binary, and assignment operators", "use precedence without relying on memory", "check language-specific operator behavior"],
    sections: [
      {
        title: "Operands are the participants",
        code: { label: "operator anatomy", content: "coins + bonus\n  ┬   ┬   ┬\n left │ right\noperand│operand\n      operator\n\n-damage       # unary: one operand\nscore = 100   # assignment" },
        paragraphs: ["A unary operator works with one operand, a binary operator with two, and some languages have conditional/ternary operators involving three parts. The same symbol may take different roles in different contexts."],
      },
      {
        title: "Families of work",
        links: [
          { title: "String Concatenation", body: "Combine text without surprising conversions.", href: "string-concatenation.html" },
          { title: "Mathematical Operators", body: "Calculate and understand numeric edge cases.", href: "mathematical-operators.html" },
          { title: "Logical Operators", body: "Build larger decisions from booleans.", href: "logical-operators.html" },
          { title: "Shorthand Operators", body: "Update state without hiding the meaning.", href: "shorthand-operators.html" },
        ],
      },
      {
        title: "Precedence decides grouping",
        code: { label: "grouping matters", content: "2 + 3 * 4      -> usually 14\n(2 + 3) * 4    -> 20\n\nnot ready and connected\n# Is clearer as:\n(not ready) and connected" },
        paragraphs: ["Languages define which operators bind first and how operators of equal precedence associate. Parentheses make intended grouping explicit and survive imperfect human memory."],
        note: { title: "Keep precedence readable", body: "Know that multiplication usually precedes addition. Use parentheses when a reader might pause or when operators mix." },
      },
      {
        title: "Overloading changes behavior",
        paragraphs: ["An operator can behave according to operand types. <code>+</code> may add numbers, join strings, or invoke a user-defined operation in languages that support operator overloading. Read the types before predicting the outcome."],
      },
    ],
    check: { question: "What is the clearest way to guarantee addition happens before multiplication?", options: ["Write the addition first.", "Use parentheses around the addition.", "Add more spaces."], answer: 1, explanation: "Source order and spaces do not override precedence. Parentheses explicitly group the expression." },
    sources,
  },

  "string-concatenation": {
    kicker: "Operators · Lesson 01",
    title: "Build messages from values",
    lead: "String concatenation joins pieces of text. Interpolation and formatting often communicate mixed text-and-value output more clearly, especially when conversions or layout matter.",
    goals: ["distinguish numeric addition from text joining", "use interpolation for readable messages", "avoid accidental coercion"],
    sections: [
      {
        title: "Joining follows text rules",
        code: { label: "conceptual results", content: "10 + 5       -> 15\n\"10\" + \"5\"   -> \"105\" in languages where + joins strings\n\"HP: \" + 10  -> language-dependent: conversion or type error" },
        paragraphs: ["When one operand is text and one is numeric, languages disagree. JavaScript often coerces a value to text with <code>+</code>. Python rejects direct string-plus-integer concatenation. Explicit formatting makes intention clearer."],
      },
      {
        title: "Interpolation keeps the sentence visible",
        table: {
          headers: ["Language", "Example"],
          rows: [
            ["Python", "<code>f\"{name} has {coins} coins.\"</code>"],
            ["JavaScript", "<code>`${name} has ${coins} coins.`</code>"],
            ["C#", "<code>$\"{name} has {coins} coins.\"</code>"],
            ["Java", "<code>name + \" has \" + coins + \" coins.\"</code> or formatting APIs"],
            ["C++", "Stream insertion or formatting facilities, depending on the language version and project"],
            ["Lua", "<code>name .. \" has \" .. coins .. \" coins.\"</code>"],
          ],
        },
      },
      {
        title: "Formatting is part of the requirement",
        paragraphs: ["Dates, decimal places, percentages, padding, plural words, and translated sentences need more than naive joining. Decide whether the value is for a person, a log, or machine-readable data, then use an appropriate formatter."],
        code: { label: "Python · values formatted for a player", content: "accuracy = 0.8731\ncoins = 7\nprint(f\"Accuracy: {accuracy:.1%}\")\nprint(f\"Coins: {coins:03}\")\n# Accuracy: 87.3%\n# Coins: 007" },
        note: { title: "Translation warning", body: "Do not build translated user-interface sentences from tiny fixed fragments. Word order and grammar differ across languages." },
      },
    ],
    challenge: { title: "Create a status line", prompt: "Create one readable line containing player name, current health, maximum health, and coin count. Pick one programming language.", solutionCode: { label: "Python · possible answer", content: "name = \"Zed\"\nhealth = 73\nmax_health = 100\ncoins = 8\nprint(f\"{name} | HP {health}/{max_health} | {coins} coins\")" } },
    check: { question: "Why can '10' + '5' produce '105'?", options: ["The operands are text, so the operation joins their characters.", "Computers cannot add five.", "Quotation marks mean multiplication."], answer: 0, explanation: "The operand types influence the meaning of the operator." },
    sources,
  },

  "mathematical-operators": {
    kicker: "Operators · Lesson 02",
    title: "Arithmetic has programming edge cases",
    lead: "Addition is familiar. Integer division, remainders, overflow, floating-point approximation, and language-specific operators are where programming arithmetic stops behaving like a school worksheet.",
    goals: ["use remainder for repeating patterns", "predict grouping with precedence", "spot division and precision traps"],
    sections: [
      {
        title: "The familiar core",
        table: {
          headers: ["Operation", "Common symbol", "Example"],
          rows: [
            ["Addition", "<code>+</code>", "<code>7 + 2</code> → 9"],
            ["Subtraction", "<code>-</code>", "<code>7 - 2</code> → 5"],
            ["Multiplication", "<code>*</code>", "<code>7 * 2</code> → 14"],
            ["Division", "<code>/</code>", "Result type and rounding depend on language/types"],
            ["Remainder / modulo-like operation", "often <code>%</code>", "<code>7 % 2</code> → 1 in common cases"],
            ["Exponentiation", "language-specific", "Python uses <code>**</code>. Other languages may use a function or another operator"],
          ],
        },
      },
      {
        title: "Remainders create cycles",
        code: { label: "pseudocode · alternating turns", content: "if turn_number % 2 == 0:\n    current_team = \"blue\"\nelse:\n    current_team = \"red\"\n\nwrapped_index = next_index % inventory_size" },
        paragraphs: ["Remainders help detect divisibility and wrap values into repeating ranges. Be careful with negative operands because languages can define signed remainder behavior differently."],
      },
      {
        title: "Division asks what types you used",
        paragraphs: ["Some combinations perform integer division and discard a fractional part. Others produce a floating-point result. Division by zero may throw an error, produce an infinity or NaN value, or be rejected according to type and language."],
        code: { label: "check, do not assume", content: "# Python\n7 / 2   # 3.5\n7 // 2  # 3\n\n// Java with integer operands\n7 / 2   // 3\n\n// JavaScript Number values\n7 / 2   // 3.5" },
        note: { title: "Precision is a design choice", body: "Binary floating-point is ideal for many measurements but not exact decimal accounting. Choose numeric tools according to the domain." },
      },
    ],
    challenge: { title: "Wrap a hotbar", prompt: "A hotbar has 5 slots indexed 0 through 4. Write an expression that turns current slot 4 into next slot 0.", solution: "<code>next_slot = (current_slot + 1) % 5</code>. For current slot 4, the sum 5 has remainder 0 when divided by 5." },
    check: { question: "What is a common use for the remainder operator?", options: ["Making a value repeat within a cycle", "Declaring a class", "Writing a comment"], answer: 0, explanation: "Remainders are useful for wrapping indexes, alternating states, and testing divisibility." },
    sources,
  },

  "logical-operators": {
    kicker: "Operators · Lesson 03",
    title: "Combine rules without tangling them",
    lead: "Logical operators join or invert boolean conditions. The difficult part comes from translating a real requirement into the correct grouping of AND, OR and NOT.",
    goals: ["translate a sentence into a boolean expression", "explain short-circuit evaluation", "simplify confusing negative logic"],
    sections: [
      {
        title: "Translate one clause at a time",
        paragraphs: ["Consider the requirement “A player can enter if they have a pass and the event has started, or if they are an administrator.” Group the ordinary route before adding the override."],
        code: { label: "pseudocode · explicit grouping", content: "ordinary_access = has_pass AND event_started\ncan_enter = ordinary_access OR is_admin" },
        note: { title: "Words can be ambiguous", body: "Ask whether “or” is inclusive, whether an override bypasses every rule, and which conditions belong together. Code cannot resolve an unclear policy." },
      },
      {
        title: "Short-circuiting can protect an operation",
        code: { label: "pseudocode · right side runs only if needed", content: "IF player EXISTS AND player.health > 0\n    update_player(player)" },
        paragraphs: ["For common short-circuit operators, AND stops after a false left operand and OR stops after a true left operand. Here the property access is skipped when <code>player</code> is absent."],
      },
      {
        title: "Prefer positive named conditions",
        code: { label: "same rule, easier to inspect", content: "# Harder to parse\nif not (not connected or banned):\n    join_match()\n\n# Clearer\ncan_join = connected and not banned\nif can_join:\n    join_match()" },
        paragraphs: ["Complex conditions become more testable when meaningful pieces receive names. Parentheses and intermediate booleans cost little and prevent logic archaeology."],
      },
    ],
    challenge: { title: "Gate a ranked match", prompt: "A player may queue when connected, not banned, and either level 20 or carrying a tournament invite. Write a grouped expression.", solution: "<code>can_queue = connected AND NOT banned AND (level >= 20 OR has_invite)</code>. The parentheses keep the alternative qualification together." },
    check: { question: "When A is false, why may A AND expensiveCheck() skip the function?", options: ["The result is already guaranteed false.", "AND changes false to true.", "Functions cannot return booleans."], answer: 0, explanation: "With short-circuit AND, a false left side determines the whole result." },
    sources,
  },

  "shorthand-operators": {
    kicker: "Operators · Lesson 04",
    title: "Shorthand should stay clear",
    lead: "Compound assignment and increment-like operators express common updates compactly. They are helpful when the longer operation is already obvious and evaluation details are understood.",
    goals: ["expand compound assignment mentally", "recognize language differences around increment", "avoid clever state changes inside larger expressions"],
    sections: [
      {
        title: "Update the existing value",
        table: {
          headers: ["Shorthand", "Rough expanded intention"],
          rows: [
            ["<code>score += bonus</code>", "<code>score = score + bonus</code>"],
            ["<code>health -= damage</code>", "<code>health = health - damage</code>"],
            ["<code>speed *= boost</code>", "<code>speed = speed * boost</code>"],
            ["<code>index %= size</code>", "<code>index = index % size</code>"],
          ],
        },
        paragraphs: ["The expanded form is a mental model, not a promise of identical low-level evaluation in every language. With complex targets or overloaded operators, compound assignment can have specific semantics."],
      },
      {
        title: "Increment syntax varies",
        table: {
          headers: ["Language", "Add one"],
          rows: [
            ["Python", "<code>count += 1</code>. Python has no <code>++</code> increment operator"],
            ["JavaScript / Java / C# / C++", "Support <code>++</code>, including prefix/postfix forms with distinct expression behavior"],
            ["Lua", "<code>count = count + 1</code>. Standard Lua has no <code>++</code> or <code>+=</code>"],
          ],
        },
      },
      {
        title: "Keep mutation visible",
        code: { label: "clarity over compact tricks", content: "// Harder to reason about\nitems[index++] = rewards[++rewardIndex];\n\n// Easier to debug\nitems[index] = rewards[rewardIndex + 1];\nindex += 1;\nrewardIndex += 1;" },
        paragraphs: ["Prefix and postfix increment can produce different values inside a larger expression. Separate mutations onto their own lines unless the compact form is genuinely clearer to your team."],
      },
    ],
    challenge: { title: "Expand the update", prompt: "Expand <code>energy -= dash_cost</code> into a plain assignment, then state what the right side uses.", solution: "<code>energy = energy - dash_cost</code>. The right side reads the current energy and dash cost before storing the new energy." },
    check: { question: "Which is portable between Python and standard Lua?", options: ["count++", "count += 1", "count = count + 1"], answer: 2, explanation: "Both languages accept ordinary assignment with addition. Their shorthand support differs." },
    sources,
  },

  "input-output": {
    kicker: "Course 04 · Input And Output",
    title: "Programs become useful at their boundaries",
    lead: "Input brings information into a program. Output exposes a result. Every boundary from a keyboard to a save file or network needs validation, clear feedback and failure handling.",
    goals: ["identify input and output beyond the console", "validate untrusted input", "separate core logic from interface code"],
    sections: [
      {
        title: "I/O is larger than print and input",
        cards: [
          { title: "Human input", body: "Keyboard, mouse, touch, controller, microphone, form, or command." },
          { title: "Stored input", body: "Configuration, save data, images, database records, or imported assets." },
          { title: "Remote input", body: "Messages from an API, multiplayer client, webhook, or other service." },
          { title: "Output", body: "Screen pixels, audio, logs, saved files, database changes, device signals, or network responses." },
        ],
      },
      {
        title: "Treat outside data as a claim",
        steps: ["Receive the raw value.", "Check presence, shape, range, length, and allowed choices.", "Convert it into an internal type.", "Use the validated value in core logic.", "Return useful feedback without exposing secrets."],
        code: { label: "pseudocode · validate a menu choice", content: "raw_choice = READ \"Choose 1 to 3\"\nchoice = TRY CONVERT raw_choice TO integer\n\nIF conversion failed OR choice is outside 1 to 3\n    SHOW \"Enter 1, 2, or 3\"\nELSE\n    SHOW \"Loading option\" and choice" },
        note: { title: "Security begins here", body: "Validation prevents crashes and protects security boundaries. Untrusted input needs appropriate handling before it becomes a command, query, file path or HTML fragment." },
      },
      {
        title: "Keep logic testable",
        code: { label: "pseudocode · separate boundary and rule", content: "function calculate_damage(attack, defense):\n    return maximum(1, attack - defense)\n\nraw_attack = read_input()\nattack = validate_integer(raw_attack)\ndamage = calculate_damage(attack, enemy_defense)\nshow_output(damage)" },
        paragraphs: ["When calculation code does not directly depend on a screen, keyboard, or network, you can test it with simple values. The boundary code converts the messy outside world into a clean internal contract."],
      },
      {
        title: "Output is part of the conversation",
        bullets: ["Say what succeeded, not merely “Done.”", "On failure, explain what the user can change next.", "Logs should include useful context but exclude passwords, tokens, and sensitive personal data.", "Accessible output needs more than color alone and should work with relevant assistive technology."],
      },
    ],
    challenge: { title: "Design a safe username boundary", prompt: "List validation rules and feedback for a username field. Avoid inventing restrictions you cannot justify.", solution: "A useful answer trims accidental outer whitespace, requires a documented length range, allows the character set the product supports, rejects control characters, reports the specific failing rule, checks uniqueness on the server, and treats server validation as the security boundary." },
    check: { question: "Why separate calculate_damage from keyboard input?", options: ["Pure calculation logic becomes easier to test and reuse.", "Functions cannot read keyboards.", "Input is always dangerous and should be deleted."], answer: 0, explanation: "A clean boundary lets the same rule serve a console, game, test, or network request." },
    sources,
  },
};
