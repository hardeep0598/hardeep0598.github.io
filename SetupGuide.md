# Space observatory Portfolio - Local Setup Guide

Welcome! This guide outlines the exact, simplified steps to run this premium space-exploration themed portfolio on your local computer.

## Prerequisites

Ensure you have the following installed on your computer:
*   **Node.js**: Version 18.x or higher (LTS recommended)
*   **npm** (bundled with Node.js) or **Yarn**

---

## 1. Extract the Project Files

1.  Download the ZIP file of this workspace (via the settings menu in the top-right corner of the AI Studio UI).
2.  Extract the archive into a folder of your choice, e.g., `~/Projects/portfolio`.
3.  Open your terminal and navigate to the project directory:
    ```bash
    cd /path/to/extracted/portfolio
    ```

---

## 2. Set Up Environment Variables

This portfolio doesn't strictly require any database or third-party connections in its client-only landing, but if you want to integrate server-side features later, you can copy the sample configuration:

```bash
cp .env.example .env
```

---

## 3. Install Dependencies

Install the locked package versions from your `package.json` file. Run:

```bash
npm install
```

This will automatically configure:
*   **Vite**: The lighting-fast module bundler.
*   **React 19**: Responsive layout rendering.
*   **Tailwind CSS v4**: High-performance, compile-time utilities.
*   **Motion**: Dynamic space coordinate and scrolling animations.
*   **Lucide React**: Premium minimalist iconography.

---

## 4. Run the Development Server

Start the local server. Run:

```bash
npm run dev
```

The terminal will print out your local network address:
```bash
  VITE v6.2.3  ready in 180 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open **`http://localhost:3000`** in your browser.

---

## 5. Build for Production

When you are ready to host the portfolio on GitHub Pages, Vercel, Netlify, or your own VPS, run:

```bash
npm run build
```

This command compiles, minifies, and optimises all assets into the static `/dist` directory. You can publish `/dist` directly to any static web hosting provider!
