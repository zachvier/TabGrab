# Zendesk TabGrab

![Version](https://img.shields.io/badge/Version-2.2.0-blue)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

**Well-behaved browser tabs for Zendesk agents.**

Zendesk TabGrab keeps your browser clutter-free by monitoring your navigation. If you open a new Zendesk ticket link but already have an agent tab open, Zendesk TabGrab automatically focuses your existing tab and closes the new one.

## Features

* **Automatic Tab Management:** Ensures only one Zendesk Agent tab is open at a time.
* **Focus Switching:** Instantly snaps focus to your active agent tab when clicking ticket links.
* **Privacy First:** Runs entirely locally in your browser with no external tracking.
* **Least-Privilege Routing:** Only handles top-level Zendesk navigations and ignores restricted chat, voice, talk, admin voice, and print routes.
* **Cross-Browser:** Available for Chrome and Firefox.
* **Modernized:** Built with Webpack 5 and Vanilla JS.

---

## Installation

### Chrome
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Zendesk%20TabGrab-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/zendesk-quicktab/fjoifbimocbapgodjieaecipndjciopm)

### Firefox
[![Firefox Add-ons](https://img.shields.io/badge/Firefox%20Add--ons-Zendesk%20TabGrab-orange?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/zendesk-tabgrab)

### Manual Install (Development)

Requires Node.js `>=20.9.0`.

**Chrome:**
1. Clone the repository and run `npm ci && npm test && npm run build:chrome`.
2. Go to `chrome://extensions`, enable **Developer Mode**, and click **Load Unpacked**.
3. Select the `dist/chrome` folder.

**Firefox:**
1. Clone the repository and run `npm ci && npm test && npm run build:firefox`.
2. Go to `about:debugging#/runtime/this-firefox` and click **Load Temporary Add-on**.
3. Select any file inside the `dist/firefox` folder.

---

## Development

```bash
# Clone the repo
git clone https://github.com/zachvivier/TabGrab.git
cd TabGrab

# Install dependencies
npm ci

# Run URL matching and route safety tests
npm test

# Check for high-severity dependency vulnerabilities
npm audit --audit-level=high

# Build for Chrome (outputs to dist/chrome)
npm run build:chrome

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
```

Each browser has its own API layer under `browser/chrome/` and `browser/firefox/`. The webpack build selects the correct folder via a `@browser` alias, keeping shared logic in `modules/` untouched.

---

## Pre-Ship Checklist

Run these before uploading a store package:

```bash
npm ci
npm test
npm audit --audit-level=high
npm run build:chrome
npm run build:firefox
```

Then manually load and test both builds:

* Chrome: load `dist/chrome` from `chrome://extensions` with Developer Mode enabled.
* Firefox: load `dist/firefox/manifest.json` from `about:debugging#/runtime/this-firefox`.
* Confirm Zendesk ticket links focus and route the existing agent tab, then close the duplicate tab.
* Confirm popup modes work: `All agent links`, `Just ticket links`, and `No links`.
* Confirm restricted routes are not intercepted: `/agent/chat`, `/agent/voice`, `/agent/talk`, `/agent/admin/voice`, and `/tickets/<id>/print`.
* Confirm the same behavior on macOS and Windows before store submission.

---

## Release Notes

### 2.2.0

* Dropped the broad `tabs` permission — tab handling now relies solely on the existing `*.zendesk.com` host permission, removing the "Read your browsing history" install warning.
* New toolbar icons with distinct enabled/disabled states, now with real 48px and 128px disabled variants.
* Redesigned the popup to match the new icon: navy backdrop, browser-window cards, teal highlight for the active mode.
* The popup now stays open after changing modes; click away or press Esc to dismiss it.
* Firefox: script injection now uses the `scripting` API (new `scripting` permission) instead of rebuilding code strings for `tabs.executeScript`.
* Fixed malformed popup markup (unclosed lists) and refreshed build dependencies to clear all `npm audit` findings.

### 2.1.1

* Ignored Zendesk "View original email" comment popups (`/tickets/<id>/comments/<id>/original_email`) so they open in their own window instead of being grabbed into the agent tab.
* Removed the first-run welcome page and unused packaged images for a smaller download.

### 2.1.0

* Hardened Zendesk URL parsing to reject lookalike domains and malformed URLs.
* Limited routing behavior to top-level navigation events and deduplicated repeated navigation callbacks.
* Narrowed extension-to-page messaging to the current Zendesk origin instead of a wildcard target.
* Removed all-tab scans used only for toolbar icon updates.
* Added route safety tests and an `npm test` pre-ship step.
* Updated build dependencies and dependency audit status.
* Clarified privacy disclosure for local-only Zendesk URL handling.

---

## Privacy

Zendesk TabGrab does not collect, transmit, or store personal data. All processing happens locally in your browser. The extension observes Zendesk URLs (`*.zendesk.com`) only to find, focus, and route your existing Zendesk agent tab. See [PRIVACY.md](PRIVACY.md) for details.

---

**Maintainer**: [zach](https://github.com/zachvivier) | Distributed under the Apache License 2.0.
