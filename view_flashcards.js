window.onload = function() {
    const allSets = JSON.parse(localStorage.getItem('flashcardSets')) || {};

    // Načtení jména setu z URL
    const urlParams = new URLSearchParams(window.location.search);
    const setName = urlParams.get('setName');

    if (setName && allSets[setName]) {
        let flashcards = allSets[setName];
        let currentIndex = 0;
        let filteredCards = flashcards; // Initially show all cards

        // Funkce pro zobrazení kartičky
        function showCard(index) {
            const flashcardContainer = document.getElementById('flashcard-container');
            const pageNumber = document.getElementById('page-number');

            const card = filteredCards[index];
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
            pageNumber.textContent = `${currentIndex + 1} / ${filteredCards.length}`;
        }

        // Funkce pro smazání kartičky
        function deleteCard() {
            // Pokud je v setu pouze jedna kartička
            if (flashcards.length === 1) {
                const confirmationPopup = confirm("There is only one card left in the set. Deleting it will remove the entire set. Are you sure you want to proceed?");
                if (confirmationPopup) {
                    deleteSet(); // Zavoláme funkci pro smazání celého setu
                }
            } else {
                // Pokud je více než jedna kartička
                const confirmationPopup = confirm("Are you sure you want to delete this card?");
                if (confirmationPopup) {
                    // Smaže kartičku
                    flashcards.splice(currentIndex, 1);

                    // Pokud smažeme kartičku na poslední pozici, přesuneme se na předchozí kartičku
                    if (currentIndex >= flashcards.length) {
                        currentIndex = flashcards.length - 1;
                    }

                    // Pokud je stále co zobrazit, aktualizujeme zobrazení
                    if (flashcards.length > 0) {
                        showCard(currentIndex);
                    } else {
                        alert('Set is empty!');
                    }

                    // Uložíme změny zpět do localStorage
                    allSets[setName] = flashcards;
                    localStorage.setItem('flashcardSets', JSON.stringify(allSets));
                }
            }
        }

        // Funkce pro smazání celého setu
        function deleteSet() {
            const confirmationPopup = confirm("Are you sure you want to delete this entire set?");
            if (confirmationPopup) {
                // Smaže celý set
                delete allSets[setName];

                // Uložíme změny zpět do localStorage
                localStorage.setItem('flashcardSets', JSON.stringify(allSets));

                window.location.href = 'index.html'; // Příklad přesměrování na stránku index.html (můžete upravit)
            }
        }

        // Funkce pro přiřazení kategorie
        function assignCategory(category) {
            filteredCards = flashcards.filter(card => card.category === category);
            currentIndex = 0; // Reset index for the selected category
            showCard(currentIndex);
        }

        // Funkce pro přidání/změnu kategorie k kartičce
        function addCategoryToCard(category) {
            const card = flashcards[currentIndex];
            card.category = category; // Update the category of the current card
            localStorage.setItem('flashcardSets', JSON.stringify(allSets)); // Save changes to localStorage
        }

        // Předchozí tlačítko
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                showCard(currentIndex);
            }
        });

        // Další tlačítko
        document.getElementById('next-btn').addEventListener('click', () => {
            if (currentIndex < filteredCards.length - 1) {
                currentIndex++;
                showCard(currentIndex);
            }
        });

        // Kategorické tlačítka
        document.getElementById('easy-btn').addEventListener('click', () => {
            assignCategory('easy');
        });

        document.getElementById('medium-btn').addEventListener('click', () => {
            assignCategory('medium');
        });

        document.getElementById('hard-btn').addEventListener('click', () => {
            assignCategory('hard');
        });

        // "All Cards" button: Show all cards in the set
        document.getElementById('all-cards-btn').addEventListener('click', () => {
            filteredCards = flashcards; // Reset to show all cards
            currentIndex = 0; // Reset index
            showCard(currentIndex);
        });

        // Tlačítka pro přidání kategorie k aktuální kartičce
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                addCategoryToCard(e.target.getAttribute('data-category'));
            });
        });

        // Zobrazíme první kartičku
        showCard(currentIndex);

        // Tlačítko pro smazání kartičky
        document.querySelector('.delete-card-btn').addEventListener('click', deleteCard);
    } else {
        alert('Set not found!');
    }
};
