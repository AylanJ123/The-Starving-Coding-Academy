import { lessonReferences } from "./lesson-references.js";

const sources = lessonReferences["input-output"];

export const inputOutputLesson = {
  "input-output": {
    kicker: "Course 04 · Input And Output",
    title: "Program input and output",
    lead: "Input is information received by a program, and output is information the program produces. Both can move through keyboards, screens, files, controllers, databases or networks.",
    goals: ["identify input and output beyond the console", "validate untrusted input", "separate core logic from interface code"],
    sections: [
      {
        title: "Types of input and output",
        paragraphs: ["Input and output are often shortened to <strong>I/O</strong>. Input is information the program receives. Output is information or action the program produces. Both can involve people, stored data, hardware or another program."],
        cards: [
          { title: "Human input", body: "Keyboard, mouse, touch, controller, microphone, form, or command." },
          { title: "Stored input", body: "Configuration, save data, images, database records, or imported assets." },
          { title: "Remote input", body: "Messages from an API, multiplayer client, webhook, or other service." },
          { title: "Output", body: "Screen pixels, audio, logs, saved files, database changes, device signals, or network responses." },
        ],
      },
      {
        title: "Validate outside data before using it",
        paragraphs: ["Outside data can be missing, malformed or deliberately harmful. Validate it before the rest of the program depends on it. A successful check turns uncertain input into a value with rules the program can trust. The <a href=\"do-while.html\">Do While / Repeat Until</a> lesson shows loops that request fresh input until it is valid."],
        steps: ["Receive the raw value.", "Check presence, shape, range, length, and allowed choices.", "Convert it into an internal type.", "Use the validated value in core logic.", "Return useful feedback without exposing secrets."],
        code: { label: "Pseudocode", content: "REPEAT\n    # Request fresh input on every attempt\n    raw_choice = READ \"Choose 1 to 3\"\n\n    # Convert only if the text represents a whole number\n    choice = TRY CONVERT raw_choice TO INTEGER\n\n    IF conversion failed OR choice is outside 1 to 3\n        SHOW \"That failed. Enter 1, 2, or 3\"\n        LOOP BACK TO START\n\n    # A valid choice can leave the input loop\n    STOP REPEATING\n\nSHOW \"Loading option \" and choice" },
        note: { title: "Input validation and security", body: "Validation prevents crashes and protects security boundaries. Untrusted input needs appropriate handling before it becomes a command, query, file path or HTML fragment." },
      },
      {
        title: "Separating input from logic",
        code: { label: "Pseudocode", content: "# This function only needs trusted numbers\nFUNCTION calculate_damage(attack, defense)\n    RETURN maximum(1, attack - defense)\n\n# Boundary code reads and validates the outside value\nraw_attack = READ input\nattack = VALIDATE raw_attack AS INTEGER\n\n# Core logic receives a clean value and returns a result\ndamage = calculate_damage(attack, enemy_defense)\nSHOW damage" },
        paragraphs: ["Keep input handling separate from the rule that uses the value. Then <code>calculate_damage</code> can be tested with ordinary numbers without opening a screen, pressing a key or making a network request. The boundary handles messy outside data while the function handles one clear calculation."],
      },
      {
        title: "Designing useful output",
        bullets: ["Name the action that succeeded and the useful result.", "On failure, explain what the user can change next.", "Logs should include useful context but exclude passwords, tokens, and sensitive personal data.", "Accessible output needs more than color alone and should work with relevant assistive technology."],
      },
    ],
    challenge: { title: "Design a safe username boundary", prompt: "List reasonable validation rules and useful feedback for a <code>username</code> field. Give a reason for every restriction you add.", solution: "Trim extra whitespace. Check the allowed length and characters. Reject control characters and tell the user which rule failed. Check uniqueness and every security rule again on the server. Browser checks and game-client checks can improve feedback, but they cannot enforce security. Anything running on the player's device can be modified or bypassed." },
    check: { question: "Why separate <code>calculate_damage</code> from keyboard input?", options: ["The calculation becomes easier to test and reuse.", "Functions cannot read keyboards.", "Input is always dangerous and should be deleted."], answer: 0, explanation: "A clean boundary lets the same rule serve a console, game, test, or network request." },
    sources,
  },
};
