const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");

startButton.addEventListener("click", startFunction);
stopButton.addEventListener("click", stopFunction);

let getRandomHexColorSI;

function startFunction() {
    startButton.removeEventListener("click", startFunction);
    getRandomHexColorSI = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000);
}

function stopFunction() {
    clearInterval(getRandomHexColorSI);
    startButton.addEventListener("click", startFunction);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
