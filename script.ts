let patCount: number = 0;
let matCount: number = 0;

function renderFigures(): void {
    const pairsInput = document.getElementById('pairs-input') as HTMLInputElement;
    const pairsCount = parseInt(pairsInput.value) || 10; // Výchozí hodnota 10
    
    if (pairsCount <= 0) {
        alert('Zadejte kladné číslo!');
        return;
    }
    
    patCount = 0;
    matCount = 0;
    
    const container = document.getElementById('figures-container') as HTMLDivElement;
    container.innerHTML = '';
    
    const showPatCheckbox = document.getElementById('show-pat') as HTMLInputElement;
    const showMatCheckbox = document.getElementById('show-mat') as HTMLInputElement;
    
    for (let i = 0; i < pairsCount; i++) {
        // Vytvoření kontejneru pro řádek (dvojici)
        const rowDiv = document.createElement('div');
        rowDiv.className = 'figure-row';
        
        // Střídání pořadí pomocí modulo
        // Liché řádky (i=0,2,4,...): Pat, Mat
        // Sudé řádky (i=1,3,5,...): Mat, Pat
        if (i % 2 === 0) {
            // Lichý řádek (i je sudé od 0): Pat vlevo, Mat vpravo
            if (showPatCheckbox.checked) {
                const patImg = createFigureImage('imgs/pat.png', 'Pat', true);
                rowDiv.appendChild(patImg);
            }
            patCount++;
            
            if (showMatCheckbox.checked) {
                const matImg = createFigureImage('imgs/mat.png', 'Mat', false);
                rowDiv.appendChild(matImg);
            }
            matCount++;
        } else {
            // Sudý řádek (i je liché): Mat vlevo, Pat vpravo
            if (showMatCheckbox.checked) {
                const matImg = createFigureImage('imgs/mat.png', 'Mat', true);
                rowDiv.appendChild(matImg);
            }
            matCount++;
            
            if (showPatCheckbox.checked) {
                const patImg = createFigureImage('imgs/pat.png', 'Pat', false);
                rowDiv.appendChild(patImg);
            }
            patCount++;
        }
        
        container.appendChild(rowDiv);
    }
    
    // Aktualizace zobrazení počtu
    updateCountDisplay();
}

// Pomocná funkce pro vytvoření obrázku figurky
function createFigureImage(src: string, alt: string, isFirst: boolean): HTMLImageElement {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'figure';
    
    // Rozšíření 2: Zvýraznění první figurky v řádku
    if (isFirst) {
        if (alt === 'Pat') {
            img.classList.add('first-pat');
        } else if (alt === 'Mat') {
            img.classList.add('first-mat');
        }
    }
    
    return img;
}

// Funkce pro aktualizaci zobrazení počtu figurek
function updateCountDisplay(): void {
    const countDisplay = document.getElementById('count-display') as HTMLDivElement;
    countDisplay.textContent = `Počet figurek: PAT (${patCount}), MAT (${matCount})`;
}

// Rozšíření 3: Funkce pro reset
function resetFigures(): void {
    // Vymazání obsahu
    const container = document.getElementById('figures-container') as HTMLDivElement;
    container.innerHTML = '';
    
    // Reset počítadel
    patCount = 0;
    matCount = 0;
    
    // Aktualizace zobrazení
    updateCountDisplay();
}

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    // Nastavení výchozí hodnoty
    const pairsInput = document.getElementById('pairs-input') as HTMLInputElement;
    pairsInput.value = '10';
    
    // Výchozí zaškrtnutí checkboxů
    const showPatCheckbox = document.getElementById('show-pat') as HTMLInputElement;
    const showMatCheckbox = document.getElementById('show-mat') as HTMLInputElement;
    showPatCheckbox.checked = true;
    showMatCheckbox.checked = true;
    
    // Inicializace zobrazení počtu
    updateCountDisplay();
    
    // Připojení event listenerů
    const renderButton = document.getElementById('render-button') as HTMLButtonElement;
    renderButton.addEventListener('click', renderFigures);
    
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
    resetButton.addEventListener('click', resetFigures);
    
    // Umožnit spuštění vykreslení klávesou Enter v inputu
    pairsInput.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            renderFigures();
        }
    });
});
