function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSpeakerCard(speaker) {
  const linkedinUrl = speaker.linkedin || "#";
  const speakerImageClass =
    speaker.name === "Eng. Sameh Hahlias" ? " mx-speaker-image-sameh" : "";
  const initials = speaker.name
    .replace(/^(Dr\.|Prof|Eng\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(function (part) {
      return part.charAt(0);
    })
    .join("")
    .toUpperCase();
  const imageMarkup = speaker.image
    ? '<img src="' +
      escapeHtml(speaker.image) +
      '" alt="' +
      escapeHtml(speaker.name) +
      '" loading="lazy" />'
    : '<div class="mx-speaker-placeholder" aria-hidden="true">' +
      initials +
      "</div>";

  return (
    '<article class="mx-speaker-card">' +
    '<a class="mx-speaker-link" href="' +
    escapeHtml(linkedinUrl) +
    '" target="_blank" rel="noopener noreferrer">' +
    '<div class="mx-speaker-image' +
    speakerImageClass +
    '">' +
    imageMarkup +
    '<div class="mx-speaker-image-overlay"></div>' +
    "</div>" +
    "</a>" +
    '<div class="mx-speaker-info">' +
    '<div class="mx-speaker-top"><h3>' +
    escapeHtml(speaker.name) +
    "</h3></div>" +
    '<div class="mx-speaker-gold-line"></div>' +
    '<div class="mx-speaker-role">' +
    escapeHtml(speaker.role) +
    "</div>" +
    "<p>" +
    escapeHtml(speaker.organization) +
    "</p>" +
    '<a class="mx-speaker-more" href="' +
    escapeHtml(linkedinUrl) +
    '" target="_blank" rel="noopener noreferrer" aria-label="View ' +
    escapeHtml(speaker.name) +
    '">→</a>' +
    "</div>" +
    "</article>"
  );
}

function initSpeakersGrid() {
  const grid = document.getElementById("mx-speakers-grid");
  const countEl = document.getElementById("mx-speakers-count");

  if (!grid || !window.MERIDIAN_SPEAKERS) return;

  grid.innerHTML = window.MERIDIAN_SPEAKERS.map(renderSpeakerCard).join("");

  if (countEl) {
    countEl.textContent =
      window.MERIDIAN_SPEAKERS.length + " Confirmed Speakers";
  }
}

function initBackToTop() {
  const backToTop = document.querySelector(".back-to-top");

  if (!backToTop) return;

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initSpeakersGrid();
    initBackToTop();
  });
} else {
  initSpeakersGrid();
  initBackToTop();
}
