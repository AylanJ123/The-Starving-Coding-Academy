const sources = [
  { title: "Python language reference: lexical analysis", href: "https://docs.python.org/3/reference/lexical_analysis.html" },
  { title: "MDN: JavaScript grammar and types", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types" },
  { title: "Java: variables", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html" },
  { title: "C# type system", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/" },
  { title: "Lua 5.4: values and types", href: "https://www.lua.org/manual/5.4/manual.html#2.1" },
];

const strongTypingSources = [
  { title: "Python data model", href: "https://docs.python.org/3/reference/datamodel.html" },
  { title: "Python errors and exceptions", href: "https://docs.python.org/3/tutorial/errors.html" },
  { title: "JavaScript data types and structures", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures" },
  { title: "JavaScript addition rules", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition" },
  { title: "Java primitive data types", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html" },
  { title: "C# type system", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/" },
  { title: "C# compiler error CS0029", href: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs0029" },
  { title: "C++ objects", href: "https://en.cppreference.com/w/cpp/language/object.html" },
  { title: "Lua values and types", href: "https://www.lua.org/manual/5.4/manual.html#2.1" },
];

export const syntaxLessons = {
  "syntax-elements": {
    kicker: "Course 02 · Syntax Elements",
    title: "Basic syntax elements",
    lead: "Expressions and statements are built from names, literals, keywords, operators, punctuation and comments. Each element has a specific role in the instruction.",
    goals: ["label common syntax elements", "separate an expression from a statement", "read punctuation according to context"],
    sections: [
      {
        title: "From characters to programs",
        code: { label: "pseudocode · anatomy", content: "total = price * quantity\n  ┬   ┬       ┬\n name │    operator\n   assignment" },
        cards: [
          { title: "Identifiers", body: "Names chosen for variables, functions, classes, and other program elements." },
          { title: "Literals", body: "Values written directly, such as <code>42</code>, <code>\"mage\"</code>, or <code>true</code>." },
          { title: "Keywords", body: "Reserved words with language-defined meaning, such as <code>if</code>, <code>return</code>, or <code>class</code>." },
          { title: "Operators", body: "Symbols or words that combine, compare, assign, or transform values." },
        ],
      },
      {
        title: "Expressions produce values",
        paragraphs: ["An <strong>expression</strong> can be evaluated to a value. Examples include <code>2 + 3</code>, <code>health &lt;= 0</code>, and <code>player.name</code>. A <strong>statement</strong> performs an action in the program, such as assigning, returning, importing, or controlling a branch. Exact categories differ by language."],
        code: { label: "conceptual breakdown", content: "2 + 3                 -> 5\nhealth <= 0           -> true or false\nformat_name(\"Ari\")    -> a returned value\nscore = 2 + 3         -> assignment of an addition" },
      },
      {
        title: "Punctuation in code",
        table: {
          headers: ["Mark", "Common jobs with different rules"],
          rows: [
            ["<code>()</code>", "Declare parameters of a function and evaluate or group an expression"],
            ["<code>{}</code>", "Define a code block or the body of an object or class"],
            ["<code>[]</code>", "Access a collection value by index or create one"],
            ["<code>.</code>", "Access a member such as a field or method"],
            ["<code>:</code>", "Jack of all trades: Begin a suite, separate keys and values, annotate types, and more"],
            ["<code>;</code>", "Terminate or separate statements in many languages"],
          ],
        },
        note: { title: "Symbols depend on context", body: "A symbol can carry different meanings across languages and even within one language." },
      },
      {
        title: "Syntax lessons",
        links: [
          { title: "Values And Variables", body: "Give changing state a useful name.", href: "values-variables.html" },
          { title: "Primitive Values", body: "Meet numbers, text, and other basic values.", href: "primitive-values.html" },
          { title: "Strong Typing", body: "Understand what type rules protect.", href: "strong-typing.html" },
          { title: "Complex Types", body: "Group values into useful structures.", href: "complex-types.html" },
          { title: "Why Booleans Matter", body: "Turn questions into control flow.", href: "booleans.html" },
        ],
      },
    ],
    check: { question: "In the expression <code>price * quantity</code>, what is the asterisk doing?", options: ["Naming a variable", "Acting as an operator", "Starting a comment"], answer: 1, explanation: "Here the asterisk is the multiplication operator combining two values." },
    sources,
  },

  "values-variables": {
    kicker: "Syntax Elements · Lesson 01",
    title: "Variables and assignment",
    lead: "A variable gives a value a name so the program can use it later. Its declaration determines whether another value can replace it.",
    goals: ["distinguish a variable from its current value", "name state according to its purpose", "trace assignment from right to left"],
    sections: [
      {
        title: "Names and values",
        paragraphs: ["People often imagine a variable as a labeled box. That is a useful beginning, as long as you remember the real behavior depends on the language and value type. Assignment may store a value, a reference to an object, or something optimized under the hood."],
        code: { label: "pseudocode · state changes", content: "score = 10\nscore = score + 5\nSHOW score  # 15" },
        note: { title: "Read assignment right to left", body: "First evaluate <code>score + 5</code> using the old value. Then assign the result back to <code>score</code>. Assignment is not the same relationship as algebraic equality." },
      },
      {
        title: "Variable naming",
        table: {
          headers: ["Weak name", "Stronger name", "Reason"],
          rows: [
            ["<code>x</code>", "<code>remaining_health</code>", "Says what the number represents"],
            ["<code>thing</code>", "<code>selected_weapon</code>", "Names its role in the current code"],
            ["<code>flag</code>", "<code>is_door_locked</code>", "Reads like a yes/no question"],
          ],
        },
        paragraphs: ["Short names can be reasonable in tiny conventional contexts such as a loop counter. Clarity remains the default. Follow the naming rules and conventions of the language and team."],
      },
      {
        title: "Declaration initialization and reassignment",
        cards: [
          { title: "Declare", body: "Introduce a name to the language. Some languages require an explicit type or declaration keyword." },
          { title: "Initialize", body: "Give the variable its first usable value." },
          { title: "Reassign", body: "Replace the current value associated with a mutable variable." },
          { title: "Constant / immutable binding", body: "Prevent reassignment through a language feature such as <code>const</code> or <code>final</code>. Details vary." },
        ],
        code: { label: "similar intentions, different syntax", content: "# Python\nplayer_name = \"Mina\"\n\n// JavaScript\nlet playerName = \"Mina\";\n\n// Java / C#\nstring playerName = \"Mina\";  // C# spelling\nString playerName = \"Mina\";  // Java spelling\n\n-- Lua\nlocal playerName = \"Mina\"" },
      },
    ],
    challenge: { title: "Trace the variables", prompt: "What are the final values of <code>coins</code> and <code>potions</code>?", code: { label: "pseudocode", content: "coins = 12\npotions = 2\ncoins = coins - 5\npotions = potions + 1\ncoins = coins + 3" }, solution: "<code>coins</code> is <code>10</code> and <code>potions</code> is <code>3</code>. Trace one assignment at a time instead of trying to hold the entire program in your head." },
    check: { question: "After <code>score = score + 10</code>, what happened?", options: ["The name score was added to itself.", "The old score helped calculate a new value, which was assigned to score.", "The statement is impossible because a value cannot equal itself plus ten."], answer: 1, explanation: "Programming assignment updates state. Algebraic equality describes a different relationship." },
    sources,
  },

  comments: {
    kicker: "Syntax Elements · Side Quest",
    title: "Writing useful comments",
    lead: "Comments are notes for people reading the source code. The language ignores them during execution, so they can explain decisions and context that the code does not show clearly.",
    goals: ["write a useful reason-focused comment", "recognize common comment syntax", "avoid using comments to rescue confusing code"],
    sections: [
      {
        title: "Comment syntax differs",
        table: {
          headers: ["Language", "Single line", "Multiline"],
          rows: [
            ["Python", "<code># note</code>", "No special general block-comment token."],
            ["JavaScript / Java / C# / C++", "<code>// note</code>", "<code>/* note */</code>"],
            ["Lua", "<code>-- note</code>", "<code>--[[ note ]]</code>"],
          ],
        },
      },
      {
        title: "What useful comments explain",
        code: { label: "comment quality", content: "# Weak: subtract five from speed\nspeed = speed - 5\n\n# Stronger: swamp terrain applies a flat penalty after equipment bonuses.\nspeed = speed - 5" },
        bullets: ["Explain a surprising business or game rule.", "Record why an obvious-looking alternative was rejected.", "Warn about a dependency or consequence that is not locally visible.", "Document a public function's contract using the language's documentation conventions."],
      },
      {
        title: "Removing outdated comments",
        paragraphs: ["A false comment is worse than no comment because readers may trust it. When behavior changes, update nearby explanations. If a better name or smaller function can make the code obvious, prefer improving the code."],
        note: { title: "Version control stores old code", body: "Remove large chunks of dead commented code. Version control already remembers earlier versions." },
      },
    ],
    challenge: { title: "Improve a comment", prompt: "Improve the comment <code>// checks if the player can enter</code> above a validation that grays out a tournament button if level is less than 12.", solution: "One useful version is <code>// The tournament unlocks at level 12 so new players finish the tutorials first.</code> It explains why the threshold exists." },
    check: { question: "Which comment adds the most value above <code>lives -= 1</code>?", options: ["Subtract one from lives.", "Boss retries consume a life even when the player disconnects, by design.", "This is code."], answer: 1, explanation: "It records a non-obvious rule and prevents a future maintainer from “fixing” intentional behavior." },
    sources,
  },

  "primitive-values": {
    kicker: "Syntax Elements · Lesson 02",
    title: "Primitive value types",
    lead: "Primitive types represent basic values such as numbers, text, booleans and absence. Each type defines which operations can be performed on its values.",
    goals: ["choose a suitable basic type for a value", "explain why numeric types are not interchangeable", "recognize null-like absence"],
    sections: [
      {
        title: "Common primitive types",
        cards: [
          { title: "Integers", body: "Whole numbers such as lives, item counts, and grid coordinates." },
          { title: "Floating-point numbers", body: "Approximations for values with fractional parts, such as time or velocity." },
          { title: "Booleans", body: "Two logical states that usually appear as true and false and support decisions." },
          { title: "Characters and strings", body: "A character is one textual unit in some type systems. Strings represent sequences of text." },
          { title: "Null-like values", body: "Markers such as <code>null</code>, <code>None</code>, or <code>nil</code> can represent absence, with different rules." },
        ],
      },
      {
        title: "Operations depend on type",
        code: { label: "values that look similar", content: "2 + 3        -> usually 5\n\"2\" + \"3\"    -> often \"23\"\n\"2\" + 3      -> error or conversion, depending on the language\ntrue + 1     -> language-specific and usually a bad idea" },
        paragraphs: ["The characters <code>\"42\"</code> are text, not automatically the numeric value 42. User input often arrives as text and must be validated before numeric calculations."],
      },
      {
        title: "Numbers have limits",
        paragraphs: [
          "Fixed-size integer types have minimum and maximum values. Floating-point values represent a large range but cannot exactly represent every decimal fraction. This is why repeated calculations with values such as 0.1 may show tiny rounding differences.",
          "Choose types according to the required range and precision. Money, physics, animation, and enormous counters may need different strategies.",
        ],
        note: { title: "Numeric types vary by language", body: "Python integers can grow beyond fixed machine-word sizes subject to memory, while JavaScript's ordinary <code>Number</code> uses floating-point for most numeric work. Java, C#, C++, and Lua expose their own numeric models. Never assume one rule fits all six." },
      },
    ],
    challenge: { title: "Model an inventory item", prompt: "Choose a basic value type for <code>name</code>, <code>quantity</code>, <code>is_stackable</code>, <code>durability</code>, and an optional <code>custom_nickname</code>.", solution: "Use a string for <code>name</code>, an integer for <code>quantity</code>, a boolean for <code>is_stackable</code>, a floating-point number for <code>durability</code>, and an optional or nullable string for <code>custom_nickname</code>. Exact type names depend on the language." },
    check: { question: "Why should text input \"12\" be converted before arithmetic operations on it?", options: ["Quotes make it a string rather than a numeric value.", "Computers cannot display twelve.", "All input is permanently unusable."], answer: 0, explanation: "A string supports text operations. Validate and convert it before treating it as a number." },
    sources,
  },

  "strong-typing": {
    kicker: "Syntax Elements · Lesson 03",
    title: "How type systems interpret values",
    lead: "A type tells the language how to interpret a value and which operations are allowed. Type rules prevent incompatible values from being combined accidentally.",
    goals: ["picture how a type gives stored data meaning", "explain why stricter type rules can prevent bugs", "predict whether a mixed-type mistake fails early or while running"],
    sections: [
      {
        title: "Values need types",
        paragraphs: [
          "A bit is a tiny stored zero or one. Memory holds many bits together. The pattern alone does not tell your program what job the data has. The type supplies that reading rule.",
          "In this simplified one-byte example, the same pattern can be read as the whole number <code>49</code> or as the text character <code>\"1\"</code>. The chosen representation and text encoding decide the meaning.",
        ],
        code: { label: "memory sketch · one byte", content: "STORED BITS    READING RULE    MEANING\n00110001       integer         49\n00110001       character       \"1\"" },
        cards: [
          { title: "Meaning", body: "The type says whether a value represents a number, text, a boolean, an object, or something else." },
          { title: "Space", body: "Some types have a fixed size. Others use a reference to data stored elsewhere or let the runtime manage their shape." },
          { title: "Operations", body: "The type helps decide whether code may add, compare, index, call, or otherwise use the value." },
          { title: "Conversions", body: "The type rules decide which values can change form automatically and which changes need an explicit request." },
        ],
        note: { title: "Values in memory", body: "Real storage depends on the language, runtime and compiler. A value may live in memory, in a processor register or inside an object with extra bookkeeping. The sketch explains the purpose without promising one exact layout." },
      },
      {
        title: "Values and references",
        paragraphs: ["The familiar labeled box is still useful. The contents of that box vary. These three pictures cover many everyday cases."],
        table: {
          headers: ["Picture", "What the variable carries", "Common examples"],
          rows: [
            ["Direct value", "The bits for the value can live directly in the variable's storage", "A Java <code>int</code>, a C# <code>int</code>, or many C++ number types"],
            ["Reference", "The variable carries a route to an object stored elsewhere", "Java and C# class objects or a C++ pointer"],
            ["Runtime value", "The name connects to a value whose type is dynamically tracked while the program runs", "Python, JavaScript, and Lua dynamic values"],
          ],
        },
        code: { label: "pseudocode · three useful pictures", content: "lives      -> integer value 3\nplayer     -> reference -> Player object\nnickname   -> runtime string value \"Mina\"" },
        note: { title: "Types exist in dynamic languages", body: "Python, JavaScript, and Lua still know whether a current value is a number, string, function, or object. They usually check that information while the operation runs." },
      },
      {
        title: "Benefits of stricter type checks",
        paragraphs: [
          "Imagine a shop receives the bonus <code>\"5\"</code> from a text field while the player has <code>10</code> numeric coins. The symbols look compatible to a person. The values describe different kinds of data to the program.",
          "A stricter type rule pauses here and asks you to choose. Should the program validate the text and turn it into a number, or should it join the values as text? Making that choice visible prevents a quiet shop bug such as changing 10 coins into the text <code>\"105\"</code>.",
        ],
        cards: [
          { title: "Calculation inputs", body: "Numeric work receives numeric values instead of text that merely looks numeric." },
          { title: "Storage compatibility", body: "A destination receives a value whose representation and allowed range make sense there." },
          { title: "Function contracts", body: "Function inputs and returned values follow expectations that callers and tools can inspect." },
          { title: "Earlier error detection", body: "Static checking can reject some bad combinations before a normal run begins." },
        ],
      },
      {
        title: "Type errors across languages",
        paragraphs: ["These programs express the same mistaken intention. Each language chooses a different moment or behavior."],
        code: { label: "Python JavaScript and C#", content: "# Python\ncoins = 10\ncoins = coins + \"5\"\n# Runtime exception:\n# TypeError: unsupported operand type(s) for +: 'int' and 'str'\n\n// JavaScript\nlet coins = 10;\ncoins = coins + \"5\";\nconsole.log(coins);\n// \"105\" because + chooses string joining\n\n// C#\nint coins = 10;\ncoins = coins + \"5\";\n// Compiler error CS0029:\n// Cannot implicitly convert type 'string' to 'int'" },
        paragraphs: [
          "Python throws a <code>TypeError</code> when the failing line runs. C# reports a compiler error before a normal run, so that example throws no runtime exception. JavaScript converts the number to text and continues with <code>\"105\"</code>.",
          "Early and late checks both protect meaning when they reject an operation. Automatic conversion can be useful too. Its rules need to match your intention.",
        ],
        note: { title: "Compiler errors and exceptions", body: "A <code>Compiler Error</code> prevents the code from even running, you can't build the app until it's fixed. An <code>Exception</code> is raised during runtime instead, showing the exact stage so you know where to look." },
      },
      {
        title: "Explicit type conversion",
        paragraphs: ["Input from forms, files, command lines, and networks often begins as text. Convert it once at the edge of your program, check the result, then let the rest of the code work with a trustworthy type."],
        code: { label: "pseudocode · validate at the edge", content: "raw_bonus = READ text_input\nIF CONVERT raw_bonus TO INTEGER succeeds\n    coins = coins + converted_bonus\nELSE\n    SHOW \"Enter a whole number\"\n    LOOP BACK TO START" },
        table: {
          headers: ["Language", "Invalid whole-number conversion", "Failure signal"],
          rows: [
            ["Python", "<code>int(\"BadInput\")</code>", "Throws <code>ValueError</code>"],
            ["JavaScript", "<code>Number(\"BadInput\")</code>", "Returns <code>NaN</code> instead of throwing"],
            ["Java", "<code>Integer.parseInt(\"BadInput\")</code>", "Throws <code>NumberFormatException</code>"],
            ["C#", "<code>int.Parse(\"BadInput\")</code>", "Throws <code>FormatException</code>. <code>TryParse</code> returns a boolean instead of throwing."],
            ["C++", "<code>std::stoi(\"BadInput\")</code>", "Throws <code>std::invalid_argument</code>"],
            ["Lua", "<code>tonumber(\"BadInput\")</code>", "Returns <code>nil</code> instead of throwing"],
          ],
        },
        note: { title: "Identifying conversion failures", body: "Full error messages can vary by version and environment. The exception type or failure value usually gives the steadier clue." },
      },
      {
        title: "Comparing type systems",
        cards: [
          { title: "When is it checked", body: "Static checking happens mainly before a normal run. Dynamic checking happens as operations execute." },
          { title: "What changes automatically", body: "Languages allow different implicit conversions. Check the exact operation instead of relying on a strong or weak ranking." },
          { title: "Who writes the type", body: "A programmer may write a type explicitly or let the compiler infer it. Inference can still produce a statically checked type." },
        ],
        paragraphs: ["People use <strong>strong typing</strong> as an informal description for rules that resist mixing unrelated types. There is no universal strength score. The three questions above predict real behavior more clearly."],
      },
    ],
    challenge: { title: "Convert text before calculation", prompt: "A shop receives the bonus text <code>\"5\"</code> and has the numeric coin count <code>10</code>. Explain why JavaScript can produce <code>\"105\"</code>, then design a safe input boundary in pseudocode.", solutionCode: { label: "pseudocode · one possible boundary", content: "raw_bonus = READ text_input\nIF raw_bonus CAN CONVERT TO INTEGER\n    bonus = CONVERT raw_bonus TO INTEGER\n    coins = coins + bonus\nELSE\n    SHOW \"Bonus must be a whole number\"\n    LOOP BACK TO START" } },
    check: { question: "Why can a stricter type rule help when code combines 10 and the text \"5\"?", options: ["It forces the program to choose a clear conversion or operation.", "It guarantees that every program has fewer lines.", "It stores all values in exactly the same memory layout."], answer: 0, explanation: "The rule makes the intended meaning explicit before numeric addition and text joining are confused." },
    sources: strongTypingSources,
  },

  "complex-types": {
    kicker: "Syntax Elements · Lesson 04",
    title: "Complex data types",
    lead: "Complex types combine multiple values or behaviors into one structure. Collections, records, objects and functions provide different ways to organize that information.",
    goals: ["choose between a sequence and a key-value structure", "describe value versus reference behavior cautiously", "recognize functions as values where supported"],
    sections: [
      {
        title: "Choosing a data structure",
        cards: [
          { title: "Sequence / array / list", body: "An ordered collection can hold inventory slots, quest steps, or recent messages." },
          { title: "Map / dictionary / table", body: "Keys connect an item ID to a price, a username to a profile, or a setting name to a value." },
          { title: "Record / object", body: "Related named properties describing one thing, such as a player profile." },
          { title: "Set", body: "A collection focused on unique membership, such as unlocked achievements." },
          { title: "Function value", body: "In many languages, a function can be stored, passed, and invoked later." },
        ],
      },
      {
        title: "Similar data structures across languages",
        code: { label: "Python and JavaScript", content: "# Python dictionary\nplayer = {\"name\": \"Kai\", \"health\": 100}\nplayer[\"health\"] -= 10\n\n// JavaScript object\nconst player = { name: \"Kai\", health: 100 };\nplayer.health -= 10;" },
        paragraphs: ["These examples express a similar idea, but dictionaries and JavaScript objects are not identical. Learn the operations, equality rules, ordering guarantees, and mutation behavior of the actual structure you use."],
      },
      {
        title: "Shared references to one object",
        code: { label: "pseudocode · two names sharing one list", content: "inventory = [\"torch\"]\nsecond_name = inventory\nADD \"key\" TO second_name\nSHOW inventory  # [\"torch\", \"key\"]" },
        paragraphs: ["In this example, the list is a reference type. The <a href=\"strong-typing.html\">Strong Typing</a> lesson introduced references as routes to data stored elsewhere. Assigning <code>inventory</code> to <code>second_name</code> copies that route instead of creating another list. Both names now reach the same object, so a change made through either name is visible through the other. Copying rules differ across languages and types, so check the behavior instead of assuming."],
        note: { title: "Check whether data was copied", body: "Did I create a new structure, or did I create another reference to the existing one?" },
      },
    ],
    challenge: { title: "Choose a hotbar structure", prompt: "The blocks at the start of this lesson introduced the jobs of several collection types. Use them to decide whether a sequence, map, or set best fits a player's hotbar when its items must stay in a fixed slot order.", solution: "The opening blocks explain that a sequence keeps values in order. A sequence fits best here because it lets each hotbar item occupy a numbered position. Languages may call this structure a list or array." },
    check: { question: "Which structure best answers “What data belongs to item ID 1042?”", options: ["A key-value map", "A boolean", "A comment"], answer: 0, explanation: "A map associates a lookup key with a value and is designed for this relationship." },
    sources,
  },

  booleans: {
    kicker: "Syntax Elements · Lesson 05",
    title: "Boolean values and conditions",
    lead: "A boolean stores one of two logical values, usually <code>true</code> or <code>false</code>. Programs use booleans in decisions, loops, validation, filters and permissions.",
    goals: ["phrase boolean names as questions", "build booleans from comparisons", "predict simple truth-table results"],
    sections: [
      {
        title: "Stored and calculated booleans",
        code: { label: "pseudocode · access rule", content: "has_key = true\ndoor_is_locked = true\ncan_open_door = has_key AND door_is_locked\n\nif can_open_door:\n    open door" },
        paragraphs: ["Names such as <code>has_key</code>, <code>is_alive</code>, and <code>can_save</code> read naturally as yes/no questions. A good name reduces the need to remember what <code>true</code> means."],
      },
      {
        title: "Comparisons create booleans",
        table: {
          headers: ["Question", "Typical expression", "Result when score is 80"],
          rows: [
            ["Is it equal?", "<code>score == 80</code>", "true"],
            ["Is it different?", "<code>score != 80</code>", "false"],
            ["Is it at least 50?", "<code>score &gt;= 50</code>", "true"],
            ["Is it below 0?", "<code>score &lt; 0</code>", "false"],
          ],
        },
        note: { title: "Equality is language-specific", body: "JavaScript has both <code>==</code> and strict <code>===</code>. Object equality and string comparison differ among languages. Learn the rule you are using." },
      },
      {
        title: "Combining boolean expressions",
        paragraphs: ["The operator <strong>NOT</strong> flips a boolean. <strong>AND</strong> requires both sides to be true and <strong>OR</strong> requires at least one. Many languages use short-circuit evaluation and may skip the right side (In this case: <strong>B</strong>) when the left already determines the result. This is useful if the value comes from a function that you don't want to run if the left side already sets the result."],
        table: {
          headers: ["A", "B", "A AND B", "A OR B"],
          rows: [["<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-false\">false</span>"], ["<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-true\">true</span>", "<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-true\">true</span>"], ["<span class=\"boolean-value is-true\">true</span>", "<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-false\">false</span>", "<span class=\"boolean-value is-true\">true</span>"], ["<span class=\"boolean-value is-true\">true</span>", "<span class=\"boolean-value is-true\">true</span>", "<span class=\"boolean-value is-true\">true</span>", "<span class=\"boolean-value is-true\">true</span>"]],
        },
      },
    ],
    challenge: { title: "Design a multiplayer rule", prompt: "Write a boolean expression for starting a match only when at least two players are ready and the server is not updating.", solution: "One conceptual answer is <code>can_start = ready_player_count >= 2 AND NOT server_is_updating</code>. The exact operator spelling depends on the language." },
    check: { question: "If hasKey is true and doorIsLocked is false, what is hasKey AND doorIsLocked?", options: ["true", "false", "a string"], answer: 1, explanation: "AND is true only when both operands are true." },
    sources,
  },
};
