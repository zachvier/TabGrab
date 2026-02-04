# Zendesk QuickTab

![Version](https://img.shields.io/chrome-web-store/v/fjoifbimocbapgodjieaecipndjciopm?label=Version&color=blue)
[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-chrome?logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/zendesk-quicktab/fjoifbimocbapgodjieaecipndjciopm)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

**Well-behaved browser tabs for Zendesk agents.**

QuickTab keeps your browser clutter-free by monitoring your navigation. If you open a new Zendesk ticket link but already have an agent tab open, QuickTab automatically focuses your existing tab and closes the new one.

![QuickTab Screenshot](app/images/screenshots/screenshot.png)

## ✨ Features

* **Automatic Tab Management:** Ensures only one Zendesk Agent tab is open at a time.
* **Focus Switching:** Instantly snaps focus to your active agent tab when clicking ticket links.
* **Privacy First:** Runs entirely locally in your browser with no external tracking.
* **Modernized:** A complete fork of the original 2020 extension, now built with **Webpack 5** and **Vanilla JS**.

---

## 🚀 Installation

### Option 1: Chrome Web Store (Recommended)
The easiest way to install. Updates are handled automatically.

[![Get it on Chrome Web Store](https://img.shields.io/badge/Get%20it%20on-Chrome%20Web%20Store-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/zendesk-quicktab/fjoifbimocbapgodjieaecipndjciopm)

### Option 2: Manual Install (No Building)
1.  Download the latest `.zip` from the [Releases Page](https://github.com/zachvier/QuickTab/releases).
2.  Unzip the file.
3.  Go to `chrome://extensions`, enable **Developer Mode**, and click **Load Unpacked**.
4.  Select the unzipped folder.

---

## 🛠️ Development

If you want to build the project from source or contribute:

```bash
# 1. Clone the repo
git clone [https://github.com/zachvier/QuickTab.git](https://github.com/zachvier/QuickTab.git)

# 2. Install dependencies
npm install

# 3. Build (Outputs to /dist)
npm run build

# 4. Watch mode (Auto-rebuild on change)
npm run dev
```

**Maintainer**: [zachvier](https://github.com/zachvier) | **Contributor**: [justcarlson](https://github.com/justcarlson) | Distributed under the Apache License 2.0.
