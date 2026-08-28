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
        title: "01 Damage calculator",
        paragraphs: ["Predict the three printed values. Then change armor so the minimum-damage rule activates."],
        code: { label: "Python", content: "def calculate_damage(attack, armor):\n    # Damage can never fall below 1\n    return max(1, attack - armor)\n\n# Run the same rule with three armor values\nfor armor in (2, 8, 20):\n    damage = calculate_damage(10, armor)\n    print(f\"Armor {armor}: {damage} damage\")" },
        reveals: [{ question: "Reveal trace", answer: "The damage values are 8, 2, and 1. The final subtraction is negative, but <code>max(1, ...)</code> enforces minimum damage." }],
      },
      {
        title: "02 Cooldown gate",
        paragraphs: ["Predict which calls print <code>Cast!</code>. Then add a mana requirement."],
        code: { label: "JavaScript", content: "function tryCast(cooldownReady, isSilenced) {\n  // Casting requires a ready cooldown and no silence effect\n  const canCast = cooldownReady && !isSilenced;\n\n  if (canCast) {\n    console.log(\"Cast!\");\n  } else {\n    console.log(\"Blocked.\");\n  }\n}\n\n// Test three combinations\ntryCast(true, false);\ntryCast(true, true);\ntryCast(false, false);" },
        reveals: [{ question: "Reveal trace", answer: "Only the first call casts. A mana extension could add <code>hasEnoughMana</code> as a parameter and require it in <code>canCast</code>." }],
      },
      {
        title: "03 Inventory search",
        paragraphs: ["Trace when the loop stops. Then make the search case-insensitive using an appropriate Java string method."],
        code: { label: "Java", content: "public class InventorySearch {\n    public static void main(String[] args) {\n        String[] inventory = {\"Torch\", \"Rope\", \"Moon Key\", \"Potion\"};\n        String wanted = \"Moon Key\";\n        boolean found = false;\n\n        for (String item : inventory) {\n            if (item.equals(wanted)) {\n                found = true;\n                break; // Stop because the answer is already known\n            }\n        }\n\n        System.out.println(found);\n    }\n}" },
        reveals: [{ question: "Reveal trace", answer: "The loop checks Torch, Rope, and Moon Key, sets found to true, then breaks before Potion. <code>item.equalsIgnoreCase(wanted)</code> is one case-insensitive option." }],
      },
      {
        title: "04 Player health",
        paragraphs: ["Predict health after both calls. Then decide what negative damage should do."],
        code: { label: "C#", content: "using System;\n\npublic class Player\n{\n    // Other code can read Health but only this class can set it\n    public int Health { get; private set; } = 100;\n\n    public void TakeDamage(int amount)\n    {\n        // Clamp the result so health never becomes negative\n        Health = Math.Max(0, Health - amount);\n    }\n}\n\npublic static class Program\n{\n    public static void Main()\n    {\n        var player = new Player();\n        player.TakeDamage(35);\n        player.TakeDamage(80);\n        Console.WriteLine(player.Health);\n    }\n}" },
        reveals: [{ question: "Reveal trace", answer: "Health becomes 65, then clamps to 0. A robust contract should reject negative damage, clamp it, or model healing separately rather than silently increasing health." }],
      },
      {
        title: "05 Wrapped selection",
        paragraphs: ["Trace six outputs. Then change the code to move backward and wrap from the first item to the last."],
        code: { label: "Lua", content: "local items = {\"sword\", \"bow\", \"staff\"}\nlocal selected = 1\n\nfor turn = 1, 6 do\n  print(items[selected])\n\n  -- Move forward and wrap back to index 1 after the last item\n  selected = (selected % #items) + 1\nend" },
        reveals: [{ question: "Reveal trace", answer: "It prints sword, bow, staff, sword, bow, staff. Lua sequences conventionally begin at index 1, so the wrapping formula differs from a zero-based array formula." }],
      },
      {
        title: "06 Validate before using",
        paragraphs: ["List the output for <code>12</code>, <code>-3</code>, and <code>many</code>. Then add an upper limit of 99."],
        code: { label: "Python", content: "raw = input(\"Potion count: \")\n\ntry:\n    # Conversion may fail when the text is not a whole number\n    count = int(raw)\n\n    if count < 0:\n        print(\"Count cannot be negative.\")\n    else:\n        print(f\"Stored {count} potions.\")\nexcept ValueError:\n    # Recover from invalid text without ending the program\n    print(\"Use a whole number.\")" },
        reveals: [{ question: "Reveal trace", answer: "12 is stored, -3 receives the negative warning, and many receives the whole-number warning. Add another range check such as <code>elif count > 99</code>." }],
      },
      {
        title: "07 Format a status line",
        paragraphs: ["Predict both lines. Then accept accuracy as text, validate it, and print an error when conversion fails."],
        code: { label: "JavaScript", content: "const playerName = \"Mina\";\nconst accuracy = 0.8731;\nconst coins = 7;\nconst isOnline = true;\n\n// Convert values into one readable message\nconst status = `${playerName} | accuracy ${(accuracy * 100).toFixed(1)}% | coins ${coins}`;\nconsole.log(status);\nconsole.log(isOnline ? \"online\" : \"offline\");" },
        reveals: [{ question: "Reveal trace", answer: "The first line is <code>Mina | accuracy 87.3% | coins 7</code>, followed by <code>online</code>. For text input, trim it, reject an empty string, convert with <code>Number</code>, and require <code>Number.isFinite</code> before formatting." }],
      },
      {
        title: "08 Create independent settings",
        paragraphs: ["Predict both volumes. Then add an optional subtitle override without changing the defaults."],
        code: { label: "Python", content: "DEFAULT_SETTINGS = {\"volume\": 80, \"subtitles\": True}\n\ndef create_settings(overrides=None):\n    # copy creates a separate dictionary for this player\n    settings = DEFAULT_SETTINGS.copy()\n\n    if overrides is not None:\n        settings.update(overrides)\n\n    return settings\n\nplayer_a = create_settings({\"volume\": 25})\nplayer_b = create_settings()\nprint(player_a[\"volume\"])\nprint(player_b[\"volume\"])" },
        reveals: [{ question: "Reveal trace", answer: "The values are <code>25</code> and <code>80</code>. Each call returns a different dictionary, so changing <code>player_a</code> does not change <code>DEFAULT_SETTINGS</code> or <code>player_b</code>. This is a shallow copy, so nested mutable values would need separate consideration." }],
      },
      {
        title: "09 Follow a callback and closure",
        paragraphs: ["Predict the output. Then create a second formatter whose prefix is <code>Enemy</code>."],
        code: { label: "JavaScript", content: "function makeScoreFormatter(prefix) {\n  // The returned function remembers prefix\n  return (score) => `${prefix} ${score}`;\n}\n\nconst formatPlayer = makeScoreFormatter(\"Player\");\nconst scores = [8, 15];\n\n// map calls formatPlayer once for each score\nconst labels = scores.map(formatPlayer);\nconsole.log(labels.join(\", \"));" },
        reveals: [{ question: "Reveal trace", answer: "It prints <code>Player 8, Player 15</code>. <code>formatPlayer</code> is a function value. The call to <code>map</code> receives it as a callback, and the closure keeps the <code>prefix</code> value available after <code>makeScoreFormatter</code> has returned." }],
      },
      {
        title: "10 Build a menu boundary",
        paragraphs: ["Trace the cancel path and each valid command. Then add a fourth command without weakening the validation."],
        code: { label: "JavaScript", content: "function readMenuChoice() {\n  let raw;\n\n  do {\n    raw = prompt(\"Choose 1 save, 2 load, or 3 quit\");\n    if (raw === null) return null;\n    raw = raw.trim();\n  } while (raw !== \"1\" && raw !== \"2\" && raw !== \"3\");\n\n  return Number(raw);\n}\n\nfunction main() {\n  const choice = readMenuChoice();\n  if (choice === null) return;\n\n  switch (choice) {\n    case 1: console.log(\"save\"); break;\n    case 2: console.log(\"load\"); break;\n    case 3: console.log(\"quit\"); break;\n    default: throw new Error(\"Validated menu choice was lost\");\n  }\n}\n\nmain();" },
        reveals: [{ question: "Reveal paths", answer: "Cancel returns <code>null</code> and <code>main</code> ends. Invalid text asks again. Valid text becomes a number and selects one switch case. The default case should be unreachable after validation, so reaching it reveals a broken assumption." }],
      },
      {
        title: "11 Total usable durability",
        paragraphs: ["Predict the total. Then count how many usable items contributed to it."],
        code: { label: "C++", content: "#include <iostream>\n\nint main()\n{\n    int durability[] = {10, 0, 4};\n    int total = 0;\n\n    for (int value : durability)\n    {\n        if (value <= 0)\n        {\n            continue;\n        }\n\n        total += value;\n    }\n\n    std::cout << total << '\\n';\n    return 0;\n}" },
        reveals: [{ question: "Reveal trace", answer: "The total is <code>14</code>. The loop visits every array value, <code>continue</code> skips zero, and the two positive values reach the addition. Add a counter beside <code>total</code> and increment it on the same path to count two usable items." }],
      },
    ],
    challenge: { title: "Translate one example", prompt: "Choose one example and rewrite it in a second academy language. Preserve behavior, not punctuation. Note one rule that changed.", solution: "A valid solution produces the same results and explicitly identifies a difference such as block markers, equality syntax, collection indexing, type declarations, string formatting, or loop form." },
    check: { question: "What should happen before running each tiny example?", options: ["Predict its important state or output.", "Delete the comments.", "Translate all six languages at once."], answer: 0, explanation: "Prediction makes the run meaningful evidence instead of passive observation." },
    sources,
  },

  "quiz-time": {
    kicker: "Practice · Checkpoint",
    title: "Programming fundamentals quiz",
    lead: "This quiz checks the programming concepts covered throughout the course. Each question focuses on explaining behavior or predicting a result.",
    goals: ["explain core concepts without memorized slogans", "trace unfamiliar-looking examples", "identify the next lesson worth revisiting"],
    sections: [
      {
        title: "Round 1 · Concepts",
        reveals: [
          { question: "1. What is the difference between syntax and logic?", answer: "Syntax determines whether code follows the language's structural rules. Logic determines whether valid instructions produce the intended behavior." },
          { question: "2. What is a variable?", answer: "A name that lets code find a value. Languages differ in how that name connects to storage, so the box analogy is only one simplified mental model." },
          { question: "3. Do dynamically typed languages have types?", answer: "Yes. Values have types that are checked during execution. Dynamic languages still work with types." },
          { question: "4. Why are booleans foundational?", answer: "They turn questions and comparisons into values that branches, loops, filters, and permissions can use." },
          { question: "5. Why can a comment become harmful?", answer: "If behavior changes but the comment does not, it confidently tells readers something false." },
          { question: "6. Are strings and null values primitive in every language?", answer: "No. Languages classify their basic values differently. Java strings are objects, for example, and null values follow language-specific type rules." },
          { question: "7. What is the difference between copying a reference and copying an object?", answer: "Copying a reference creates another route to the same object. Copying the object creates separate data, although a shallow copy may still share nested objects." },
        ],
      },
      {
        title: "Round 2 · Trace",
        code: { label: "Pseudocode", content: "coins = 10\nprices = [3, 8, 2]\n\n# Visit every price in order\nFOR EACH price IN prices\n    IF price <= coins\n        coins = coins - price\n    ELSE\n        SHOW \"skip\"\n\nSHOW coins" },
        reveals: [
          { question: "8. What is the final coin value?", answer: "5. Buy price 3 and reach 7 coins. Skip price 8. Buy price 2 and reach 5 coins." },
          { question: "9. How many times does the loop body run?", answer: "Three times because the loop visits each price. One purchase branch is skipped." },
          { question: "10. What boolean does <code>price <= coins</code> produce for the second item?", answer: "False, because 8 is not less than or equal to the remaining 7." },
          { question: "11. Why does <code>2 + 3 * 4</code> usually produce 14?", answer: "Multiplication has higher precedence, so <code>3 * 4</code> is grouped first. Parentheses can request a different grouping." },
          { question: "12. Why can <code>\"10\" + \"5\"</code> produce <code>\"105\"</code>?", answer: "Both operands are text, so a language where plus joins strings combines their characters instead of performing numeric addition." },
        ],
      },
      {
        title: "Round 3 · Debug",
        code: { label: "Python", content: "def can_enter(level, has_pass):\n    if level >= 10 or has_pass:\n        print(\"Welcome\")\n    # No return statement means Python returns None\n\nallowed = can_enter(3, True)\nif allowed:\n    open_gate()" },
        reveals: [
          { question: "13. Why does <code>open_gate</code> not run?", answer: "The function prints but does not return a true value. In Python it implicitly returns <code>None</code>, which is false in this condition." },
          { question: "14. What focused fix preserves separation?", answer: "Return the boolean condition from <code>can_enter</code>, then let the caller decide whether to print and open the gate." },
          { question: "15. Is the OR rule necessarily a bug?", answer: "There is not enough information. If a pass is an override, OR is correct. If level and pass are both required, use AND. Clarify the requirement before changing code." },
          { question: "16. What should you record before changing code after an error?", answer: "Keep the exact message, reproduction steps, expected behavior, actual behavior and relevant location. Then test one relevant change at a time." },
          { question: "17. When should an exception be caught?", answer: "Catch it where the program can choose a trustworthy recovery or add useful context. Otherwise preserve it and let it propagate instead of hiding the failure." },
        ],
      },
      {
        title: "Round 4 · Design",
        reveals: [
          { question: "18. List the contract for <code>calculate_damage</code>.", answer: "Define expected attack and defense types and ranges, the returned damage rule, whether minimum damage exists and how invalid inputs are handled. Avoid hidden UI or file effects." },
          { question: "19. When is foreach better than a counter loop?", answer: "When the goal is to visit every value and the index or progression itself is irrelevant." },
          { question: "20. When is a map better than switch?", answer: "When discrete keys simply map to data and no case needs distinct behavior." },
          { question: "21. What makes a debugging question useful?", answer: "It states expected and actual behavior, reproduction steps, exact evidence, the relevant code or location and what has already been tested." },
          { question: "22. Why put several configuration values in one object?", answer: "The object keeps related settings together, gives each value a readable field name and avoids a long positional argument list." },
        ],
      },
      {
        title: "Round 5 · Connect the lessons",
        reveals: [
          { question: "23. What is the difference between source code and a runtime?", answer: "Source code is the text you write. The runtime or execution environment loads that code and provides services such as memory, files, input or graphics." },
          { question: "24. What does omitting an optional argument do?", answer: "The function uses the parameter's documented default value. Omitting it does not remove the parameter from the definition." },
          { question: "25. What does a closure remember?", answer: "It keeps access to values from the surrounding scope that its function still uses. Those captured values remain reachable while the closure remains reachable." },
          { question: "26. What is the difference between <code>button.save</code> and <code>button.save()</code>?", answer: "The first selects the member value. The second selects it and calls it with no explicit arguments." },
          { question: "27. How do while, do-while and repeat-until differ?", answer: "A while loop checks before its first run. Do-while and repeat-until check afterward, so their body runs at least once. Do-while repeats while its condition is true. Repeat-until stops when its condition becomes true." },
          { question: "28. Why do many array loops start at 0 and use <code>&lt; length</code>?", answer: "In zero-based collections the first valid index is 0 and the last is one less than the length. Other languages and collection conventions may start elsewhere." },
          { question: "29. What causes accidental switch fall-through?", answer: "In switch forms that support fall-through, a case reaches the next case because it did not exit with the required control statement. Newer switch forms may use different rules." },
          { question: "30. What belongs in a program's entry point?", answer: "Keep startup coordination there. Create or load the needed parts, connect them, handle top-level failure and hand work to focused functions or objects." },
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
