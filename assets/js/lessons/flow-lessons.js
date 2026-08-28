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
    title: "Control flow decides what happens next",
    lead: "Programs normally move from one statement to the next. Branches, loops, returns, errors, and other transfers interrupt that straight path to create real behavior.",
    goals: ["trace execution through a branch or loop", "choose between selection and repetition", "recognize transfers such as return, break, and continue"],
    sections: [
      {
        title: "Four ways the path changes",
        paragraphs: ["Without control flow, every statement would run once from top to bottom. These tools let the program choose, repeat, enter another function or leave the normal route."],
        cards: [
          { title: "Selection", body: "Choose a path with <code>if</code> or switch/match-like constructs." },
          { title: "Repetition", body: "Run a block again while a condition holds or for each item." },
          { title: "Function transfer", body: "A call enters another function. Return sends control and possibly a value back." },
          { title: "Interruption", body: "Break, continue, exceptions/errors, cancellation, or program exit alter normal flow." },
        ],
      },
      {
        title: "Trace the exact route",
        code: { label: "Pseudocode", content: "health = 12\n\n# Check each branch in order until one condition is true\nIF health <= 0\n    SHOW \"defeated\"\nELSE IF health < 20\n    SHOW \"critical\"\nELSE\n    SHOW \"stable\"\n\n# Execution continues here after the chosen branch\nSHOW \"turn complete\"" },
        paragraphs: ["Exactly one branch in this chain runs and produces <code>critical</code>. Execution then continues after the chain and shows <code>turn complete</code>. Pencil tracing is a real engineering tool, not beginner training wheels."],
      },
      {
        title: "Pick the control structure by the question",
        paragraphs: ["Choose the structure that matches the question your program needs to answer. The clearest tool usually makes the intended route visible before a reader studies every line."],
        links: [
          { title: "If Else If And Else", body: "Choose among conditions and priorities.", href: "if-else.html" },
          { title: "Loops", body: "Understand repeated work and termination.", href: "loops.html" },
          { title: "Switch Cases", body: "Dispatch among discrete alternatives.", href: "switch-cases.html" },
        ],
        table: {
          headers: ["Question", "Likely tool"],
          rows: [
            ["Should this action happen?", "<code>if</code>"],
            ["Which one of these states is active?", "if-chain or switch/match"],
            ["Repeat until a condition changes?", "while / do-while-like loop"],
            ["Visit every item or known range?", "foreach / for loop"],
            ["Leave the function with a result?", "return"],
          ],
        },
      },
    ],
    check: { question: "After a selected <code>if</code> or <code>else</code> branch finishes where does execution normally continue?", options: ["At the first statement after the whole chain", "At every unselected branch", "At the beginning of the file"], answer: 0, explanation: "The other branches are skipped, and normal sequential execution resumes after the structure." },
    sources,
  },

  "if-else": {
    kicker: "Control Flow · Lesson 01",
    title: "Order your decisions by meaning",
    lead: "An if-chain checks conditions in order and takes the first matching branch. Correct conditions can still produce the wrong behavior when their order makes a specific case unreachable.",
    goals: ["trace first-match behavior", "order overlapping conditions", "choose independent if statements versus one chain"],
    sections: [
      {
        title: "One chain chooses one branch",
        code: { label: "Pseudocode", content: "# Check the highest and most specific threshold first\nIF score >= 100\n    rank = \"S\"\nELSE IF score >= 80\n    rank = \"A\"\nELSE IF score >= 60\n    rank = \"B\"\nELSE\n    rank = \"C\"" },
        paragraphs: ["A score of 105 matches every threshold, but the first true branch wins. Starting at the highest threshold makes the intended ranking work."],
      },
      {
        title: "Independent questions need independent ifs",
        code: { label: "Pseudocode", content: "# Each condition is checked because several effects may happen\nIF player_is_poisoned\n    apply_poison_damage()\n\nIF player_is_in_water\n    extinguish_fire()\n\nIF player_health <= 0\n    defeat_player()" },
        paragraphs: ["These conditions ask separate questions. A poisoned player might also be in water and reach zero health during the same update. An <code>else if</code> chain would stop after the first true condition and skip the other effects."],
      },
      {
        title: "Guard clauses flatten the happy path",
        paragraphs: ["A guard clause returns early when the main operation cannot continue. Handling these failed requirements first leaves the successful path straight and easy to find."],
        code: { label: "Pseudocode", content: "FUNCTION start_quest(player)\n    # Stop immediately when a requirement fails\n    IF player is missing\n        RETURN failure(\"No player\")\n    IF player.level < 5\n        RETURN failure(\"Level 5 required\")\n    IF quest already active\n        RETURN failure(\"Already started\")\n\n    # This runs only after every guard passes\n    activate quest\n    RETURN success" },
        note: { title: "Else can be optional", body: "If a branch returns, throws, breaks, or otherwise exits, the remaining code is already the alternative path." },
      },
    ],
    challenge: { title: "Fix an unreachable rank", prompt: "Why does checking <code>score >= 50</code> before <code>score >= 90</code> prevent the <code>90+</code> rank, and how do you fix it?", solution: "A score of <code>95</code> satisfies <code>>= 50</code>, so the chain stops before reaching <code>>= 90</code>. Check narrower or higher thresholds first, or redesign the ranges to be mutually exclusive." },
    check: { question: "When should two conditions usually be separate <code>if</code> statements?", options: ["When both effects may need to happen", "When only one category may win", "Never"], answer: 0, explanation: "Independent if statements allow multiple true conditions to run." },
    sources,
  },

  loops: {
    kicker: "Control Flow · Lesson 02",
    title: "Loops repeat a rule",
    lead: "A loop executes a block multiple times. A safe loop makes its changing state, continuation rule, and stopping condition visible.",
    goals: ["identify initialization, condition, update, and body", "choose a condition-driven or collection-driven loop", "prevent common infinite loops"],
    sections: [
      {
        title: "The loop contract",
        cards: [
          { title: "Start", body: "What state exists before the first iteration?" },
          { title: "Condition", body: "What must remain true for another iteration?" },
          { title: "Body", body: "What useful work happens once per iteration?" },
          { title: "Progress", body: "What changes so the condition can eventually become false?" },
        ],
        code: { label: "Pseudocode", content: "count = 3             # Start\nWHILE count > 0        # Condition\n    SHOW count         # Body\n    count = count - 1  # Progress toward stopping\nSHOW \"go!\"" },
      },
      {
        title: "Choose by what controls repetition",
        links: [
          { title: "While Loops", body: "Repeat while a condition remains true.", href: "while-loops.html" },
          { title: "Do While / Do Until", body: "Run once before checking.", href: "do-while.html" },
          { title: "For Loops", body: "Count or follow a controlled progression.", href: "for-loops.html" },
          { title: "Foreach Loops", body: "Visit values in a collection.", href: "foreach-loops.html" },
        ],
      },
      {
        title: "Break and continue change the route",
        paragraphs: ["<code>continue</code> skips the rest of the current iteration and moves to the next one. <code>break</code> exits the entire loop. Both are useful when their purpose is easy to see."],
        code: { label: "Pseudocode", content: "FOR EACH item IN inventory\n    IF item.is_broken\n        CONTINUE  # Ignore this item and inspect the next one\n\n    IF item.name == wanted_name\n        found = item\n        BREAK     # The item was found so searching can stop" },
        note: { title: "Protect interactive programs", body: "A busy infinite loop can freeze a browser or game frame. Event loops and engine update callbacks already repeat. Keep unbounded loops out of them." },
      },
    ],
    check: { question: "What prevents the countdown loop from running forever?", options: ["The condition is written in English.", "<code>count</code> decreases until <code>count > 0</code> becomes false.", "Loops automatically stop after ten iterations."], answer: 1, explanation: "The progress step moves state toward a false condition." },
    sources,
  },

  "while-loops": {
    kicker: "Loops · Lesson 01",
    title: "While checks before repeating",
    lead: "A while loop is suited to repetition controlled by a condition when you may not know the number of iterations in advance. Because it checks first, it can run zero times.",
    goals: ["predict zero-iteration behavior", "write a clear termination condition", "add safety bounds to uncertain repetition"],
    sections: [
      {
        title: "The condition guards every entry",
        code: { label: "Pseudocode", content: "energy = 3\n\n# Check energy before every attempt\nWHILE energy > 0\n    SHOW \"boost\"\n    energy = energy - 1\n\n# This shows boost three times\n# Starting with 0 energy would skip the body completely" },
      },
      {
        title: "Good fits for while",
        bullets: ["Retry while a limited number of attempts remain.", "Advance a simulation until a condition is reached, with a safety cap.", "Read data while more records are available.", "Run a command loop until the user chooses to quit."],
        paragraphs: ["Real-time games usually use an engine-provided frame/update loop instead of creating a raw <code>while game_running</code> inside a callback."],
      },
      {
        title: "Termination is part of correctness",
        code: { label: "Pseudocode", content: "attempts = 0\n\n# Stop after success or after reaching the safety limit\nWHILE NOT path_found AND attempts < 1000\n    try_next_path()\n    attempts = attempts + 1\n\nIF NOT path_found\n    REPORT failure" },
        note: { title: "Ask before running", body: "Which variable can make the condition false? Does every path through the body move it toward that state? What external event could fail to arrive?" },
      },
    ],
    challenge: { title: "Repair the frozen loop", prompt: "The loop <code>WHILE health > 0</code> only shows <code>health</code> and never changes it. Add a meaningful progress rule for poison damage.", solution: "Subtract poison damage inside the loop with <code>health = health - poison_damage</code>. Also ensure <code>poison_damage</code> is positive or add an explicit safety condition." },
    check: { question: "How many times can a <code>while</code> body run when its condition starts false?", options: ["Exactly once", "Zero times", "Forever"], answer: 1, explanation: "A while loop checks before entering the body." },
    sources,
  },

  "do-while": {
    kicker: "Loops · Lesson 02",
    title: "Do first and check afterward",
    lead: "A post-test loop runs its body at least once. JavaScript, Java, C# and C++ provide do-while syntax. Lua provides repeat-until. Python has no built-in do-while statement.",
    goals: ["explain guaranteed first execution", "translate between do-while and repeat-until", "simulate a post-test loop when syntax is absent"],
    sections: [
      {
        title: "One guaranteed attempt",
        code: { label: "JavaScript", content: "let choice;\n\ndo {\n  // Ask first because no choice exists yet\n  choice = prompt(\"Choose 1, 2, or 3\");\n\n  // Repeat only while the choice remains invalid\n} while (![\"1\", \"2\", \"3\"].includes(choice));" },
        paragraphs: ["A post-test loop checks its condition after the body. The prompt therefore appears at least once, which is necessary before the program can decide whether the choice is valid."],
      },
      {
        title: "While and until invert the wording",
        code: { label: "Lua", content: "repeat\n  choice = io.read()\n\n-- Stop when any allowed choice is entered\nuntil choice == \"1\" or choice == \"2\" or choice == \"3\"" },
        paragraphs: ["A do-while repeats <em>while</em> its condition is true. Lua's repeat-until stops <em>when</em> its condition becomes true. Mixing those mental models can reverse the rule."],
      },
      {
        title: "Python's explicit pattern",
        code: { label: "Python", content: "while True:\n    choice = input(\"Choose 1, 2, or 3: \")\n\n    # A valid choice reaches the visible exit\n    if choice in {\"1\", \"2\", \"3\"}:\n        break" },
        paragraphs: ["This pattern performs the action, validates the result, and breaks when valid. The unconditional loop is safe only because the exit path is clear and reachable."],
        note: { title: "User cancellation counts", body: "Interactive loops should often support cancel/quit and handle input systems returning no value." },
      },
    ],
    challenge: { title: "Translate the condition", prompt: "A repeat-until loop stops when <code>password_is_valid</code> becomes <code>true</code>. What condition would a do-while loop use to repeat for the same behavior?", solution: "Use <code>while (NOT password_is_valid)</code> with the chosen language's spelling. It repeats while the password remains invalid." },
    check: { question: "What defines a post-test loop?", options: ["It checks after running the body.", "It can never run.", "It always uses Python syntax."], answer: 0, explanation: "Because the condition comes afterward, the body executes at least once." },
    sources,
  },

  "for-loops": {
    kicker: "Loops · Lesson 03",
    title: "For loops make progression visible",
    lead: "A for loop is useful when repetition follows a range, counter, iterator, or other deliberate progression. Syntax varies sharply because some languages use a three-part header while Python iterates over values.",
    goals: ["trace start, condition, and update", "avoid off-by-one errors", "choose a range that matches the requirement"],
    sections: [
      {
        title: "The C-style loop header",
        code: { label: "JavaScript", content: "for (let i = 0; i < 5; i += 1) {\n  console.log(i);\n}\n\n// Start at 0\n// Continue while i is below 5\n// Add 1 after every iteration\n// The displayed values are 0, 1, 2, 3 and 4" },
        paragraphs: ["Java, C#, and C++ have closely related syntax. JavaScript does too. Each iteration checks the condition, runs the body, then performs the update."],
      },
      {
        title: "Python ranges describe generated values",
        code: { label: "Python", content: "# Start defaults to 0 and stop excludes 5\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Start at 2 and stop before 6\nfor i in range(2, 6):\n    print(i)  # 2, 3, 4, 5\n\n# Count down by 2 and stop before 0\nfor i in range(10, 0, -2):\n    print(i)  # 10, 8, 6, 4, 2" },
        paragraphs: ["The stop value is excluded. Lua's numeric for has different defaults and commonly includes its limit, another reason not to transfer syntax assumptions blindly."],
      },
      {
        title: "Off-by-one is a boundary disagreement",
        paragraphs: ["An off-by-one error happens when a loop starts or stops one step away from the intended boundary. Write down whether the endpoint belongs in the range before choosing <code>&lt;</code>, <code>&lt;=</code> or a range stop value."],
        table: {
          headers: ["Requirement", "Useful index condition for size n"],
          rows: [
            ["Every valid zero-based index", "<code>0 &lt;= i &lt; n</code>"],
            ["Exactly n iterations", "Start at 0 and continue while <code>i &lt; n</code>"],
            ["Count visibly from 1 through n", "Use values 1…n, but convert carefully if indexing a zero-based collection"],
          ],
        },
        note: { title: "Name the boundary", body: "Is the endpoint inclusive or exclusive? Are you counting iterations, displaying numbers, or indexing storage? Those are related but different jobs." },
      },
    ],
    challenge: { title: "Predict the values", prompt: "List the values produced by <code>range(1, 8, 2)</code> in Python.", solution: "1, 3, 5, 7. The next value, 9, would pass the excluded stop boundary 8." },
    check: { question: "How many times does <code>for (i = 0; i < 4; i += 1)</code> run?", options: ["3", "4", "5"], answer: 1, explanation: "The body runs for i values 0, 1, 2, and 3." },
    sources,
  },

  "foreach-loops": {
    kicker: "Loops · Lesson 04",
    title: "Foreach visits each value",
    lead: "Collection-oriented loops avoid manual index bookkeeping when your real goal is to process every element. Different languages spell them as for, foreach, enhanced for, or generic iteration.",
    goals: ["choose values over indexes when possible", "distinguish JavaScript for...of from for...in", "avoid mutating a collection unsafely during iteration"],
    sections: [
      {
        title: "Say what you mean",
        code: { label: "Multilanguage", highlighter: "multilanguage", content: "/#/ Python\nfor enemy in enemies:\n    enemy.update()\n\n/#/ JavaScript\nfor (const enemy of enemies) {\n  enemy.update();\n}\n\n/#/ C#\nforeach (Enemy enemy in enemies)\n{\n    enemy.Update();\n}" },
        paragraphs: ["Each loop visits every enemy directly. No manual index is needed because the goal is to use the values rather than their positions. This avoids index mistakes and makes the intention obvious."],
      },
      {
        title: "Keys values and indexes",
        code: { label: "JavaScript", content: "const items = [\"torch\", \"key\"];\n\n// for...of reads the stored values\nfor (const value of items) {\n  console.log(value); // torch, key\n}\n\n// for...in reads property keys instead\nfor (const key in items) {\n  console.log(key);   // \"0\", \"1\"\n}" },
        paragraphs: ["When you need both index and value, use the collection's supported enumeration tools, such as Python's <code>enumerate</code> or JavaScript's <code>entries()</code>."],
      },
      {
        title: "Mutation can invalidate the walk",
        paragraphs: ["Adding or removing elements from the same collection while iterating may skip items, revisit them, invalidate an iterator or throw an error. The exact behavior depends on the collection and language."],
        bullets: ["Build a new filtered collection.", "Record changes and apply them after the loop.", "Iterate over a copy when appropriate.", "Use the collection's documented removal mechanism."],
        note: { title: "Element changes and collection changes differ", body: "Updating an object's health may be safe while removing that object from the list may be unsafe. Check the actual API contract." },
      },
    ],
    challenge: { title: "Remove defeated enemies safely", prompt: "Describe a strategy that avoids removing list elements directly inside a foreach loop.", solution: "Create a survivors list or filter containing enemies whose health is above zero and then replace the original list. Another option collects defeated enemies and removes them afterward with documented APIs." },
    check: { question: "When is a foreach-style loop the clearest choice?", options: ["When you need each value and not manual index control", "When no repetition is needed", "Only when the collection has one item"], answer: 0, explanation: "It directly expresses the intention to visit every element." },
    sources,
  },

  "switch-cases": {
    kicker: "Control Flow · Lesson 03",
    title: "Switch dispatches among known alternatives",
    lead: "Switch-like constructs compare one subject against discrete cases. Modern variants may also match types, shapes, ranges, or guards. They shine when the alternatives form one coherent choice.",
    goals: ["choose switch versus if", "understand fall-through risks", "use a default case intentionally"],
    sections: [
      {
        title: "One subject with several cases",
        code: { label: "JavaScript", content: "switch (command) {\n  case \"save\":\n    saveGame();\n    break; // Leave the switch after handling save\n\n  case \"load\":\n    loadGame();\n    break;\n\n  case \"quit\":\n    requestQuit();\n    break;\n\n  default:\n    showUnknownCommand(command);\n}" },
        paragraphs: ["A switch compares one value with several known cases. In traditional JavaScript, Java and C++ switches, leaving out <code>break</code> may continue into the next case. This is called <strong>fall-through</strong>. C# prevents many accidental forms of it, and newer language features provide other case styles."],
      },
      {
        title: "Switch or if?",
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
        title: "Control flow syntax varies by language",
        paragraphs: ["Python 3.10+ provides structural <code>match</code> with capabilities beyond a traditional switch. Standard Lua has no switch statement. Tables or if/elseif chains are common alternatives. Follow the syntax of the language you are using."],
        code: { label: "Python", content: "match command:\n    case \"save\":\n        save_game()\n    case \"load\":\n        load_game()\n    case _:\n        # The underscore catches every unmatched command\n        show_unknown(command)" },
        note: { title: "Make unknown states visible", body: "A default branch can report invalid input. For deliberately exhaustive enums, compiler checks or explicit failure may better reveal a newly added case." },
      },
    ],
    challenge: { title: "Dispatch item rarity", prompt: "Choose a switch-like construct or map to translate <code>common</code>, <code>rare</code>, and <code>legendary</code> into UI colors. Explain your choice.", solution: "A map from rarity to color is compact if this is pure data. A switch or match construct is useful if each rarity triggers different behavior. Include a policy for unknown rarity." },
    check: { question: "What is a classic switch fall-through bug?", options: ["A case continues into the next case unintentionally.", "The subject becomes a loop.", "Every case is automatically skipped."], answer: 0, explanation: "In languages/forms that permit fall-through, an omitted exit can execute following case code." },
    sources,
  },
};
