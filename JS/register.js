/* ==========================================
   TECHFEST REGISTRATION SYSTEM
   ========================================== */


/* ==========================================
   1. GET HTML ELEMENTS
   ========================================== */

const registrationForm = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const universityEmail = document.getElementById("universityEmail");
const registrationNumber = document.getElementById("registrationNumber");
const selectedEvent = document.getElementById("selectedEvent");
const teamSize = document.getElementById("teamSize");
const tshirtSize = document.getElementById("tshirtSize");
const terms = document.getElementById("terms");

const participationOptions = document.querySelectorAll(
    'input[name="participation"]'
);

const formMessage = document.getElementById("formMessage");


/* ==========================================
   2. GET FIELD ERROR ELEMENTS
   ========================================== */

const errors = {
    fullName: document.getElementById("fullNameError"),
    universityEmail: document.getElementById("universityEmailError"),
    registrationNumber: document.getElementById("registrationNumberError"),
    selectedEvent: document.getElementById("selectedEventError"),
    teamSize: document.getElementById("teamSizeError"),
    participation: document.getElementById("participationError"),
    tshirtSize: document.getElementById("tshirtSizeError"),
    terms: document.getElementById("termsError")
};


/* ==========================================
   3. GENERATE EVENT DROPDOWN
   ========================================== */

function populateEventOptions() {

    selectedEvent.innerHTML = '<option value="">Choose an event</option>';

    events.forEach(function (event) {

        const option = document.createElement("option");

        option.value = String(event.id);

        option.textContent = event.title;

        selectedEvent.appendChild(option);

    });

}


/* ==========================================
   4. GET SELECTED PARTICIPATION TYPE
   ========================================== */

function getParticipationType() {

    const selectedOption = document.querySelector(
        'input[name="participation"]:checked'
    );

    if (!selectedOption) {
        return "";
    }

    return selectedOption.value;

}


/* ==========================================
   5. DISPLAY AND CLEAR FIELD ERRORS
   ========================================== */

function showError(fieldName, message) {

    errors[fieldName].textContent = message;

}

function clearError(fieldName) {

    errors[fieldName].textContent = "";

}


/* ==========================================
   6. VALIDATE FULL NAME
   ========================================== */

function validateFullName() {

    const name = fullName.value.trim();

    if (name === "") {

        showError("fullName", "Please enter your full name.");
        return false;

    }

    if (name.length < 3) {

        showError("fullName", "Name must contain at least 3 characters.");
        return false;

    }

    if (!/^[A-Za-z\s'-]+$/.test(name)) {

        showError("fullName", "Please enter a valid name.");
        return false;

    }

    clearError("fullName");
    return true;

}


/* ==========================================
   7. VALIDATE UNIVERSITY EMAIL
   ========================================== */

function validateUniversityEmail() {

    const email = universityEmail.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.edu\.pk$/i;

    if (email === "") {

        showError("universityEmail", "Please enter your university email.");
        return false;

    }

    if (!emailPattern.test(email)) {

        showError(
            "universityEmail",
            "Email must be a valid address ending in .edu.pk."
        );

        return false;

    }

    clearError("universityEmail");
    return true;

}


/* ==========================================
   8. VALIDATE REGISTRATION NUMBER
   ========================================== */

function validateRegistrationNumber() {

    const registrationNo = registrationNumber.value.trim();

    // F or S + 4-digit year + 6-digit student ID
    const registrationPattern = /^[FS][0-9]{10}$/;

    if (registrationNo === "") {

        showError(
            "registrationNumber",
            "Please enter your registration number."
        );

        return false;

    }

    // Check the registration number's structure.
    if (!registrationPattern.test(registrationNo)) {

        showError(
            "registrationNumber",
            "Format must be F or S + 4-digit year + 6-digit student ID."
        );

        return false;

    }

    // Extract the admission year.
    const admissionYear = Number(registrationNo.substring(1, 5));

    // Get the current calendar year.
    const currentYear = new Date().getFullYear();

    // Reject future admission years.
    if (admissionYear > currentYear) {

        showError(
            "registrationNumber",
            "Future admission years are not allowed."
        );

        return false;

    }

    clearError("registrationNumber");
    return true;

}

/* ==========================================
   9. VALIDATE EVENT SELECTION
   ========================================== */

function validateSelectedEvent() {

    const eventId = Number(selectedEvent.value);

    const eventExists = events.some(function (event) {

        return event.id === eventId &&
            String(event.id) === selectedEvent.value;

    });

    if (selectedEvent.value === "" || !eventExists) {

        showError(
            "selectedEvent",
            "Please select a valid event from the event list."
        );

        return false;

    }

    clearError("selectedEvent");
    return true;

}


/* ==========================================
   10. VALIDATE TEAM SIZE
   ========================================== */

function validateTeamSize() {

    const size = Number(teamSize.value);

    const participation = getParticipationType();

    if (teamSize.value === "") {

        showError("teamSize", "Please select your team size.");
        return false;

    }

    if (!Number.isInteger(size) || size < 1 || size > 4) {

        showError("teamSize", "Team size must be between 1 and 4.");
        return false;

    }

    if (participation === "individual" && size !== 1) {

        showError(
            "teamSize",
            "Individual participation requires a team size of 1."
        );

        return false;

    }

    if (participation === "team" && size < 2) {

        showError(
            "teamSize",
            "Team participation requires at least 2 members."
        );

        return false;

    }

    clearError("teamSize");
    return true;

}


/* ==========================================
   11. VALIDATE PARTICIPATION TYPE
   ========================================== */

function validateParticipation() {

    const participation = getParticipationType();

    if (participation === "") {

        showError(
            "participation",
            "Please select individual or team participation."
        );

        return false;

    }

    clearError("participation");
    return true;

}


/* ==========================================
   12. VALIDATE T-SHIRT SIZE
   ========================================== */

function validateTshirtSize() {

    const allowedSizes = ["S", "M", "L", "XL"];

    if (!allowedSizes.includes(tshirtSize.value)) {

        showError("tshirtSize", "Please select a valid T-shirt size.");
        return false;

    }

    clearError("tshirtSize");
    return true;

}


/* ==========================================
   13. VALIDATE TERMS AND CONDITIONS
   ========================================== */

function validateTerms() {

    if (!terms.checked) {

        showError(
            "terms",
            "You must accept the terms and conditions."
        );

        return false;

    }

    clearError("terms");
    return true;

}


/* ==========================================
   14. DISPLAY REGISTRATION SUMMARY
   ========================================== */

function displayRegistrationSummary(event) {

    const participation = getParticipationType();

    const summaryCard = document.createElement("section");

    summaryCard.className = "registration-summary";
    summaryCard.setAttribute("aria-labelledby", "summaryTitle");

    const heading = document.createElement("h2");

    heading.id = "summaryTitle";
    heading.textContent = "Registration Summary";

    summaryCard.appendChild(heading);

    const details = [
        ["Full Name", fullName.value.trim()],
        ["University Email", universityEmail.value.trim()],
        ["Registration Number", registrationNumber.value.trim()],
        ["Selected Event", event.title],
        ["Participation Type", participation],
        ["Team Size", teamSize.value + " Member(s)"],
        ["T-Shirt Size", tshirtSize.value]
    ];

    details.forEach(function (detail) {

        const paragraph = document.createElement("p");

        const label = document.createElement("strong");

        label.textContent = detail[0] + ": ";

        const value = document.createTextNode(detail[1]);

        paragraph.appendChild(label);
        paragraph.appendChild(value);

        summaryCard.appendChild(paragraph);

    });

    const oldSummary = document.querySelector(".registration-summary");

    if (oldSummary) {
        oldSummary.remove();
    }

    registrationForm.insertAdjacentElement("afterend", summaryCard);

    formMessage.textContent =
        "Your form has passed validation. This is a demonstration summary, not a confirmed registration.";

    formMessage.classList.add("success-message");

}


/* ==========================================
   15. HANDLE FORM SUBMISSION
   ========================================== */

registrationForm.addEventListener("submit", function (e) {

    e.preventDefault();

    formMessage.textContent = "";
    formMessage.classList.remove("success-message");

    const oldSummary = document.querySelector(".registration-summary");

    if (oldSummary) {
        oldSummary.remove();
    }

    const nameValid = validateFullName();

    const emailValid = validateUniversityEmail();

    const registrationValid = validateRegistrationNumber();

    const eventValid = validateSelectedEvent();

    const participationValid = validateParticipation();

    const teamSizeValid = validateTeamSize();

    const tshirtValid = validateTshirtSize();

    const termsValid = validateTerms();

    const formIsValid =
        nameValid &&
        emailValid &&
        registrationValid &&
        eventValid &&
        participationValid &&
        teamSizeValid &&
        tshirtValid &&
        termsValid;

    if (!formIsValid) {

        formMessage.textContent =
            "Please correct the errors before submitting your registration.";

        formMessage.classList.remove("success-message");

        return;

    }

    const eventId = Number(selectedEvent.value);

    const registeredEvent = events.find(function (event) {

        return event.id === eventId;

    });

    displayRegistrationSummary(registeredEvent);

});


/* ==========================================
   16. CLEAR ERRORS WHEN USERS MAKE CHANGES
   ========================================== */

fullName.addEventListener("input", function () {
    clearError("fullName");
});

universityEmail.addEventListener("input", function () {
    clearError("universityEmail");
});

registrationNumber.addEventListener("input", function () {
    clearError("registrationNumber");
});

selectedEvent.addEventListener("change", function () {
    clearError("selectedEvent");
});

teamSize.addEventListener("change", function () {
    clearError("teamSize");
});

participationOptions.forEach(function (radio) {

    radio.addEventListener("change", function () {

        clearError("participation");
        clearError("teamSize");

    });

});

tshirtSize.addEventListener("change", function () {
    clearError("tshirtSize");
});

terms.addEventListener("change", function () {
    clearError("terms");
});


/* ==========================================
   17. INITIALIZE REGISTRATION PAGE
   ========================================== */

populateEventOptions();
