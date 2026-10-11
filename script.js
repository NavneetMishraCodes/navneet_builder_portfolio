/*
  Portfolio configuration
  -----------------------
  Add your real public links here before publishing. Leave a value as an empty
  string to keep its link hidden; the site will not invent URLs or credentials.
*/
const SITE_CONFIG = {
  email: "", // Example: "hello@example.com" — replace with an address you are comfortable sharing
  github: "", // Example: "https://github.com/your-username"
  links: {
    captionSource: "",
    panjetaSource: "",
    fingerSource: "",
    drivingSource: ""
  }
};

const projectData = {
  caption: {
    kicker: "PYTHON · DESKTOP APPLICATION",
    title: "Caption Studio",
    description: "A desktop-app project exploring a video transcription and caption workflow. The interface is built with PySide6 and the media pipeline uses FFmpeg and faster-whisper.",
    focus: "Making media-processing steps easier to operate from a desktop interface, with attention to workflow clarity and export behavior.",
    tech: "Python, PySide6, FFmpeg, faster-whisper.",
    proof: "Add a short screen recording, supported input/output formats, setup instructions, and a test sample that can be shared safely. Verify the current build before linking it as a finished deliverable.",
    sourceKey: "captionSource"
  },
  panjeta: {
    kicker: "PYTHON · LLM TOOLING",
    title: "Panjeta Agent",
    description: "A CLI assistant project designed to combine an LLM layer with registered tools for practical tasks, including file operations and provider failover.",
    focus: "Keeping provider adapters, tool execution, error handling, and approval behavior organized as separate responsibilities.",
    tech: "Python, LLM APIs, tool registry, session persistence, approval flow.",
    proof: "Add an architecture diagram, example terminal session, setup steps, a list of implemented tools, and tests demonstrating provider failure handling. Never publish API keys or session data.",
    sourceKey: "panjetaSource"
  },
  finger: {
    kicker: "COMPUTER VISION · INPUT",
    title: "Finger Pointer",
    description: "A webcam-based touchless mouse-controller project that tracks hand landmarks and maps palm movement to cursor motion, with smoothing and gesture recognition.",
    focus: "Combining real-time capture, landmark-based tracking, screen mapping, smoothing, and gesture-triggered actions into one pipeline.",
    tech: "Python, MediaPipe, OpenCV, PyAutoGUI.",
    proof: "Add a short demo under good lighting, list tested gestures and limitations, document camera/display requirements, and keep a visible way to stop pointer control safely.",
    sourceKey: "fingerSource"
  },
  driving: {
    kicker: "WEB · INTERACTIVE 3D",
    title: "Indian Rash Driving",
    description: "A browser-game project exploring a 3D driving experience with web technologies and game-style interaction.",
    focus: "Building an interactive browser experience and iterating on controls, scene rendering, and performance for modest hardware.",
    tech: "JavaScript, Three.js, Vite.",
    proof: "Add a playable demo link, browser/keyboard controls, a short gameplay clip, known limitations, and performance notes from hardware you actually tested.",
    sourceKey: "drivingSource"
  }
};

const byId = (id) => document.getElementById(id);
const menuToggle = byId("menuToggle");
const navLinks = byId("navLinks");
const dialog = byId("projectDialog");

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

// Only show a project / GitHub link when a real URL has been added in SITE_CONFIG.
document.querySelectorAll("[data-link-key]").forEach((link) => {
  const key = link.dataset.linkKey;
  const url = key === "github" ? SITE_CONFIG.github : SITE_CONFIG.links[key];
  if (url && /^https:\/\//i.test(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  }
});

function openProject(key) {
  const project = projectData[key];
  if (!project) return;
  byId("dialogKicker").textContent = project.kicker;
  byId("dialogTitle").textContent = project.title;
  byId("dialogDescription").textContent = project.description;
  byId("dialogFocus").textContent = project.focus;
  byId("dialogTech").textContent = project.tech;
  byId("dialogProof").textContent = project.proof;
  const source = byId("dialogSource");
  const sourceUrl = SITE_CONFIG.links[project.sourceKey];
  if (sourceUrl && /^https:\/\//i.test(sourceUrl)) {
    source.href = sourceUrl;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.hidden = false;
  } else {
    source.hidden = true;
  }
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "open");
}

document.querySelectorAll(".project-details").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});
byId("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// Create a draft email instead of claiming to submit a form to a nonexistent backend.
const emailButton = byId("emailButton");
if (SITE_CONFIG.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email)) {
  emailButton.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Project inquiry")}`;
} else {
  emailButton.href = "#contact-form";
  emailButton.addEventListener("click", () => {
    byId("projectMessage").focus();
    byId("formHint").textContent = "To activate direct contact, add your public email address in SITE_CONFIG in script.js.";
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
  if (SITE_CONFIG.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email)) {
    const subject = "Project inquiry";
    const body = `Hi Navneet,\n\nI'd like to discuss this project:\n${message}\n\nCould we clarify the scope and next steps?`;
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    byId("formHint").textContent = "Your email app should open with a draft. Review it before sending.";
  } else {
    const draft = `Hi Navneet,\n\nI'd like to discuss this project:\n${message}\n\nCould we clarify the scope and next steps?`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(draft).then(() => {
        byId("formHint").textContent = "Draft copied to clipboard. Add a contact email in script.js before publishing so visitors can reach you.";
      }).catch(() => {
        byId("formHint").textContent = draft;
      });
    } else {
      byId("formHint").textContent = draft;
    }
  }
});
