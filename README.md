# Firegrid-Application
🎯 Motive Behind the App
The primary motive is to act as a live response planner and command center for emergency responders dealing with electric vehicle (EV) fires in underground parking hubs. EV fires (specifically lithium-ion thermal runaways) are highly unpredictable, generate toxic smoke, and are extremely difficult to extinguish. This app solves the problem of cognitive overload during an emergency by providing an interactive "Tenable Path Twin"—a visual map that helps commanders instantly calculate safe evacuation routes, track smoke spread, and deploy suppression tactics based on real-time variables.

💻 Languages Used
The app is built entirely with Vanilla Web Technologies (Zero-Dependency Architecture):

HTML5: Provides the semantic structure and accessible elements (using <canvas>, <article>, <section>, etc.).

CSS3: Handles the dark-mode UI, responsive grid/flexbox layouts, custom variables, and interactive states.

JavaScript (ES6): Powers the core logic, state management, event listeners, and the dynamic rendering of the interactive map using the HTML5 Canvas API.

PowerShell: The .ps1 scripts provide a quick way to launch a local HTTP server for testing.

⚙️ Core Functions
The Tenable Path Twin (Canvas Map): The drawTwin() function continuously re-renders a 2D map of the parking basement. It visualizes the fire location, dynamically expands the smoke radius based on user input, and draws the optimal evacuation flow or refuge hold areas.

Dynamic Egress Scoring: The scoreEgress() function calculates a real-time safety percentage (6% to 96%) based on current smoke density, heat levels, stair pressurization, and whether primary/secondary stairs are blocked.

Algorithmic Decision Engine: The routeForState() function analyzes the current inputs (e.g., if Stair A is blocked by smoke and a casualty is present) to automatically generate the best tactical decision and rationale.

Phased Playbook System: Users can toggle between operational phases ("Initial Attack," "Stabilization," "Recovery") and view specific checklists for Evacuation, Suppression, Smoke Control, and Prevention.

Professional README.md
Markdown
# EV Charging Hub Fire Command

![Desktop Preview](app-preview.jpg)

A low-visibility evacuation and lithium-ion suppression board designed for multi-level underground parking fires. This application acts as a live response planner and an experimental "Tenable Path Twin" to assist in real-time decision-making during complex electric vehicle (EV) thermal runaway incidents.

## 🚀 Overview & Motive

Managing an EV battery fire in an enclosed underground space presents extreme hazards, including rapid thermal runaway, toxic gas accumulation, and complex evacuation logistics. 

The motive behind this application is to reduce cognitive load for incident commanders by providing an interactive dashboard that visualizes the hazard zone. By inputting live variables (smoke density, heat levels, stair availability), responders receive immediate, algorithm-driven recommendations on egress routing, ventilation strategies, and suppression priorities.

## ✨ Key Features

* **Tenable Path Twin (Live Map):** An interactive HTML5 Canvas map that visually tracks the basement EV fire, dynamic smoke movement, battery storage (ESS) exposures, and primary/secondary egress paths.
* **Dynamic Decision Engine:** Calculates real-time "Egress Confidence" scores (from Guarded to Critical) based on live inputs such as stair pressurization and casualty locations.
* **Phased Incident Command:** Distinct, targeted priorities broken down into three operational phases:
    * **0-15 min:** Initial Attack
    * **15-45 min:** Stabilization
    * **Recovery:** Post-knockdown
* **Comprehensive Playbook:** Tabbed quick-reference guides for Evacuation, Suppression, Smoke Control, and Prevention tactics.

![Mobile Preview](app-mobile-preview.jpg)

## 🛠️ Tech Stack & Architecture

This application features a **Zero-Dependency Architecture**, meaning it requires no external libraries, package managers, or internet connection to run—crucial for offline use in emergency command centers.

* **HTML5:** Semantic UI structure and accessible ARIA roles.
* **CSS3:** Custom properties, CSS Grid/Flexbox layouts, and a responsive design that scales from mobile devices to large command center displays.
* **Vanilla JavaScript (ES6):** Handles state management, dynamic DOM updates, egress scoring algorithms, and the `requestAnimationFrame`-driven HTML5 Canvas rendering.

## 🏃‍♂️ How to Run Locally

Since this is a client-side only application, getting it running is incredibly straightforward.

### Method 1: Direct File Access (Easiest)
1. Clone this repository or download the files.
2. Double-click `index.html` to open it in your default web browser.

### Method 2: Local Server (Recommended)
If you want to run it via a local HTTP server, use the included PowerShell scripts (Windows).
1. Open PowerShell in the project directory.
2. Run `.\serve-static.ps1` to start a local web server (defaults to port 8787).
3. Navigate to `http://localhost:8787` in your browser.

*Note: You can also use `.\run-app.ps1` to launch the HTML file directly via PowerShell.*

## 📂 File Structure
```text
/
├── index.html            # Main application layout and structure
├── styles.css            # Styling, layout grids, and responsive breakpoints
├── app.js                # Core logic, state management, and canvas rendering
├── serve-static.ps1      # Utility script to spin up a local TCP listener server
├── run-app.ps1           # Utility script to launch the app
├── app-preview.jpg       # Desktop preview image
└── app-mobile-preview.jpg# Mobile preview image
📚 Reference Basis
The tactical recommendations, hazard models, and operational sequences built into this planner are based on established safety protocols and studies from:

USFA (U.S. Fire Administration) Lithium-Ion Response

NHTSA EV Emergency Response Guides

NTSB EV Battery Fire Risks

NFPA EV Quick Reference
