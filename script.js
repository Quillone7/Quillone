const ledPanel = document.getElementById('led-panel');
const colorPalette = document.getElementById('color-palette');
const codeOutput = document.getElementById('code-output');
const resetButton = document.getElementById('reset-button');

const colors = {
    a: [240, 240, 240], // Jasnoszary
    b: [150, 150, 150], // Średni szary
    c: [50, 50, 50], // Ciemnoszary
    d: [100, 150, 200], // Jasny niebieski
    e: [0, 0, 200], // Ciemny niebieski
    f: [150, 100, 100], // Ciemna czerwień
    g: [0, 200, 200], // Cyjan
    h: [0, 200, 150], // Turkusowy
    j: [150, 200, 100], // Jasna zieleń
    k: [100, 150, 100], // Średnia zieleń
    l: [0, 255, 0], // Jasna zieleń
    m: [0, 150, 0], // Ciemna zieleń
    o: [100, 100, 50], // Oliwkowy
    p: [200, 200, 100], // Jasnożółty
    q: [255, 255, 0], // Żółty
    r: [200, 150, 100], // Jasny brąz
    s: [150, 100, 50], // Ciemny brąz
    t: [200, 100, 0], // Pomarańczowy
    u: [200, 0, 0], // Czerwony
    v: [255, 0, 0], // Czerwony
    w: [200, 100, 100], // Ciemny róż
    y: [255, 0, 255], // Magenta
    z: [150, 0, 200], // Fioletowy
    w: [255, 255, 255], // Biały
    n: [0, 0, 0] // Czarny
};

let selectedColor = null;
let ledGrid = [];

// Generowanie planszy LED
for (let i = 0; i < 64; i++) {
    const led = document.createElement('div');
    led.style.backgroundColor = 'black'; // Domyślnie czarne kwadraty
    led.style.border = '1px solid #ffcccc'; // Jasno-czerwona ramka
    led.addEventListener('click', () => {
        if (selectedColor) {
            led.style.backgroundColor = `rgb(${colors[selectedColor].join(',')})`;
            ledGrid[i] = selectedColor;
            updateCodeOutput();
        } else {
            led.style.backgroundColor = 'black'; // Ustaw na czarny
            ledGrid[i] = 'n'; // Zapisz 'n' (czarny) w siatce
            updateCodeOutput(); // Aktualizuj kod
        }
    });
    ledPanel.appendChild(led);
    ledGrid.push('n'); // Domyślnie czarny kolor
}

// Generowanie palety kolorów
for (const color in colors) {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color-option');
    colorOption.style.backgroundColor = `rgb(${colors[color] ? colors[color].join(',') : '#fff'})`;
    colorOption.textContent = color;
    colorOption.addEventListener('click', () => {
        selectedColor = color;
    });
    colorPalette.appendChild(colorOption);
}

// Aktualizacja kodu wyjściowego
function updateCodeOutput() {
    let code = "";
    for (let i = 0; i < ledGrid.length; i++) {
        const color = ledGrid[i];
        if (color) {
            code += color + ", ";
        } else {
            code += "n, "; // Ustaw na czarny
        }
        if ((i + 1) % 8 === 0) {
            code += "\n";
        }
    }
    codeOutput.textContent = code;
}

// Generowanie listy kolorów po prawej stronie
function generateColorList() {
    let colorListHTML = "Kolory:\n";
    for (const color in colors) {
        colorListHTML += `* ${color}: (${colors[color].join(', ')})\n`;
    }
    codeOutput.insertAdjacentHTML('afterend', `<div id="color-list">${colorListHTML}</div>`);
}

generateColorList(); // Wywołaj funkcję przy załadowaniu strony

// Resetowanie planszy
resetButton.addEventListener('click', () => {
    for (let i = 0; i < 64; i++) {
        ledPanel.children[i].style.backgroundColor = 'black';
        ledGrid[i] = 'n';
    }
    updateCodeOutput();
});