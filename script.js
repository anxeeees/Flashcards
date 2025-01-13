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
