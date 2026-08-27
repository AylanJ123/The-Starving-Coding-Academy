const sources = [
  { title: "Python language reference: lexical analysis", href: "https://docs.python.org/3/reference/lexical_analysis.html" },
  { title: "MDN: JavaScript grammar and types", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types" },
  { title: "Java: variables", href: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html" },
  { title: "C# type system", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/" },
  { title: "Lua 5.4: values and types", href: "https://www.lua.org/manual/5.4/manual.html#2.1" },
];

export const syntaxLessons = {
  "syntax-elements": {
    kicker: "Course 02 · Syntax Elements",
    title: "Meet the building pieces of code",
    lead: "Names, literals, keywords, operators, punctuation, and comments combine into expressions and statements. Once you can identify the pieces, unfamiliar code becomes less like a wall of symbols.",
    goals: ["label common syntax elements", "separate an expression from a statement", "read punctuation according to context"],
    sections: [
      {
        title: "Zoom in and zoom out",
        code: { label: "pseudocode · anatomy", content: "total = price * quantity\n  ┬      ┬   ┬    ┬\n name    │ operator name\n      assignment" },
        cards: [
          { title: "Identifiers", body: "Names chosen for variables, functions, classes, and other program elements." },
          { title: "Literals", body: "Values written directly, such as <code>42</code>, <code>\"mage\"</code>, or <code>true</code>." },
          { title: "Keywords", body: "Reserved words with language-defined meaning, such as <code>if</code>, <code>return</code>, or <code>class</code>." },
          { title: "Operators", body: "Symbols or words that combine, compare, assign, or transform values." },
        ],
      },
      {
        title: "Expressions produce values",
        paragraphs: ["An <strong>expression</strong> can be evaluated to a value: <code>2 + 3</code>, <code>health &lt;= 0</code>, or <code>player.name</code>. A <strong>statement</strong> performs an action in the program, such as assigning, returning, importing, or controlling a branch. Exact categories differ by language."],
        code: { label: "conceptual breakdown", content: "2 + 3                 -> 5\nhealth <= 0           -> true or false\nformat_name(\"Ari\")  -> a returned value\nscore = 2 + 3         -> assignment statement using an expression" },
      },
      {
        title: "Punctuation has jobs",
        table: {
          headers: ["Mark", "Common jobs with different rules"],
          rows: [
            ["<code>()</code>", "Call a function, group an expression, or describe parameters"],
            ["<code>{}</code>", "Mark a block or construct an object/map, depending on context"],
            ["<code>[]</code>", "Index a collection or create one in some languages"],
            ["<code>.</code>", "Access a member such as a field or method"],
            ["<code>:</code>", "Begin a Python suite, separate keys and values, annotate types, and more"],
            ["<code>;</code>", "Terminate or separate statements in many languages"],
          ],
        },
        note: { title: "Context wins", body: "A symbol can carry different meanings across languages and even within one language." },
      },
      {
        title: "Explore this course",
        links: [
          { title: "Values And Variables", body: "Give changing state a useful name.", href: "values-variables.html" },
          { title: "Primitive Values", body: "Meet numbers, text, and other basic values.", href: "primitive-values.html" },
          { title: "Strong Typing", body: "Understand what type rules protect.", href: "strong-typing.html" },
          { title: "Complex Types", body: "Group values into useful structures.", href: "complex-types.html" },
          { title: "Why Booleans Matter", body: "Turn questions into control flow.", href: "booleans.html" },
        ],
      },
    ],
    check: { question: "In the expression price * quantity, what is the asterisk doing?", options: ["Naming a variable", "Acting as an operator", "Starting a comment"], answer: 1, explanation: "Here the asterisk is the multiplication operator combining two values." },
    sources,
  },

  "values-variables": {
    kicker: "Syntax Elements · Lesson 01",
    title: "Variables give state a name",
    lead: "A variable connects a useful name to a value your program can read and, depending on the declaration, possibly replace later.",
    goals: ["distinguish a variable from its current value", "name state according to its purpose", "trace assignment from right to left"],
    sections: [
      {
        title: "A label points to a value",
        paragraphs: ["People often imagine a variable as a labeled box. That is a useful beginning, as long as you remember the real behavior depends on the language and value type. Assignment may store a value, a reference to an object, or something optimized under the hood."],
        code: { label: "pseudocode · state changes", content: "score = 10\nscore = score + 5\nSHOW score  # 15" },
        note: { title: "Read assignment right to left", body: "First evaluate <code>score + 5</code> using the old value. Then assign the result back to <code>score</code>. Assignment is not the same relationship as algebraic equality." },
      },
      {
        title: "Names should reveal intention",
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
    challenge: { title: "Trace without running", prompt: "What are the final values of coins and potions?", code: { label: "pseudocode", content: "coins = 12\npotions = 2\ncoins = coins - 5\npotions = potions + 1\ncoins = coins + 3" }, solution: "coins is 10 and potions is 3. Trace one assignment at a time instead of trying to hold the entire program in your head." },
    check: { question: "After score = score + 10, what happened?", options: ["The name score was added to itself.", "The old score helped calculate a new value, which was assigned to score.", "The statement is impossible because a value cannot equal itself plus ten."], answer: 1, explanation: "Programming assignment updates state. Algebraic equality describes a different relationship." },
    sources,
  },

  comments: {
    kicker: "Syntax Elements · Side Quest",
    title: "Comments explain the reason",
    lead: "Comments are text intended for humans and ignored as program instructions. The best ones preserve context the code cannot express clearly by itself.",
    goals: ["write a useful reason-focused comment", "recognize common comment syntax", "avoid using comments to rescue confusing code"],
    sections: [
      {
        title: "Comment syntax differs",
        table: {
          headers: ["Language", "Single-line", "Block / multiline option"],
          rows: [
            ["Python", "<code># note</code>", "No special general block-comment token. Consecutive <code>#</code> lines are normal"],
            ["JavaScript / Java / C# / C++", "<code>// note</code>", "<code>/* note */</code>"],
            ["Lua", "<code>-- note</code>", "<code>--[[ note ]]</code>"],
          ],
        },
      },
      {
        title: "Useful comments preserve missing context",
        code: { label: "comment quality", content: "# Weak: subtract five from speed\nspeed = speed - 5\n\n# Stronger: swamp terrain applies a flat penalty after equipment bonuses.\nspeed = speed - 5" },
        bullets: ["Explain a surprising business or game rule.", "Record why an obvious-looking alternative was rejected.", "Warn about a dependency or consequence that is not locally visible.", "Document a public function's contract using the language's documentation conventions."],
      },
      {
        title: "Delete stale commentary",
        paragraphs: ["A false comment is worse than no comment because readers may trust it. When behavior changes, update nearby explanations. If a better name or smaller function can make the code obvious, prefer improving the code."],
        note: { title: "Version control stores old code", body: "Remove large chunks of dead commented code. Version control already remembers earlier versions." },
      },
    ],
    challenge: { title: "Rewrite the commentary", prompt: "Improve this comment: <code>// checks if the player can enter</code> above a rule requiring level 12.", solution: "Example: <code>// The tournament unlocks at level 12 so new players finish the movement tutorial first.</code> It explains why the threshold exists." },
    check: { question: "Which comment adds the most value above lives -= 1?", options: ["Subtract one from lives.", "Boss retries consume a life even when the player disconnects, by design.", "This is code."], answer: 1, explanation: "It records a non-obvious rule and prevents a future maintainer from “fixing” intentional behavior." },
    sources,
  },

  "primitive-values": {
    kicker: "Syntax Elements · Lesson 02",
    title: "Programs turn experience into values",
    lead: "A score becomes a number, a username becomes text, and a door state becomes true or false. Languages group these basic values into types with defined operations.",
    goals: ["choose a suitable basic type for a value", "explain why numeric types are not interchangeable", "recognize null-like absence"],
    sections: [
      {
        title: "Common basic categories",
        cards: [
          { title: "Integers", body: "Whole numbers such as lives, item counts, and grid coordinates." },
          { title: "Floating-point numbers", body: "Approximations for values with fractional parts, such as time or velocity." },
          { title: "Booleans", body: "Two logical states that usually appear as true and false and support decisions." },
          { title: "Characters and strings", body: "A character is one textual unit in some type systems. Strings represent sequences of text." },
          { title: "Null-like values", body: "Markers such as <code>null</code>, <code>None</code>, or <code>nil</code> can represent absence, with different rules." },
        ],
      },
      {
        title: "The type determines legal operations",
        code: { label: "values that look similar", content: "2 + 3        -> usually 5\n\"2\" + \"3\"    -> often \"23\"\n\"2\" + 3      -> error or conversion, depending on the language\ntrue + 1     -> language-specific and usually a bad idea" },
        paragraphs: ["The characters <code>\"42\"</code> are text, not automatically the numeric value 42. User input often arrives as text and must be validated before numeric calculations."],
      },
      {
        title: "Numbers have limits",
        paragraphs: [
          "Fixed-size integer types have minimum and maximum values. Floating-point values represent a large range but cannot exactly represent every decimal fraction. This is why repeated calculations with values such as 0.1 may show tiny rounding differences.",
          "Choose types according to the required range and precision. Money, physics, animation, and enormous counters may need different strategies.",
        ],
        note: { title: "Language warning", body: "Python integers can grow beyond fixed machine-word sizes subject to memory, while JavaScript's ordinary <code>Number</code> uses floating-point for most numeric work. Java, C#, C++, and Lua expose their own numeric models. Never assume one rule fits all six." },
      },
    ],
    challenge: { title: "Model an inventory item", prompt: "Choose basic value categories for item name, stack count, weight, equipped state, and an optional custom nickname.", solution: "A reasonable model is string, integer, floating-point number, boolean, and a nullable/optional string. Exact type names depend on the language." },
    check: { question: "Why should text input '12' be converted before arithmetic?", options: ["Quotes make it a string rather than a numeric value.", "Computers cannot display twelve.", "All input is permanently unusable."], answer: 0, explanation: "A string supports text operations. Validate and convert it before treating it as a number." },
    sources,
  },

  "strong-typing": {
    kicker: "Syntax Elements · Lesson 03",
    title: "Type rules decide which combinations make sense",
    lead: "“Strong” and “weak” typing are informal labels, not one precise ranking. The useful questions are when types are checked, what converts automatically, and which invalid operations are rejected.",
    goals: ["separate static typing from dynamic typing", "avoid treating strong and static as synonyms", "explain what a type error protects"],
    sections: [
      {
        title: "Two different axes",
        table: {
          headers: ["Question", "Common terms", "Meaning"],
          rows: [
            ["When are types checked?", "Static vs. dynamic", "Primarily before execution versus while the program runs"],
            ["How freely are unlike types mixed?", "Often called strong vs. weak", "How much implicit conversion or coercion the language permits"],
            ["Must the programmer spell types?", "Explicit vs. inferred", "Whether annotations are written or derived by tooling/compiler"],
          ],
        },
        note: { title: "Vocabulary trap", body: "A language can infer types and still check them statically. A dynamically typed language still has types. The values carry them at runtime." },
      },
      {
        title: "Compare the moment of failure",
        code: { label: "conceptual examples", content: "# Python: allowed to start; fails at this operation at runtime\ncoins = 10\ncoins = coins + \"5\"\n\n// C#: rejected before a normal run\nint coins = 10;\ncoins = coins + \"5\";" },
        paragraphs: ["Early rejection can prevent an invalid program from shipping. Runtime flexibility can make exploratory code concise. Neither removes the need to design clear data and test behavior."],
      },
      {
        title: "Conversion should communicate intention",
        code: { label: "Python · explicit conversion", content: "raw_age = input(\"Age: \")\ntry:\n    age = int(raw_age)\nexcept ValueError:\n    print(\"Please enter a whole number.\")" },
        paragraphs: ["Explicit conversion creates a visible boundary where invalid data can be handled. Silent coercion may be convenient, but it can also conceal mistakes such as joining text when you intended addition."],
      },
    ],
    challenge: { title: "Ask better type questions", prompt: "Instead of asking “Is JavaScript weakly typed?”, write two specific questions that would help you predict a behavior.", solution: "Examples: “Does JavaScript implicitly convert an operand when a string is used with +?” and “When does an invalid property access fail?” Specific behavior is more useful than arguing over an informal label." },
    check: { question: "Which statement is accurate?", options: ["Dynamically typed languages have no types.", "Static typing always requires every type to be written explicitly.", "Static and dynamic describe when checking occurs. Explicit and inferred describe how type information is supplied."], answer: 2, explanation: "These terms describe separate design choices that can appear in different combinations." },
    sources,
  },

  "complex-types": {
    kicker: "Syntax Elements · Lesson 04",
    title: "Complex types keep related data together",
    lead: "Real programs need more than isolated numbers and strings. Collections, records, objects, and functions let you represent groups, relationships, and reusable behavior.",
    goals: ["choose between a sequence and a key-value structure", "describe value versus reference behavior cautiously", "recognize functions as values where supported"],
    sections: [
      {
        title: "Shape the data around the problem",
        cards: [
          { title: "Sequence / array / list", body: "An ordered collection: inventory slots, quest steps, or recent messages." },
          { title: "Map / dictionary / table", body: "Values found by keys: item ID to price, username to profile, setting name to value." },
          { title: "Record / object", body: "Related named properties describing one thing, such as a player profile." },
          { title: "Set", body: "A collection focused on unique membership, such as unlocked achievements." },
          { title: "Function value", body: "In many languages, a function can be stored, passed, and invoked later." },
        ],
      },
      {
        title: "The same model in different languages",
        code: { label: "Python and JavaScript", content: "# Python dictionary\nplayer = {\"name\": \"Kai\", \"health\": 100}\nplayer[\"health\"] -= 10\n\n// JavaScript object\nconst player = { name: \"Kai\", health: 100 };\nplayer.health -= 10;" },
        paragraphs: ["These examples express a similar idea, but dictionaries and JavaScript objects are not identical. Learn the operations, equality rules, ordering guarantees, and mutation behavior of the actual structure you use."],
      },
      {
        title: "Aliases can share one object",
        code: { label: "pseudocode · two names sharing one list", content: "inventory = [\"torch\"]\nsecond_name = inventory\nADD \"key\" TO second_name\nSHOW inventory  # [\"torch\", \"key\"]" },
        paragraphs: ["Both variables refer to the same list, so mutation through either name is visible through the other. Copying and equality behave differently across languages and types. Check rather than assume."],
        note: { title: "Useful debugging question", body: "Did I create a new structure, or did I create another reference to the existing one?" },
      },
    ],
    challenge: { title: "Choose the shape", prompt: "Choose structures for: a player's ordered hotbar, the unique IDs of defeated bosses, and a lookup from item ID to item details.", solution: "A sequence for the hotbar, a set for defeated boss IDs, and a map/dictionary for item lookup are natural choices." },
    check: { question: "Which structure best answers “What data belongs to item ID 1042?”", options: ["A key-value map", "A boolean", "A comment"], answer: 0, explanation: "A map associates a lookup key with a value and is designed for this relationship." },
    sources,
  },

  booleans: {
    kicker: "Syntax Elements · Lesson 05",
    title: "Booleans turn questions into routes",
    lead: "A boolean represents one of two logical answers that usually appear as true and false. This tiny pair of values connects data to decisions, loops, validation, filters and permissions.",
    goals: ["phrase boolean names as questions", "build booleans from comparisons", "predict simple truth-table results"],
    sections: [
      {
        title: "Store facts and calculate conclusions",
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
        title: "Combine answers",
        table: {
          headers: ["A", "B", "A AND B", "A OR B"],
          rows: [["False", "False", "False", "False"], ["False", "True", "False", "True"], ["True", "False", "False", "True"], ["True", "True", "True", "True"]],
        },
        paragraphs: ["<strong>NOT</strong> flips a boolean. <strong>AND</strong> requires both sides. <strong>OR</strong> requires at least one. Many languages short-circuit: they may skip the right side when the left already determines the result."],
      },
    ],
    challenge: { title: "Design a multiplayer rule", prompt: "Write a boolean expression for starting a match only when at least two players are ready and the server is not updating.", solution: "Conceptually: <code>can_start = ready_player_count >= 2 AND NOT server_is_updating</code>. The exact operator spelling depends on the language." },
    check: { question: "If hasKey is true and doorIsLocked is false, what is hasKey AND doorIsLocked?", options: ["true", "false", "a string"], answer: 1, explanation: "AND is true only when both operands are true." },
    sources,
  },
};
