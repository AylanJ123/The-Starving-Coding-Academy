# The Starving Coding Academy

A beginner-friendly programming curriculum built as a static GitHub Pages site.
It teaches transferable concepts before language specialization, with examples
from Python, JavaScript, Java, C#, C++, and Lua.

## What Is Included

- 42 curriculum pages across seven course units
- Nested, searchable lesson navigation
- Previous/next lesson controls
- Learning goals, comparisons, code examples, and short challenges
- Interactive quick checks with explanations
- Local lesson-completion tracking
- Light and dark themes
- Responsive desktop and mobile layouts
- Reference links to official language documentation

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
pages/                             Generated public lesson routes
tools/generate-pages.mjs          Page-shell generator
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

## Running Locally

No application framework or dependency installation is required. Serve the
folder through any static HTTP server. ES modules do not work reliably by
opening `index.html` directly from the filesystem.

For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Publishing

The repository includes `.nojekyll`, so GitHub Pages publishes the static files
without a Jekyll build. Commit the generated `pages/` files along with any
content, navigation, style, or script changes.
