/*
  Portfolio configuration
  -----------------------
  Add your real public links here before publishing. Leave a value empty if
  the project repository is not public yet; its button will remain disabled.
*/
const SITE_CONFIG = {
  email: "itsnavneetmishra89@gmail.com", // Example: "hello@example.com" — use an address you are comfortable sharing
  github: "https://github.com/NavneetMishraCodes", // Example: "https://github.com/your-username"
  links: {
    captionSource: "https://github.com/NavneetMishraCodes", // Example: "https://github.com/your-username/caption-studio"
    panjetaSource: "https://github.com/NavneetMishraCodes/panjeta-agent",
    fingerSource: "https://github.com/NavneetMishraCodes/finger-pointer-bigass",
    drivingSource: "https://github.com/NavneetMishraCodes/Indian-Rash-Driving"
  }
};

const byId = (id) => document.getElementById(id);
const menuToggle = byId("menuToggle");
const navLinks = byId("navLinks");

byId("year").textContent = String(new Date().getFullYear());

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const isHttpsUrl = (value) => typeof value === "string" && /^https:\/\//i.test(value.trim());

// Project repository buttons stay visible, but only open a URL after one is configured.
document.querySelectorAll("[data-link-key]").forEach((link) => {
  const key = link.dataset.linkKey;
  const url = key === "github" ? SITE_CONFIG.github : SITE_CONFIG.links[key];

  if (isHttpsUrl(url)) {
    link.href = url.trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-unconfigured");
    link.title = "Open GitHub in a new tab";
  } else if (link.classList.contains("github-project-link")) {
    link.href = "#work";
    link.setAttribute("aria-disabled", "true");
    link.classList.add("is-unconfigured");
    link.title = "Add the repository URL in SITE_CONFIG in script.js";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const hint = byId("projectLinkHint");
      if (hint) {
        hint.textContent = "To activate this button, add the real repository URL to its matching entry in SITE_CONFIG in script.js.";
      }
    });
  } else {
    link.hidden = true;
  }
});

// Create a draft email instead of claiming to submit a form to a nonexistent backend.
const emailButton = byId("emailButton");
if (SITE_CONFIG.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email)) {
  emailButton.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Project inquiry")}`;
} else {
  emailButton.href = "#contact-form";
  emailButton.addEventListener("click", () => {
    byId("projectMessage").focus();
    byId("formHint").textContent = "To activate direct email contact, add your public email address in SITE_CONFIG in script.js.";
  });
}

byId("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = byId("projectMessage").value.trim();
  if (!message) {
    byId("formHint").textContent = "Add a short description first, then prepare your message.";
    byId("projectMessage").focus();
    return;
  }

  const draft = `Hi Navneet,\n\nI'd like to discuss this project:\n${message}\n\nCould we clarify the scope and next steps?`;
  if (SITE_CONFIG.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email)) {
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(draft)}`;
    byId("formHint").textContent = "Your email app should open with a draft. Review it before sending.";
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(draft).then(() => {
      byId("formHint").textContent = "Draft copied to clipboard. Add a contact email in script.js before publishing so visitors can reach you.";
    }).catch(() => {
      byId("formHint").textContent = draft;
    });
  } else {
    byId("formHint").textContent = draft;
  }
});
