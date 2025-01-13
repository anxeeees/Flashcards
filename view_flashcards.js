window.onload = function() {
    const allSets = JSON.parse(localStorage.getItem('flashcardSets')) || {};

    // Načtení jména setu z URL
    const urlParams = new URLSearchParams(window.location.search);
    const setName = urlParams.get('setName');

    if (setName && allSets[setName]) {
        const flashcards = allSets[setName];
        let currentIndex = 0;

        // Funkce pro zobrazení kartičky
        function showCard(index) {
            const flashcardContainer = document.getElementById('flashcard-container');
            const pageNumber = document.getElementById('page-number');

            const card = flashcards[index];
            const flashcardDiv = document.createElement('div');
            flashcardDiv.classList.add('flashcard');

            const flashcardInnerDiv = document.createElement('div');
            flashcardInnerDiv.classList.add('flashcard-inner');
            flashcardInnerDiv.classList.add('flip-card');
            flashcardInnerDiv.addEventListener('click', () => {
                flashcardInnerDiv.style.transform = flashcardInnerDiv.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
            });

            const frontDiv = document.createElement('div');
            frontDiv.classList.add('flashcard-front');
            frontDiv.innerHTML = `<p>${card.question}</p>`;

            const backDiv = document.createElement('div');
            backDiv.classList.add('flashcard-back');
            backDiv.innerHTML = `<p>${card.answer}</p>`;

            flashcardInnerDiv.appendChild(frontDiv);
            flashcardInnerDiv.appendChild(backDiv);
            flashcardDiv.appendChild(flashcardInnerDiv);
            flashcardContainer.innerHTML = ''; // Vymaže předchozí kartu
            flashcardContainer.appendChild(flashcardDiv);

            // Aktualizace čísla stránky
            pageNumber.textContent = `${currentIndex + 1} / ${flashcards.length}`;
        }

        // Zobrazíme první kartičku
        showCard(currentIndex);

        // Předchozí tlačítko
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                showCard(currentIndex);
            }
        });

        // Další tlačítko
        document.getElementById('next-btn').addEventListener('click', () => {
            if (currentIndex < flashcards.length - 1) {
                currentIndex++;
                showCard(currentIndex);
            }
        });
    } else {
        alert('Set not found!');
    }
};
