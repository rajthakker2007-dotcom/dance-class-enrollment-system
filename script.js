// script.js – Live Preview + Fee Estimation

const nameInput = document.getElementById("studentName");
const styleSelect = document.getElementById("danceStyle");
const levelSelect = document.getElementById("level");
const batchSelect = document.getElementById("batchTiming");
const choreoSelect = document.getElementById("choreoType");
const notesArea = document.getElementById("notes");

// Summary elements
const summaryName = document.getElementById("summaryName");
const summaryStyle = document.getElementById("summaryStyle");
const summaryLevel = document.getElementById("summaryLevel");
const summaryBatch = document.getElementById("summaryBatch");
const summaryChoreo = document.getElementById("summaryChoreo");
const summaryFee = document.getElementById("summaryFee");
const summaryChoreoFee = document.getElementById("summaryChoreoFee");
const summaryTag = document.getElementById("summaryTag");
const summaryNotes = document.getElementById("summaryNotes");

// Fee calculation logic
function calculateFee(style, level, choreo) {
    if (!style || !level) return null;

    let base = 1200; // Base monthly fee

    // Style-based adjustments
    switch (style) {
        case "Bollywood": base += 200; break;
        case "Hip-Hop": base += 300; break;
        case "Classical": base += 250; break;
        case "Semi-Classical": base += 280; break;
        case "Contemporary": base += 350; break;
        case "Freestyle": base += 150; break;
    }

    // Level-based adjustments
    if (level === "Intermediate") base += 300;
    if (level === "Advanced") base += 600;

    // Choreo add-on (approx. one-time)
    let choreoAdd = 0;
    switch (choreo) {
        case "Solo": choreoAdd = 800; break;
        case "Duet": choreoAdd = 1200; break;
        case "Group": choreoAdd = 1500; break;
        case "Wedding Sangeet": choreoAdd = 2500; break;
        case "College Fest": choreoAdd = 2000; break;
        case "Competition": choreoAdd = 3000; break;
        default: choreoAdd = 0; // None
    }

    return { monthly: base, choreoAdd };
}

// Vibe tag
function buildTag(style, level, choreo) {
    if (!style && !level) return "Pick your options to see your dance vibe ✨";

    let parts = [];

    if (level === "Beginner") parts.push("Perfect start for building confidence.");
    if (level === "Intermediate") parts.push("Great balance of technique and fun.");
    if (level === "Advanced") parts.push("Performance-ready and stage focused.");

    if (style === "Bollywood") parts.push("Full-on filmy energy.");
    if (style === "Hip-Hop") parts.push("High swag and street style.");
    if (style === "Classical" || style === "Semi-Classical") parts.push("Graceful expressions and strong basics.");
    if (style === "Contemporary") parts.push("Storytelling through movement.");
    if (style === "Freestyle") parts.push("Chill, experimental and free flow.");

    if (choreo && choreo !== "None") {
        parts.push("Choreography tailored for " + choreo + ".");
    }

    return parts.join(" ");
}

// Update summary
function updateSummary() {
    const name = nameInput.value.trim();
    const style = styleSelect.value;
    const level = levelSelect.value;
    const batch = batchSelect.value;
    const choreo = choreoSelect.value;
    const notes = notesArea.value.trim();

    summaryName.textContent = "Student: " + (name || "—");
    summaryStyle.textContent = "Style: " + (style || "—");
    summaryLevel.textContent = "Level: " + (level || "—");
    summaryBatch.textContent = "Batch: " + (batch || "—");
    summaryChoreo.textContent = "Choreography: " + (choreo || "—");

    const feeInfo = calculateFee(style, level, choreo);
    if (feeInfo) {
        summaryFee.textContent = "Estimated Monthly Fee: ₹" + feeInfo.monthly;
        summaryChoreoFee.textContent =
            feeInfo.choreoAdd > 0
                ? "Approx. Choreo Add-on: ₹" + feeInfo.choreoAdd
                : "Approx. Choreo Add-on: Not selected";
    } else {
        summaryFee.textContent = "Estimated Monthly Fee: —";
        summaryChoreoFee.textContent = "Approx. Choreo Add-on: —";
    }

    summaryTag.textContent = buildTag(style, level, choreo);
    summaryNotes.textContent = notes
        ? "Note: " + notes
        : "Notes will appear here as you type…";
}

// Attach listeners
[
    nameInput,
    styleSelect,
    levelSelect,
    batchSelect,
    choreoSelect,
    notesArea
].forEach(el => {
    if (el) el.addEventListener("input", updateSummary);
});

// Initial call
updateSummary();

// Simple front-end validation demo on submit
const form = document.getElementById("enrollmentForm");
if (form) {
    form.addEventListener("submit", function (e) {
        const phone = document.getElementById("phone").value.trim();
        if (phone.length < 10) {
            alert("Please enter a valid 10-digit phone number.");
            e.preventDefault();
            return;
        }

        alert("Enrollment submitted successfully! (Demo front-end submission only)");
        e.preventDefault(); // remove this if you later connect backend
    });
}
