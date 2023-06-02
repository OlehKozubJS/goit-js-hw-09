let dateTimeData;
let alertData;
let clockFace;
let secArrow;
let minArrow;
let hourArrow;

const newClock =
    `<div class="clock-face">
        <div class="date-time-data"></div>
        <div class="alert-data"></div>
        <div class="arrow hour-arrow"></div>
        <div class="arrow min-arrow"></div>
        <div class="arrow sec-arrow"></div>
        <div class="arrow-axis-cover"></div>
    </div>`;

export function createClockFace(placeToAdd) {
    placeToAdd.insertAdjacentHTML("beforeend", newClock);

    dateTimeData = document.querySelector(".date-time-data");
    clockFace = document.querySelector(".clock-face");
    secArrow = document.querySelector(".sec-arrow");
    minArrow = document.querySelector(".min-arrow");
    hourArrow = document.querySelector(".hour-arrow");
    alertData = document.querySelector(".alert-data");

    let clockDigits = "";
    let clockMarkings = "";

    for (let digits = 1; digits <= 12; digits += 1) {
        clockDigits +=
        `<div class="clock-digit-container" style="transform: rotate(${30 * digits}deg);">
            <div class="clock-digit" style="transform: rotate(${-30 * digits}deg);">${digits}</div>
        </div>`;
    }

    for (let markings = 1; markings <= 60; markings += 1) {
        clockMarkings +=
        `<div class="clock-marking-container" style="transform: rotate(${6 * markings}deg);">
            <div class="clock-marking"></div>
        </div>`;
    }

    clockFace.insertAdjacentHTML("afterbegin", clockDigits);
    clockFace.insertAdjacentHTML("afterbegin", clockMarkings);
}

export function arrowAnimationFunction(hours, minutes, seconds, date) {
    dateTimeData.innerHTML = date;
    hourArrow.style.transform = `rotate(${hours % 12 * 30}deg)`;
    minArrow.style.transform = `rotate(${minutes * 6}deg)`;
    secArrow.style.transform = `rotate(${seconds * 6}deg)`;
}

export function clockFaceAlert(message) {
    alertData.innerHTML = message;
}