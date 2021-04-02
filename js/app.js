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
            document.querySelector(
                `.header__time-card--${element}`
            ).textContent = normalizeArray[index];
            const animationFlipElement = document.querySelector(
                `.header__time-card__top--${element}`
            );
            animationFlipElement.classList.remove(
                "header__time-card__top--animate"
            );
            void animationFlipElement.offsetWidth;
            animationFlipElement.classList.add(
                "header__time-card__top--animate"
            );
        }
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
