const languageReferences = [
  { title: "Python tutorial", href: "https://docs.python.org/3/tutorial/" },
  { title: "MDN JavaScript guide", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
  { title: "Java language basics", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/" },
  { title: "A tour of C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/" },
  { title: "Lua 5.4 reference manual", href: "https://www.lua.org/manual/5.4/manual.html" },
];

export const rawLessons = {
  "raw-programming": {
    kicker: "Course 01 · Raw Programming",
    title: "Learn the idea before the accent",
    lead: "Python, JavaScript, Java, C#, C++, and Lua look different, but programmers use them to wrestle with many of the same ideas: values, decisions, repetition, and structure.",
    goals: ["separate a programming concept from one language's spelling", "recognize the common pieces inside a small program", "choose a language because it fits a goal"],
    sections: [
      {
        title: "Programming has ideas and syntax",
        paragraphs: [
          "A <strong>concept</strong> is what you want the program to do. <strong>Syntax</strong> is how a particular language requires you to write it. Think of the concept as a melody and the language as the instrument playing it.",
          "The melody matters most, but the instrument still has rules. A guitar and a piano can play the same song. You cannot use guitar finger positions on a piano.",
        ],
        code: { label: "pseudocode · the idea", content: "ask for the player's name\nif the name is empty\n    show a warning\notherwise\n    welcome the player" },
      },
      {
        title: "The pieces you will keep seeing",
        cards: [
          { title: "Values", body: "The information: a score, name, position, inventory, or yes/no state." },
          { title: "Operations", body: "The work: calculate damage, join text, compare health, or call a function." },
          { title: "Control flow", body: "The route: choose a branch, repeat a step, stop early, or return a result." },
          { title: "Structure", body: "The organization: blocks, functions, objects, files, and the connections between them." },
        ],
      },
      {
        title: "Pick a vehicle for your destination",
        paragraphs: ["There is no universally best first language. There are better matches for particular destinations. Your first language is a starting tool, not a permanent faction."],
        table: {
          headers: ["If you want to…", "A practical place to look", "Why"],
          rows: [
            ["Automate tasks or learn with little setup", "Python", "Readable syntax and a huge general-purpose ecosystem"],
            ["Build interactive websites", "JavaScript", "It runs directly in web browsers"],
            ["Make Unity games", "C#", "Unity's scripting workflow uses C#"],
            ["Script Roblox experiences", "Luau / Lua ideas", "Roblox uses Luau, a language derived from Lua"],
            ["Work close to engines or hardware", "C++", "It offers detailed control with extra complexity"],
          ],
        },
        note: { title: "Your mission here", body: "Do not memorize six languages at once. Learn to recognize the shared idea, then practice expressing it in one language." },
      },
      {
        title: "Choose your next lesson",
        links: [
          { title: "What Is Coding For?", body: "Understand what code actually does.", href: "what-is-coding.html" },
          { title: "Why Syntax Matters", body: "See why exact spelling and structure count.", href: "syntax-rules.html" },
          { title: "When Code Breaks", body: "Turn failure into useful evidence.", href: "when-code-breaks.html" },
          { title: "Starting A Project", body: "Find the first code that runs.", href: "starting-project.html" },
        ],
      },
    ],
    check: { question: "Which statement separates concept from syntax?", options: ["A concept is the goal while syntax is one language's way of expressing it.", "A concept is valid code while syntax is an optional style.", "They are two names for exactly the same thing."], answer: 0, explanation: "The concept transfers between languages. The exact syntax usually does not." },
    sources: languageReferences,
  },

  "what-is-coding": {
    kicker: "Raw Programming · Lesson 01",
    title: "What is coding actually for?",
    lead: "Coding is the craft of describing a process precisely enough that a computer can carry it out while keeping it clear enough for humans to understand, test and change later.",
    goals: ["explain the difference between a goal, an algorithm, and code", "identify input, processing, and output", "describe why humans are part of the audience for code"],
    sections: [
      {
        title: "From intention to instructions",
        paragraphs: ["“Make a fun game” gives you a goal without a procedure. A programmer breaks that goal into smaller rules the machine can execute."],
        steps: ["Notice an input: the player pressed the jump button.", "Check a rule: the character is standing on the ground.", "Change the game state: give the character upward velocity.", "Produce feedback: animate the jump and play a sound."],
        code: { label: "pseudocode · jump rule", content: "when jump_button is pressed:\n    if player is on_ground:\n        player.velocity_y = jump_strength\n        play jump_sound" },
      },
      {
        title: "A useful three-part lens",
        cards: [
          { title: "Input", body: "Information enters: a click, file, sensor reading, network message, or function argument." },
          { title: "Process", body: "The program calculates, validates, searches, transforms, stores, or decides." },
          { title: "Output", body: "Something observable happens: text appears, state changes, data is saved, or a response is sent." },
        ],
        note: { title: "Programs can work without a visible screen", body: "A server, game physics system, or file converter may do valuable work without showing a traditional user interface." },
      },
      {
        title: "Code is written for two readers",
        paragraphs: [
          "The computer needs instructions that follow the language rules. Humans need names, structure, and explanations that reveal the intention. Most real code is read and edited far more often than it is first typed.",
          "That is why “it runs” is necessary but not sufficient. Reliable code also handles expected failures and makes future changes possible.",
        ],
      },
    ],
    challenge: { title: "Decompose a door", prompt: "Describe a locked game door as input, process, and output. Include what happens when the player has no key.", solution: "Input: the player interacts with the door. Process: check whether the inventory contains the matching key. Output: open the door and remove the key, or show a locked message and keep the door closed." },
    check: { question: "Which item is an algorithm rather than a vague goal?", options: ["Make the enemies smart.", "If the player is visible then move toward them. Otherwise patrol between two points.", "Create the best game ever."], answer: 1, explanation: "It describes a sequence and decision that can be translated into code and tested." },
    sources: languageReferences,
  },

  "syntax-rules": {
    kicker: "Raw Programming · Lesson 02",
    title: "Syntax is the deal you make with a language",
    lead: "A programming language has a grammar. Syntax tells the parser which combinations of names, symbols, and structure count as valid instructions.",
    goals: ["distinguish syntax from program behavior", "read a syntax error as location evidence", "compare the same idea in several languages"],
    sections: [
      {
        title: "Exact rules cannot infer intent",
        paragraphs: [
          "A compiler or interpreter does not repair every ambiguous instruction by guessing your intention. It applies defined rules. Missing punctuation or an unfinished expression can prevent it from building a meaningful structure from your text.",
          "Humans do this too. “Let's eat, Grandma” and “Let's eat Grandma” use almost the same words, but punctuation changes the structure rather dramatically for Grandma.",
        ],
      },
      {
        title: "One decision across languages",
        table: {
          headers: ["Language", "A health check"],
          rows: [
            ["Python", "<code>if health &lt;= 0:</code> followed by an indented block"],
            ["JavaScript", "<code>if (health &lt;= 0) { ... }</code>"],
            ["Java / C# / C++", "<code>if (health &lt;= 0) { ... }</code> with language-specific surrounding code"],
            ["Lua", "<code>if health &lt;= 0 then ... end</code>"],
          ],
        },
        note: { title: "Shared resemblance with different rules", body: "Similar-looking languages can still disagree about types, truth values, equality, scope and many other behaviors. Compare carefully." },
      },
      {
        title: "Syntax and semantics are different",
        paragraphs: ["<strong>Syntax</strong> asks whether the instruction is formed legally. <strong>Semantics</strong> asks what that legal instruction means. <strong>Logic</strong> asks whether it solves your intended problem."],
        code: { label: "Python · valid syntax, wrong logic", content: "coins = 10\nprice = 4\ncoins = coins + price  # Runs, but buying should probably subtract." },
        cards: [
          { title: "Syntax error", body: "The language cannot parse the written structure." },
          { title: "Runtime error", body: "The program started, then reached an operation it could not complete." },
          { title: "Logic error", body: "The program ran, but your instructions produced the wrong result." },
        ],
      },
    ],
    challenge: { title: "Find both problems", prompt: "In the example below, find the syntax problem first. Then decide whether the calculation matches the variable name.", code: { label: "Python", content: "score = 12\nbonus = 3\nfinal_score = score - bonus\nprint(final_score" }, solution: "The closing parenthesis is missing. After fixing it, the program runs. A bonus would normally be added instead of subtracted, so the likely logic fix is final_score = score + bonus." },
    check: { question: "A program runs but awards 5 points instead of 50. What kind of problem is most likely?", options: ["A syntax error", "A logic error", "Proof that the language is broken"], answer: 1, explanation: "Valid syntax can still express the wrong calculation or rule." },
    sources: languageReferences,
  },

  "when-code-breaks": {
    kicker: "Raw Programming · Lesson 03",
    title: "Broken code is evidence",
    lead: "An error means the machine reached a precise limit: it could not parse an instruction, find something, accept a value, or continue safely. Your job is to interrogate the evidence.",
    goals: ["classify common failure stages", "use an error message without panicking", "reduce a bug to a smaller experiment"],
    sections: [
      {
        title: "Literal communication",
        paragraphs: [
          "Computers are extremely literal collaborators. They do not automatically fill in the social context or unstated intention a person might infer. If you request a door named <code>BossDoor</code> but created <code>bossDoor</code>, some languages treat those as different names.",
          "Many autistic programmers recognize the experience of people assuming a hidden meaning instead of saying exactly what they need. This comparison points to one useful lesson. Explicit communication reduces ambiguity for everyone.",
        ],
        note: { title: "Precision takes practice", body: "You do not need to think like a computer. You learn to translate a human goal into checkable steps." },
      },
      {
        title: "Where failure can appear",
        cards: [
          { title: "Before running", body: "A parser or compiler rejects invalid syntax or certain invalid type combinations." },
          { title: "While running", body: "The program reaches a missing file, invalid index, failed network call, or other impossible operation." },
          { title: "After running", body: "The result is wrong even though no error stopped the program. This is a logic bug." },
        ],
      },
      {
        title: "Your first sixty seconds",
        steps: ["Read the whole message once.", "Find the first location in your own code, not the deepest library internals.", "Inspect that line and the few lines before it.", "Say what you expected and what actually happened.", "Change one relevant thing, then run again."],
        note: { title: "Keep the original clue", body: "Randomly changing five lines can erase the symptom without explaining the cause. Small experiments teach you more." },
      },
    ],
    challenge: { title: "Ask a better debugging question", prompt: "Replace “Why doesn't my code work?” with a useful report for this situation: clicking Buy does nothing, the console says price is not defined, and the error points to shop.js line 18.", solution: "Example: “When I click Buy, I expect the coin total to decrease. Nothing visible happens. The console reports ‘price is not defined’ at shop.js:18. I checked that the variable is named itemPrice where it is created.”" },
    check: { question: "What is the best first response to an unfamiliar error?", options: ["Rewrite the entire feature.", "Read the message and inspect the first relevant location in your code.", "Change unrelated lines until it disappears."], answer: 1, explanation: "The error message and location are imperfect but valuable evidence. Start there and test one hypothesis at a time." },
    sources: languageReferences,
  },

  "errors-debugging": {
    kicker: "Raw Programming · Field Guide",
    title: "Debugging is controlled doubt",
    lead: "A debugger does not need magical instincts. They form a specific hypothesis, design a small test, and update their belief when the evidence disagrees.",
    goals: ["write an expected-versus-actual bug report", "trace values through a program", "choose a debugging tool that fits the symptom"],
    sections: [
      {
        title: "Build a useful bug report",
        table: {
          headers: ["Question", "Useful answer"],
          rows: [
            ["What did you expect?", "Health should fall from 20 to 15."],
            ["What happened?", "Health became 25."],
            ["How can someone repeat it?", "Start the test scene and touch one spike."],
            ["What changed recently?", "Damage was moved into <code>applyDamage</code>."],
            ["What evidence exists?", "The log prints <code>damage = -5</code>."],
          ],
        },
      },
      {
        title: "Use the smallest fitting tool",
        cards: [
          { title: "Print / log", body: "Expose a value or prove whether a path ran. Label the output so it remains readable." },
          { title: "Debugger", body: "Pause execution, step one line at a time, and inspect the current state." },
          { title: "Minimal example", body: "Remove unrelated systems until the problem can be reproduced with the least code." },
          { title: "Automated test", body: "Record an expected behavior so the same bug cannot quietly return later." },
        ],
        code: { label: "pseudocode · trace the state", content: "health = 20\ndamage = -5\nSHOW health and damage\nhealth = health - damage\nSHOW health" },
      },
      {
        title: "Follow the data",
        paragraphs: ["When the output is wrong, move backward: which value produced it, where did that value come from, and where did it first stop matching your expectation? This is often faster than staring at the final line."],
        steps: ["Reproduce the bug consistently.", "Choose one suspicious value.", "Observe it before and after each transformation.", "Find the earliest incorrect state.", "Fix the cause, then test nearby cases."],
      },
    ],
    challenge: { title: "Repair the damage rule", prompt: "The trace reveals damage is -5 and the code subtracts damage. Choose whether the bug belongs in the stored value or the calculation, then make the convention consistent.", solution: "Either store damage as positive 5 and use health = health - damage, or store a signed change of -5 and use health = health + health_change. The important part is one clear convention." },
    check: { question: "Which observation narrows the bug most?", options: ["The game feels weird.", "Health changes from 20 to 25 after damage, and the logged damage value is -5.", "Something somewhere is probably negative."], answer: 1, explanation: "It gives a reproducible transition and the relevant state, which supports a testable hypothesis." },
    sources: languageReferences,
  },

  "starting-project": {
    kicker: "Raw Programming · Lesson 04",
    title: "Every program starts somewhere",
    lead: "Before your code can react to clicks, enemies or files, an environment must load it and begin executing at an explicit entry point or through a framework lifecycle.",
    goals: ["identify an entry point", "distinguish source code from the runtime that executes it", "start a tiny project without drowning in setup"],
    sections: [
      {
        title: "Source tools and runtime",
        cards: [
          { title: "Source code", body: "The files humans edit: instructions, names, and structure." },
          { title: "Translator / loader", body: "A compiler, interpreter, engine, browser, or build tool prepares the code." },
          { title: "Runtime", body: "The environment executing the program and providing services such as memory, files, or graphics." },
        ],
      },
      {
        title: "Entry points wear different costumes",
        table: {
          headers: ["Environment", "A common beginning"],
          rows: [
            ["Python script", "Execution begins at the top level of the chosen file."],
            ["Browser JavaScript", "The browser loads a script. Top-level code runs and can register event handlers."],
            ["Java", "The launcher commonly calls a class's <code>public static void main(String[] args)</code>."],
            ["C# console app", "Modern templates may use top-level statements. An explicit <code>Main</code> is also supported."],
            ["C++ program", "A hosted program begins with a global <code>main</code> function."],
            ["Game engine", "The engine loads scenes/components and invokes documented lifecycle callbacks."],
          ],
        },
      },
      {
        title: "Start with one observable win",
        steps: ["Install or open the runtime you actually need.", "Create the smallest official starter project.", "Find the file or callback that runs first.", "Change one visible output.", "Run it again before adding features."],
        code: { label: "three tiny starts", content: "# Python\nprint(\"Booted!\")\n\n// JavaScript in a browser console or script\nconsole.log(\"Booted!\");\n\n-- Lua\nprint(\"Booted!\")" },
        note: { title: "Templates are scaffolding", body: "Generated files are not a test of intelligence. Learn which pieces matter now. Investigate the rest when the project needs them." },
      },
    ],
    challenge: { title: "Trace the boot", prompt: "For a game or app you want to build, write four arrows describing who loads what. Example: operating system → engine → scene → player script.", solution: "Any accurate chain is useful. For a web page: browser → HTML document → script element → JavaScript module → event handler." },
    check: { question: "What is an entry point?", options: ["The first character typed in a file.", "The defined place or lifecycle event where an environment begins executing your program.", "The folder where screenshots are stored."], answer: 1, explanation: "Some languages expose a named function. Other environments begin at top level or call lifecycle methods." },
    sources: languageReferences,
  },
};
