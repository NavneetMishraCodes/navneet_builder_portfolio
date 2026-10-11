# Navneet Mishra — Developer Portfolio

A responsive, static portfolio website showcasing five focus areas:

- Python automation
- Small-scale applications
- Website development
- Exploratory data analysis (EDA)
- Data cleaning and preprocessing

The site also includes project summaries for Caption Studio, Panjeta Agent, Finger Pointer, and Indian Rash Driving. The copy intentionally describes these as personal projects and suggests evidence to add; it does not invent client work, performance statistics, or completed demos.

## Run locally

You can open `index.html` directly in a browser. For a local server, from this folder run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Personalize before publishing

Open `script.js` and update `SITE_CONFIG`:

```js
const SITE_CONFIG = {
  email: "your-public-contact@example.com",
  github: "https://github.com/your-username",
  links: {
    captionSource: "https://github.com/your-username/your-repo",
    panjetaSource: "",
    fingerSource: "",
    drivingSource: ""
  }
};
```

- Use only real links you are comfortable sharing publicly.
- Empty link values are hidden automatically, so the site won't show fake URLs.
- Add a real email only if you want it public; the contact form builds an email draft and does not send messages to a backend.
- Verify the current status of each project, add actual screenshots/demos, and update descriptions before presenting a project as complete.
- Do not publish `.env` files, API keys, tokens, private datasets, or personal information.

## Deploy

This is a plain HTML/CSS/JavaScript site and requires no build step. You can host it on GitHub Pages or any static host. Upload `index.html`, `styles.css`, `script.js`, and this README (plus any assets you add) to the hosting provider.

## Files

- `index.html` — semantic structure and content
- `styles.css` — responsive visual design and CSS-only project illustrations
- `script.js` — mobile menu, project detail dialogs, and link/contact configuration
