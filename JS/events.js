// ==========================================
// 1. EVENT DATA
// ==========================================

const events = [
    {
        id: 1,
        title: "Web Development Challenge",
        type: "competition",
        day: 1,
        time: "09:00",
        venue: "Computer Lab 1",
        seats: 30
    },
    {
        id: 2,
        title: "Introduction to Artificial Intelligence",
        type: "workshop",
        day: 1,
        time: "10:00",
        venue: "Seminar Hall",
        seats: 40
    },
    {
        id: 3,
        title: "Cybersecurity Capture the Flag",
        type: "competition",
        day: 1,
        time: "11:30",
        venue: "Computer Lab 2",
        seats: 25
    },
    {
        id: 4,
        title: "Future of Software Engineering",
        type: "talk",
        day: 1,
        time: "14:00",
        venue: "Main Auditorium",
        seats: 100
    },
    {
        id: 5,
        title: "Mobile App Development Workshop",
        type: "workshop",
        day: 2,
        time: "09:30",
        venue: "Computer Lab 1",
        seats: 35
    },
    {
        id: 6,
        title: "Competitive Programming Contest",
        type: "competition",
        day: 2,
        time: "11:00",
        venue: "Computer Lab 2",
        seats: 50
    },
    {
        id: 7,
        title: "Building AI-Powered Products",
        type: "talk",
        day: 2,
        time: "13:00",
        venue: "Main Auditorium",
        seats: 80
    },
    {
        id: 8,
        title: "UI/UX Design Workshop",
        type: "workshop",
        day: 2,
        time: "15:00",
        venue: "Design Studio",
        seats: 30
    }
];




/* =========================================
   2. SELECT HTML ELEMENTS
========================================= */

const eventGrid = document.getElementById("eventGrid");
const resultCount = document.getElementById("resultCount");
const noEventsMessage = document.getElementById("noEventsMessage");

const eventSearch = document.getElementById("eventSearch");
const typeFilter = document.getElementById("typeFilter");
const dayFilters = document.querySelectorAll('input[name="dayFilter"]');
const eventSort = document.getElementById("eventSort");

const savedScheduleCount = document.getElementById("savedScheduleCount");
const savedCount = document.getElementById("savedCount");


/* =========================================
   3. LOAD SAVED EVENTS FROM LOCAL STORAGE
========================================= */

let savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];


/* =========================================
   4. DISPLAY SAVED EVENT COUNT
========================================= */

function updateSavedCount() {

    const totalSaved = savedEvents.length;

    if (savedScheduleCount) {
        savedScheduleCount.textContent = totalSaved;
    }

    if (savedCount) {
        savedCount.textContent = totalSaved;
    }

}

/* =========================================
   5. DISPLAY EVENT CARDS
========================================= */

function displayEvents(eventList) {

    eventGrid.innerHTML = "";

    resultCount.textContent = `${eventList.length} events found`;

    if (eventList.length === 0) {

        noEventsMessage.hidden = false;
        updateSavedCount();

        return;
    }

    noEventsMessage.hidden = true;

    eventList.forEach(function(event) {

        const eventCard = document.createElement("article");

        eventCard.className = "event-card";

        const isSaved = savedEvents.includes(event.id);

        eventCard.innerHTML = `
            <div class="event-card-header">

                <span class="event-badge ${event.type}">
                    ${event.type}
                </span>

                <span class="event-day">
                    Day ${event.day}
                </span>

            </div>

            <h3>${event.title}</h3>

            <div class="event-details">

                <p><strong>Time:</strong> ${event.time}</p>

                <p><strong>Venue:</strong> ${event.venue}</p>

                <p><strong>Available Seats:</strong> ${event.seats}</p>

            </div>

            <button
                class="btn btn-primary add-to-schedule"
                data-id="${event.id}"
                type="button"
                aria-pressed="${isSaved}"
            >
                ${isSaved ? "Remove from My Schedule" : "Add to My Schedule"}
            </button>
        `;

        eventGrid.appendChild(eventCard);

    });

    updateSavedCount();

}


/* =========================================
   6. SEARCH, FILTER AND SORT EVENTS
========================================= */

function filterAndSortEvents() {

    const searchText = eventSearch.value.toLowerCase().trim();

    const selectedType = typeFilter.value;

    let selectedDay = "all";

    dayFilters.forEach(function(radio) {

        if (radio.checked) {
            selectedDay = radio.value;
        }

    });

    let filteredEvents = events.filter(function(event) {

        const matchesSearch = event.title.toLowerCase().includes(searchText);

        const matchesType =
            selectedType === "all" || event.type === selectedType;

        const matchesDay =
            selectedDay === "all" || event.day === Number(selectedDay);

        return matchesSearch && matchesType && matchesDay;

    });

    if (eventSort.value === "time-asc") {

        filteredEvents.sort(function(a, b) {
            return a.time.localeCompare(b.time);
        });

    } else if (eventSort.value === "time-desc") {

        filteredEvents.sort(function(a, b) {
            return b.time.localeCompare(a.time);
        });

    }

    displayEvents(filteredEvents);

}


/* =========================================
   7. ADD OR REMOVE EVENTS FROM SCHEDULE
========================================= */

eventGrid.addEventListener("click", function(event) {

    const clickedButton = event.target.closest(".add-to-schedule");

    if (!clickedButton) {
        return;
    }

    const eventId = Number(clickedButton.dataset.id);

    if (savedEvents.includes(eventId)) {

        savedEvents = savedEvents.filter(function(id) {
            return id !== eventId;
        });

    } else {

        savedEvents.push(eventId);

    }

    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

    filterAndSortEvents();

});


/* =========================================
   8. CONNECT SEARCH AND FILTER CONTROLS
========================================= */

eventSearch.addEventListener("input", filterAndSortEvents);

typeFilter.addEventListener("change", filterAndSortEvents);

dayFilters.forEach(function(radio) {

    radio.addEventListener("change", filterAndSortEvents);

});

eventSort.addEventListener("change", filterAndSortEvents);


/* =========================================
   9. INITIAL PAGE DISPLAY
========================================= */

filterAndSortEvents();
