function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function clearAll() {
    document.getElementById('display').value = '';
}

function deleteLastChar() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const display = document.getElementById('display');
        const result = eval(display.value);
        display.value = result;

        // Save the calculation to localStorage
        saveCalculation(display.value);

        // Update last three calculations in the UI
        updateLastCalculationsUI();
    } catch (e) {
        display.value = 'Error';
    }
}

function toggleSign() {
    const display = document.getElementById('display');
    if (display.value.charAt(0) === '-') {
        display.value = display.value.substring(1);
    } else if (display.value.length > 0) {
        display.value = '-' + display.value;
    }
}

function buttonClicked(button) {
    button.classList.add('zoom-out');
    setTimeout(() => {
        button.classList.remove('zoom-out');
    }, 100);
}

function saveCalculation(calculation) {
    let calculations = JSON.parse(localStorage.getItem('calculations')) || [];
    calculations.push(calculation);
    if (calculations.length > 3) {
        calculations.shift();
    }
    localStorage.setItem('calculations', JSON.stringify(calculations));
}

function loadCalculations() {
    let calculations = JSON.parse(localStorage.getItem('calculations')) || [];
    return calculations;
}

function updateLastCalculationsUI() {
    const lastCalculationsList = document.getElementById('lastCalculations');
    lastCalculationsList.innerHTML = ''; // Clear previous calculations

    const calculations = loadCalculations();
    calculations.forEach(calculation => {
        const listItem = document.createElement('li');
        listItem.textContent = calculation;
        lastCalculationsList.appendChild(listItem);
    });
}

// Load calculations when the page loads
window.onload = function() {
    updateLastCalculationsUI();
};

// Keyboard integration
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const buttonMap = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '.': '.',
        'Enter': '=',
        '=': '=',
        'Backspace': 'C',
        'Escape': 'AC'
    };

    if (key in buttonMap) {
        const buttonValue = buttonMap[key];
        const button = Array.from(document.querySelectorAll('.btn')).find(b => b.textContent.trim() === buttonValue);
        if (button) {
            buttonClicked(button);
            if (buttonValue === 'C') {
                deleteLastChar();
            } else if (buttonValue === 'AC') {
                clearAll();
            } else if (buttonValue === '=') {
                calculate();
            } else if (buttonValue === '+-') {
                toggleSign();
            } else {
                appendToDisplay(buttonValue);
            }
        }
    }
});


function toggleTheme() {
    const calculator = document.querySelector('.calculator');
    const themeButton = document.getElementById('themeSwitcher');
    if (calculator.classList.contains('dark-theme')) {
        calculator.classList.remove('dark-theme');
        themeButton.innerHTML = '<i class="far fa-sun"></i>';
    } else {
        calculator.classList.add('dark-theme');
        themeButton.innerHTML = '<i class="far fa-moon"></i>';
    }
}
