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
    title: "Skill grows where prediction meets feedback",
    lead: "Reading creates recognition. Programming ability grows when you predict a result, write a small attempt, run it, compare reality with your model, and explain the difference.",
    goals: ["practice without waiting for a giant project", "turn mistakes into specific feedback", "choose a challenge just beyond current comfort"],
    sections: [
      {
        title: "The five-minute learning loop",
        steps: ["Pick one tiny behavior.", "Predict the result before running.", "Write the smallest code that could prove the idea.", "Run it and capture the actual result or error.", "Explain one difference, then change one thing."],
        note: { title: "Struggle needs a feedback loop", body: "Being stuck for hours is not automatically productive. Shrink the task, inspect evidence, consult documentation, and ask a specific question." },
      },
      {
        title: "Use four kinds of practice",
        cards: [
          { title: "Trace", body: "Predict variables and output line by line without executing." },
          { title: "Repair", body: "Fix one syntax, runtime, or logic problem and explain the cause." },
          { title: "Modify", body: "Change working code to satisfy one new requirement." },
          { title: "Create", body: "Build a small behavior from a written contract and examples." },
        ],
      },
      {
        title: "Make difficulty adjustable",
        table: {
          headers: ["Too easy?", "Productive zone", "Too hard?"],
          rows: [
            ["Add an edge case or second language", "You can attempt it but must think and test", "Remove UI/framework code and use plain values"],
            ["Explain why each line exists", "Errors point to concepts you recently learned", "Start from working code and modify one rule"],
            ["Write automated examples", "You can describe what success means", "Ask for one hint, not the entire answer"],
          ],
        },
      },
      {
        title: "Choose a practice room",
        links: [
          { title: "Tiny Examples", body: "Trace and modify complete miniature programs.", href: "tiny-examples.html" },
          { title: "Quiz Time", body: "Check the mental model, not trivia memory.", href: "quiz-time.html" },
        ],
      },
    ],
    challenge: { title: "Write a practice contract", prompt: "Choose one lesson and invent a 10-minute exercise with an input, expected output, and one edge case.", solution: "Example for booleans: Use player level and hasInvite as input. Output whether ranked queue is allowed. Test the exact level threshold as an edge case. A precise expected result makes the exercise testable." },
    check: { question: "Which activity builds a stronger mental model?", options: ["Copy code without predicting it.", "Predict, run, compare, and explain a mismatch.", "Avoid errors at all costs."], answer: 1, explanation: "The comparison between expectation and evidence reveals exactly where the model needs adjustment." },
    sources,
  },

  "tiny-examples": {
    kicker: "Practice · Workshop",
    title: "Practice with tiny complete programs",
    lead: "Each example is small enough to hold in your head but complete enough to change. Trace it first, run it second, then take one modification challenge.",
    goals: ["trace state and control flow", "translate one concept between languages", "extend a working program without rewriting it"],
    sections: [
      {
        title: "01 Damage calculator",
        paragraphs: ["Predict the three printed values. Then change armor so the minimum-damage rule activates."],
        code: { label: "Python", content: "def calculate_damage(attack, armor):\n    return max(1, attack - armor)\n\nfor armor in (2, 8, 20):\n    damage = calculate_damage(10, armor)\n    print(f\"Armor {armor}: {damage} damage\")" },
        reveals: [{ question: "Reveal trace", answer: "The damage values are 8, 2, and 1. The final subtraction is negative, but <code>max(1, ...)</code> enforces minimum damage." }],
      },
      {
        title: "02 Cooldown gate",
        paragraphs: ["Predict which calls print <code>Cast!</code>. Then add a mana requirement."],
        code: { label: "JavaScript", content: "function tryCast(cooldownReady, isSilenced) {\n  const canCast = cooldownReady && !isSilenced;\n  if (canCast) {\n    console.log(\"Cast!\");\n  } else {\n    console.log(\"Blocked.\");\n  }\n}\n\ntryCast(true, false);\ntryCast(true, true);\ntryCast(false, false);" },
        reveals: [{ question: "Reveal trace", answer: "Only the first call casts. A mana extension could add <code>hasEnoughMana</code> as a parameter and require it in <code>canCast</code>." }],
      },
      {
        title: "03 Inventory search",
        paragraphs: ["Trace when the loop stops. Then make the search case-insensitive using an appropriate Java string method."],
        code: { label: "Java", content: "String[] inventory = {\"Torch\", \"Rope\", \"Moon Key\", \"Potion\"};\nString wanted = \"Moon Key\";\nboolean found = false;\n\nfor (String item : inventory) {\n    if (item.equals(wanted)) {\n        found = true;\n        break;\n    }\n}\n\nSystem.out.println(found);" },
        reveals: [{ question: "Reveal trace", answer: "The loop checks Torch, Rope, and Moon Key, sets found to true, then breaks before Potion. <code>item.equalsIgnoreCase(wanted)</code> is one case-insensitive option." }],
      },
      {
        title: "04 Player invariant",
        paragraphs: ["Predict health after both calls. Then decide what negative damage should do."],
        code: { label: "C#", content: "public class Player\n{\n    public int Health { get; private set; } = 100;\n\n    public void TakeDamage(int amount)\n    {\n        Health = Math.Max(0, Health - amount);\n    }\n}\n\nvar player = new Player();\nplayer.TakeDamage(35);\nplayer.TakeDamage(80);\nConsole.WriteLine(player.Health);" },
        reveals: [{ question: "Reveal trace", answer: "Health becomes 65, then clamps to 0. A robust contract should reject negative damage, clamp it, or model healing separately rather than silently increasing health." }],
      },
      {
        title: "05 Wrapped selection",
        paragraphs: ["Trace six outputs. Then change the code to move backward and wrap from the first item to the last."],
        code: { label: "Lua", content: "local items = {\"sword\", \"bow\", \"staff\"}\nlocal selected = 1\n\nfor turn = 1, 6 do\n  print(items[selected])\n  selected = (selected % #items) + 1\nend" },
        reveals: [{ question: "Reveal trace", answer: "It prints sword, bow, staff, sword, bow, staff. Lua sequences conventionally begin at index 1, so the wrapping formula differs from a zero-based array formula." }],
      },
      {
        title: "06 Validate before using",
        paragraphs: ["List the output for <code>12</code>, <code>-3</code>, and <code>many</code>. Then add an upper limit of 99."],
        code: { label: "Python", content: "raw = input(\"Potion count: \")\ntry:\n    count = int(raw)\n    if count < 0:\n        print(\"Count cannot be negative.\")\n    else:\n        print(f\"Stored {count} potions.\")\nexcept ValueError:\n    print(\"Use a whole number.\")" },
        reveals: [{ question: "Reveal trace", answer: "12 is stored, -3 receives the negative warning, and many receives the whole-number warning. Add another range check such as <code>elif count > 99</code>." }],
      },
    ],
    challenge: { title: "Translate one example", prompt: "Choose one example and rewrite it in a second academy language. Preserve behavior, not punctuation. Note one rule that changed.", solution: "A valid solution produces the same results and explicitly identifies a difference such as block markers, equality syntax, collection indexing, type declarations, string formatting, or loop form." },
    check: { question: "What should happen before running each tiny example?", options: ["Predict its important state or output.", "Delete the comments.", "Translate all six languages at once."], answer: 0, explanation: "Prediction makes the run meaningful evidence instead of passive observation." },
    sources,
  },

  "quiz-time": {
    kicker: "Practice · Checkpoint",
    title: "Can you reason with the fundamentals?",
    lead: "This checkpoint tests explanations and predictions, not obscure syntax trivia. Answer aloud or on paper before opening each explanation.",
    goals: ["explain core concepts without memorized slogans", "trace unfamiliar-looking examples", "identify the next lesson worth revisiting"],
    sections: [
      {
        title: "Round 1 · Concepts",
        reveals: [
          { question: "1. What is the difference between syntax and logic?", answer: "Syntax determines whether code follows the language's structural rules. Logic determines whether valid instructions produce the intended behavior." },
          { question: "2. What is a variable?", answer: "A name associated with a value or state according to the language's binding and storage rules. The box analogy provides one simplified mental model." },
          { question: "3. Do dynamically typed languages have types?", answer: "Yes. Values have types that are checked during execution. Dynamic languages still work with types." },
          { question: "4. Why are booleans foundational?", answer: "They turn questions and comparisons into values that branches, loops, filters, and permissions can use." },
          { question: "5. Why can a comment become harmful?", answer: "If behavior changes but the comment does not, it confidently tells readers something false." },
        ],
      },
      {
        title: "Round 2 · Trace",
        code: { label: "pseudocode", content: "coins = 10\nprices = [3, 8, 2]\n\nfor each price in prices:\n    if price <= coins:\n        coins = coins - price\n    else:\n        show \"skip\"\n\nshow coins" },
        reveals: [
          { question: "6. What is the final coin value?", answer: "5. Buy price 3 and reach 7 coins. Skip price 8. Buy price 2 and reach 5 coins." },
          { question: "7. How many times does the loop body run?", answer: "Three times because the loop visits each price. One purchase branch is skipped." },
          { question: "8. What boolean does price <= coins produce for the second item?", answer: "False, because 8 is not less than or equal to the remaining 7." },
        ],
      },
      {
        title: "Round 3 · Debug",
        code: { label: "Python", content: "def can_enter(level, has_pass):\n    if level >= 10 or has_pass:\n        print(\"Welcome\")\n\nallowed = can_enter(3, True)\nif allowed:\n    open_gate()" },
        reveals: [
          { question: "9. Why does open_gate not run?", answer: "The function prints but does not return a true value. In Python it implicitly returns <code>None</code>, which is false in this condition." },
          { question: "10. What focused fix preserves separation?", answer: "Return the boolean condition from <code>can_enter</code>, then let the caller decide whether to print and open the gate." },
          { question: "11. Is the OR rule necessarily a bug?", answer: "Not enough information. If a pass is an override, OR is correct. If level and pass are both required, use AND. Clarify the requirement before changing code." },
        ],
      },
      {
        title: "Round 4 · Design",
        reveals: [
          { question: "12. List the contract for calculateDamage.", answer: "Define expected attack/defense types and ranges, the returned damage rule, whether minimum damage exists, and how invalid inputs are handled. Avoid hidden UI or file effects." },
          { question: "13. When is foreach better than a counter loop?", answer: "When the goal is to visit every value and the index/progression itself is irrelevant." },
          { question: "14. When is a map better than switch?", answer: "When discrete keys simply map to data and no case needs distinct behavior." },
          { question: "15. What makes a debugging question useful?", answer: "It states expected versus actual behavior, reproduction steps, exact evidence, relevant code/location, and what has already been tested." },
        ],
      },
      {
        title: "Score yourself honestly",
        table: {
          headers: ["Result", "Next move"],
          rows: [
            ["13–15 Explained confidently", "Build a small console project and deliberately add edge cases."],
            ["9–12 Mostly understood", "Revisit the missed pages, then modify three Tiny Examples."],
            ["5–8 Partly familiar", "Trace the examples with paper and run them in one chosen language."],
            ["0–4 Still blurry", "Return to Raw Programming. Go slowly. Recognizing the gap gives you useful data."],
          ],
        },
        note: { title: "Measure skill through action", body: "Page completion alone cannot measure readiness. You are ready for a beginner project when you can make small predictions, investigate errors and modify working code with growing independence." },
      },
    ],
    challenge: { title: "Final boss: design one feature", prompt: "Describe a locked chest using state, a boolean rule, one method/function contract, input, output, and one failure case. Then implement it in your chosen language.", solution: "A strong design names state such as isLocked and requiredKeyId. It calculates canOpen from inventory membership. It exposes tryOpen(player) and returns a result. It receives an interaction as input and produces an animation or message as output. It handles a missing or wrong key without corrupting inventory." },
    check: { question: "What is the most useful response to a missed question?", options: ["Hide the result.", "Identify the concept, revisit its example, and test a smaller case.", "Memorize the answer without understanding it."], answer: 1, explanation: "A missed question locates the next practice target. That is the quiz doing its job." },
    sources,
  },
};
