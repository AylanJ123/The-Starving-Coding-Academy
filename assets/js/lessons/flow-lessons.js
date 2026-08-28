const sources = [
  { title: "Python: more control flow tools", href: "https://docs.python.org/3/tutorial/controlflow.html" },
  { title: "MDN: control flow and error handling", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" },
  { title: "MDN: loops and iteration", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" },
  { title: "Java: control flow statements", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html" },
  { title: "C# selection statements", href: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements" },
  { title: "Lua 5.4: control structures", href: "https://www.lua.org/manual/5.4/manual.html#3.3" },
];

export const flowLessons = {
  "control-flow": {
    kicker: "Course 06 · Control Flow",
    title: "Control flow and execution order",
    lead: "Control flow determines which statement a program executes next. Branches choose a path, loops repeat a block and transfers such as <code>return</code> leave the current path.",
    goals: ["trace execution through a branch or loop", "choose between selection and repetition", "recognize transfers such as return, break, and continue"],
    sections: [
      {
        title: "Types of control flow",
        paragraphs: ["Without control flow, every statement would run once from top to bottom. These tools let the program choose, repeat, enter another function or leave the normal route."],
        cards: [
          { title: "Selection", body: "Choose one path using <code>if</code>, <code>else if</code>, <code>else</code> or <code>switch</code>." },
          { title: "Repetition", body: "Repeat a block using <code>while</code>, <code>do-while</code>, <code>repeat-until</code>, <code>for</code> or <code>foreach</code>." },
          { title: "Function transfer", body: "A function call enters another function. <code>return</code> sends control and possibly a value back." },
          { title: "Interruption", body: "<code>break</code>, <code>continue</code>, errors, cancellation or program exit change the normal route." },
        ],
      },
      {
        title: "Tracing execution",
        code: { label: "Pseudocode", content: "health = 12\n\n# Check each branch in order until one condition is true\nIF health <= 0\n    SHOW \"defeated\"\nELSE IF health < 20\n    SHOW \"critical\"\nELSE\n    SHOW \"stable\"\n\n# Execution continues here after the chosen branch\nSHOW \"turn complete\"" },
        paragraphs: ["With <code>health</code> set to <code>12</code>, the first condition is false and the <code>else if</code> condition is true. The program shows <code>critical</code>, skips the remaining branch and continues after the chain to show <code>turn complete</code>. Pencil tracing helps engineers follow this path one step at a time."],
      },
      {
        title: "Choosing a control structure",
        paragraphs: ["Start with the question your program needs to answer. Use a branch to choose one path, a loop to repeat work and <code>return</code> to leave a function with a result."],
        links: [
          { title: "If Else If And Else", body: "Choose among conditions and priorities.", href: "if-else.html" },
          { title: "Loops", body: "Understand repeated work and termination.", href: "loops.html" },
          { title: "Switch Cases", body: "Dispatch among discrete alternatives.", href: "switch-cases.html" },
        ],
        table: {
          headers: ["Question", "Likely tool"],
          rows: [
            ["Should this action happen?", "<code>if</code>"],
            ["Which one of these states is active?", "<code>if</code> chain or <code>switch</code>"],
            ["Repeat until a condition changes?", "<code>while</code>, <code>do-while</code> or <code>repeat-until</code>"],
            ["Visit every item or known range?", "<code>foreach</code> or <code>for</code>"],
            ["Leave the function with a result?", "<code>return</code>"],
          ],
        },
      },
    ],
    check: { question: "After a selected <code>if</code> or <code>else</code> branch finishes where does execution normally continue?", options: ["At the first statement after the whole chain", "At every unselected branch", "At the beginning of the file"], answer: 0, explanation: "The other branches are skipped, and normal sequential execution resumes after the structure." },
    sources,
  },

  "if-else": {
    kicker: "Control Flow · Lesson 01",
    title: "If else and else if branches",
    lead: "An <code>if</code> chain checks conditions in order and runs the first matching branch. The order matters when several conditions can be true for the same value.",
    goals: ["trace first-match behavior", "order overlapping conditions", "choose independent if statements versus one chain"],
    sections: [
      {
        title: "One branch from an if chain",
        code: { label: "Pseudocode", content: "# Check the highest and most specific threshold first\nIF score >= 100\n    rank = \"S\"\nELSE IF score >= 80\n    rank = \"A\"\nELSE IF score >= 60\n    rank = \"B\"\nELSE\n    rank = \"C\"" },
        paragraphs: ["An <code>if</code> chain stops at its first true condition. If <code>score >= 60</code> came first, scores of <code>60</code>, <code>80</code> and <code>100</code> would all enter that branch because every one is at least <code>60</code>. Starting with <code>score >= 100</code> removes the highest scores first. The next condition then represents scores from <code>80</code> through <code>99</code>, and the following condition represents scores from <code>60</code> through <code>79</code>. Each check cuts the remaining score bar into a smaller range."],
      },
      {
        title: "Separate if statements",
        code: { label: "Pseudocode", content: "# Each condition is checked because several effects may happen\nIF player_is_in_water\n    extinguish_fire()\n\nIF player_is_poisoned\n    apply_poison_damage()\n\nIF player_health <= 0\n    defeat_player()" },
        paragraphs: ["These conditions ask separate questions, so every true condition needs to run. A player can be in water and poisoned during the same update. If the poison check were joined to the water check with <code>else if</code>, a bug would occur! Players in water would be inmune to poison. Separate <code>if</code> statements allow both effects to happen before the health check."],
      },
      {
        title: "Guard clauses and early returns",
        paragraphs: ["A guard clause checks one reason the function must stop before its main work begins. When a requirement fails, <code>return</code> immediately ends the function, so none of the later lines run. Once every guard has been passed, the main operation can continue without being wrapped in several layers of <code>else</code>. The <a href=\"return-values.html\">Return Values</a> lesson explains how <code>return</code> sends a value back while ending the current function call."],
        code: { label: "Pseudocode", content: "FUNCTION start_quest(player)\n    # Stop immediately when a requirement fails\n    IF player is missing\n        RETURN failure(\"No player\")\n    IF player.level < 5\n        RETURN failure(\"Level 5 required\")\n    IF quest already active\n        RETURN failure(\"Already started\")\n\n    # This runs only after every guard passes\n    activate quest\n    RETURN success" },
      },
    ],
    challenge: { title: "Fix an unreachable rank", prompt: "Why does checking <code>score >= 50</code> before <code>score >= 90</code> prevent the <code>90+</code> rank, and how do you fix it?", solutionCode: { label: "Pseudocode", content: "score = 95\n\n# Broken order\nIF score >= 50\n    rank = \"50+\"  # 95 passes this first check\nELSE IF score >= 90\n    rank = \"90+\"  # The chain already stopped, so this never runs\n\n# Fixed order\nIF score >= 90\n    rank = \"90+\"  # Check the highest range first\nELSE IF score >= 50\n    rank = \"50+\"  # This now handles scores from 50 through 89" } },
    check: { question: "When should two conditions usually be separate <code>if</code> statements?", options: ["When both effects may need to happen", "When only one category may win", "Never"], answer: 0, explanation: "Independent if statements allow multiple true conditions to run." },
    sources,
  },

  loops: {
    kicker: "Control Flow · Lesson 02",
    title: "Loop fundamentals",
    lead: "A loop repeats a block while a condition remains true or while items remain to process. Its condition and changing state determine when repetition stops.",
    goals: ["identify initialization, condition, update, and body", "choose a condition-driven or collection-driven loop", "prevent common infinite loops"],
    sections: [
      {
        title: "Parts of a loop",
        cards: [
          { title: "Start", body: "What state exists before the first iteration?" },
          { title: "Condition", body: "What must remain true for another iteration?" },
          { title: "Body", body: "What useful work happens once per iteration?" },
          { title: "Progress", body: "What changes so the condition can eventually become false?" },
        ],
        code: { label: "Pseudocode", content: "count = 3             # Start\nWHILE count > 0        # Condition\n    SHOW count         # Body\n    count = count - 1  # Progress toward stopping\nSHOW \"go!\"" },
      },
      {
        title: "Choosing a loop type",
        links: [
          { title: "While Loops", body: "Repeat while a condition remains true.", href: "while-loops.html" },
          { title: "Do While / Repeat Until", body: "An inverted <code>while</code> loop that runs first, then checks whether it should repeat.", href: "do-while.html" },
          { title: "For Loops", body: "Repeat with a counter or move through a range of values.", href: "for-loops.html" },
          { title: "Foreach Loops", body: "A <code>for</code> loop that runs once for every item in a collection.", href: "foreach-loops.html" },
        ],
      },
      {
        title: "Break and continue",
        paragraphs: ["<code>continue</code> skips the rest of the current iteration and moves to the next one. <code>break</code> exits the entire loop. Both are useful when their purpose is easy to see."],
        code: { label: "Pseudocode", content: "FOR EACH item IN inventory\n    IF item.is_broken\n        CONTINUE  # Ignore this item and inspect the next one\n\n    IF item.name == wanted_name\n        found = item\n        BREAK     # The item was found so searching can stop" },
        note: { title: "Why an infinite loop freezes a program", body: "Interactive programs already run inside a main loop. Each pass reads input, updates the program, draws one frame and returns control to the system. This continues until a condition such as <code>quit_pressed</code> becomes true. If one pass starts another loop that never finishes, the program cannot draw the next frame or return control. The window freezes, and the operating system may eventually mark the program as unresponsive or close it." },
      },
    ],
    check: { question: "Why does the countdown from earlier in the lesson stopped at 1?", options: ["<code>SHOW count</code> automatically ends the loop.", "<code>count = count - 1</code> eventually makes <code>count > 0</code> false.", "Every loop stops after three repetitions."], answer: 1, explanation: "Each repetition subtracts one from <code>count</code>. After showing <code>1</code>, its value becomes <code>0</code>, so <code>count > 0</code> is false and the loop ends." },
    sources,
  },

  "while-loops": {
    kicker: "Loops · Lesson 01",
    title: "While loops",
    lead: "A <code>while</code> loop checks its condition before every iteration and repeats while that condition is true. It can run zero times when the first check is false.",
    goals: ["predict zero-iteration behavior", "write a clear termination condition", "add safety bounds to uncertain repetition"],
    sections: [
      {
        title: "Condition checked before each iteration",
        code: { label: "Pseudocode", content: "energy = 3\n\n# Check energy before every attempt\nWHILE energy > 0\n    SHOW \"boost\"\n    energy = energy - 1\n\n# This shows boost three times\n# Starting with 0 energy would skip the body completely" },
      },
      {
        title: "When to use a while loop",
        bullets: ["Retry while a limited number of attempts remain.", "Advance a simulation until a condition is reached, with a safety cap.", "Read data while more records are available.", "Run a command loop until the user chooses to quit."],
        paragraphs: ["A program can use a top-level <code>while</code> loop as its main loop. Each iteration reads input, updates the program and draws one frame. The condition keeps it running until the user presses the quit button. Every iteration must finish so the next frame can begin. Browsers and game engines usually provide this main loop and call your code once per frame."],
      },
      {
        title: "Ending a while loop",
        paragraphs: ["This loop repeats while <code>health > 0</code>. Poison damage lowers <code>health</code> during every iteration. After four repetitions, <code>health</code> reaches <code>0</code>, the condition becomes false and execution continues after the loop."],
        code: { label: "Pseudocode", content: "health = 12\npoison_damage = 3\n\nWHILE health > 0\n    SHOW health\n    # Each subtraction moves health from 12 to 9 to 6 to 3 to 0\n    health = health - poison_damage\n\nSHOW \"defeated\"" },
        note: { title: "The condition must be able to change", body: "If the loop only showed <code>health</code> without subtracting poison damage, <code>health > 0</code> would remain true forever." },
      },
    ],
    challenge: { title: "Add health regeneration", prompt: "Let's add a regeneration to the previous code, what would it need?", solution: "Add a <code>health_regeneration</code> value and update health with <code>health = health - poison_damage + health_regeneration</code>. The poison damage must remain greater than the regeneration for this loop to eventually reach <code>0</code>." },
    check: { question: "How many times can a <code>while</code> body run when its condition starts false?", options: ["Exactly once", "Zero times", "Forever"], answer: 1, explanation: "A while loop checks before entering the body." },
    sources,
  },

  "do-while": {
    kicker: "Loops · Lesson 02",
    title: "Do while and repeat until loops",
    lead: "A post-test loop checks its condition after running the body, so the body runs at least once. Languages provide forms such as <code>do-while</code> and <code>repeat-until</code>.",
    goals: ["explain guaranteed first execution", "translate between do-while and repeat-until", "simulate a post-test loop when syntax is absent"],
    sections: [
      {
        title: "Running the body before the condition",
        code: { label: "JavaScript", content: "let choice;\n\ndo {\n  // Ask first because no choice exists yet\n  choice = prompt(\"Choose 1, 2, or 3\");\n\n  // Repeat only while the choice remains invalid\n} while (![\"1\", \"2\", \"3\"].includes(choice));" },
        paragraphs: ["A post-test loop checks its condition after the body. The prompt therefore appears at least once, which is necessary before the program can decide whether the choice is valid."],
      },
      {
        title: "While and until conditions",
        code: { label: "Lua", content: "repeat\n  choice = io.read()\n\n-- Stop when any allowed choice is entered\nuntil choice == \"1\" or choice == \"2\" or choice == \"3\"" },
        paragraphs: ["A do-while repeats <em>while</em> its condition is true. Lua's repeat-until stops <em>when</em> its condition becomes true. Mixing those mental models can reverse the rule."],
      },
      {
        title: "Emulating do while in Python",
        code: { label: "Python", content: "while True:\n    choice = input(\"Choose 1, 2, or 3: \")\n\n    # A valid choice reaches the visible exit\n    if choice in {\"1\", \"2\", \"3\"}:\n        break" },
        paragraphs: ["This pattern performs the action, validates the result, and breaks when valid. The unconditional loop is safe only because the exit path is clear and reachable."],
        note: { title: "Handling cancellation", body: "Interactive loops should often support cancel/quit and handle input systems returning no value." },
      },
    ],
    challenge: { title: "Translate the condition", prompt: "A repeat-until loop stops when <code>password_is_valid</code> becomes <code>true</code>. What condition would a do-while loop use to repeat for the same behavior?", solution: "Use <code>while (NOT password_is_valid)</code> with the chosen language's spelling. It repeats while the password remains invalid." },
    check: { question: "What defines a post-test loop?", options: ["It checks after running the body.", "It can never run.", "It always uses Python syntax."], answer: 0, explanation: "Because the condition comes afterward, the body executes at least once." },
    sources,
  },

  "for-loops": {
    kicker: "Loops · Lesson 03",
    title: "For loops and ranges",
    lead: "A <code>for</code> loop repeats over a range, counter, iterator or sequence of values. Some languages use a three-part loop header, while others iterate directly over values.",
    goals: ["trace start, condition, and update", "avoid off-by-one errors", "choose a range that matches the requirement"],
    sections: [
      {
        title: "C-style for loops",
        code: { label: "JavaScript", content: "for (let i = 0; i < 5; i += 1) {\n  console.log(i);\n}\n\n// Start at 0\n// Continue while i is below 5\n// Add 1 after every iteration\n// The displayed values are 0, 1, 2, 3 and 4" },
        paragraphs: ["Java, C#, and C++ have closely related syntax. JavaScript does too. Each iteration checks the condition, runs the body, then performs the update."],
      },
      {
        title: "Python range values",
        code: { label: "Python", content: "# Start defaults to 0 and stop excludes 5\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Start at 2 and stop before 6\nfor i in range(2, 6):\n    print(i)  # 2, 3, 4, 5\n\n# Count down by 2 and stop before 0\nfor i in range(10, 0, -2):\n    print(i)  # 10, 8, 6, 4, 2" },
        paragraphs: ["The stop value is excluded. Lua's numeric for has different defaults and commonly includes its limit, another reason not to transfer syntax assumptions blindly."],
      },
      {
        title: "Loop boundaries and off-by-one errors",
        paragraphs: ["An off-by-one error happens when a loop starts or stops one step away from the intended boundary. Write down whether the endpoint belongs in the range before choosing <code>&lt;</code>, <code>&lt;=</code> or a range stop value."],
        table: {
          headers: ["Requirement", "Useful index condition for size n"],
          rows: [
            ["Every valid zero-based index", "<code>0 &lt;= i &lt; n</code>"],
            ["Exactly n iterations", "Start at 0 and continue while <code>i &lt; n</code>"],
            ["Count visibly from 1 through n", "Use values 1…n, but convert carefully if indexing a zero-based collection"],
          ],
        },
        note: { title: "Inclusive and exclusive boundaries", body: "Is the endpoint inclusive or exclusive? Are you counting iterations, displaying numbers, or indexing storage? Those are related but different jobs." },
      },
    ],
    challenge: { title: "Predict the values", prompt: "List the values produced by <code>range(1, 8, 2)</code> in Python.", solution: "1, 3, 5, 7. The next value, 9, would pass the excluded stop boundary 8." },
    check: { question: "How many times does <code>for (i = 0; i < 4; i += 1)</code> run?", options: ["3", "4", "5"], answer: 1, explanation: "The body runs for i values 0, 1, 2, and 3." },
    sources,
  },

  "foreach-loops": {
    kicker: "Loops · Lesson 04",
    title: "Foreach loops",
    lead: "A <code>foreach</code> loop processes each element in a collection without a manually updated index. Languages may spell this construct as <code>for</code>, <code>foreach</code> or enhanced <code>for</code>.",
    goals: ["choose values over indexes when possible", "distinguish JavaScript for...of from for...in", "avoid mutating a collection unsafely during iteration"],
    sections: [
      {
        title: "Iterating directly over values",
        code: { label: "Multilanguage", highlighter: "multilanguage", content: "/#/ Python\nfor enemy in enemies:\n    enemy.update()\n\n/#/ JavaScript\nfor (const enemy of enemies) {\n  enemy.update();\n}\n\n/#/ C#\nforeach (Enemy enemy in enemies)\n{\n    enemy.Update();\n}" },
        paragraphs: ["Each loop visits every enemy directly. No manual index is needed because the goal is to use the values rather than their positions. This avoids index mistakes and makes the intention obvious."],
      },
      {
        title: "Iterating over keys values and indexes",
        code: { label: "JavaScript", content: "const items = [\"torch\", \"key\"];\n\n// for...of reads the stored values\nfor (const value of items) {\n  console.log(value); // torch, key\n}\n\n// for...in reads property keys instead\nfor (const key in items) {\n  console.log(key);   // \"0\", \"1\"\n}" },
        paragraphs: ["When you need both index and value, use the collection's supported enumeration tools, such as Python's <code>enumerate</code> or JavaScript's <code>entries()</code>."],
      },
      {
        title: "Modifying collections during iteration",
        paragraphs: ["Adding or removing elements from the same collection while iterating may skip items, revisit them, invalidate an iterator or throw an error. The exact behavior depends on the collection and language."],
        bullets: ["Build a new filtered collection.", "Record changes and apply them after the loop.", "Iterate over a copy when appropriate.", "Use the collection's documented removal mechanism."],
        note: { title: "Changing elements versus collections", body: "Updating an object's health may be safe while removing that object from the list may be unsafe. Check the actual API contract." },
      },
    ],
    challenge: { title: "Remove defeated enemies safely", prompt: "Describe a strategy that avoids removing list elements directly inside a foreach loop.", solution: "Create a survivors list or filter containing enemies whose health is above zero and then replace the original list. Another option collects defeated enemies and removes them afterward with documented APIs." },
    check: { question: "When is a foreach-style loop the clearest choice?", options: ["When you need each value and not manual index control", "When no repetition is needed", "Only when the collection has one item"], answer: 0, explanation: "It directly expresses the intention to visit every element." },
    sources,
  },

  "switch-cases": {
    kicker: "Control Flow · Lesson 03",
    title: "Switch statements and cases",
    lead: "A <code>switch</code> compares one value with a set of cases and runs the matching case. Some languages also allow cases to match types, ranges, patterns or guard conditions.",
    goals: ["choose switch versus if", "understand fall-through risks", "use a default case intentionally"],
    sections: [
      {
        title: "Matching one value against cases",
        code: { label: "JavaScript", content: "switch (command) {\n  case \"save\":\n    saveGame();\n    break; // Leave the switch after handling save\n\n  case \"load\":\n    loadGame();\n    break;\n\n  case \"quit\":\n    requestQuit();\n    break;\n\n  default:\n    showUnknownCommand(command);\n}" },
        paragraphs: ["A switch compares one value with several known cases. In traditional JavaScript, Java and C++ switches, leaving out <code>break</code> may continue into the next case. This is called <strong>fall-through</strong>. C# prevents many accidental forms of it, and newer language features provide other case styles."],
      },
      {
        title: "Choosing between switch and if",
        paragraphs: ["Use a switch when one subject is compared with several distinct alternatives. Use an if-chain when the branches depend on different questions or ordered ranges."],
        table: {
          headers: ["Situation", "Usually clearer"],
          rows: [
            ["One command/state compared to named alternatives", "switch / match"],
            ["Different variables and unrelated conditions", "if / else if"],
            ["Threshold ranges such as score >= 90", "Often an ordered if-chain, unless pattern syntax helps"],
            ["Simple lookup from key to value", "Possibly a map/dictionary instead of control flow"],
          ],
        },
      },
      {
        title: "Switch syntax across languages",
        paragraphs: ["Python 3.10+ provides structural <code>match</code> with capabilities beyond a traditional switch. Standard Lua has no switch statement. Tables or if/elseif chains are common alternatives. Follow the syntax of the language you are using."],
        code: { label: "Python", content: "match command:\n    case \"save\":\n        save_game()\n    case \"load\":\n        load_game()\n    case _:\n        # The underscore catches every unmatched command\n        show_unknown(command)" },
        note: { title: "Default and exhaustive cases", body: "A default branch can report invalid input. For deliberately exhaustive enums, compiler checks or explicit failure may better reveal a newly added case." },
      },
    ],
    challenge: { title: "Map item rarity to colors", prompt: "Choose a switch-like construct or map to translate <code>common</code>, <code>rare</code>, and <code>legendary</code> into UI colors. Explain your choice.", solution: "A map from rarity to color is compact if this is pure data. A switch or match construct is useful if each rarity triggers different behavior. Include a policy for unknown rarity." },
    check: { question: "What is a classic switch fall-through bug?", options: ["A case continues into the next case unintentionally.", "The subject becomes a loop.", "Every case is automatically skipped."], answer: 0, explanation: "In languages/forms that permit fall-through, an omitted exit can execute following case code." },
    sources,
  },
};
