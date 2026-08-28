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
    title: "Organizing code",
    lead: "Program structure organizes code into blocks, functions, objects and modules. Each level groups related instructions, behavior or data.",
    goals: ["recognize common levels of code organization", "explain cohesion and coupling in plain language", "choose the next useful boundary"],
    sections: [
      {
        title: "Levels of code structure",
        paragraphs: ["Programs are built in layers. Each layer groups smaller pieces into a unit with a clearer job. Some problems need only a few layers. Recognizing each one helps you find where a rule belongs."],
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
        title: "Organizing by responsibility",
        paragraphs: ["Code has strong <strong>cohesion</strong> when the pieces inside it serve one related job. <strong>Coupling</strong> is how much one part needs to know about another part. Focused parts with small connections are easier to change because one feature does not reach into every other feature."],
        code: { label: "Pseudocode", content: "# Player owns the rule for changing health\nplayer.take_damage(amount)\n\n# Inventory owns item storage\ninventory.add(item)\n\n# The save system owns persistence\nsave_system.save(game_state)\n\n# The interface owns visual feedback\nui.show_damage(amount)" },
        note: { title: "Split code by responsibility", body: "A short function can still mix unrelated responsibilities. A longer function can sometimes describe one coherent operation. Structure follows reasons to change." },
      },
      {
        title: "Code structure lessons",
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
    title: "Scope and visibility",
    lead: "A code block groups instructions, while a scope defines where a declared name can be used. Languages differ in how blocks create or affect scopes.",
    goals: ["trace a name to its declaration", "explain local versus wider scope", "avoid accidental shadowing and leaked state"],
    sections: [
      {
        title: "Local and outer scope",
        code: { label: "Python", content: "def open_chest():\n    loot = \"moon key\"\n    print(loot)  # Works because loot exists inside this function\n\nopen_chest()\nprint(loot)      # NameError because loot is not visible outside" },
        paragraphs: ["Local variables reduce accidental interference. If every part of a program could change every name, understanding one feature would require understanding the entire program."],
      },
      {
        title: "Block syntax by language",
        paragraphs: ["A code block groups instructions, while a scope controls where names are visible. Some blocks create a new scope and some do not. The exact relationship depends on the language."],
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
        title: "Variable shadowing",
        code: { label: "JavaScript", content: "const score = 10;\n\nif (true) {\n  // This declaration creates a different variable with the same name\n  const score = 99;\n  console.log(score); // 99 from the inner block\n}\n\nconsole.log(score);   // 10 from the outer scope" },
        paragraphs: ["Shadowing can be intentional but often makes readers wonder which variable is active. Prefer distinct, purpose-based names when two states mean different things."],
        note: { title: "Benefits of small scope", body: "Declare a name in the narrowest scope that still serves its job. Wider scope creates more possible writers and readers." },
      },
    ],
    challenge: { title: "Predict visibility", prompt: "In the JavaScript example, rename the inner <code>score</code> to <code>bossScore</code> and predict both printed values.", solution: "The inner log prints <code>99</code> through <code>bossScore</code>. The outer log still prints <code>10</code> through <code>score</code>. The names now expose that these are different concepts." },
    check: { question: "Why prefer local state when practical?", options: ["It limits the code that can depend on or change the value.", "Local variables use no memory.", "Global variables are invalid in every language."], answer: 0, explanation: "Narrow scope reduces the number of interactions you must reason about." },
    sources,
  },

  functions: {
    kicker: "Code Structure · Lesson 02",
    title: "Defining and calling functions",
    lead: "A function gives a block of behavior a name. It can receive inputs, perform an operation and return a result to the caller.",
    goals: ["describe a function's contract", "separate calling from defining", "choose a focused function responsibility"],
    sections: [
      {
        title: "Definition versus call",
        code: { label: "Pseudocode", content: "# The definition creates the reusable operation\nFUNCTION calculate_damage(attack, defense)\n    RETURN maximum(1, attack - defense)\n\n# The call runs that operation with 12 and 7\ndamage = calculate_damage(12, 7)\nSHOW damage  # 5" },
        paragraphs: ["A function <strong>definition</strong> describes the operation and gives it a name. A function <strong>call</strong> runs that operation with specific arguments. When the function returns a value, the call can store or use that result."],
      },
      {
        title: "Function inputs outputs and effects",
        paragraphs: ["A function's <strong>contract</strong> is the promise it makes to callers. It explains what the function needs, what it returns, what it changes and how it can fail."],
        cards: [
          { title: "Name", body: "A verb or question states the operation through names such as <code>calculate_damage</code>, <code>save_game</code>, and <code>is_valid</code>." },
          { title: "Inputs", body: "Parameters and any documented state the function reads." },
          { title: "Output", body: "A return value, or no returned result where appropriate." },
          { title: "Effects", body: "State changes, output, file/network access, or other observable consequences." },
          { title: "Failures", body: "Invalid inputs and environmental problems callers must handle." },
        ],
      },
      {
        title: "Matching behavior to a function name",
        code: { label: "Pseudocode", content: "FUNCTION calculate_total(cart)\n    # These hidden effects do not match the function name\n    save_cart_to_database(cart)\n    send_marketing_email(cart.owner)\n    play_checkout_sound()\n\n    RETURN sum_prices(cart)" },
        paragraphs: ["A function called <code>calculate_total</code> should not quietly send email or save data. Hidden side effects make tests and reuse dangerous. Either separate the jobs or give the orchestration a truthful name."],
        note: { title: "Reusing repeated code", body: "Whenever two similar operations appear at different locations, consider making a function out of that code and reuse it where you took it from." },
      },
      {
        title: "Function lessons",
        links: [
          { title: "Parameters And Arguments", body: "Design the information crossing in.", href: "parameters-arguments.html" },
          { title: "Return Values", body: "Send a useful result back.", href: "return-values.html" },
          { title: "Lambdas", body: "Use small anonymous function values.", href: "lambdas.html" },
        ],
      },
    ],
    challenge: { title: "Design a function rule", prompt: "Name and describe a function that decides whether a player may fast-travel using <code>in_combat</code>, <code>destination_unlocked</code>, and <code>has_enough_fuel</code> as inputs.", solution: "One possible contract is <code>can_fast_travel(in_combat, destination_unlocked, has_enough_fuel) → boolean</code>. It returns true when the player is outside combat and both other conditions are true. Fuel spending belongs to a separate effect." },
    check: { question: "What should <code>calculate_tax</code> ideally return?", options: ["A calculated tax value", "An unrelated saved file", "A hidden email"], answer: 0, explanation: "The name promises a calculation. Keeping the contract focused makes it predictable and reusable." },
    sources,
  },

  "parameters-arguments": {
    kicker: "Functions · Lesson 01",
    title: "Parameters arguments and default values",
    lead: "Parameters define the inputs a function accepts. Arguments are the values supplied for those parameters when the function is called, and default values can make some inputs optional.",
    goals: ["use parameter and argument precisely", "recognize when an optional parameter may be omitted", "recognize when several settings may belong in an object"],
    sections: [
      {
        title: "Required and optional parameters",
        code: { label: "Pseudocode", content: "# kind and level are parameters in the definition\nFUNCTION spawn_enemy(kind, level = 1)\n    ...\n\n# \"slime\" and 4 are arguments in this call\nspawn_enemy(\"slime\", 4)\n\n# level is optional, so this call uses its default value of 1\nspawn_enemy(\"bat\")" },
        paragraphs: ["Giving <code>level</code> a default value makes it optional. A call may omit that argument, and the function uses the default instead. The required <code>kind</code> argument still has to be supplied."],
      },
      {
        title: "Configuration objects group related settings",
        code: { label: "JavaScript", content: "// Several separate arguments must be supplied in the correct order\ncreateMatch(8, true, false);\n\n// One object keeps the match settings together\ncreateMatch({\n  maxPlayers: 8,\n  ranked: true,\n  allowSpectators: false\n});" },
        paragraphs: ["Documentation can explain a function's arguments, but a long list of settings can still be difficult to use. An object made to hold configuration can group those related settings and give each value a visible label. Objects are covered later in the course, so treat this as a preview of one useful solution."],
      },
      {
        title: "Passing values and references",
        paragraphs: ["The <a href=\"strong-typing.html\">Strong Typing</a> lesson introduced references as routes to objects stored elsewhere. When a function receives a reference to a mutable object, it may be able to change the same object the caller uses. Exact argument rules differ by language, so the function should clearly document whether it mutates supplied data."],
        code: { label: "Pseudocode", content: "FUNCTION add_key(items)\n    # This changes the shared list\n    ADD \"key\" TO items\n\ninventory = [\"torch\"]\nadd_key(inventory)\n\n# The caller sees the change because both references reach one list\nSHOW inventory  # [\"torch\", \"key\"]" },
        note: { title: "Documenting mutation", body: "Callers should not have to discover by accident that a function changes an object they supplied." },
      },
    ],
    challenge: { title: "Group the settings", prompt: "Rewrite <code>send(message, true, 3, false)</code> by placing the three settings inside a configuration object.", solution: "One possible JavaScript call is <code>send(message, { urgent: true, retries: 3, silent: false })</code>. The object keeps the settings together and labels what each value controls." },
    check: { question: "In <code>greet(\"Nova\")</code> what is <code>\"Nova\"</code>?", options: ["A parameter", "An argument", "A return statement"], answer: 1, explanation: "The definition declares parameters. A call supplies arguments." },
    sources,
  },

  "return-values": {
    kicker: "Functions · Lesson 02",
    title: "Returning values from functions",
    lead: "A return value sends a result from a function back to its caller. A function can also return early when a requirement fails or its work is already complete.",
    goals: ["capture and use returned values", "distinguish return from print", "use guard clauses responsibly"],
    sections: [
      {
        title: "Printing and returning",
        code: { label: "Pseudocode", content: "FUNCTION double(number)\n    # Return gives the calculated value back to the caller\n    RETURN number * 2\n\nresult = double(6)\n\n# The caller decides how to use the result\nSHOW result\ncoins = result + 3" },
        paragraphs: ["A print function creates output for a person or log. A return hands a value to the calling code. A function may do both, but they are different effects."],
      },
      {
        title: "Return exits the current function",
        code: { label: "Pseudocode", content: "FUNCTION join_match(player)\n    # Each guard clause stops an invalid request immediately\n    IF player.is_banned\n        RETURN false\n    IF NOT player.is_connected\n        RETURN false\n\n    # This path runs only after every guard passes\n    add_to_match(player)\n    RETURN true" },
        paragraphs: ["A <strong>guard clause</strong> checks a condition near the start of a function and returns early when the function should not continue. This keeps the successful path from becoming buried under several levels of indentation."],
      },
      {
        title: "Returning result objects",
        paragraphs: ["Return values and objects are closely related. Here, <code>result</code> is an object returned by <code>buy_item</code>. Its <code>succeeded</code>, <code>receipt</code>, and <code>reason</code> fields let the caller check what happened and use the matching information. Objects and their fields are explained in detail later in the course."],
        code: { label: "Pseudocode", content: "result = buy_item(player, item)\n\n# result is an object with succeeded, receipt, and reason fields\nIF result.succeeded\n    SHOW result.receipt\nELSE\n    SHOW result.reason" },
        note: { title: "Returning no result", body: "If a search finds nothing, decide whether the function returns nothing, an empty collection, a result object, or an error. Document that choice so other people, and you months later, can understand what the code promises." },
      },
    ],
    challenge: { title: "Return a reusable result", prompt: "A function currently prints whether a username is valid. Change its contract so a web page and console app can both reuse it.", solution: "Make <code>is_username_valid(name)</code> return a boolean, or return a validation result containing success and an error reason. Each interface can decide how to display that result." },
    check: { question: "Why return damage instead of printing it inside <code>calculate_damage</code>?", options: ["The caller can reuse the value for health, UI, logs, or tests.", "Printing is illegal inside functions.", "Return automatically saves a file."], answer: 0, explanation: "Returning separates the calculation from the many possible uses of its result." },
    sources,
  },

  lambdas: {
    kicker: "Functions · Lesson 03",
    title: "Anonymous functions and callbacks",
    lead: "A lambda defines an anonymous function inside an expression. Lambdas commonly provide short callbacks for sorting, filtering and event handling.",
    goals: ["recognize anonymous function syntax", "explain a callback", "know when to replace a lambda with a named function"],
    sections: [
      {
        title: "Functions as values",
        code: { label: "Multilanguage", highlighter: "multilanguage", content: "/#/ Python\ndouble = lambda number: number * 2\n\n/#/ JavaScript\nconst double = (number) => number * 2;\n\n/#/ C#\nFunc<int, int> double = number => number * 2;" },
        paragraphs: ["A function can be stored in a variable and passed to other code like another value. Each example creates a function named <code>double</code> that accepts one number and returns twice that number. Python limits a lambda to one expression, while other languages define their own rules."],
      },
      {
        title: "Callbacks for sorting and filtering",
        code: { label: "JavaScript", content: "const players = [\n  { name: \"Bo\", score: 8 },\n  { name: \"Ira\", score: 15 }\n];\n\n// A positive result moves playerB before playerA\n// This function judges who is higher by substracting, respect the order\nconst ranked = players.toSorted((playerA, playerB) => playerB.score - playerA.score);\n\n// Keep only players whose score is at least 10\nconst winners = players.filter((player) => player.score >= 10);" },
        paragraphs: ["A <strong>callback</strong> is a function given to another operation so it can run that behavior. Here <code>toSorted</code> uses one callback to decide the order, while <code>filter</code> uses another callback to decide which players remain."],
      },
      {
        title: "When to use a lambda",
        bullets: ["Use a lambda when the behavior is short and obvious where it appears.", "Create a named function when the rule needs documentation, reuse, or direct testing.", "Avoid stacking several anonymous functions inside each other because the route becomes difficult to follow.", "Remember that a lambda may use variables from the surrounding scope according to the language's closure rules."],
        note: { title: "Captured values can stay in memory", body: "When a lambda uses values from its surrounding scope, it forms a closure and may keep those values in memory for as long as the callback can still run. If reopening a menu registers new callbacks without removing the old ones, old menus and their captured data can remain alive. This memory leak can make each visit increasingly slow." },
      },
    ],
    challenge: { title: "Choose a sort key", prompt: "Write a small anonymous function that extracts an enemy's distance so a sorting function can order nearest first.", solution: "Python can use <code>key=lambda enemy: enemy.distance</code>. JavaScript can use <code>(enemy) => enemy.distance</code>. The surrounding sort API differs." },
    check: { question: "When should a lambda usually become a named function?", options: ["When it grows complex, reusable, or independently testable.", "Whenever it contains a number.", "Anonymous functions are always cleaner.",], answer: 0, explanation: "A name and focused definition help larger behavior communicate its purpose." },
    sources,
  },

  objects: {
    kicker: "Code Structure · Lesson 03",
    title: "Classes objects and instances",
    lead: "An object groups data with operations that use or change that data. In class-based languages, a class defines the fields and methods available to its instances.",
    goals: ["distinguish a class from an instance", "group related state and behavior", "recognize object identity and relationships"],
    sections: [
      {
        title: "Classes and instances",
        code: { label: "Pseudocode", content: "# The class describes what every Player contains and can do\nCLASS Player\n    FIELD name\n    FIELD health\n\n    CONSTRUCTOR Player(starting_name)\n        # The value passed to NEW Player becomes this instance's name\n        name = starting_name\n        health = 100\n\n    METHOD take_damage(amount)\n        # Health is never allowed below zero\n        health = maximum(0, health - amount)\n\n# mina is one Player instance with its own state\nmina = NEW Player(\"Mina\")\nmina.take_damage(12)" },
        paragraphs: ["A <strong>class</strong> describes a kind of object. An <strong>instance</strong> is one object created from that description. The constructor runs when <code>NEW Player(\"Mina\")</code> creates <code>mina</code>. It receives <code>\"Mina\"</code> as <code>starting_name</code> and stores it in the new object's <code>name</code> field."],
      },
      {
        title: "What an object contains",
        paragraphs: ["Objects are useful when a concept has related information and rules that should move together. These four ideas help explain what an object represents."],
        cards: [
          { title: "State", body: "The object currently knows its health, name, position, or connection status." },
          { title: "Behavior", body: "The object can take damage, move, save, or report validity." },
          { title: "Relationships", body: "The object can refer to other objects, such as a player holding an inventory or belonging to a team." },
          { title: "Identity", body: "Two objects may contain equal data while still representing different entities." },
        ],
      },
      {
        title: "When to use objects",
        paragraphs: ["A plain value, collection, record or function may express a problem more directly. Use an object when keeping state and rules together improves the model. Nouns do not automatically demand classes."],
        note: { title: "Object-oriented programming", body: "Object-oriented programming, usually called OOP, organizes code around objects and classes. A class-centered style creates most objects from class definitions. This lesson mainly uses the familiar class approach found in Java, C#, and Python. JavaScript, Lua, C++, and other languages can organize objects differently, but the basic ideas still transfer." },
      },
      {
        title: "Object lessons",
        links: [
          { title: "Fields", body: "Store an object's state responsibly.", href: "fields.html" },
          { title: "Methods", body: "Give objects meaningful behavior.", href: "methods.html" },
          { title: "Dot Notation", body: "Access members without mystery.", href: "dot-notation.html" },
        ],
      },
    ],
    challenge: { title: "Heal without exceeding the maximum", prompt: "Write a <code>takeHealing(amount)</code> method that adds <code>amount</code> to the player's <code>health</code> without letting it rise above <code>maxHealth</code>.", solution: "Set <code>health</code> to <code>minimum(maxHealth, health + amount)</code>. The player receives the healing, while the minimum function prevents extra healing from raising health too far." },
    check: { question: "What is <code>mina</code> after <code>mina = Player(\"Mina\")</code>?", options: ["The Player class itself", "A Player instance", "A comment"], answer: 1, explanation: "The class defines a kind of object. Construction creates a particular instance." },
    sources,
  },

  fields: {
    kicker: "Objects · Lesson 01",
    title: "Object fields and state",
    lead: "Fields store information that belongs to an object or type. Languages may call them fields, attributes, properties or data members and provide different access rules for them.",
    goals: ["recognize instance and class/static state", "explain encapsulation", "avoid exposing mutable internals carelessly"],
    sections: [
      {
        title: "Instance fields",
        code: { label: "Pseudocode", content: "CLASS Player\n    # Outside code can read the exposed properties but cannot change them directly\n    PRIVATE FIELD _health = 100\n    PRIVATE FIELD _name = \"\"\n    READABLE PROPERTY Health\n    READABLE PROPERTY Name\n\n    CONSTRUCTOR Player(starting_name)\n        _name = starting_name\n        _health = 100" },
        paragraphs: ["Every <code>Player</code> instance has its own name and health. Outside code can read the public properties, while methods inside the class control changes to the private health field."],
      },
      {
        title: "Static and shared fields",
        paragraphs: ["An instance field belongs to one object. A class or static field belongs to the type itself and is shared rather than copied into every instance. Shared fields can hold constants or truly shared information, but unnecessary shared state lets distant code affect everyone at once."],
        code: { label: "Pseudocode", content: "# One description shared by the Human type\n# This field used a special keyword to be static\nHuman.species_name\n\n# Separate health stored by each instance\n# Both Mina and Jorge are Humans\nmina.health\njorge.health" },
      },
      {
        title: "Field access and encapsulation",
        code: { label: "Pseudocode", content: "# Direct access can create an impossible state\nplayer.health = -9000\n\n# A method can validate the amount and keep health above zero\nplayer.take_damage(amount)" },
        paragraphs: ["<strong>Encapsulation</strong> means the object controls its internal state through a small public interface. Callers ask <code>player.take_damage(amount)</code> to perform the change, and the method protects the health rules in one place."],
        note: { title: "Returning mutable collections", body: "A read-only property returning a mutable internal list may still allow callers to change the list. Consider read-only views, copies, or controlled methods." },
      },
    ],
    challenge: { title: "Choose instance or shared fields", prompt: "For a <code>Player</code>, decide whether <code>maxHealth</code>, <code>currentHealth</code>, and <code>totalOnlinePlayers</code> are instance or shared state.", solution: "<code>currentHealth</code> and usually <code>maxHealth</code> belong to each instance. <code>totalOnlinePlayers</code> is shared application state and may be type-level or, often better, owned by a server or session service." },
    check: { question: "Why keep <code>health</code> private and expose <code>take_damage</code>?", options: ["The method can enforce valid health rules.", "Private fields cannot store numbers.", "Methods use no memory."], answer: 0, explanation: "A controlled operation centralizes validation and protects the object's rules." },
    sources,
  },

  methods: {
    kicker: "Objects · Lesson 02",
    title: "Object methods",
    lead: "A method is a function attached to an object or type. Instance methods use a particular object's state, while static or class methods belong to the type itself.",
    goals: ["distinguish method calls from property access", "choose instance or static behavior", "write methods that preserve object rules"],
    sections: [
      {
        title: "Method receivers",
        code: { label: "Pseudocode", content: "mina.take_damage(10)\nboss.take_damage(10)\n\n# The receiver is the object before the dot\n# The same method changes Mina in the first call and the boss in the second" },
        paragraphs: ["The object before the dot is called the <strong>receiver</strong>. It tells the method which object's state to use. Languages expose that receiver in different ways, including Python's <code>self</code> and JavaScript's <code>this</code>."],
      },
      {
        title: "Queries and commands",
        paragraphs: ["Method names can also communicate whether the call only asks a question or requests a change."],
        cards: [
          { title: "Query", body: "Answers without intentionally changing observable state through code such as <code>player.can_afford(item)</code>." },
          { title: "Command", body: "Requests a state change through code such as <code>player.buy(item)</code>." },
          { title: "Factory", body: "Creates a suitable object, often through a type-level method such as <code>Enemy.from_config(data)</code>." },
        ],
        note: { title: "Query methods should not change state", body: "A method that sounds like a question should not secretly make an unrelated change. Clear contracts make call sites easier to trust." },
      },
      {
        title: "Methods that update related state",
        code: { label: "Pseudocode", content: "METHOD buy(item)\n    # Validate before changing coins or inventory\n    IF item.price > coins\n        RETURN failure(\"Not enough coins\")\n\n    # Both related changes happen only after validation succeeds\n    coins = coins - item.price\n    inventory.add(item)\n    RETURN success()" },
        note: { title: "Preventing partial updates", body: "If an operation changes several related values, validate first or provide a way to recover so failure does not leave the object inconsistent." },
      },
    ],
    challenge: { title: "Classify method types", prompt: "For <code>Player</code>, classify <code>takeDamage</code>, <code>isAlive</code>, and <code>createGuest</code> as command, query, or factory-like method.", solution: "<code>takeDamage</code> is a command, <code>isAlive</code> is a query, and <code>createGuest</code> is a factory-like type-level operation." },
    check: { question: "In <code>boss.take_damage(10)</code> what does <code>boss</code> do?", options: ["Acts as the receiving instance", "Acts as a comment", "Changes 10 into a string"], answer: 0, explanation: "The method operates in the context of the object before the dot." },
    sources,
  },

  "dot-notation": {
    kicker: "Code Structure · Lesson 04",
    title: "Dot notation and member access",
    lead: "Dot notation selects a named member from an object, type, namespace or module. It can access a field, select a method or continue through a chain of members.",
    goals: ["read a dotted expression left to right", "distinguish selection from invocation", "debug a broken member chain"],
    sections: [
      {
        title: "Selecting and calling a method",
        code: { label: "Pseudocode", content: "player.inventory.add(item)\n# player is the first receiver\n# .inventory selects the player's inventory\n# .add selects the inventory's method\n# (item) calls that method with item as an argument\n\nplayer.inventory.add   # Select the method without calling it\nplayer.inventory.add() # Select and call the method" },
        paragraphs: ["A dot selects a named member from the value on its left. Parentheses then call the selected method. Reading those actions separately makes a long expression easier to follow."],
        note: { title: "Passing a selected method as a callback", body: "Selecting a method without calling it lets some languages pass that action elsewhere. For example, <code>button.on_press(counter.add_one)</code> gives the button a method to call later whenever it is pressed." },
      },
      {
        title: "Reading a member chain",
        steps: ["Evaluate <code>player</code>.", "Get that value's <code>inventory</code> member.", "Get the inventory's <code>selectedItem</code> member.", "Get the selected item's <code>name</code> member."],
        code: { label: "Pseudocode", content: "player.inventory.selected_item.name\n# Start at player and follow one member at a time" },
        note: { title: "Missing values in a chain", body: "Trying to select another member from a missing or null value can crash the program. This is the same danger shown in <a href=\"logical-operators.html\">Logical Operators</a>, where short-circuiting prevents code from reading <code>player.health</code> when <code>player</code> is absent. Use the language's null-safe features or explicit checks when a value may be missing." },
      },
      {
        title: "Namespaces and modules",
        table: {
          headers: ["Expression", "Possible reading"],
          rows: [
            ["<code>Math.max(a, b)</code>", "Select a <code>max</code> operation from a built-in <code>Math</code> object"],
            ["<code>package.module.name</code>", "Select <code>name</code> from <code>module</code> inside <code>package</code>"],
            ["<code>enemy.position.x</code>", "Read the <code>x</code> field from the enemy's <code>position</code> object"],
          ],
        },
        paragraphs: ["Dot notation is common but not universal for every kind of access. Indexing, pointers and references, extension methods, static members, and metaprogramming follow language-specific rules."],
      },
    ],
    challenge: { title: "Explain a member chain", prompt: "Explain <code>game.currentScene.player.respawn()</code> without using the word “thing.”", solution: "Get the game's current scene, get that scene's player, select the player's respawn method, and invoke it with no explicit arguments." },
    check: { question: "What is the difference between <code>enemy.attack</code> and <code>enemy.attack()</code>?", options: ["The first selects a member. The second also calls it.", "There is never a difference.", "The first deletes the method."], answer: 0, explanation: "Parentheses perform the call in this common pattern." },
    sources,
  },

  parentheses: {
    kicker: "Code Structure · Lesson 05",
    title: "Uses of parentheses",
    lead: "Parentheses group expressions, call functions, define parameters and surround conditions in some languages. Their role depends on the syntax around them.",
    goals: ["identify common parenthesis roles", "use grouping for clarity", "avoid confusing a function value with a function call"],
    sections: [
      {
        title: "Common uses of parentheses",
        paragraphs: ["Look at what appears immediately before and inside the parentheses. That context reveals whether they group an expression, call a function or describe a function's inputs."],
        table: {
          headers: ["Pattern", "Job"],
          rows: [
            ["<code>(2 + 3) * 4</code>", "Group an expression and override normal precedence"],
            ["<code>spawn(\"slime\", 2)</code>", "Call a function with arguments"],
            ["<code>def spawn(kind, level): ...</code>", "Describe parameters in a definition"],
            ["<code>if (ready) { ... }</code>", "Required condition delimiters in several languages. Python does not require them"],
          ],
        },
      },
      {
        title: "Function reference or function call",
        code: { label: "JavaScript", content: "button.addEventListener(\"click\", saveGame);\n// Pass the function so the browser can call it later.\n\nconst saveWasSuccessful = saveGame();\n// Call the function now and store its returned value." },
        paragraphs: ["When giving a button or another part of the program a function to run later, pass the function without parentheses. Add parentheses when you want to run it immediately. You can also wrap a later call inside another function."],
      },
      {
        title: "Calls without arguments",
        paragraphs: ["<code>clock.now()</code> says “invoke <code>now</code> with no explicit arguments.” The method may still use receiver state, global or environment state, or defaults. An empty argument list can still lead to dependencies and effects."],
        code: { label: "Python", content: "# Both versions calculate, format, and print the same score\n\n# Three calls are nested inside one line\nprint(format_score(calculate_score(player)))\n\n# The same work is split into steps\nraw_score = calculate_score(player)\nmessage = format_score(raw_score)\nprint(message)" },
        note: { title: "Splitting nested calls", body: "Intermediate names reveal the value at each step, make errors easier to locate, and make the code easier to follow. Do not be afraid to use more lines. Line count is not a quality score, and 60 readable lines may be much easier to maintain than 30 compressed ones." },
      },
    ],
    challenge: { title: "Choose a function or a call", prompt: "An event system asks what to run later. Should you give it <code>openDoor</code> or <code>openDoor()</code>? Explain.", solution: "Usually give it <code>openDoor</code>, the function value. <code>openDoor()</code> runs immediately and supplies its returned value instead." },
    check: { question: "What do parentheses do in <code>(price + tax) * quantity</code>?", options: ["Call price", "Group addition before multiplication", "Start a comment"], answer: 1, explanation: "They explicitly change the expression grouping." },
    sources,
  },
};
