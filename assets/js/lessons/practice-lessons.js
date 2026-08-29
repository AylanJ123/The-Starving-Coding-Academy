const sources = [
  { title: "Python tutorial", href: "https://docs.python.org/3/tutorial/" },
  { title: "MDN JavaScript guide", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
  { title: "Java tutorials: learning the Java language", href: "https://docs.oracle.com/javase/tutorial/java/" },
  { title: "C# fundamentals", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/" },
  { title: "Lua 5.4 reference manual", href: "https://www.lua.org/manual/5.4/manual.html" },
];

export const practiceLessons = {
  practice: {
    kicker: "Course 07 · Practice",
    title: "Programming practice and feedback",
    lead: "Programming practice includes predicting a result, writing a small solution, running it and comparing the output with the prediction. The difference identifies what needs further study.",
    goals: ["practice without waiting for a giant project", "turn mistakes into specific feedback", "choose a challenge just beyond current comfort"],
    sections: [
      {
        title: "A short practice cycle",
        paragraphs: ["Small experiments produce useful feedback quickly. Predicting first gives you something concrete to compare with the real result."],
        steps: ["Pick one tiny behavior.", "Predict the result before running.", "Write the smallest code that could prove the idea.", "Run it and capture the actual result or error.", "Explain one difference, then change one thing."],
        note: { title: "Feedback during practice", body: "Being stuck for hours is not automatically productive. Shrink the task, inspect evidence, consult documentation, and ask a specific question." },
      },
      {
        title: "Types of practice",
        paragraphs: ["Different exercises train different parts of programming. Rotate between reading code, repairing it, changing it and creating a small behavior yourself."],
        cards: [
          { title: "Trace", body: "Predict variables and output line by line without executing." },
          { title: "Repair", body: "Fix one syntax, runtime, or logic problem and explain the cause." },
          { title: "Modify", body: "Change working code to satisfy one new requirement." },
          { title: "Create", body: "Build a small behavior from a written contract and examples." },
        ],
      },
      {
        title: "Make an exercise fit you",
        paragraphs: ["Imagine an exercise that asks you to accept a number from 1 through 10. Solving it immediately means you can add one complication. If you cannot decide how to begin, remove one. Keep the original concept and adjust how much work surrounds it."],
        table: {
          headers: ["What happened?", "Change the exercise", "For example"],
          rows: [
            ["You solved it immediately", "Add one complication", "Handle empty input or solve it in a second language"],
            ["You had to stop, predict and test", "Keep working at this level", "Explain the expected output and investigate each mismatch"],
            ["You could not find a starting point", "Remove one complication", "Begin with working code, remove the interface or ask for one hint"],
          ],
        },
      },
      {
        title: "Practice lessons",
        links: [
          { title: "Tiny Examples", body: "Trace and modify complete miniature programs.", href: "tiny-examples.html" },
          { title: "Quiz Time", body: "Test how well you can explain and apply each concept.", href: "quiz-time.html" },
        ],
      },
      {
        title: "What the final practice covers",
        paragraphs: ["The workshop combines related lessons instead of assigning one isolated exercise per page. The quiz then checks the explanations that are difficult to prove with one short program."],
        table: {
          headers: ["Workshop", "Main topics combined"],
          rows: [
            ["01–02", "values, arithmetic, booleans, operators, branches, functions and formatted output"],
            ["03–06", "collections, indexes, loops, input validation, exceptions, objects, fields and methods"],
            ["07", "text conversion, numeric formatting, null handling and output"],
            ["08", "scope, optional parameters, maps, references, copies and return values"],
            ["09", "lambdas, callbacks, closures, dot notation and function calls"],
            ["10", "program entry, input, a post-test loop, switch, errors and cleanup"],
            ["11", "C++ entry points, arrays, foreach loops, branches, continue and output"],
            ["Quiz", "syntax, comments, project structure, debugging, contracts and language differences"],
          ],
        },
      },
    ],
    challenge: {
      title: "Create an exercise for someone else",
      prompt: "Choose one lesson and invent a ten-minute exercise with an input, expected output and one edge case. Ask another person to solve it and see where your instructions confuse them. If you need a volunteer, use the <strong>Join the Discord</strong> button on the landing page and share it with the academy.",
      summary: "Checklist before sharing",
      solution: "Keep the exercise small enough to finish in ten minutes. State the starting values, required output and edge case clearly. Do one quick sanity check, keep your solution private and hand the prompt to someone else. Their questions will show you what needs a clearer explanation.",
    },
    check: { question: "Which activity builds a stronger mental model?", options: ["Copy code without predicting it.", "Predict, run, compare, and explain a mismatch.", "Avoid errors at all costs."], answer: 1, explanation: "The comparison between expectation and evidence reveals exactly where the model needs adjustment." },
    sources,
  },

  "tiny-examples": {
    kicker: "Practice · Workshop",
    title: "Small complete programs",
    lead: "These examples are complete programs designed for tracing and modification. Each one includes a prediction step and a small change to implement.",
    goals: ["trace state and control flow", "translate one concept between languages", "extend a working program without rewriting it"],
    sections: [
      {
        title: "01 · Damage calculator",
        paragraphs: ["Predict the three printed values. What armor value would trigger the minimum output?"],
        code: { label: "Python", content: "def calculate_damage(attack, armor):\n    # Damage can never fall below 1\n    return max(1, attack - armor)\n\n# Try the calculation with three armor values\nfor armor in (2, 8, 20):\n    damage = calculate_damage(10, armor)\n    print(f\"Armor {armor}: {damage} damage\")" },
        reveals: [{ question: "Reveal trace", answer: "The damage values are <code>8</code>, <code>2</code>, and <code>1</code>. In the last call, <code>10 - 20</code> produces <code>-10</code>, so <code>max(1, -10)</code> returns the minimum output of <code>1</code>." }],
      },
      {
        title: "02 · Cooldown gate",
        paragraphs: ["Predict which calls print <code>Cast!</code>. Then add a mana requirement."],
        code: { label: "JavaScript", content: "function tryCast(cooldownReady, isSilenced) {\n  // Casting requires a ready cooldown and no silence effect\n  const canCast = cooldownReady && !isSilenced;\n\n  if (canCast) {\n    console.log(\"Cast!\");\n  } else {\n    console.log(\"Blocked.\");\n  }\n}\n\n// Test three combinations\ntryCast(false, false);\ntryCast(true, false);\ntryCast(true, true);" },
        reveals: [{ question: "Reveal trace", answer: "Only the middle call casts. A mana extension could add <code>hasEnoughMana</code> as a parameter and require it in <code>canCast</code>." }],
      },
      {
        title: "03 · Inventory search",
        paragraphs: ["Trace when the loop stops. Then upgrade the code by making the search case-insensitive with an appropriate Java string method."],
        code: { label: "Java", content: "public class InventorySearch {\n    public static void main(String[] args) {\n        String[] inventory = {\"Torch\", \"Rope\", \"Moon Key\", \"Potion\"};\n        String wanted = \"Moon Key\";\n        boolean found = false;\n\n        for (String item : inventory) {\n            if (item.equals(wanted)) {\n                found = true;\n                break; // Stop because the answer is already known\n            }\n        }\n\n        System.out.println(found);\n    }\n}" },
        reveals: [{ question: "Reveal trace", answer: "The loop checks Torch, Rope, and Moon Key, sets found to true, then breaks before Potion. <code>item.equalsIgnoreCase(wanted)</code> is one case-insensitive option." }],
      },
      {
        title: "04 · Player health",
        paragraphs: ["Predict health after both calls. Then guess what negative damage would do."],
        code: { label: "C#", content: "public static class Program\n{\n    public static void Main()\n    {\n        var player = new Player();\n        player.TakeDamage(35);\n        player.TakeDamage(80);\n        System.Console.WriteLine(player.Health);\n    }\n}\n\n// Player is a helper class used by Program\npublic class Player\n{\n    // Other code can read Health but only this class can set it\n    public int Health { get; private set; } = 100;\n\n    public void TakeDamage(int amount)\n    {\n        // Clamp the result so health never becomes negative\n        Health = System.Math.Max(0, Health - amount);\n    }\n}" },
        reveals: [{ question: "Reveal trace", answer: "<code>Health</code> becomes <code>65</code>, then clamps to <code>0</code>. If <code>TakeDamage()</code> receives a negative amount, subtracting that value increases <code>Health</code>, so the damage heals the player." }],
      },
      {
        title: "05 · Wrapped selection",
        paragraphs: ["Trace six outputs. Then invert the movement so it steps backward and wraps from the first item to the last."],
        code: { label: "Lua", content: "local items = {\"sword\", \"bow\", \"staff\"}\nlocal selected = 1\n\nfor turn = 1, 6 do\n  print(items[selected])\n\n  -- Move forward and wrap back to index 1 after the last item\n  selected = (selected % #items) + 1\nend" },
        reveals: [{ question: "Reveal trace", answer: "It prints <code>sword</code>, <code>bow</code>, <code>staff</code>, <code>sword</code>, <code>bow</code>, <code>staff</code>. Lua sequences conventionally begin at index <code>1</code>. Replace the update with the version below to move backward and wrap.", code: { label: "Lua", content: "-- Move backward and wrap from index 1 to the last index\nselected = ((selected - 2) % #items) + 1" } }],
      },
      {
        title: "06 · Validate before using",
        paragraphs: ["Try entering <code>many</code>, then <code>-3</code>, then <code>12</code>. What does the program show, and which input finally ends the loop? Then add an upper limit of <code>99</code>."],
        code: { label: "Python", content: "stored = False\n\nwhile not stored:\n    raw = input(\"Potion count: \")\n\n    try:\n        # Conversion may fail when the text is not a whole number\n        count = int(raw)\n\n        if count < 0:\n            print(\"Count cannot be negative.\")\n        else:\n            print(f\"Stored {count} potions.\")\n            stored = True\n    except ValueError:\n        # Invalid text shows feedback, then the loop asks again\n        print(\"Use a whole number.\")" },
        reveals: [{ question: "Reveal trace", answer: "<code>many</code> shows the whole-number warning, <code>-3</code> shows the negative warning, and <code>12</code> is stored and ends the loop. Add another check such as <code>elif count &gt; 99</code> before storing the value." }],
      },
      {
        title: "07 · Format a status line",
        paragraphs: ["Predict both lines. Then accept accuracy as text, validate it, and print an error when conversion fails."],
        code: { label: "JavaScript", content: "const playerName = \"Mina\";\nconst accuracy = 0.8731;\nconst coins = 7;\nconst isOnline = true;\n\n// Convert values into one readable message\nconst status = `${playerName} | accuracy ${(accuracy * 100).toFixed(1)}% | coins ${coins}`;\nconsole.log(status);\nconsole.log(isOnline ? \"online\" : \"offline\");" },
        reveals: [{ question: "Reveal trace", answer: "The first line is <code>Mina | accuracy 87.3% | coins 7</code>, followed by <code>online</code>. <code>Number()</code> is the conversion function. This is how the conversion and validation line could look.", code: { label: "JavaScript", content: "const parsedAccuracy = Number(rawAccuracy);\n\nif (rawAccuracy.trim() === \"\" || !Number.isFinite(parsedAccuracy)) {\n  console.log(\"Enter a valid accuracy.\");\n}" } }],
      },
      {
        title: "08 · Create independent settings",
        paragraphs: ["What volume does each player receive? How would you create settings for a third player that turns subtitles off while leaving the default volume unchanged?"],
        code: { label: "C#", content: "using System.Collections.Generic;\n\npublic static class Program\n{\n    // These values are copied whenever a player needs fresh settings\n    private static readonly Dictionary<string, object> DefaultSettings = new()\n    {\n        [\"volume\"] = 80,\n        [\"subtitles\"] = true\n    };\n\n    // The optional dictionary contains only the settings that should change\n    private static Dictionary<string, object> CreateSettings(Dictionary<string, object> overrides = null)\n    {\n        // Begin with a separate copy so players do not share their settings\n        var settings = new Dictionary<string, object>(DefaultSettings);\n\n        // C# allows braces to be omitted when the body is one statement\n        if (overrides != null)\n            foreach (var pair in overrides)\n                settings[pair.Key] = pair.Value;\n\n        return settings;\n    }\n\n    public static void Main()\n    {\n        // Player A replaces only the volume value\n        var playerA = CreateSettings(new Dictionary<string, object>\n        {\n            [\"volume\"] = 25\n        });\n\n        // Player B receives an untouched copy of every default\n        var playerB = CreateSettings();\n\n        System.Console.WriteLine(playerA[\"volume\"]);\n        System.Console.WriteLine(playerB[\"volume\"]);\n    }\n}" },
        reveals: [{ question: "Reveal trace", answer: "The values are <code>25</code> and <code>80</code>. Each call returns a different dictionary, so changing <code>playerA</code> does not change <code>DefaultSettings</code> or <code>playerB</code>. A third override can contain only <code>[\"subtitles\"] = false</code>, and its copied volume will remain <code>80</code>." }],
      },
      {
        title: "09 · Follow a callback and closure",
        paragraphs: ["Predict the output. Then create a second formatter whose prefix is <code>Enemy</code>."],
        code: { label: "JavaScript", content: "function makeScoreFormatter(prefix) {\n  // The returned function remembers prefix\n  return (score) => `${prefix} ${score}`;\n}\n\nconst formatPlayer = makeScoreFormatter(\"Player\");\nconst scores = [8, 15];\n\n// map calls formatPlayer once for each score\nconst labels = scores.map(formatPlayer);\nconsole.log(labels.join(\", \"));" },
        reveals: [{ question: "Reveal trace", answer: "It prints <code>Player 8, Player 15</code>. <code>formatPlayer</code> is intentionally passed without parentheses because it is a function value. <code>map()</code> calls it once for each score, and the closure keeps <code>prefix</code> available after <code>makeScoreFormatter()</code> returns. The second formatter uses the same function with a different remembered prefix.", code: { label: "JavaScript", content: "const formatEnemy = makeScoreFormatter(\"Enemy\");\nconst enemyLabels = scores.map(formatEnemy);\nconsole.log(enemyLabels.join(\", \"));\n// Enemy 8, Enemy 15" } }],
      },
      {
        title: "10 · Build a menu boundary",
        paragraphs: ["Follow what happens for each valid command and for invalid input. Then add a fourth command while keeping invalid choices out."],
        code: { label: "Java", content: "import java.util.Scanner;\n\npublic class Main {\n    static int readMenuChoice(Scanner input) {\n        int choice = 0;\n\n        do {\n            System.out.print(\"Choose 1 save, 2 load, or 3 quit: \");\n            String raw = input.nextLine().trim();\n\n            try {\n                choice = Integer.parseInt(raw);\n            } catch (NumberFormatException error) {\n                choice = 0;\n            }\n        } while (choice < 1 || choice > 3);\n\n        return choice;\n    }\n\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        int choice = readMenuChoice(input);\n\n        switch (choice) {\n            case 1: System.out.println(\"save\"); break;\n            case 2: System.out.println(\"load\"); break;\n            case 3: System.out.println(\"quit\"); break;\n            default: throw new IllegalStateException(\"Validated choice was lost\");\n        }\n    }\n}" },
        reveals: [{ question: "Reveal paths", answer: "Text that cannot become a number and numbers outside <code>1</code> through <code>3</code> make the loop ask again. A valid number ends the loop and selects one <code>switch</code> case. Add the fourth value to both the loop condition and the switch so validation and behavior stay in agreement." }],
      },
      {
        title: "11 · Total usable durability",
        paragraphs: ["Predict the total. Then count how many usable items contributed to it."],
        code: { label: "C++", content: "#include <iostream>\n\nint main()\n{\n    int durability[] = {10, 0, 4};\n    int total = 0;\n\n    for (int value : durability)\n    {\n        if (value <= 0)\n        {\n            continue;\n        }\n\n        total += value;\n    }\n\n    std::cout << total << '\\n';\n    return 0;\n}" },
        reveals: [{ question: "Reveal trace", answer: "The total is <code>14</code>. The loop visits every array value, <code>continue</code> skips zero, and the two positive values reach the addition. Add a counter beside <code>total</code> and increment it on the same path to count two usable items." }],
      },
    ],
    challenge: { title: "Translate one example", prompt: "Choose one example and rewrite it in a second academy language. Preserve behavior, not punctuation. Note one rule that changed.", solution: "A valid solution produces the same results and identifies a difference such as block markers, equality syntax, collection indexing, type declarations, string formatting, or loop form. Share both versions in the <a href=\"https://discord.gg/KzPR9cRBgs\" target=\"_blank\" rel=\"noopener noreferrer\">academy Discord</a> and ask someone to compare them. If Discord is not an option, you can ask an AI to compare the behavior of both versions without rewriting your work." },
    check: { question: "What should you do before running each tiny example?", options: ["Predict its important state or output.", "Delete the comments.", "Translate all six languages at once."], answer: 0, explanation: "Prediction makes the run meaningful evidence instead of passive observation." },
    sources,
  },

  "quiz-time": {
    kicker: "Practice · Checkpoint",
    title: "Programming fundamentals quiz",
    lead: "This quiz checks the programming concepts covered throughout the course. Each question focuses on explaining behavior or predicting a result.",
    introNote: { title: "Keep your score", body: "Write down how many of the <code>30</code> questions you answer correctly. The review table at the end uses that total to suggest what you should practice next." },
    goals: ["explain core concepts without memorized slogans", "trace unfamiliar-looking examples", "identify the next lesson worth revisiting"],
    sections: [
      {
        title: "Round 1 · Concepts",
        reveals: [
          { question: "1. What does syntax tell a programming language?", answer: "Syntax defines how code must be written so the language can read it. It covers details such as keywords, punctuation and how instructions are arranged." },
          { question: "2. What is a variable?", answer: "A name that lets code find a value. Languages differ in how that name connects to storage, so the box analogy is only one simplified mental model." },
          { question: "3. Do dynamically typed languages have types?", answer: "Yes. Values have types that are checked during execution. Dynamic languages still work with types." },
          { question: "4. Why are booleans foundational?", answer: "They turn questions and comparisons into <code>true</code> or <code>false</code>, which branches, loops, filters, and permissions can use." },
          { question: "5. Why can a comment become harmful?", answer: "If behavior changes but the comment does not, it confidently tells readers something false." },
          { question: "6. Which basic value type should store whether a door is locked?", answer: "A boolean. It stores one of two states, such as <code>true</code> for locked and <code>false</code> for unlocked." },
          { question: "7. What is the difference between copying a reference and copying the data it points to?", answer: "Copying a reference creates another route to the same data. Copying the data creates an independent value, although a shallow copy may still share references nested inside it." },
        ],
      },
      {
        title: "Round 2 · Trace operations",
        codeFirst: true,
        code: { label: "Pseudocode", content: "coins = 10\nprices = [3, 8, 2]\n\n# Visit every price in order\nFOR EACH price IN prices\n    IF price <= coins\n        coins = coins - price\n    ELSE\n        SHOW \"skip\"\n\nSHOW coins" },
        reveals: [
          { question: "8. What is the final <code>coins</code> value?", answer: "<code>5</code>. Buy at price <code>3</code> and reach <code>7</code> coins. Skip price <code>8</code>. Buy at price <code>2</code> and reach <code>5</code> coins." },
          { question: "9. How many times does the loop body run?", answer: "<code>3</code> times because the loop visits each price. One purchase branch is skipped." },
          { question: "10. What boolean value does <code>price <= coins</code> produce for the second item?", answer: "<code>False</code>, because <code>8</code> is not less than or equal to the remaining <code>7</code>." },
        ],
      },
      {
        title: "Concept check · Operators and text",
        joinPrevious: true,
        reveals: [
          { question: "11. Why does <code>2 + 3 * 4</code> usually produce <code>14</code>?", answer: "Multiplication has higher precedence, so <code>3 * 4</code> is grouped first. Parentheses can request a different grouping." },
          { question: "12. Why can <code>\"10\" + \"5\"</code> produce <code>\"105\"</code>?", answer: "Both operands are text, so a language where plus joins strings combines their characters instead of performing numeric addition." },
        ],
      },
      {
        title: "Round 3 · Debug",
        codeFirst: true,
        code: { label: "Python", content: "def can_enter(level, has_pass):\n    if level >= 10 or has_pass:\n        print(\"Welcome\")\n    # No return statement means Python returns None\n\nallowed = can_enter(3, True)\nif allowed:\n    open_gate()" },
        reveals: [
          { question: "13. Why does <code>open_gate()</code> not run?", answer: "The function prints but does not return <code>True</code>. Python returns <code>None</code> automatically, and <code>None</code> acts as false in this condition." },
          { question: "14. What should <code>can_enter()</code> return so the caller can decide whether to run <code>open_gate()</code>?", answer: "Return the result of <code>level >= 10 or has_pass</code>. The caller can store that boolean and decide whether to call <code>open_gate()</code>." },
        ],
      },
      {
        title: "Concept check · Debugging decisions",
        joinPrevious: true,
        reveals: [
          { question: "15. If a pass lets a player ignore the level requirement, should the condition use <code>OR</code> or <code>AND</code>?", answer: "Use <code>OR</code>. The player may enter by meeting either requirement, reaching the required level or having a pass." },
          { question: "16. What should you record before changing code after an error?", answer: "Keep the exact message, reproduction steps, expected behavior, actual behavior and relevant location. Then test one relevant change at a time." },
          { question: "17. When should an exception be caught?", answer: "Catch it where the program can choose a trustworthy recovery or add useful context. Otherwise preserve it and let it propagate instead of hiding the failure." },
        ],
      },
      {
        title: "Round 4 · Design",
        reveals: [
          { question: "18. What does a teammate need to know before calling <code>calculate_damage(attack, defense)</code>?", answer: "They need to know which values are accepted, what damage value is returned, whether damage has a minimum, and what happens when an input is invalid." },
          { question: "19. When is foreach better than a counter loop?", answer: "When the goal is to visit every value and the index or progression itself is irrelevant." },
          { question: "20. You only need to translate rarity names into colors. What can store those name-and-color pairs without several branches?", answer: "A map or dictionary can store each rarity as a key and its color as the corresponding value." },
          { question: "21. A teammate reports only that ‘the button is broken.’ What details should they add?", answer: "Add the steps that reproduce the problem, what they expected, what actually happened, the exact error message or location, and what they already tested." },
          { question: "22. A function needs volume, subtitles, brightness, and language settings. Why pass one settings object?", answer: "The field names explain each value, the related settings stay together, and another setting can be added without extending a long list of positional arguments." },
        ],
      },
      {
        title: "Round 5 · Connect the lessons",
        reveals: [
          { question: "23. A program runs without an error but shows the wrong total. What should you compare first?", answer: "Compare the expected total with the actual total, then trace the values that contribute to it until you find where they first differ." },
          { question: "24. What does omitting an optional argument do?", answer: "The function uses the parameter's documented default value. Omitting it does not remove the parameter from the definition." },
          { question: "25. When should you replace a lambda with a named function?", answer: "Give it a name when it becomes difficult to understand where it appears, needs to be reused, or deserves its own tests and documentation." },
          { question: "26. What is the difference between <code>button.save</code> and <code>button.save()</code>?", answer: "The first selects the member value. The second selects it and calls it with no explicit arguments." },
          { question: "27. When do <code>while</code>, <code>do-while</code>, and <code>repeat-until</code> check their conditions?", answer: "<code>while</code> checks before the body runs. <code>do-while</code> and <code>repeat-until</code> check afterward, so their body runs at least once. <code>do-while</code> repeats while its condition is true. <code>repeat-until</code> stops when its condition becomes true." },
          { question: "28. Why do many array loops start at <code>0</code> and use <code>&lt; length</code>?", answer: "In zero-based collections the first valid index is <code>0</code> and the last is one less than the length. Other languages and collection conventions may start elsewhere." },
          { question: "29. What causes accidental switch fall-through?", answer: "In switch forms that support fall-through, a case reaches the next case because it did not exit with the required control statement. Newer switch forms may use different rules." },
          { question: "30. Why must a server validate input even when the game or website already checked it on the user's device?", answer: "Code running on the user's device can be changed or bypassed. The server must check the input again before trusting it or changing shared data." },
        ],
      },
      {
        title: "Reviewing the results",
        table: {
          headers: ["Result", "Next move"],
          rows: [
            ["26–30 Explained confidently", "Build a small console project and deliberately add edge cases."],
            ["19–25 Mostly understood", "Revisit the missed pages, then modify three Tiny Examples."],
            ["10–18 Partly familiar", "Trace the examples with paper and run them in one chosen language."],
            ["0–9 Still blurry", "Return to Raw Programming. Go slowly. Recognizing the gap gives you useful data."],
          ],
        },
        note: { title: "Using mistakes to choose practice", body: "Page completion alone cannot measure readiness. You are ready for a beginner project when you can make small predictions, investigate errors and modify working code with growing independence." },
      },
    ],
    challenge: { title: "Build a final feature", prompt: "Describe a locked chest using state, a boolean rule, one method or function contract, input, output and one failure case. Then implement it in your chosen language.", solution: "A strong design names state such as <code>is_locked</code> and <code>required_key_id</code>. It calculates <code>can_open</code> from inventory membership. It exposes <code>try_open(player)</code> and returns a result. It receives an interaction as input and produces an animation or message as output. It handles a missing or wrong key without corrupting inventory." },
    check: { question: "What is the most useful response to a missed question?", options: ["Hide the result.", "Identify the concept, revisit its example, and test a smaller case.", "Memorize the answer without understanding it."], answer: 1, explanation: "A missed question locates the next practice target. That is the quiz doing its job." },
    sources,
  },
};
