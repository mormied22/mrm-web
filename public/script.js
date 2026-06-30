const config = window.siteConfig;

const selectors = {
  focusGrid: document.querySelector("[data-focus-grid]"),
  projectGrid: document.querySelector("[data-project-grid]"),
  notesList: document.querySelector("[data-notes-list]"),
  contactLinks: document.querySelector("[data-contact-links]"),
  navToggle: document.querySelector("[data-nav-toggle]"),
  navMenu: document.querySelector("[data-nav-menu]"),
  header: document.querySelector("[data-header]"),
  typedLine: document.querySelector("[data-typed]")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderFocusAreas() {
  if (!selectors.focusGrid || !config.focusAreas) return;

  selectors.focusGrid.innerHTML = config.focusAreas
    .map((item) => `
      <article class="focus-card reveal">
        <span class="card-index">${escapeHtml(item.title.slice(0, 2).toUpperCase())}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `)
    .join("");
}

function renderProjects() {
  if (!selectors.projectGrid || !config.projects) return;

  selectors.projectGrid.innerHTML = config.projects
    .map((item) => `
      <article class="project-card reveal">
        <div class="card-topline">
          <span class="badge">${escapeHtml(item.tag)}</span>
          <span class="card-dot" aria-hidden="true"></span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `)
    .join("");
}

function renderNotes() {
  if (!selectors.notesList || !config.notes) return;

  selectors.notesList.innerHTML = config.notes
    .map((item) => {
      const title = item.href
        ? `<a href="${escapeHtml(item.href)}">${escapeHtml(item.title)}</a>`
        : escapeHtml(item.title);

      return `
        <article class="note-item reveal ${item.href ? "note-link-item" : ""}">
          <span>${escapeHtml(item.date)}</span>
          <div>
            <h3>${title}</h3>
            <p>${escapeHtml(item.text)}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderContacts() {
  if (!selectors.contactLinks || !config.contact) return;

  selectors.contactLinks.innerHTML = config.contact
    .map((item) => `
      <a class="contact-link" href="${escapeHtml(item.href)}" rel="noreferrer">
        <span>${escapeHtml(item.label)}</span>
        <small>${escapeHtml(item.detail)}</small>
      </a>
    `)
    .join("");
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupNavigation() {
  if (!selectors.navToggle || !selectors.navMenu) return;

  selectors.navToggle.addEventListener("click", () => {
    const isOpen = selectors.navToggle.getAttribute("aria-expanded") === "true";
    selectors.navToggle.setAttribute("aria-expanded", String(!isOpen));
    selectors.navMenu.classList.toggle("open");
  });

  selectors.navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      selectors.navToggle.setAttribute("aria-expanded", "false");
      selectors.navMenu.classList.remove("open");
    }
  });

  window.addEventListener("scroll", () => {
    selectors.header.classList.toggle("scrolled", window.scrollY > 12);
  });
}

function setupTypingEffect() {
  const target = selectors.typedLine;
  if (!target) return;
  const text = target.dataset.typed || "Cyber Security Analyst";
  let index = 0;

  function typeNextCharacter() {
    target.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(typeNextCharacter, 55);
    }
  }

  window.setTimeout(typeNextCharacter, 350);
}

function init() {
  renderFocusAreas();
  renderProjects();
  renderNotes();
  renderContacts();
  setupNavigation();
  setupTypingEffect();
  setupRevealAnimations();
}

init();
