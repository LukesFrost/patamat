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
        var rowDiv = document.createElement('div');
        rowDiv.className = 'figure-row';
        if (i % 2 === 0) {
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
    updateCountDisplay();
}
function createFigureImage(src, alt, isFirst) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'figure';
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
function updateCountDisplay() {
    var countDisplay = document.getElementById('count-display');
    countDisplay.textContent = "Po\u010Det figurek: PAT (".concat(patCount, "), MAT (").concat(matCount, ")");
}
function resetFigures() {
    var container = document.getElementById('figures-container');
    container.innerHTML = '';
    patCount = 0;
    matCount = 0;
    updateCountDisplay();
}
document.addEventListener('DOMContentLoaded', function () {
    var pairsInput = document.getElementById('pairs-input');
    pairsInput.value = '10';
    var showPatCheckbox = document.getElementById('show-pat');
    var showMatCheckbox = document.getElementById('show-mat');
    showPatCheckbox.checked = true;
    showMatCheckbox.checked = true;
    updateCountDisplay();
    var renderButton = document.getElementById('render-button');
    renderButton.addEventListener('click', renderFigures);
    var resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetFigures);
});
