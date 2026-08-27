# The Starving Coding Academy

A small GitHub Pages website for beginner-friendly programming lessons.

The first version is plain HTML, CSS, and JavaScript on purpose. That keeps it
easy to read, easy to edit, and easy to publish without needing a framework.

## How The Site Works

GitHub Pages looks for `index.html` and uses it as the homepage.

This project has three main files:

- `index.html` has the page content.
- `styles.css` controls the colors, spacing, layout, light mode, and dark mode.
- `script.js` controls the theme button.

There is also a `.nojekyll` file. It tells GitHub Pages to publish the files as
they are, without trying to treat the site like a Jekyll project.

## Editing The Homepage

Most text lives in `index.html`.

For example, this is the main title:

```html
<h1>Raw programming for beginners.</h1>
```

Change the words, save the file, then refresh the local page.

## Editing The Style

Most of the site colors are at the top of `styles.css`:

```css
:root {
  --bg: #f7f3ed;
  --text: #1d2329;
  --accent: #177e89;
}
```

The dark theme has its own color values:

```css
[data-theme="dark"] {
  --bg: #151719;
  --text: #f4f1ea;
  --accent: #62c4b8;
}
```

The JavaScript changes `data-theme`, and the CSS does the rest.

## Adding Pages Later

Extra pages can go inside a `pages` folder:

```text
pages/
  lessons.html
  raw-programming.html
  paths.html
```

From the homepage, link to a page like this:

```html
<a href="pages/lessons.html">Lessons</a>
```

From a file inside `pages`, link back to the shared CSS like this:

```html
<link rel="stylesheet" href="../styles.css">
```

The `../` means "go up one folder."

## Running It Locally

From this folder, run:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Publishing Changes

After editing, save the files and run:

```powershell
git add .
git commit -m "Update site"
git push
```

GitHub Pages will rebuild the site after the push.
