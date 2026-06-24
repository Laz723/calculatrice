let currentExpression = "";
const display = document.getElementById('calc-display');

function updateDisplay() {
    display.value = currentExpression === "" ? "0" : currentExpression;
}

function appendChar(char) {
    if (display.value === "Erreur" || display.value === "Div / 0" || display.value === "NaN") {
        currentExpression = "";
    }
    currentExpression += char;
    updateDisplay();
}

function clearDisplay() {
    currentExpression = "";
    updateDisplay();
}

function calculateResult() {
    if (currentExpression === "") return;

    try {
        // Validation basique pour éviter des failles de sécurité avec eval()
        const allowedChars = /^[0-9+\-*/(). ]+$/;
        if (!allowedChars.test(currentExpression)) {
            throw new Error("Caractères non autorisés");
        }

        // On évalue l'expression mathématique
        let result = eval(currentExpression);

        // Formater les nombres pour éviter les problèmes de virgule flottante (ex: 0.1+0.2)
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(10));
        }

        if (result === Infinity || result === -Infinity) {
            display.value = "Div / 0";
            currentExpression = "";
        } else {
            display.value = result;
            currentExpression = String(result);
        }
    } catch (error) {
        display.value = "Erreur";
        currentExpression = "";
    }
}

// Support du clavier
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = "0123456789+-*/().";

    if (allowedKeys.includes(key)) {
        appendChar(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    } else if (key === "Escape") {
        clearDisplay();
    }
});