const sources = [
  { title: "Python: defining functions", href: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
  { title: "Python: classes", href: "https://docs.python.org/3/tutorial/classes.html" },
  { title: "MDN: functions", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
  { title: "Java: classes and objects", href: "https://docs.oracle.com/javase/tutorial/java/javaOO/" },
  { title: "C# object-oriented programming", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop" },
  { title: "C++ Core Guidelines", href: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines" },
];

export const structureLessons = {
  "code-structure": {
    kicker: "Course 05 · Code Structure",
    title: "Structure keeps growing programs clear",
    lead: "Blocks group steps, functions name operations, objects combine state and behavior, and files/modules create boundaries. Good structure makes change local and intention visible.",
    goals: ["recognize common levels of code organization", "explain cohesion and coupling in plain language", "choose the next useful boundary"],
    sections: [
      {
        title: "From smallest to larger",
        cards: [
          { title: "Expression", body: "Produces a value, such as <code>base_damage * multiplier</code>." },
          { title: "Statement", body: "Performs an action, such as assignment or return." },
          { title: "Block / scope", body: "Groups statements under a decision, loop, function, or other construct." },
          { title: "Function", body: "Names a reusable operation with inputs and possible output." },
          { title: "Object / type", body: "Models a concept through related state, behavior, and rules." },
          { title: "Module / package", body: "Organizes related public capabilities and hides implementation details." },
        ],
      },
      {
        title: "Put things together for a reason",
        paragraphs: ["<strong>Cohesion</strong> means the code inside a unit belongs together. <strong>Coupling</strong> describes how strongly units depend on each other's details. Aim for focused units with small, clear connections."],
        code: { label: "pseudocode · responsibilities", content: "player.take_damage(amount)       # player health rule\ninventory.add(item)              # item storage rule\nsave_system.save(game_state)     # persistence boundary\nui.show_damage(amount)           # presentation" },
        note: { title: "Split code by responsibility", body: "A short function can still mix unrelated responsibilities. A longer function can sometimes describe one coherent operation. Structure follows reasons to change." },
      },
      {
        title: "Follow the structure trail",
        links: [
          { title: "Scope And Code Blocks", body: "Control where names and steps belong.", href: "scope-code-blocks.html" },
          { title: "Functions", body: "Name and reuse behavior.", href: "functions.html" },
          { title: "Objects", body: "Connect state to meaningful behavior.", href: "objects.html" },
          { title: "Dot Notation", body: "Navigate members and namespaces.", href: "dot-notation.html" },
          { title: "Parentheses", body: "Recognize grouping, calls, and declarations.", href: "parentheses.html" },
        ],
      },
    ],
    check: { question: "Which change improves cohesion?", options: ["Put saving, combat, and UI drawing into one function.", "Keep damage rules together and call a separate UI function for presentation.", "Place every statement in its own file."], answer: 1, explanation: "Each unit has a clearer reason to change and communicates through a small connection." },
    sources,
  },

  "scope-code-blocks": {
    kicker: "Code Structure · Lesson 01",
    title: "Scope controls who can see a name",
    lead: "Code blocks group instructions. Scopes control where declared names can be used. The two concepts often overlap, but languages define their relationship differently.",
    goals: ["trace a name to its declaration", "explain local versus wider scope", "avoid accidental shadowing and leaked state"],
    sections: [
      {
        title: "A boundary for names",
        code: { label: "Python · function-local name", content: "def open_chest():\n    loot = \"moon key\"\n    print(loot)  # visible here\n\nopen_chest()\nprint(loot)      # NameError: not visible here" },
        paragraphs: ["Local variables reduce accidental interference. If every part of a program could change every name, understanding one feature would require understanding the entire program."],
      },
      {
        title: "Blocks differ by language",
        table: {
          headers: ["Language family", "Typical block marker", "Important scope note"],
          rows: [
            ["Python", "Indentation after a colon", "Functions, classes and modules create important scopes. An <code>if</code> block does not create a separate local scope"],
            ["JavaScript", "Braces", "<code>let</code> and <code>const</code> are block-scoped. <code>var</code> is function-scoped"],
            ["Java / C# / C++", "Braces", "Local declarations are generally limited by their enclosing block"],
            ["Lua", "Keywords such as <code>then</code>/<code>do</code> and <code>end</code>", "Use <code>local</code> to avoid unintended global names"],
          ],
        },
      },
      {
        title: "Shadowing hides an outer name",
        code: { label: "JavaScript · two different scores", content: "const score = 10;\n\nif (true) {\n  const score = 99;\n  console.log(score); // 99\n}\n\nconsole.log(score);   // 10" },
        paragraphs: ["Shadowing can be intentional but often makes readers wonder which variable is active. Prefer distinct, purpose-based names when two states mean different things."],
        note: { title: "Small scope reduces mystery", body: "Declare a name in the narrowest scope that still serves its job. Wider scope creates more possible writers and readers." },
      },
    ],
    challenge: { title: "Predict visibility", prompt: "In the JavaScript example, rename the inner score to bossScore and predict both printed values.", solution: "The inner log prints 99 through bossScore. The outer log still prints 10 through score. The names now expose that these are different concepts." },
    check: { question: "Why prefer local state when practical?", options: ["It limits the code that can depend on or change the value.", "Local variables use no memory.", "Global variables are invalid in every language."], answer: 0, explanation: "Narrow scope reduces the number of interactions you must reason about." },
    sources,
  },

  functions: {
    kicker: "Code Structure · Lesson 02",
    title: "Functions turn a procedure into a tool",
    lead: "A function gives a block of behavior a name, defines what it needs, and may send a result back. Good functions reduce duplication while making the program read closer to its intention.",
    goals: ["describe a function's contract", "separate calling from defining", "choose a focused function responsibility"],
    sections: [
      {
        title: "Definition versus call",
        code: { label: "pseudocode · definition and call", content: "FUNCTION calculate_damage(attack, defense)\n    RETURN maximum(1, attack - defense)\n\ndamage = calculate_damage(12, 7)\nSHOW damage  # 5" },
        paragraphs: ["The definition describes what should happen when called. The call evaluates arguments, transfers control into the function, and receives the returned value."],
      },
      {
        title: "Think in contracts",
        cards: [
          { title: "Name", body: "A verb or question that states the operation: <code>calculate_damage</code>, <code>save_game</code>, <code>is_valid</code>." },
          { title: "Inputs", body: "Parameters and any documented state the function reads." },
          { title: "Output", body: "A return value, or no returned result where appropriate." },
          { title: "Effects", body: "State changes, output, file/network access, or other observable consequences." },
          { title: "Failures", body: "Invalid inputs and environmental problems callers must handle." },
        ],
      },
      {
        title: "A function should earn its name",
        code: { label: "pseudocode · one surprising function", content: "function calculate_total(cart):\n    save_cart_to_database(cart)\n    send_marketing_email(cart.owner)\n    play_checkout_sound()\n    return sum_prices(cart)" },
        paragraphs: ["A function called <code>calculate_total</code> should not quietly send email or save data. Hidden side effects make tests and reuse dangerous. Either separate the jobs or give the orchestration a truthful name."],
        note: { title: "Duplication is a signal", body: "Two similar lines may later diverge. Extract a function when the shared operation has a stable meaning." },
      },
      {
        title: "Function deep dives",
        links: [
          { title: "Parameters And Arguments", body: "Design the information crossing in.", href: "parameters-arguments.html" },
          { title: "Return Values", body: "Send a useful result back.", href: "return-values.html" },
          { title: "Lambdas", body: "Use small anonymous function values.", href: "lambdas.html" },
        ],
      },
    ],
    challenge: { title: "Extract a rule", prompt: "Name and describe a function that decides whether a player may fast-travel. Inputs: inCombat, destinationUnlocked, and enoughFuel.", solution: "Example contract: <code>can_fast_travel(in_combat, destination_unlocked, has_enough_fuel) -> boolean</code>. It returns true when the player is outside combat and both other conditions are true. Fuel spending belongs to a separate effect." },
    check: { question: "What should calculate_tax ideally return?", options: ["A calculated tax value", "An unrelated saved file", "A hidden email"], answer: 0, explanation: "The name promises a calculation. Keeping the contract focused makes it predictable and reusable." },
    sources,
  },

  "parameters-arguments": {
    kicker: "Functions · Lesson 01",
    title: "Parameters define the slots that arguments fill",
    lead: "A parameter belongs to a function definition. An argument is the actual expression supplied for a particular call. Designing that boundary is designing how other code uses your function.",
    goals: ["use parameter and argument precisely", "choose positional or named arguments thoughtfully", "avoid mysterious boolean parameters"],
    sections: [
      {
        title: "The menu and the order",
        code: { label: "pseudocode · terminology", content: "FUNCTION spawn_enemy(kind, level = 1)\n    ...\n\nspawn_enemy(\"slime\", 4)\n# \"slime\" and 4 are arguments\n\nspawn_enemy(kind = \"bat\", level = 2)" },
        paragraphs: ["Default parameters make common calls shorter. Named/keyword arguments can clarify meaning and reduce order mistakes where supported."],
      },
      {
        title: "Design arguments readers can understand",
        code: { label: "ambiguous versus explicit", content: "// What do true and false mean?\ncreateMatch(8, true, false);\n\n// An options object makes call-site meaning visible.\ncreateMatch({\n  maxPlayers: 8,\n  ranked: true,\n  allowSpectators: false\n});" },
        paragraphs: ["Long positional lists and unexplained booleans are a warning. Named arguments, enums, a configuration object or separate functions can make the call clearer."],
      },
      {
        title: "Passing behavior depends on the value",
        paragraphs: ["Languages pass arguments according to their own model. A function may receive a copied value or a copied reference-like value that still points to a shared mutable object. The phrase “passed by reference” is often used loosely, so learn the precise behavior of your language."],
        code: { label: "pseudocode · mutation is visible", content: "FUNCTION add_key(items)\n    ADD \"key\" TO items\n\ninventory = [\"torch\"]\nadd_key(inventory)\nSHOW inventory  # [\"torch\", \"key\"]" },
        note: { title: "Make mutation part of the contract", body: "Callers should not have to discover by accident that a function changes an object they supplied." },
      },
    ],
    challenge: { title: "Improve a signature", prompt: "Redesign <code>send(message, true, 3, false)</code> so a reader can tell what each setting means.", solution: "Possible JavaScript call: <code>send(message, { urgent: true, retries: 3, silent: false })</code>. In C# or Python, named arguments may also solve the clarity problem." },
    check: { question: "In greet('Nova'), what is 'Nova'?", options: ["A parameter", "An argument", "A return statement"], answer: 1, explanation: "The definition declares parameters. A call supplies arguments." },
    sources,
  },

  "return-values": {
    kicker: "Functions · Lesson 02",
    title: "Return sends a result and ends the call",
    lead: "A return value lets a function calculate or choose something without deciding how every caller will use it. Returning early can also reject invalid situations before the main path becomes deeply nested.",
    goals: ["capture and use returned values", "distinguish return from print", "use guard clauses responsibly"],
    sections: [
      {
        title: "Printing and returning serve different jobs",
        code: { label: "pseudocode · reusable result", content: "FUNCTION double(number)\n    RETURN number * 2\n\nresult = double(6)\nSHOW result       # display is the caller's choice\ncoins = result + 3" },
        paragraphs: ["A print function creates output for a person or log. A return hands a value to the calling code. A function may do both, but they are different effects."],
      },
      {
        title: "Return exits the current function",
        code: { label: "pseudocode · guard clauses", content: "FUNCTION join_match(player)\n    IF player.is_banned\n        RETURN false\n    IF NOT player.is_connected\n        RETURN false\n\n    add_to_match(player)\n    RETURN true" },
        paragraphs: ["Early returns handle exceptional or disqualifying cases, leaving the successful path less indented. Too many scattered exits can still be hard to trace, so use them to clarify major branches."],
      },
      {
        title: "Design one coherent result",
        paragraphs: ["A function can return a boolean, value, object, collection, optional result, error-aware result type, or other language-specific form. When callers need related pieces, return a meaningful structure rather than relying on hidden globals."],
        code: { label: "pseudocode · explicit outcome", content: "result = buy_item(player, item)\n\nif result.succeeded:\n    show(result.receipt)\nelse:\n    show_error(result.reason)" },
        note: { title: "Absence needs a policy", body: "If a search finds nothing, decide whether to return a null-like/optional value, an empty collection, a result object, or raise/throw. Document the contract." },
      },
    ],
    challenge: { title: "Convert output into a result", prompt: "A function currently prints whether a username is valid. Change its contract so a web page and console app can both reuse it.", solution: "Make <code>is_username_valid(name)</code> return a boolean, or return a validation result containing success and an error reason. Each interface can decide how to display that result." },
    check: { question: "Why return damage instead of printing it inside calculate_damage?", options: ["The caller can reuse the value for health, UI, logs, or tests.", "Printing is illegal inside functions.", "Return automatically saves a file."], answer: 0, explanation: "Returning separates the calculation from the many possible uses of its result." },
    sources,
  },

  lambdas: {
    kicker: "Functions · Lesson 03",
    title: "Lambdas are functions without a permanent introduction",
    lead: "Anonymous functions are useful when behavior is small, local and passed somewhere else as a sort key, event handler, filter or callback.",
    goals: ["recognize anonymous function syntax", "explain a callback", "know when to replace a lambda with a named function"],
    sections: [
      {
        title: "Behavior can be a value",
        code: { label: "three small function values", content: "# Python\ndouble = lambda n: n * 2\n\n// JavaScript\nconst double = (n) => n * 2;\n\n// C#\nFunc<int, int> double = n => n * 2;" },
        paragraphs: ["The exact capabilities differ. Python lambdas are limited to a single expression. Other languages have their own syntax, type rules and capture behavior."],
      },
      {
        title: "Tell another operation what to do",
        code: { label: "Python · sort and filter", content: "players = [\n    {\"name\": \"Bo\", \"score\": 8},\n    {\"name\": \"Ira\", \"score\": 15},\n]\n\nranked = sorted(players, key=lambda p: p[\"score\"], reverse=True)\nwinners = list(filter(lambda p: p[\"score\"] >= 10, players))" },
        paragraphs: ["The higher-order operation handles traversal. The supplied function describes the changing decision such as which key to sort by or which elements to keep."],
      },
      {
        title: "Small and local is the sweet spot",
        bullets: ["Use a lambda when the behavior is short and obvious at the call site.", "Name it when the rule deserves documentation, reuse, or direct testing.", "Avoid deeply nested callbacks. Extract steps and use modern asynchronous patterns where suitable.", "Learn closures: an inner function may retain access to variables from its surrounding scope, under language-specific rules."],
        note: { title: "Anonymous functions can have consequences", body: "A lambda can mutate state, throw errors, capture variables or perform I/O. Judge it by behavior, not size alone." },
      },
    ],
    challenge: { title: "Choose a sort key", prompt: "Write a small anonymous function that extracts an enemy's distance so a sorting function can order nearest first.", solution: "Python: <code>key=lambda enemy: enemy.distance</code>. JavaScript: <code>(enemy) => enemy.distance</code>. The surrounding sort API differs." },
    check: { question: "When should a lambda usually become a named function?", options: ["When it grows complex, reusable, or independently testable.", "Whenever it contains a number.", "Anonymous functions are always cleaner.",], answer: 0, explanation: "A name and focused definition help larger behavior communicate its purpose." },
    sources,
  },

  objects: {
    kicker: "Code Structure · Lesson 03",
    title: "Objects model state and behavior",
    lead: "An object usually has identity, data, and operations. A class often defines the shape and behavior used to create objects, though object systems vary substantially between languages.",
    goals: ["distinguish a class from an instance", "place a rule near the state it protects", "avoid treating objects as universal real-world copies"],
    sections: [
      {
        title: "Blueprint and instance",
        code: { label: "pseudocode · a tiny class", content: "CLASS Player\n    FIELD name\n    FIELD health = 100\n\n    METHOD take_damage(amount)\n        health = maximum(0, health - amount)\n\nmina = NEW Player(\"Mina\")\nmina.take_damage(12)" },
        paragraphs: ["<code>Player</code> is the class. <code>mina</code> refers to one instance with its own current state. The method enforces the rule that health does not fall below zero."],
      },
      {
        title: "Objects are a design tool",
        cards: [
          { title: "State", body: "What the object currently knows: health, name, position, or connection status." },
          { title: "Behavior", body: "What it can do or answer: take damage, move, save, or report validity." },
          { title: "Invariant", body: "A rule that should remain true, such as health staying between zero and maximum." },
          { title: "Identity", body: "Two objects may contain equal data while still representing different entities." },
        ],
      },
      {
        title: "Choose objects when they help",
        paragraphs: ["A plain value, collection, record or function may express a problem more directly. Use an object when keeping state and rules together improves the model. Nouns do not automatically demand classes."],
        note: { title: "Language warning", body: "Java and C# are class-centered. JavaScript uses prototype-based objects with class syntax layered on top. Lua tables can support several programming styles. C++ has value semantics and resource-management concerns that make direct analogies incomplete." },
      },
      {
        title: "Object deep dives",
        links: [
          { title: "Fields", body: "Store an object's state responsibly.", href: "fields.html" },
          { title: "Methods", body: "Give objects meaningful behavior.", href: "methods.html" },
          { title: "Dot Notation", body: "Access members without mystery.", href: "dot-notation.html" },
        ],
      },
    ],
    challenge: { title: "Protect an invariant", prompt: "Design a takeHealing method for a player whose health must stay from 0 through maxHealth.", solution: "Set health to the smaller of maxHealth and health + a validated nonnegative amount. Decide and document what negative healing means rather than accidentally turning it into damage." },
    check: { question: "What is mina after mina = Player('Mina')?", options: ["The Player class itself", "A Player instance", "A comment"], answer: 1, explanation: "The class defines a kind of object. Construction creates a particular instance." },
    sources,
  },

  fields: {
    kicker: "Objects · Lesson 01",
    title: "Fields hold the state an object owns",
    lead: "Fields are also called attributes, properties or data members in different contexts. They store information associated with an object or type. Visibility and mutation rules help protect that state.",
    goals: ["recognize instance and class/static state", "explain encapsulation", "avoid exposing mutable internals carelessly"],
    sections: [
      {
        title: "Instance state belongs to one object",
        code: { label: "pseudocode · protected player state", content: "CLASS Player\n    PRIVATE FIELD health = 100\n    READABLE PROPERTY name\n    READABLE PROPERTY health\n\n    CONSTRUCTOR Player(starting_name)\n        name = starting_name" },
        paragraphs: ["Each <code>Player</code> instance has its own name and health. The private field can change only through code inside the class, while public read access exposes the current value."],
      },
      {
        title: "Shared state belongs to the type",
        paragraphs: ["A class/static field is shared at the type level rather than copied into every instance. It can represent constants, caches, or genuinely shared state, but mutable global-like state creates hidden coupling."],
        code: { label: "conceptual", content: "Player.species_name       # shared description\nmina.health               # Mina's current state\njorge.health              # Jorge's separate current state" },
      },
      {
        title: "Encapsulation protects rules",
        code: { label: "avoid unrestricted mutation", content: "// Fragile from anywhere\nplayer.health = -9000;\n\n// Behavior can validate and preserve the invariant\nplayer.TakeDamage(amount);" },
        paragraphs: ["Encapsulation gives each rule a clear owner and exposes the smallest interface callers need. Making everything private by ritual does not accomplish that goal."],
        note: { title: "Collections can leak mutation", body: "A read-only property returning a mutable internal list may still allow callers to change the list. Consider read-only views, copies, or controlled methods." },
      },
    ],
    challenge: { title: "Choose the owner", prompt: "For a Player, decide whether maxHealth, currentHealth, and totalOnlinePlayers are instance or shared state.", solution: "currentHealth and usually maxHealth belong to each instance. totalOnlinePlayers is shared application state and may be type-level or, often better, owned by a server/session service." },
    check: { question: "Why keep health private and expose TakeDamage?", options: ["The method can enforce valid health rules.", "Private fields cannot store numbers.", "Methods use no memory."], answer: 0, explanation: "A controlled operation centralizes validation and preserves invariants." },
    sources,
  },

  methods: {
    kicker: "Objects · Lesson 02",
    title: "Methods attach behavior to a type or object",
    lead: "A method is a function associated with an object or type. Instance methods usually operate on a particular instance. Static or class methods belong to the type-level interface.",
    goals: ["distinguish method calls from property access", "choose instance or static behavior", "write methods that preserve object rules"],
    sections: [
      {
        title: "The receiver provides context",
        code: { label: "same action, different receivers", content: "mina.take_damage(10)\nboss.take_damage(10)\n\n# The method name is the same.\n# The receiver before the dot chooses which object's state changes." },
        paragraphs: ["Inside an instance method, languages provide access to the receiving object through mechanisms such as Python's explicit <code>self</code>, JavaScript's context-sensitive <code>this</code>, or implicit instance member access in Java/C#."],
      },
      {
        title: "Queries and commands",
        cards: [
          { title: "Query", body: "Answers without intentionally changing observable state: <code>player.can_afford(item)</code>." },
          { title: "Command", body: "Requests a state change: <code>player.buy(item)</code>." },
          { title: "Factory", body: "Creates a suitable object, often through a type-level method: <code>Enemy.from_config(data)</code>." },
        ],
        paragraphs: ["Separating questions from mutations makes call sites easier to predict. Some frameworks use fluent APIs or lazy queries, so learn their documented contract."],
      },
      {
        title: "Methods should protect the object's story",
        code: { label: "pseudocode · transactional command", content: "method buy(item):\n    if item.price > coins:\n        return failure(\"Not enough coins\")\n\n    coins -= item.price\n    inventory.add(item)\n    return success()" },
        note: { title: "Avoid half-finished state", body: "If an operation changes several related values, validate first or provide a way to recover so failure does not leave the object inconsistent." },
      },
    ],
    challenge: { title: "Place three behaviors", prompt: "For Player, classify <code>takeDamage</code>, <code>isAlive</code>, and <code>createGuest</code> as command, query, or factory-like method.", solution: "takeDamage is a command, isAlive is a query, and createGuest is a factory-like type-level operation." },
    check: { question: "In boss.take_damage(10), what does boss do?", options: ["Acts as the receiving instance", "Acts as a comment", "Changes 10 into a string"], answer: 0, explanation: "The method operates in the context of the object before the dot." },
    sources,
  },

  "dot-notation": {
    kicker: "Code Structure · Lesson 04",
    title: "The dot points to a member",
    lead: "Dot notation connects a receiver or namespace to a named member. It may access a field/property, select a method, navigate a module, or begin a longer chain.",
    goals: ["read a dotted expression left to right", "distinguish selection from invocation", "debug a broken member chain"],
    sections: [
      {
        title: "Selection comes before the call",
        code: { label: "anatomy", content: "player.inventory.add(item)\n  ┬       ┬      ┬   ┬\nobject property method argument\n\nplayer.inventory.add   # select the method\nplayer.inventory.add() # invoke it" },
        paragraphs: ["The dot chooses a member from the value on its left. Parentheses then call the selected function/method. Some properties themselves compute values, so selection is not guaranteed to be free of behavior."],
      },
      {
        title: "Read a chain as a journey",
        steps: ["Evaluate <code>player</code>.", "Get that value's <code>inventory</code> member.", "Get the inventory's <code>selectedItem</code> member.", "Get the selected item's <code>name</code> member."],
        code: { label: "member chain", content: "player.inventory.selectedItem.name" },
        note: { title: "Every stop can fail", body: "If an intermediate value may be absent, use the language's null-safe features or explicit checks. A long chain can hide which relationship was missing." },
      },
      {
        title: "Dots can navigate namespaces and modules",
        table: {
          headers: ["Expression", "Possible reading"],
          rows: [
            ["<code>Math.max(a, b)</code>", "Select a max operation from a built-in math object/type"],
            ["<code>package.module.name</code>", "Navigate names organized by modules/packages"],
            ["<code>enemy.position.x</code>", "Read nested object state"],
          ],
        },
        paragraphs: ["Dot notation is common but not universal for every kind of access. Indexing, pointers/references, extension methods, static members, and metaprogramming add language-specific rules."],
      },
    ],
    challenge: { title: "Narrate a chain", prompt: "Explain <code>game.currentScene.player.respawn()</code> without using the word “thing.”", solution: "Get the game's current scene, get that scene's player, select the player's respawn method, and invoke it with no explicit arguments." },
    check: { question: "What is the difference between enemy.attack and enemy.attack()?", options: ["The first selects a member. The second also calls it.", "There is never a difference.", "The first deletes the method."], answer: 0, explanation: "Parentheses perform invocation in this common pattern." },
    sources,
  },

  parentheses: {
    kicker: "Code Structure · Lesson 05",
    title: "Parentheses control grouping and calls",
    lead: "The same curved marks perform several jobs. Read what surrounds them: an operator expression, a function name, a definition keyword, or a control-flow keyword.",
    goals: ["identify common parenthesis roles", "use grouping for clarity", "avoid confusing a function value with a function call"],
    sections: [
      {
        title: "Three jobs you will meet constantly",
        table: {
          headers: ["Pattern", "Job"],
          rows: [
            ["<code>(2 + 3) * 4</code>", "Group an expression and override normal precedence"],
            ["<code>spawn(\"slime\", 2)</code>", "Call a function with arguments"],
            ["<code>def spawn(kind, level)</code>", "Describe parameters in a definition"],
            ["<code>if (ready)</code>", "Required condition delimiters in several languages. Python does not require them"],
          ],
        },
      },
      {
        title: "Function values and function results",
        code: { label: "JavaScript", content: "button.addEventListener(\"click\", saveGame);\n// Pass the function so the browser can call it later.\n\nbutton.addEventListener(\"click\", saveGame());\n// Calls immediately and then passes its returned value." },
        paragraphs: ["When an API expects a callback, pass the function value. Add parentheses when you intend to invoke it at that moment. You can also wrap a later call in another function."],
      },
      {
        title: "Empty parentheses still communicate",
        paragraphs: ["<code>clock.now()</code> says “invoke now with no explicit arguments.” The method may still use receiver state, global or environment state, or defaults. An empty argument list can still lead to dependencies and effects."],
        code: { label: "nested calls", content: "print(format_score(calculate_score(player)))\n\n# Easier to inspect during debugging:\nraw_score = calculate_score(player)\nmessage = format_score(raw_score)\nprint(message)" },
        note: { title: "Flatten when debugging", body: "Intermediate names reveal the value at each step and make errors easier to locate." },
      },
    ],
    challenge: { title: "Function or call?", prompt: "An event system asks what to run later. Should you give it <code>openDoor</code> or <code>openDoor()</code>? Explain.", solution: "Usually give it <code>openDoor</code>, the function value. <code>openDoor()</code> invokes now and supplies the returned value unless the API explicitly expects that." },
    check: { question: "What do parentheses do in (price + tax) * quantity?", options: ["Call price", "Group addition before multiplication", "Start a comment"], answer: 1, explanation: "They explicitly change the expression grouping." },
    sources,
  },
};
