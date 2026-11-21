/* =========================================
   TECHFEST - SHARED JAVASCRIPT
   Theme Management
========================================= */

// Find the theme toggle button.
const themeToggle = document.getElementById("themeToggle");

// Get the user's previously saved theme.
function getSavedTheme() {
    try {
        const savedTheme = localStorage.getItem("techfest-theme");

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
    } catch (error) {
        console.warn("Theme preference could not be accessed.");
    }

    return null;
}


// Detect the operating system's preferred theme.
function getSystemTheme() {
    if (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }

    return "light";
}


// Apply the selected theme to the website.
function applyTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    if (themeToggle) {

        themeToggle.textContent =
            theme === "dark" ? "Light Mode" : "Dark Mode";

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            theme === "dark" ? "true" : "false"
        );
    }
}


// Save the user's theme preference.
function saveTheme(theme) {
    try {
        localStorage.setItem("techfest-theme", theme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }
}


// Initialize the theme when a page loads.
function initializeTheme() {

    const savedTheme = getSavedTheme();

    const selectedTheme = savedTheme || getSystemTheme();

    applyTheme(selectedTheme);
}


// Change the theme when the button is clicked.
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const currentTheme =
            document.documentElement.getAttribute("data-theme") ||
            getSystemTheme();

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        saveTheme(newTheme);
    });
}


// Run theme initialization.
initializeTheme();
