# EV Charging Hub Fire Command App

This is a standalone web app. You can edit it with any code editor and run it in a browser without installing anything.

## Files

- `index.html` controls the page structure and visible sections.
- `styles.css` controls the UI design, colors, spacing, and responsive layout.
- `app.js` controls the interactive logic, canvas map, sliders, buttons, and changing recommendations.
- `run-app.ps1` opens the app in your default browser.

## Run The App

Double-click `index.html`, or run this PowerShell command from this folder:

```powershell
.\run-app.ps1
```

## Edit The App

Open the folder in VS Code or any editor, change the code, then refresh the browser.

Common edits:

- Change the title: edit the `<h1>` text in `index.html`.
- Change colors: edit the variables near the top of `styles.css`.
- Change response logic: edit `routeForState()` and `buildPlan()` in `app.js`.
- Change the animated map: edit `drawTwin()` in `app.js`.

## Notes

The app uses only HTML, CSS, and JavaScript. There are no external packages, no build step, and no internet requirement.
