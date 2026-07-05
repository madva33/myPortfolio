# Mohamed Ayman — Portfolio

Modern Brutalist / Editorial portfolio site. Static, no build step — open `index.html` directly, or drop the whole folder on any static host (GitHub Pages, Netlify, Vercel, etc.).

## Folder structure
```
portfolio/
├── index.html          → all markup/content
├── css/
│   └── style.css        → custom type scale, reveal animations, spine/tab, grain texture
└── js/
    ├── tailwind-config.js → color + font tokens (ink / paper / proof / pencil / charcoal / stone)
    └── main.js            → scroll reveal, nav, mobile menu, multi-step proposal form
```

Tailwind itself loads from the CDN (`cdn.tailwindcss.com`) inside `index.html`, so an internet connection is needed for styles + Google Fonts to load.

## Things to edit before you publish

| What | Where | Find |
|---|---|---|
| WhatsApp number | `index.html` | `201001234567` (3 places: hero CTA, nav, footer, bookmark tab) |
| Contact email | `js/main.js` | `hello@mohamedayman.dev` |
| Instagram / TikTok / Facebook / GitHub / LinkedIn | `index.html` | `yourhandle` |
| Stats in "PROVEN RESULTS" | `index.html`, `#results` section | `10+`, `5+`, `100%` — swap for real numbers once you have them |
| Featured projects | `index.html`, `#work` section | APEX / LEDGER / SPAM SHIELD — replace tags, years, or "VIEW CASE STUDY →" links once you have real case-study pages |

## Notes
- Dark mode is the default and only theme; sections alternate between near-black ("ink") and warm off-white ("paper") backgrounds for the magazine page-turn feel.
- Scroll animations respect `prefers-reduced-motion`.
- The proposal form has no backend — on submit it shows a success screen with a pre-filled `mailto:` link and a WhatsApp link compiled from the answers, so leads still reach you with zero server setup.
