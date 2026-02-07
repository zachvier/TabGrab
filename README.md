# Zendesk TabGrab

![Version](https://img.shields.io/badge/Version-2.0.0-blue)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

**Well-behaved browser tabs for Zendesk agents.**

Zendesk TabGrab keeps your browser clutter-free by monitoring your navigation. If you open a new Zendesk ticket link but already have an agent tab open, Zendesk TabGrab automatically focuses your existing tab and closes the new one.

## ✨ Features

* **Automatic Tab Management:** Ensures only one Zendesk Agent tab is open at a time.
* **Focus Switching:** Instantly snaps focus to your active agent tab when clicking ticket links.
* **Privacy First:** Runs entirely locally in your browser with no external tracking.
* **Modernized:** Built with **Webpack 5** and **Vanilla JS**.

---

## 🚀 Installation

### Option 1: Chrome Web Store (Coming Soon)
Zendesk TabGrab v2.0 is currently being prepared for the Chrome Web Store.

### Option 2: Manual Install (Development)
1.  Clone the repository.
2.  Go to `chrome://extensions`, enable **Developer Mode**, and click **Load Unpacked**.
3.  Select the `dist` folder (after running build) or the `app` folder for development.

---

## 🛠️ Development

If you want to build the project from source or contribute:

```bash
# 1. Clone the repo
git clone https://github.com/zachvier/TabGrab.git

# 2. Install dependencies
npm install

# 3. Build (Outputs to /dist)
npm run build

# 4. Watch mode (Auto-rebuild on change)
npm run dev
```

**Maintainer**: [zachvier](https://github.com/zachvier) | Distributed under the Apache License 2.0.
