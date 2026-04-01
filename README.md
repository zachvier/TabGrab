# Zendesk TabGrab

![Version](https://img.shields.io/badge/Version-2.0.0-blue)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

**Well-behaved browser tabs for Zendesk agents.**

Zendesk TabGrab keeps your browser clutter-free by monitoring your navigation. If you open a new Zendesk ticket link but already have an agent tab open, Zendesk TabGrab automatically focuses your existing tab and closes the new one.

## Features

* **Automatic Tab Management:** Ensures only one Zendesk Agent tab is open at a time.
* **Focus Switching:** Instantly snaps focus to your active agent tab when clicking ticket links.
* **Privacy First:** Runs entirely locally in your browser with no external tracking.
* **Cross-Browser:** Available for Chrome and Firefox.
* **Modernized:** Built with Webpack 5 and Vanilla JS.

---

## Installation

### Chrome
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Zendesk%20TabGrab-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/zendesk-quicktab/fjoifbimocbapgodjieaecipndjciopm)

### Firefox
[![Firefox Add-ons](https://img.shields.io/badge/Firefox%20Add--ons-Zendesk%20TabGrab-orange?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/zendesk-tabgrab)

### Manual Install (Development)

**Chrome:**
1. Clone the repository and run `npm install && npm run build`.
2. Go to `chrome://extensions`, enable **Developer Mode**, and click **Load Unpacked**.
3. Select the `dist/chrome` folder.

**Firefox:**
1. Clone the repository and run `npm install && npm run build:firefox`.
2. Go to `about:debugging#/runtime/this-firefox` and click **Load Temporary Add-on**.
3. Select any file inside the `dist/firefox` folder.

---

## Development

```bash
# Clone the repo
git clone https://github.com/zachvier/TabGrab.git
cd TabGrab

# Install dependencies
npm install

# Build for Chrome (outputs to dist/chrome)
npm run build

# Build for Firefox (outputs to dist/firefox)
npm run build:firefox

# Watch mode (Chrome)
npm run dev

# Watch mode (Firefox)
npm run dev:firefox
```

### Project Structure

```
app/
  manifest.json              # Chrome (Manifest V3) — matches Chrome Web Store
  manifest.firefox.json      # Firefox (Manifest V2) — matches Firefox Add-ons
  javascripts/
    browser/
      chrome/                # Chrome-specific API layer (chrome.* — as published to Chrome Web Store)
        extension.js
        i18n.js
        listeners.js
        page_action.js
        storage.js
        tabs.js
      firefox/               # Firefox-specific API layer (webextension-polyfill — as published to Firefox Add-ons)
        extension.js
        i18n.js
        listeners.js
        page_action.js
        storage.js
        tabs.js
    modules/                 # Shared core logic
      browser.js
      popup.js
      templates.js
      url_match.js
      version.js
    popup.js                 # Popup entry point (shared)
    tabWatcher.js            # Background script entry point (shared)
    welcome.chrome.js        # Welcome page — Chrome
    welcome.firefox.js       # Welcome page — Firefox
```

Each browser has its own API layer under `browser/chrome/` and `browser/firefox/`. The webpack build selects the correct folder via a `@browser` alias, keeping shared logic in `modules/` untouched.

---

## Privacy

Zendesk TabGrab does not collect, transmit, or store any personal data. All processing happens locally in your browser. The extension only accesses Zendesk URLs (`*.zendesk.com`) to manage tab navigation. See [PRIVACY.md](PRIVACY.md) for details.

---

**Maintainer**: [zachvier](https://github.com/zachvier) | Distributed under the Apache License 2.0.
