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
        display.value = eval(display.value);
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
