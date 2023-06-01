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
    </div>

    <style>
        .clock-face {
            height: 500px;
            width: 500px;
            border-radius: 50%;
            background-color: aqua;
            margin-inline: auto;
            position: relative;
        }
        
        .date-time-data {
            position: absolute;
            top: 270px;
            left: 150px;
            height: 100px;
            width: 200px;
            font-size: 20px;
            color: blueviolet;
            text-align: center;
        }

        .alert-data {
            position: absolute;
            top: 370px;
            left: 150px;
            height: 100px;
            width: 200px;
            font-size: 20px;
            color: red;
            text-align: center;
        }
        
        .arrow {
            position: absolute;
            left: 245px;
            width: 10px;
            border-radius: 5px;
            transform-origin: bottom;
        }
        
        .sec-arrow {
            top: 0px;
            height: 250px;
            background-color: green;
        }
        
        .min-arrow {
            top: 50px;
            height: 200px;
            background-color: red;
        }
        
        .hour-arrow {
            top: 100px;
            height: 150px;
            background-color: blue;
        }
        
        .arrow-axis-cover {
            position: absolute;
            top: 240px;
            left: 240px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background-color: green;
        }
        
        .clock-digit-container {
            position: absolute;
            top: 0;
            left: 200px;
            height: 250px;
            width: 100px;
            transform-origin: bottom;
        }
        
        .clock-digit {
            width: 100px;
            height: 100px;
            font-size: 54px;
            color: blue;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .clock-marking-container {
            position: absolute;
            top: 0;
            left: 245px;
            height: 250px;
            width: 10px;
            transform-origin: bottom;
        }
        
        .clock-marking {
            height: 20px;
            width: 10px;
            font-size: 54px;
            background-color: blue;
            border-radius: 5px;
        }
    </style>`;

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