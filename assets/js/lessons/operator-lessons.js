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
        title: "Operators act on operands",
        code: { label: "Pseudocode", content: "coins + bonus\n# coins and bonus are the operands\n# + is the operator that combines them\n\n-damage\n# - acts on one operand\n\nscore = 100\n# = stores 100 in score" },
        paragraphs: ["An operand is a value that an operator uses. In <code>coins + bonus</code>, the values <code>coins</code> and <code>bonus</code> are operands, while <code>+</code> is the operator. Some operators use one operand, such as <code>-damage</code>. Others use two, such as <code>coins + bonus</code>."],
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
        code: { label: "Pseudocode", content: "2 + 3 * 4\n# Multiplication runs first, so the result is 14\n\n(2 + 3) * 4\n# Parentheses make addition run first, so the result is 20\n\nnot (ready and connected)\n# Without parentheses, 'not' only flips 'ready'. Here instead it will flip the whole thing." },
        paragraphs: ["When an expression contains several operators, the language follows a priority order called precedence. Higher-priority operations run first. Parentheses let you choose the grouping yourself and make that choice easy to see."],
        note: { title: "Make the priority visible", body: "Multiplication usually has higher priority than addition. When different operators appear together, use parentheses to show readers which operation should happen first." },
      },
      {
        title: "Overloading changes behavior",
        paragraphs: ["The meaning of an operator can depend on the operand types and the language. JavaScript uses <code>+</code> to join strings, while Lua uses <code>..</code> for the same job. Check both the values and the language before predicting the result."],
        code: { label: "Multilanguage", content: "// JavaScript\n\"Starving \" + \"Academy\"\n\n-- Lua\n\"Starving \" .. \"Academy\"" },
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
        title: "Put values inside text",
        paragraphs: ["Programs often need to place changing values inside a fixed sentence. Interpolation and formatting let you write the sentence once, then mark where values such as <code>name</code> and <code>coins</code> belong. This is usually easier to read than joining many small strings with operators."],
        table: {
          headers: ["Language", "Formatted sentence"],
          rows: [
            ["Python", "<code>f\"{name} has {coins} coins.\"</code>"],
            ["JavaScript", "<code>`${name} has ${coins} coins.`</code>"],
            ["C#", "<code>$\"{name} has {coins} coins.\"</code>"],
            ["Java", "<code>\"%s has %d coins.\".formatted(name, coins)</code>"],
            ["C++", "<code>std::format(\"{} has {} coins.\", name, coins)</code> in C++20"],
            ["Lua", "<code>string.format(\"%s has %d coins.\", name, coins)</code>"],
          ],
        },
      },
      {
        title: "Formatting is part of the requirement",
        paragraphs: ["Dates, decimal places, percentages, padding, plural words, and translated sentences need more than naive joining. Decide whether the value is for a person, a log, or machine-readable data, then use an appropriate formatter."],
        code: { label: "Python", content: "accuracy = 0.8731\ncoins = 7\n\n# .1% converts the decimal to a percentage with one decimal place\nprint(f\"Accuracy: {accuracy:.1%}\")\n\n# 03 keeps three places and fills empty places with zeroes\nprint(f\"Coins: {coins:03}\")\n\n# Accuracy: 87.3%\n# Coins: 007" },
        note: { title: "Translation needs localization", body: "Do not assemble translated interfaces from tiny fixed fragments. Word order, plural rules and grammar differ across languages. Use parameterized localization so each translation owns the complete sentence and decides where its values belong. Proper localization is a whole other world worth learning separately." },
      },
    ],
    challenge: { title: "Create a status line", prompt: "Create one readable line containing player name, current health, maximum health, and coin count. Pick one programming language.", solutionCode: { label: "Python · possible answer", content: "name = \"Zed\"\nhealth = 73\nmax_health = 100\ncoins = 8\nprint(f\"{name} | HP {health}/{max_health} | {coins} coins\")" } },
    check: { question: "Why does <code>\"10\" + \"5\"</code> sometimes produce <code>\"105\"</code>?", options: ["The operands are text, so the operation joins their characters.", "Computers cannot add five.", "Quotation marks mean multiplication."], answer: 0, explanation: "The operand types influence the meaning of the operator." },
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
            ["Division", "<code>/</code>", "The result depends on the operand types and the language"],
            ["Remainder / Modulo", "<code>%</code>", "<code>7 % 2</code> → 1 (Good way to know if a number is even or odd)"],
            ["Exponentiation", "language-specific", "Python uses <code>**</code>. Other languages may use a function or another operator"],
          ],
        },
      },
      {
        title: "Remainders create cycles",
        code: { label: "Pseudocode", content: "# Even turn numbers leave a remainder of 0 when divided by 2\nif turn_number % 2 == 0:\n    current_team = \"blue\"\nelse:\n    # Odd turn numbers leave a remainder of 1\n    current_team = \"red\"\n\n# The remainder keeps the index between 0 and inventory_size - 1\n# Reaching the end wraps the index back to 0\nwrapped_index = next_index % inventory_size" },
        paragraphs: ["Remainders help detect divisibility and wrap values into repeating ranges. Be careful with negative operands because languages can define signed remainder behavior differently."],
      },
      {
        title: "Division follows type rules",
        paragraphs: ["The operand types help determine what division returns. In Java, dividing two integers performs integer division, so <code>7 / 2</code> returns <code>3</code> and discards the fractional part. Using a floating-point operand produces a floating-point result instead. Other languages use different rules, so check the language before assuming what <code>/</code> will return. Division by zero also behaves differently across types and languages."],
        code: { label: "Multilanguage", content: "# Python uses / for floating-point division\n7 / 2    # 3.5\n\n# Python uses // for floor division\n7 // 2   # 3\n\n// Java sees two integer operands and returns an integer\n7 / 2    // 3\n\n// Adding a floating-point operand changes the result type\n7.0 / 2  // 3.5\n\n// JavaScript Number values use floating-point division\n7 / 2    // 3.5" },
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
        title: "Short-circuiting prevents unsafe checks",
        code: { label: "Pseudocode", content: "# Check that player exists before asking for its health\nIF player EXISTS AND player.health > 0\n    update_player(player)\n\n# If player does not exist, AND stops before player.health runs" },
        paragraphs: ["Short-circuit operators evaluate from left to right and stop once the final result is already known. With <code>AND</code>, a false condition on the left makes the whole expression false, so the right side does not run. This matters when <code>player</code> is null or missing. Asking for <code>player.health</code> at that point would cause an error and could stop the program. Checking that <code>player</code> exists first lets short-circuiting skip the unsafe health check."],
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
          headers: ["Shorthand", "Longer form"],
          rows: [
            ["<code>score += bonus</code>", "<code>score = score + bonus</code>"],
            ["<code>health -= damage</code>", "<code>health = health - damage</code>"],
            ["<code>speed *= boost</code>", "<code>speed = speed * boost</code>"],
            ["<code>index %= size</code>", "<code>index = index % size</code>"],
          ],
        },
        paragraphs: ["Shorthand updates a variable using its current value. For example, <code>score += bonus</code> adds <code>bonus</code> to the current <code>score</code>, then stores the result back in <code>score</code>. The longer form helps you read the operation when the shorthand is unfamiliar."],
      },
      {
        title: "Increment syntax varies",
        paragraphs: ["Increment means increasing a value by one. Some languages provide <code>++</code> for this common update, while others use addition or assignment. The result is the same when the update stands on its own."],
        table: {
          headers: ["Language", "Add one"],
          rows: [
            ["Python", "<code>count += 1</code>"],
            ["JavaScript / Java / C# / C++", "<code>count++</code>"],
            ["Lua", "<code>count = count + 1</code>"],
          ],
        },
      },
      {
        title: "Keep mutation visible",
        code: { label: "Multilanguage", content: "// Harder to reason about because both indexes change inside the assignment\nitems[index++] = rewards[++rewardIndex];\n\n// Easier to follow because each increment has its own line\nrewardIndex++;\nitems[index] = rewards[rewardIndex];\nindex++;" },
        paragraphs: ["Placing <code>++</code> before or after a variable changes when the increment happens inside a larger expression. Move each increment onto its own line when the order is difficult to see."],
      },
    ],
    challenge: { title: "Expand the update", prompt: "Expand <code>energy -= dash_cost</code> into a plain assignment, then state what the right side uses.", solution: "<code>energy = energy - dash_cost</code>. The right side reads the current energy and dash cost before storing the new energy." },
    check: { question: "Which is portable between Python and standard Lua?", options: ["count++", "count += 1", "count = count + 1"], answer: 2, explanation: "Both languages accept ordinary assignment with addition. Their shorthand support differs." },
    sources,
  },

  "input-output": {
    kicker: "Course 04 · Input And Output",
    title: "Programs become useful at their boundaries",
    lead: "Input brings information into a program and output communicates what happened. Keyboards and screens are only two examples. Files, controllers, databases and networks also move information across a program's boundaries.",
    goals: ["identify input and output beyond the console", "validate untrusted input", "separate core logic from interface code"],
    sections: [
      {
        title: "I/O is larger than print and input",
        paragraphs: ["Input and output are often shortened to <strong>I/O</strong>. Input is information the program receives. Output is information or action the program produces. Both can involve people, stored data, hardware or another program."],
        cards: [
          { title: "Human input", body: "Keyboard, mouse, touch, controller, microphone, form, or command." },
          { title: "Stored input", body: "Configuration, save data, images, database records, or imported assets." },
          { title: "Remote input", body: "Messages from an API, multiplayer client, webhook, or other service." },
          { title: "Output", body: "Screen pixels, audio, logs, saved files, database changes, device signals, or network responses." },
        ],
      },
      {
        title: "Validate outside data before using it",
        paragraphs: ["Outside data can be missing, malformed or deliberately harmful. Validate it before the rest of the program depends on it. A successful check turns uncertain input into a value with rules the program can trust."],
        steps: ["Receive the raw value.", "Check presence, shape, range, length, and allowed choices.", "Convert it into an internal type.", "Use the validated value in core logic.", "Return useful feedback without exposing secrets."],
        code: { label: "Pseudocode", content: "REPEAT\n    # Request fresh input on every attempt\n    raw_choice = READ \"Choose 1 to 3\"\n\n    # Convert only if the text represents a whole number\n    choice = TRY CONVERT raw_choice TO INTEGER\n\n    IF conversion failed OR choice is outside 1 to 3\n        SHOW \"That failed. Enter 1, 2, or 3\"\n        LOOP BACK TO START\n\n    # A valid choice can leave the input loop\n    STOP REPEATING\n\nSHOW \"Loading option \" and choice" },
        note: { title: "Security begins here", body: "Validation prevents crashes and protects security boundaries. Untrusted input needs appropriate handling before it becomes a command, query, file path or HTML fragment." },
      },
      {
        title: "Keep logic testable",
        code: { label: "Pseudocode", content: "# This function only needs trusted numbers\nFUNCTION calculate_damage(attack, defense)\n    RETURN maximum(1, attack - defense)\n\n# Boundary code reads and validates the outside value\nraw_attack = READ input\nattack = VALIDATE raw_attack AS INTEGER\n\n# Core logic receives a clean value and returns a result\ndamage = calculate_damage(attack, enemy_defense)\nSHOW damage" },
        paragraphs: ["Keep input handling separate from the rule that uses the value. Then <code>calculate_damage</code> can be tested with ordinary numbers without opening a screen, pressing a key or making a network request. The boundary handles messy outside data while the function handles one clear calculation."],
      },
      {
        title: "Output is part of the conversation",
        bullets: ["Say what succeeded, not merely “Done.”", "On failure, explain what the user can change next.", "Logs should include useful context but exclude passwords, tokens, and sensitive personal data.", "Accessible output needs more than color alone and should work with relevant assistive technology."],
      },
    ],
    challenge: { title: "Design a safe username boundary", prompt: "List reasonable validation rules and useful feedback for a <code>username</code> field. Give a reason for every restriction you add.", solution: "Trim extra whitespace. Check the allowed length and characters. Reject control characters and tell the user which rule failed. Check uniqueness and every security rule again on the server. Browser checks and game-client checks can improve feedback, but they cannot enforce security. Anything running on the player's device can be modified or bypassed." },
    check: { question: "Why separate <code>calculate_damage</code> from keyboard input?", options: ["The calculation becomes easier to test and reuse.", "Functions cannot read keyboards.", "Input is always dangerous and should be deleted."], answer: 0, explanation: "A clean boundary lets the same rule serve a console, game, test, or network request." },
    sources,
  },
};
