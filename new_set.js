let flashcards = []; // Array to store flashcards
const setNameInput = document.getElementById('set-name');

// Add flashcard to the array
document.getElementById('add-card').addEventListener('click', () => {
    const flashcardContainer = document.getElementById('flashcard-container');
    const flashcardCount = flashcardContainer.children.length + 1; // Start from 3 since 2 default cards exist

    const flashcardDiv = document.createElement('div');
    flashcardDiv.classList.add('flashcard');
    flashcardDiv.innerHTML = `
        <label for="question-${flashcardCount}">Flashcard ${flashcardCount} - Front</label>
        <textarea id="question-${flashcardCount}" placeholder="Front of card"></textarea>
        <label for="answer-${flashcardCount}">Back</label>
        <textarea id="answer-${flashcardCount}" placeholder="Back of card"></textarea>
        <span class="delete-btn" onclick="deleteFlashcard(this)">&#10005;</span>
    `;

    flashcardContainer.appendChild(flashcardDiv);
});

// Save the set to localStorage
document.getElementById('save-set').addEventListener('click', () => {
    const setName = setNameInput.value.trim();
    const flashcardContainer = document.getElementById('flashcard-container');

    // Collect all flashcards, checking for content in the textarea fields
    flashcards = Array.from(flashcardContainer.getElementsByClassName('flashcard')).map((cardDiv, index) => {
        const question = cardDiv.querySelector(`#question-${index + 1}`).value.trim();
        const answer = cardDiv.querySelector(`#answer-${index + 1}`).value.trim();

        // Add the card only if both the question and answer fields are filled
        if (question && answer) {
            return { question, answer };
        }
    }).filter(card => card); // Remove any invalid (empty) cards

    // Ensure that a set name and at least one valid flashcard exist before saving
    if (setName && flashcards.length > 0) {
        // Get the existing sets from localStorage, or initialize as an empty object
        const allSets = JSON.parse(localStorage.getItem('flashcardSets')) || {};

        // Add the new set to the object, using the set name as the key
        allSets[setName] = flashcards;

        // Save the updated sets back to localStorage
        localStorage.setItem('flashcardSets', JSON.stringify(allSets));

        alert('Flashcard set saved');
        window.location.href = 'index.html'; // Redirect back to main page
    } else {
        alert('Please provide a set name and at least one flashcard');
    }
});

// Function to delete a flashcard
function deleteFlashcard(button) {
    const flashcardDiv = button.parentElement;
    flashcardDiv.remove();
}
