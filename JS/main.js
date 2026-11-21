/* =========================================
   TECHFEST - SHARED JAVASCRIPT
   Theme Management
   Event Countdown
========================================= */

// =========================================
// PART 1: THEME MANAGEMENT
// =========================================

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
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
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


// =========================================
// PART 2: EVENT COUNTDOWN
// =========================================

// Get the countdown elements.
const countdown = document.getElementById("countdown");

const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");

const countdownMessage = document.getElementById("countdownMessage");


// Set the festival starting date and time.
// JavaScript months start from 0:
// 0 = January, 11 = December.
const eventStartDate = new Date("2026-12-15T09:00:00+05:00").getTime();


// Add a leading zero to single-digit numbers.
function formatTime(value) {
    return String(value).padStart(2, "0");
}


// Update the countdown display.
function updateCountdown() {

    // Do nothing on pages without the countdown.
    if (!countdown) {
        return;
    }

    // Get the current time.
    const currentTime = new Date().getTime();

    // Calculate remaining milliseconds.
    const remainingTime = eventStartDate - currentTime;


    // Check whether the event has started.
    if (remainingTime <= 0) {

        countdownDays.textContent = "00";
        countdownHours.textContent = "00";
        countdownMinutes.textContent = "00";
        countdownSeconds.textContent = "00";

        countdownMessage.textContent =
            "TechFest has started! Enjoy the festival.";

        clearInterval(countdownInterval);

        return;
    }


    // Convert milliseconds into days, hours, minutes and seconds.
    const days = Math.floor(
        remainingTime / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (remainingTime / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (remainingTime / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (remainingTime / 1000) % 60
    );


    // Display the calculated values.
    countdownDays.textContent = formatTime(days);
    countdownHours.textContent = formatTime(hours);
    countdownMinutes.textContent = formatTime(minutes);
    countdownSeconds.textContent = formatTime(seconds);
}


// Start the countdown only if the countdown exists on this page.
let countdownInterval = null;

if (countdown) {
    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);
}
