# ✨ FeelOri AI Chat Widget

A custom React widget that adds an AI-powered assistant to [FeelOri.com](https://feelori.com), helping users discover and explore Indian heritage jewelry.

---

## 🛠 Tech Stack

- React (with Vite bundler)
- Single-file UMD build for Shopify
- No external dependencies on production (self-contained)

---

## 📦 Build & Deploy

> These are the **local developer steps** (for you):

1. **Install dependencies**  
   ```bash
   pnpm install
Build the widget

bash
Copy
Edit
pnpm run build
This creates:

bash
Copy
Edit
dist/feelori-chat-widget.umd.js
dist/feelori-chat-widget.css
Upload to Shopify Files

Go to Shopify Admin → Content → Files

Upload dist/feelori-chat-widget.umd.js

Embed in theme
In your theme’s theme.liquid, just before </body>, add:

html
Copy
Edit
<div id="feelori-chat"></div>
<script src="SHOPIFY_CDN_URL_FROM_STEP_3" defer></script>
<script>
  window.addEventListener('load', function () {
    if (window.FeeloriChat && typeof window.FeeloriChat.mountFeeloriChat === 'function') {
      window.FeeloriChat.mountFeeloriChat();
    } else {
      console.error('FeeloriChat could not be initialized.');
    }
  });
</script>
📁 Project Structure
lua
Copy
Edit
feelori-ai-chat-widget/
├── src/              # React source code
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── dist/             # Production build output (ignored in git)
├── package.json
├── pnpm-lock.yaml
├── vite.config.js    # Build config (UMD output)
└── README.md
✅ Status
✔️ Live on: feelori.com
Built for: FeelOri – Indian heritage jewelry brand

📜 License
MIT – Feel free to explore and adapt.

Made with ❤️ by FeelOri & OpenAI-powered workflows.

yaml
Copy
Edit

---

### ⭐ **Done!**