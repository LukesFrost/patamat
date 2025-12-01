var patCount = 0;
var matCount = 0;
function renderFigures() {
    var pairsInput = document.getElementById('pairs-input');
    var pairsCount = parseInt(pairsInput.value) || 10; // Výchozí hodnota 10
    if (pairsCount <= 0) {
        alert('Zadejte kladné číslo!');
        return;
    }
    patCount = 0;
    matCount = 0;
    var container = document.getElementById('figures-container');
    container.innerHTML = '';
    var showPatCheckbox = document.getElementById('show-pat');
    var showMatCheckbox = document.getElementById('show-mat');
    for (var i = 0; i < pairsCount; i++) {
        // Vytvoření kontejneru pro řádek (dvojici)
        var rowDiv = document.createElement('div');
        rowDiv.className = 'figure-row';
        // Střídání pořadí pomocí modulo
        // Liché řádky (i=0,2,4,...): Pat, Mat
        // Sudé řádky (i=1,3,5,...): Mat, Pat
        if (i % 2 === 0) {
            // Lichý řádek (i je sudé od 0): Pat vlevo, Mat vpravo
            if (showPatCheckbox.checked) {
                var patImg = createFigureImage('imgs/pat.png', 'Pat', true);
                rowDiv.appendChild(patImg);
            }
            patCount++;
            if (showMatCheckbox.checked) {
                var matImg = createFigureImage('imgs/mat.png', 'Mat', false);
                rowDiv.appendChild(matImg);
            }
            matCount++;
        }
        else {
            // Sudý řádek (i je liché): Mat vlevo, Pat vpravo
            if (showMatCheckbox.checked) {
                var matImg = createFigureImage('imgs/mat.png', 'Mat', true);
                rowDiv.appendChild(matImg);
            }
            matCount++;
            if (showPatCheckbox.checked) {
                var patImg = createFigureImage('imgs/pat.png', 'Pat', false);
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
function createFigureImage(src, alt, isFirst) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'figure';
    // Rozšíření 2: Zvýraznění první figurky v řádku
    if (isFirst) {
        if (alt === 'Pat') {
            img.classList.add('first-pat');
        }
        else if (alt === 'Mat') {
            img.classList.add('first-mat');
        }
    }
    return img;
}
// Funkce pro aktualizaci zobrazení počtu figurek
function updateCountDisplay() {
    var countDisplay = document.getElementById('count-display');
    countDisplay.textContent = "Po\u010Det figurek: PAT (".concat(patCount, "), MAT (").concat(matCount, ")");
}
// Rozšíření 3: Funkce pro reset
function resetFigures() {
    // Vymazání obsahu
    var container = document.getElementById('figures-container');
    container.innerHTML = '';
    // Reset počítadel
    patCount = 0;
    matCount = 0;
    // Aktualizace zobrazení
    updateCountDisplay();
}
// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', function () {
    // Nastavení výchozí hodnoty
    var pairsInput = document.getElementById('pairs-input');
    pairsInput.value = '10';
    // Výchozí zaškrtnutí checkboxů
    var showPatCheckbox = document.getElementById('show-pat');
    var showMatCheckbox = document.getElementById('show-mat');
    showPatCheckbox.checked = true;
    showMatCheckbox.checked = true;
    // Inicializace zobrazení počtu
    updateCountDisplay();
    // Připojení event listenerů
    var renderButton = document.getElementById('render-button');
    renderButton.addEventListener('click', renderFigures);
    var resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetFigures);
    // Umožnit spuštění vykreslení klávesou Enter v inputu
    pairsInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            renderFigures();
        }
    });
});
