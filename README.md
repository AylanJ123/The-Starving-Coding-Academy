# The Starving Coding Academy

A completely free, ad-less programming course for beginners. The academy teaches
transferable concepts before language specialization, using examples from Python,
JavaScript, Java, C#, C++, and Lua.

The course is published as a lightweight static site. No account, installation,
or framework is required to start learning.

## Questions, Suggestions, And Community

Questions are welcome, and student feedback helps improve the lessons. Join the
[Starving Coding Academy Discord server](https://discord.gg/KzPR9cRBgs) to ask for
help, suggest a change, or talk about what you are building.

## What Is Included

- 42 lessons across seven connected courses
- Nested, searchable lesson navigation
- Previous/next lesson controls
- Learning goals, comparisons, code examples, and short challenges
- Interactive quick checks with explanations
- Local lesson-completion tracking
- Light and dark themes
- Responsive desktop and mobile layouts
- Reference links to official language documentation
- Shareable social cards for the homepage and every lesson

## Project Structure

```text
index.html                         Homepage
styles.css                        Shared visual system
script.js                         Shared JavaScript entry point
assets/js/navigation.js           Curriculum routes and hierarchy
assets/js/layout.js               Sidebar and responsive navigation
assets/js/lesson.js               Lesson renderer and interactions
assets/js/theme.js                Theme preference
assets/js/lessons/                Curriculum content by course unit
assets/images/social/             Generated social-preview cards
pages/                             Generated public lesson routes
tools/generate-pages.mjs          Page-shell generator
tools/generate-social-cards.mjs   Social-card generator
tools/check-site.mjs              Route/content integrity checks
private_files/                    Private curriculum planning sources
```

The lesson content lives in JavaScript data modules instead of being copied into
42 separate HTML files. This keeps every page consistent and makes shared lesson
features easy to improve. The HTML files in `pages/` are generated route shells.

## Editing Curriculum Content

Choose the matching module in `assets/js/lessons/`:

- `raw-lessons.js`
- `syntax-lessons.js`
- `operator-lessons.js`
- `structure-lessons.js`
- `flow-lessons.js`
- `practice-lessons.js`

Every lesson has a slug matching its page filename and navigation route. A
lesson can contain paragraphs, lists, steps, concept cards, comparison tables,
code windows, callouts, internal lesson links, answer reveals, a challenge, a
quick check, and reference links.

## Adding Or Renaming A Page

1. Add or update the route in `assets/js/navigation.js`.
2. Add lesson content with the matching slug in the appropriate lesson module.
3. Regenerate the page shells.
4. Run the integrity check.

With Node.js installed:

```powershell
npm run build:pages
npm run check
```

The checker verifies that navigation, lesson data, generated HTML, and internal
course links agree.

## Updating Social Cards

The social-card generator accepts `home`, a lesson slug, or `--all`. It requires
the optional `sharp` package.

```powershell
npm install --no-save sharp
node tools/generate-social-cards.mjs primitive-values
node tools/generate-social-cards.mjs home
node tools/generate-social-cards.mjs --all
```

Generating one target leaves every other image untouched.

## Running Locally

No application framework or dependency installation is required. Serve the
folder through any static HTTP server. ES modules do not work reliably by
opening `index.html` directly from the filesystem.

On Windows, you can use the helper scripts:

```powershell
.\RUN_SITE.bat
.\STOP_SITE.bat
```

`RUN_SITE.bat` starts the site at `http://localhost:8000/`.
`STOP_SITE.bat` stops the server started by the runner.

For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Publishing

The repository includes `.nojekyll`, so GitHub Pages publishes the static files
without a Jekyll build. Commit the generated `pages/` files along with any
content, navigation, style, or script changes.
