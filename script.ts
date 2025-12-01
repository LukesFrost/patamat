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
        const rowDiv = document.createElement('div');
        rowDiv.className = 'figure-row';

        if (i % 2 === 0) {
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
    updateCountDisplay();
}

function createFigureImage(src: string, alt: string, isFirst: boolean): HTMLImageElement {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'figure';

    if (isFirst) {
        if (alt === 'Pat') {
            img.classList.add('first-pat');
        } else if (alt === 'Mat') {
            img.classList.add('first-mat');
        }
    }
    
    return img;
}

function updateCountDisplay(): void {
    const countDisplay = document.getElementById('count-display') as HTMLDivElement;
    countDisplay.textContent = `Počet figurek: PAT (${patCount}), MAT (${matCount})`;
}

function resetFigures(): void {
    const container = document.getElementById('figures-container') as HTMLDivElement;
    container.innerHTML = '';

    patCount = 0;
    matCount = 0;

    updateCountDisplay();
}


document.addEventListener('DOMContentLoaded', () => {

    const pairsInput = document.getElementById('pairs-input') as HTMLInputElement;
    pairsInput.value = '10';

    const showPatCheckbox = document.getElementById('show-pat') as HTMLInputElement;
    const showMatCheckbox = document.getElementById('show-mat') as HTMLInputElement;
    showPatCheckbox.checked = true;
    showMatCheckbox.checked = true;
    
    updateCountDisplay();

    const renderButton = document.getElementById('render-button') as HTMLButtonElement;
    renderButton.addEventListener('click', renderFigures);
    
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
    resetButton.addEventListener('click', resetFigures);
});
