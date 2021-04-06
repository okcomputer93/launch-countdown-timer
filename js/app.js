// End Date (year, month 0 based, day, hours, seconds)
const endDate = new Date(2022, 3, 1, 0, 50, 0);
const nowDate = new Date();
// Time in miliseconds so is divided by 1000
let leftTime = (endDate - nowDate) / 1000;

let previousTimeArray = [];

// Introduces '08' to 8 in an array
// return an array of strings ready to be printed in DOM
// The function is binded to printTime
const normalizeTime = (timeArray) => {
    return timeArray.map((element) => {
        if (element < 10) return `0${element}`;
        return "" + element;
    });
};

// Print time in DOM
const printTime = (timeArray) => {
    const elements = timeElementsChanged(timeArray);
    const normalizeArray = normalizeTime(timeArray);

    elements.forEach((element, index) => {
        if (element) {
            handleAnimation(element, index, normalizeArray);
        }
    });
};

const handleAnimation = (element, index, normalizedArray) => {
    const centerAnimateElement = document.querySelector(
        `.header__time-card__center--${element}`
    );

    // Uff way too hacky?
    const innerNodes = document.querySelectorAll(
        `.header__time-card__center--${element}`
    );

    if (innerNodes.length >= 3) {
        innerNodes[2].remove();
    }

    centerAnimateElement.querySelector(
        `.header__time-card__center--back__number--${element}`
    ).textContent = normalizedArray[index];

    const html = `
    <div
        class="header__time-card__center header__time-card__center--${element}"
    >
        <div class="header__time-card__center--back">
            <h2
                class="header__time-card__number header__time-card__number--bottom header__time-card__center--back__number--${element}"
            >
                 ${normalizedArray[index]}
            </h2>
        </div>
        <div class="header__time-card__center--front">
            <h2
                class="header__time-card__number header__time-card__number--top header__time-card__center--front__number--${element}"
            >
                 ${normalizedArray[index]}
            </h2>
        </div>
    </div>`;

    document
        .querySelector(`.header__time-card--${element}`)
        .insertAdjacentHTML("afterbegin", html);

    centerAnimateElement.style.transform = "rotateX(-180deg)";

    const sibling = centerAnimateElement.nextElementSibling;

    // Performance fix
    if (element === "seconds" && element === "minutes") {
        setTimeout(() => {
            centerAnimateElement.style.zIndex = 1;
            sibling.remove();
        }, 1580);
        return;
    }

    centerAnimateElement.addEventListener("transitionend", function () {
        this.style.zIndex = 1;
        sibling.remove();
    });
};

// Return an array with strings for the elements that changed
// and false for the elements that didn't change
// used to reprint only certain elements in DOM
const timeElementsChanged = (timeArray) => {
    const reference = ["days", "hours", "minutes", "seconds"];
    const newReference = timeArray.map((time, index) => {
        if (time !== previousTimeArray[index]) return reference[index];
        return false;
    });
    previousTimeArray = timeArray;
    return newReference;
};

// receives an array of time [days, hours, minutes, seconds]
// return 123132 seconds
const arrayToSeconds = (timeArray) => {
    const reference = [86400, 3600, 60, 1];
    return timeArray.reduce(
        (acc, current, index) => acc + current * reference[index],
        0
    );
};

// epoch is in seconds
// return an array in the form [days, hours, minutes, seconds]
const secondsToArray = (epoch) => {
    const days = Math.floor(epoch / 86400);
    const hours = Math.floor((epoch % (3600 * 24)) / 3600);
    const minutes = Math.floor((epoch % 3600) / 60);
    const seconds = Math.floor(epoch % 60);
    return [days, hours, minutes, seconds];
};

// Tick every second
const tick = () => {
    leftTime = leftTime - 1;
    if (leftTime <= 0) {
        leftTime = 0;
        clearInterval(interval);
    }
    const currentTimeArray = secondsToArray(leftTime);
    printTime(currentTimeArray);
};

interval = setInterval(tick, 1000);
