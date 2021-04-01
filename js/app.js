// End Date (year, month 0 based, day, hours, seconds)
const endDate = new Date(2021, 2, 31, 22, 35, 0);
const nowDate = new Date();
// Time in miliseconds so is divided by 1000
let leftTime = (endDate - nowDate) / 1000;

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
    const elements = ["days", "hours", "minutes", "seconds"];
    const normalizeArray = normalizeTime(timeArray);
    elements.forEach((element, index) => {
        document.querySelector(`.header__time-card--${element}`).textContent =
            normalizeArray[index];
    });
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

// Receives time in array form [days, hours, minutes, seconds]
// Stores global time in SECONDS
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

// $0.style.transform = "rotateX(-180deg)";
