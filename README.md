# University TechFest 2026

A responsive, multi-page university technology festival website developed as an individual assignment for Advanced Web Technologies (CS554).

## Project Overview

University TechFest is a university festival website that allows students to explore technology events, discover workshops and competitions, save events to their personal schedules, and complete a participant registration form.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Git and GitHub

## Website Pages

### 1. Home Page (`index.html`)
- Festival introduction and event information
- Countdown timer to the festival starting date
- Reasons to attend TechFest
- Sponsors section
- Two-day event schedule

### 2. Events Page (`events.html`)
- Dynamically generated event cards
- Event search functionality
- Filter events by type and day
- Sort events by time
- Add or remove events from a personal schedule
- Save scheduled events using localStorage

### 3. Registration Page (`register.html`)
- Participant registration form
- University email validation
- Student registration number validation
- Dynamic event selection
- Individual and team participation options
- Team size validation
- Registration summary after successful validation

## Key Features

- Responsive, mobile-first layout
- Light and dark theme support
- Theme preference saved using localStorage
- Dynamic event rendering using a shared JavaScript data array
- Event search, filtering and sorting
- Personal event scheduling
- Client-side form validation
- Event countdown timer

## Project Structure

```text
Assignment-1-TechFest/
│
├── index.html
├── events.html
├── register.html
├── README.md
├── .gitignore
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── events-data.js
│   ├── events.js
│   └── register.js
│
└── images/
```

## How to Run the Project

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Navigate between Home, Events and Register using the navigation menu.

No framework, package installation or build process is required.

## Data Storage

The project uses browser localStorage to save the user's theme preference and personal event schedule.

Registration is a client-side demonstration. It does not submit participant data to a server or create a confirmed university registration.

## Repository

GitHub Repository: https://github.com/HAQ271/University-TechFest

## Live Website

GitHub Pages: https://haq271.github.io/University-TechFest/

## Author

BSCS Student — University of Management and Technology (UMT)

## Academic Purpose

Developed for the CS554 Advanced Web Technologies course as an individual academic assignment.