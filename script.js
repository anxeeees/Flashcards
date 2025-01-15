// Předpokládejme, že máte část kódu pro zobrazení recent sets
window.onload = function() {
    const allSets = JSON.parse(localStorage.getItem('flashcardSets')) || {};
    const recentSetsContainer = document.querySelector('.sets-container');

    for (const setName in allSets) {
        const setButton = document.createElement('button');
        setButton.textContent = setName;

        // Tady se přidává událost kliknutí na tlačítko
        setButton.addEventListener('click', () => {
            // Po kliknutí na tlačítko přesměruje uživatele na stránku view_flashcards.html
            window.location.href = `view_flashcards.html?setName=${setName}`;
        });

        recentSetsContainer.appendChild(setButton);
    }
};

document.getElementById('save-json-set').addEventListener('click', () => {
    const fileInput = document.getElementById('upload-json');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a JSON file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const jsonData = JSON.parse(event.target.result);

            // Validace, že JSON obsahuje setName a cards
            if (jsonData.setName && Array.isArray(jsonData.cards) && jsonData.cards.every(card => card.question && card.answer)) {
                const setName = jsonData.setName;  // Název setu

                // Získání existujících setů z localStorage
                const allSets = JSON.parse(localStorage.getItem('flashcardSets')) || {};
                allSets[setName] = jsonData.cards;  // Uložení karet do setu

                // Uložení nového setu
                localStorage.setItem('flashcardSets', JSON.stringify(allSets));

                alert('Flashcard set saved successfully!');
                window.location.href = 'index.html';  // Přesměrování na hlavní stránku
            } else {
                alert("Invalid JSON structure. Ensure it contains 'setName' and an array of 'cards' with 'question' and 'answer' fields.");
            }
        } catch (error) {
            alert("Error reading or parsing the JSON file.");
            console.error(error);
        }
    };

    reader.readAsText(file); // Načtení souboru
});






