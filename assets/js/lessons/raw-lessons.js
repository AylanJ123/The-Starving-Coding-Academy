const languageReferences = [
  { title: "Python tutorial", href: "https://docs.python.org/3/tutorial/" },
  { title: "MDN JavaScript guide", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
  { title: "Java language basics", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/" },
  { title: "A tour of C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/" },
  { title: "Lua 5.4 reference manual", href: "https://www.lua.org/manual/5.4/manual.html" },
];

const exceptionReferences = [
  { title: "Python errors and exceptions", href: "https://docs.python.org/3/tutorial/errors.html" },
  { title: "JavaScript try catch", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" },
  { title: "Java exceptions", href: "https://dev.java/learn/exceptions/" },
  { title: "C# exceptions and exception handling", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/" },
  { title: "C++ exceptions", href: "https://en.cppreference.com/w/cpp/language/exceptions.html" },
  { title: "Lua error handling", href: "https://www.lua.org/manual/5.4/manual.html#2.3" },
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
        code: { label: "Pseudocode", content: "ask for the player's name\nif the name is empty\n    show a warning\notherwise\n    welcome the player" },
      },
      {
        title: "The pieces you will keep seeing",
        cards: [
          { title: "Values", body: "It's information like a score, name, position, inventory or a state." },
          { title: "Operations", body: "It's work done by the program like calculating damage, joining text, comparing health, or calling a function." },
          { title: "Control flow", body: "It's the route a program takes like choosing a branch, repeating a step or stopping early." },
          { title: "Structure", body: "It's the skeleton. Think of blocks, functions, objects, files and all the connections." },
        ],
      },
      {
        title: "Pick a vehicle for your destination",
        paragraphs: ["There is no universally best first language. There are better matches for particular destinations. Your first language is a starting tool, not a permanent faction. Think of it like choosing your first Pokemon!"],
        table: {
          headers: ["If you want to…", "A practical place to look", "Why"],
          rows: [
            ["Automation and smaller game engines", "Python", "Has a huge general-purpose ecosystem"],
            ["Build interactive websites", "JavaScript", "It runs directly in web browsers"],
            ["Make Unity games", "C#", "Unity's scripting workflow uses C#"],
            ["Script Roblox experiences", "Lua", "Roblox uses Luau, a language derived from Lua"],
            ["Work closer to the hardware", "C++", "It offers detailed control with extra complexity"],
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
        paragraphs: ['"Make a fun game" gives you a goal without a procedure. A programmer breaks that goal into smaller rules the machine can execute.'],
        steps: ["<strong>Notice an input:</strong> the player pressed the jump button.", "<strong>Check a rule:</strong> the character is standing on the ground.", "<strong>Change the game state:</strong> give the character upward velocity.", "<strong>Produce feedback:</strong> animate the jump and play a sound."],
        code: { label: "Pseudocode", content: "when jump_button is pressed:\n    if player is on_ground:\n        player.velocity_y = jump_strength\n        play jump_sound" },
      },
      {
        title: "A useful three-part lens",
        cards: [
          { title: "Input", body: "Information enters through a click, file, sensor reading, network message, or function argument." },
          { title: "Process", body: "The program calculates, validates, searches, transforms, stores, or decides what happens next." },
          { title: "Output", body: "Something observable happens when text appears, state changes, data is saved, or a response is sent." },
        ],
        note: { title: "Programs can work without a visible screen", body: "A server, game physics system or file converter may do valuable work without showing a traditional user interface." },
      },
      {
        title: "Code is written for two readers",
        paragraphs: [
          "The computer needs instructions that follow the language rules. Humans need names, structure, and explanations that reveal the intention. Most real code is read and edited far more often than it is first typed.",
          "That is why “it runs” is necessary but not sufficient. Reliable code also handles expected failures and makes future changes possible.",
        ],
      },
    ],
    challenge: { title: "Decompose a door", prompt: "Describe a locked game door as input, process, and output. Include what happens when the player has no key.", solution: "<strong>Input:</strong> the player interacts with the door.\n<strong>Process:</strong> check whether the inventory contains the matching key.\n<strong>Output:</strong> open the door and remove the key, or show a locked message and keep the door closed." },
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
        paragraphs: [
          "The same decision can look different depending on the language. The indentation and punctuation are part of the deal.",
        ],
        code: {
          label: "Multilanguage",
          highlighter: "multilanguage",
          content: "/#/ Python\nif health <= 0:\n  show(\"Game over\")\n\n/#/ JavaScript / C# / Java / C++\nif (health <= 0) {\n  show(\"Game over\")\n}\n\n/#/ Lua\nif health <= 0 then\n  show(\"Game over\")\nend",
        },
        note: { title: "Shared resemblance with different rules", body: "Similar-looking languages can still disagree about types, truth values, equality, scope and many other behaviors. Compare carefully." },
      },
      {
        title: "Syntax and semantics are different",
        paragraphs: ["<strong>Syntax</strong> asks whether the instruction is formed legally. <strong>Semantics</strong> asks what that legal instruction means. <strong>Logic</strong> asks whether it solves your intended problem."],
        code: { label: "Python", content: "coins = 10\nprice = 4\ncoins = coins + price  # Runs, but buying should probably subtract." },
        cards: [
          { title: "Syntax error", body: "The language cannot parse the written structure." },
          { title: "Runtime error", body: "The program started, then reached an operation it couldn't logically complete." },
          { title: "Logic error", body: "The program ran without errors, but your instructions produced the wrong result." },
          { title: "External error", body: "The code may be fine, but something outside the program failed." },
        ],
      },
    ],
    challenge: { title: "Find both problems", prompt: "In the example below, find the syntax problem first. Then decide whether the calculation matches the variable name.", code: { label: "Python", content: "score = 12\nbonus = 3\nfinal_score = score - bonus\nprint(final_score" }, solution: "The closing parenthesis is missing. After fixing it, the program runs. A bonus would normally be added instead of subtracted, so the likely logic fix is <code>final_score = score + bonus</code>." },
    check: { question: "A program runs but awards 5 points instead of 50. What kind of problem is most likely?", options: ["A syntax error", "A logic error", "Proof that the language is broken"], answer: 1, explanation: "Valid syntax can still express the wrong calculation or rule." },
    sources: languageReferences,
  },

  "when-code-breaks": {
    kicker: "Raw Programming · Lesson 03",
    title: "Errors leave useful clues",
    lead: "An error means the machine reached a limit and could not parse an instruction, find something, accept a value, or continue safely. Your job is to follow the clues it leaves behind.",
    goals: ["classify common failure stages", "use an error message without panicking", "reduce a bug to a smaller experiment"],
    sections: [
      {
        title: "Literal communication",
        paragraphs: [
          "Computers are extremely literal collaborators. They do not automatically fill in the social context or unstated intention that a neurotypical person might infer. If you request a door named <code>BossDoor</code> but created <code>bossDoor</code>, some languages treat those as different names.",
          "Many autistic programmers can relate to this. A lot of people assume a hidden meaning instead of saying exactly what they need. This comparison points to one useful lesson. Explicit communication reduces ambiguity for everyone, even non-living entities.",
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
        title: "Your first minute after finding an error",
        steps: ["Read the whole message once.", "Find the first location in your own code, not the deepest library internals.", "Inspect that line and the lines around it.", "Think about what you expected and what actually happened.", "Change one <strong>relevant</strong> thing, then run again."],
        note: { title: "Record the original clue", body: "Copy the error message and note what happened before you edit. Then test one relevant change at a time so you can identify the cause." },
      },
      {
        title: "Choose the next tool",
        links: [
          { title: "Errors And Debugging", body: "Investigate unexpected behavior with evidence and small tests.", href: "errors-debugging.html" },
          { title: "Exceptions And Recovery", body: "Design a safe response for failures a program can anticipate.", href: "exceptions-recovery.html" },
        ],
      },
    ],
    challenge: { title: "Imagine and write a useful bug report", prompt: "Write a bug report a teammate could use. Here is some information. Add the current and actual results, the console message: <code>price is not defined</code>, and the location <code>shop.js at line:18</code>.", solution: "One possible report would read: When I click <code>Buy</code>, I expect the coin total to decrease. Nothing visible happens. The console reports <code>price is not defined</code> at <code>shop.js at line:18</code>. I checked that the variable is named <code>itemPrice</code> where it is created." },
    check: { question: "What is the best first response to an unfamiliar error?", options: ["Rewrite the entire feature.", "Read the message and inspect the first relevant location in your code.", "Change unrelated lines until it disappears."], answer: 1, explanation: "The error message and location are imperfect but valuable evidence. Start there and test one hypothesis at a time." },
    sources: languageReferences,
  },

  "errors-debugging": {
    kicker: "Raw Programming · Field Guide",
    title: "To debug is to have a controlled doubt",
    lead: "A code debugger does not need magical instincts. They form a specific hypothesis, design a small test, and update their belief when the evidence disagrees.",
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
          { title: "Print / log", body: "Expose a value or prove whether a path ran." },
          { title: "Debugger", body: "Pause execution, step one line at a time, and inspect the current state." },
          { title: "Minimal example", body: "Remove unrelated systems until the problem can be reproduced with the least code." },
          { title: "Automated test", body: "Record an expected behavior so the same bug cannot quietly return later." },
        ],
        code: { label: "Pseudocode", content: "health = 20\ndamage = -5\nSHOW health and damage\nhealth = health - damage\nSHOW health" },
      },
      {
        title: "Follow the data",
        paragraphs: ["When the output is wrong, move backwards. Ask which value produced it, where that value came from, and where it first stopped matching your expectation. This is often faster than staring at the broken line."],
        steps: ["Reproduce the bug consistently.", "Choose one suspicious value.", "Observe it before and after each transformation.", "Find the earliest incorrect state.", "Fix the cause, then test nearby cases."],
      },
    ],
    challenge: { title: "Repair the damage rule", prompt: "The trace reveals <code>damage = -5</code> which doesn't make sense. Either damage is positive, or a health change is negative. Choose whether the bug belongs in the stored value or the calculation, then think of a consistent convention.", solution: "Either store damage as positive <code>5</code> and use <code>health = health - damage</code>, or store a signed change of <code>-5</code> and use <code>health = health + health_change</code>. The important part is one clear convention." },
    check: { question: "Which observation narrows the bug most?", options: ["The game feels weird.", "Health changes from 20 to 25 after damage, and the logged damage value is -5.", "Something somewhere is probably negative."], answer: 1, explanation: "It gives a reproducible transition and the relevant state, which supports a testable hypothesis." },
    sources: languageReferences,
  },

  "exceptions-recovery": {
    kicker: "Raw Programming · Recovery Guide",
    title: "Exceptions need a recovery plan",
    lead: "This lesson also helps you read game crash reports. An exception is the program saying something went wrong while it was running, then sending that clue up the stack.",
    goals: ["trace an exception through active function calls", "choose between recovery and propagation", "keep cleanup dependable while preserving useful error context"],
    sections: [
      {
        title: "An exception changes the route",
        paragraphs: [
          "When one part of a program asks another part to do work, the new part goes on top of the current one. If that part asks for more help, another part goes on top. That's the infamous <strong>Call Stack</strong>.",
          "If the top part breaks because the execution can't logically continue, the program starts removing pieces from the stack. Each unfinished piece gets killed until a <code>try-catch</code> absorbs the problem and knows what to do. If nothing catches it, the error reaches the bottom piece, the entry point. Then the entry point stops too, and the program crashes.",
        ],
        code: { label: "pseudocode · a new route", content: "TRY\n    profile = LOAD save_file\n    START game WITH profile\nCATCH missing_save\n    profile = CREATE default_profile\n    START game WITH profile" },
        cards: [
          { title: "Signal", body: "The failing operation creates an exception with a type and useful context." },
          { title: "Search", body: "Control travels outward through active calls until a matching handler is found." },
          { title: "Respond", body: "The handler recovers safely or allows the failure to keep travelling." },
        ],
      },
      {
        title: "A handler needs a recovery plan",
        paragraphs: ["Catching an exception only gives your code control. Recovery means choosing a trustworthy state and a sensible next action."],
        table: {
          headers: ["Situation", "Possible response", "Safe destination"],
          rows: [
            ["Missing optional settings", "Load documented defaults", "The program continues with a complete configuration"],
            ["Temporary network timeout", "Retry a limited number of times", "The request succeeds or reports a clear failure"],
            ["Corrupted save data", "Preserve the file and offer repair or backup options", "The player reaches a safe menu"],
            ["Broken internal state", "Record the evidence and stop the affected operation", "Further damage is prevented"],
          ],
        },
        note: { title: "Recovery has a standard", body: "Continue only when the program can establish a known valid state. A cheerful message cannot repair damaged data by itself." },
      },
      {
        title: "Catch narrowly and preserve context",
        paragraphs: [
          "Catch the specific failures your current layer understands. A profile loader module may know how to replace a missing save. It may have no safe answer for exhausted memory or a broken engine invariant. If that's the case, let the program get killed, that's sometimes the safest option.",
          "On such situations, a layer can add useful context without recovering. Record or wrap the exception in another exception and let it continue killing the call stack. Keep the original cause available so the eventual report explains where the chain began. That's why in crash reports you often see a <code>Caused by</code> section atop with smaller errors going down.",
        ],
        code: { label: "pseudocode · specific responses", content: "TRY\n    profile = LOAD profile_by_ID(player_id)\nCATCH missing_save\n    profile = CREATE default_profile\nCATCH corrupt_save AS problem\n    RECORD problem WITH player_id\n    PROPAGATE problem WITH player_id" },
        steps: [
          "Name the operation that may fail.",
          "List the failures this layer genuinely understands.",
          "Choose the valid state produced by each recovery path.",
          "Preserve the original evidence when recovery belongs elsewhere.",
        ],
      },
      {
        title: "Languages share the route",
        paragraphs: ["The shared model is simple: one keyword sends the error signal, and a protected area gets a chance to catch it."],
        table: {
          headers: ["Language", "Throw the error", "Catch the error", "Cleanup"],
          rows: [
            ["Python", "<code>raise</code> sends the error", "<code>try</code> protects, <code>except</code> catches", "<code>finally</code> or <code>with</code>"],
            ["JavaScript", "<code>throw</code> sends the error", "<code>try</code> protects, <code>catch</code> catches", "<code>finally</code>"],
            ["Java", "<code>throw</code> sends the error", "<code>try</code> protects, <code>catch</code> catches", "<code>finally</code>"],
            ["C#", "<code>throw</code> sends the error", "<code>try</code> protects, <code>catch</code> catches", "<code>finally</code> or <code>using</code>"],
            ["C++", "<code>throw</code> sends the error", "<code>try</code> protects, <code>catch</code> catches", "RAII"],
            ["Lua", "<code>error</code> sends the error", "<code>pcall</code> catches the result safely", "Manual cleanup"],
          ],
        },
        note: { title: "Java adds checked exceptions", body: "Some Java exception types must be caught or declared by a method. Other languages in this comparison use different rules, so the concept transfers more reliably than the exact type system." },
      },
      {
        title: "Cleanup must survive every route",
        paragraphs: [
          "Some program actions borrow something from the computer: an open file, a network connection, a lock on saved data or a chunk of temporary state. When the action is done, the program should give it back.",
          "If cleanup does not happen, those leftovers can pile up. That is one reason a game can get laggier after connecting many times, reloading a menu over and over or retrying a failed request without releasing what the last attempt used.",
        ],
        code: { label: "pseudocode · save now or save later", content: "connection = OPEN score_server\n\n# Try because this connection might fail.\nTRY\n    SEND score THROUGH connection\n\n# Catch keeps the score safe so the game can retry later.\nCATCH connection_failed\n    SAVE score LOCALLY\n    MARK score TO retry_later\n\n# Finally runs whether the try worked or the catch helped.\nFINALLY\n    CLOSE connection" },
        note: { title: "Cleanup has limits", body: "Cleanup code helps with normal exits and expected failures. It cannot fix everything, like the computer losing power, the program being forced closed or the machine itself failing." },
      },
      {
        title: "Bad catches create invisible bugs",
        bullets: [
          "Empty handlers erase the clue while the underlying failure remains.",
          "A good catch knows when the user can fix the problem, then gives control back with a clear choice or input.",
          "Unlimited retries can keep failing until the program freezes, which is extra painful if nothing was saved.",
          "Generic messages without logs leave developers unable to reproduce the failure.",
        ],
        note: { title: "A useful handler earns its place", body: "You do not need to wrap everything in try-catch. Use it when outside things can damage the program, like files, internet requests, missing data or user input that needs another chance." },
      },
    ],
    challenge: {
      title: "Design the save gate",
      prompt: "A game loads a profile before entering the world. A missing file should create a default profile. A locked file should retry once. A corrupted file should remain untouched while the player receives a repair option. Write the protected flow and name the safe destination for every path.",
      solutionCode: { label: "pseudocode · one possible design", content: "TRY\n    profile = LOAD save_file\n    ENTER world WITH profile\nCATCH missing_save\n    profile = CREATE default_profile\n    ENTER world WITH profile\nCATCH locked_save\n    WAIT briefly\n    TRY ONCE MORE\n    IF still_locked\n        SHOW retry_menu\nCATCH corrupt_save AS problem\n    RECORD problem\n    PRESERVE save_file\n    SHOW repair_menu\nFINALLY\n    RELEASE save_file_lock" },
    },
    check: {
      question: "A loader catches every exception and continues with a half filled player profile. What is the central danger?",
      options: ["The handler may hide the cause and spread invalid state.", "The exception message becomes too specific.", "The program performs too much cleanup."],
      answer: 0,
      explanation: "Recovery needs a known valid state. Continuing with damaged state hides the original evidence and creates new failures elsewhere.",
    },
    sources: exceptionReferences,
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
          { title: "Source code", body: "The files humans edit contain instructions, names, and structure." },
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
        steps: [
          "Pick one language and search for an \"Online Playground\" or IDE (Integrated Development Environment) which is just an app made for writing and running code.",
          "Install or open the runtime you found.",
          "Create the smallest official starter project.",
          "Find the file or callback that runs at the start, aka your entry point.",
          "Make a console print for the specific language. The classic <code>Hello, World!</code> is a good first choice.",
          "Run it!",
        ],
        code: { label: "three tiny starts", content: "# Python\nprint(\"Booted!\")\n\n// JavaScript in a browser console or script\nconsole.log(\"Booted!\");\n\n-- Lua\nprint(\"Booted!\")" },
        note: { title: "Templates are scaffolding", body: "Generated files are not a test of intelligence. Learn which pieces matter now. Investigate the rest when the project needs them." },
      },
    ],
    challenge: {
      title: "Name the pieces",
      prompt: "Look at the tiny project you opened above. Write down three things: the file you edited, the button or command that runs it, and the first line where your code starts doing work.",
      solution: "A good answer connects the tool to the code. Example: <code>I edited main.py, pressed Run, and the first real instruction was print(\"Hello, World!\").</code>",
    },
    check: { question: "What is an entry point?", options: ["The first character typed in a file.", "The defined place or lifecycle event where an environment begins executing your program.", "The folder where screenshots are stored."], answer: 1, explanation: "Some languages expose a named function. Other environments begin at top level or call lifecycle methods." },
    sources: languageReferences,
  },
};
