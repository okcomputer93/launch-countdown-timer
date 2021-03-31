const time = [0, 0, 1, 20];

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

// Receives time in array form [days, hours, minutes, seconds]
// Stores global time in SECONDS
let currentTime = arrayToSeconds(time);
const tick = () => {
    currentTime = arrayToSeconds(secondsToArray(currentTime - 1));
    const currentTimeArray = secondsToArray(currentTime);
    printTime(currentTimeArray);
};

interval = setInterval(tick, 1000);

// $0.style.transform = "rotateX(-180deg)";
