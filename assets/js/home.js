import { home, updateMetaContent } from "./i18n.js";

const homeRoot = document.querySelector("main#top");

if (homeRoot) {
  if (home.mainHtml) homeRoot.innerHTML = home.mainHtml;

  document.title = home.title;
  updateMetaContent('meta[name="description"]', home.description);
  updateMetaContent('meta[property="og:title"]', home.title);
  updateMetaContent('meta[property="og:description"]', home.socialDescription);
  updateMetaContent('meta[property="og:image:alt"]', home.title);
  updateMetaContent('meta[name="twitter:title"]', home.title);
  updateMetaContent('meta[name="twitter:description"]', home.socialDescription);

  const footerDescription = document.querySelector("[data-footer-description]");
  if (footerDescription) footerDescription.textContent = home.footerDescription;

  const footerNotes = document.querySelector("[data-footer-notes]");
  if (footerNotes) {
    footerNotes.setAttribute("aria-label", home.footerNotesLabel);
    footerNotes.innerHTML = home.footerNotes.map((note) => `<span>${note}</span>`).join("");
  }
}

