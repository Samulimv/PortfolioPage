function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const feedback = document.getElementById("feedback").value.trim();
    const activities = Array.from(document.querySelectorAll('input[name="activities"]:checked')).map(checkbox => checkbox.value);
    const isAnonymous = document.getElementById("anonymous").checked;

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    let errorMessage = "";

    if (!isAnonymous && name === "") {
        errorMessage += "Name is required.\n";
    }
    if (!isAnonymous && email === "") {
        errorMessage += "Email is required.\n";
    } else if (!isAnonymous && !emailPattern.test(email)) {
        errorMessage += "Please enter a valid email address.\n";
    }
    if (feedback === "") {
        errorMessage += "Feedback is required.\n";
    }
    if (errorMessage) {
        alert(errorMessage);
        return false;
    }

    submitFeedback(name, email, feedback, activities, isAnonymous);
    return false;
}

function submitFeedback(nameInput, emailInput, feedbackInput, activities, isAnonymous) {
    const nameToDisplay = isAnonymous ? "Anonymous" : (nameInput || "Guest");
    const emailToDisplay = isAnonymous ? "N/A" : emailInput;

    const feedbackMessage = feedbackInput;

    const feedbackObject = {
        name: nameToDisplay,
        email: emailToDisplay,
        feedback: feedbackMessage,
        activities: activities.join(", ") || "None selected"
    };

    saveFeedbackToLocalStorage(feedbackObject);
    displayFeedback();

    document.getElementById("survey-form").reset();
}

function saveFeedbackToLocalStorage(feedback) {
    const feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    feedbackList.push(feedback);

    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
}

function displayFeedback() {
    const feedbackTableBody = document.querySelector("#feedbackDisplay tbody");
    feedbackTableBody.innerHTML = "";

    const feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

    feedbackList.forEach(item => {
        const newRow = feedbackTableBody.insertRow();

        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const feedbackCell = newRow.insertCell(2);
        const activitiesCell = newRow.insertCell(3);

        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        feedbackCell.textContent = item.feedback;
        activitiesCell.textContent = item.activities;
    });
}

window.onload = function() {
    displayFeedback();
};

function toggleNameEmailRequirements() {
    const isAnonymous = document.getElementById("anonymous").checked;
    document.getElementById("name").required = !isAnonymous;
    document.getElementById("email").required = !isAnonymous;
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
