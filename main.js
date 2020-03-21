const clock = document.getElementById('clock');
const sessionTime = document.getElementById('session');
const breakTime = document.getElementById('break');
const indicator = document.getElementById("indicator");

let countdown;
let secondsLeft;
let isBreak = false;

function formatTime(selection) {
    if (selection.innerHTML < 10)
        selection.innerHTML = "0" + selection.innerHTML;
}

function update_choices() {
    const incSes = document.getElementById("ses-inc");
    const decSes = document.getElementById("ses-dec");
    const incBrk = document.getElementById("brk-inc");
    const decBrk = document.getElementById("brk-dec");

    incSes.addEventListener("click", () => {
        sessionTime.innerHTML = parseInt(sessionTime.innerHTML) + 1;
        formatTime(sessionTime);
        displayTimeLeft(sessionTime.innerHTML * 60);
    });

    decSes.addEventListener("click", () => {
        if (sessionTime.innerHTML != 1) {
            sessionTime.innerHTML = parseInt(sessionTime.innerHTML) - 1;
            formatTime(sessionTime);
            displayTimeLeft(sessionTime.innerHTML * 60);
        }
    });

    incBrk.addEventListener("click", () => {
        breakTime.innerHTML = parseInt(breakTime.innerHTML) + 1;
        formatTime(breakTime);
    });

    decBrk.addEventListener("click", () => {
        if (breakTime.innerHTML != 1) {
            breakTime.innerHTML = parseInt(breakTime.innerHTML) - 1;
            formatTime(breakTime);
        }
    });
}

function breakCount() {
    indicator.innerHTML = "Break";
    timer(breakTime.innerHTML * 60 - 1);
}

function checkBreak() {
    if (isBreak == true) {
        setTimeout(breakCount, 1000);
    } else {
        start.click();
    }
}

function displayTimeLeft(seconds) {
    let minute = parseInt(seconds / 60);
    let remSeconds = seconds % 60;
    let display = `${minute >= 10 ? minute : '0' + minute}:${remSeconds >= 10 ? remSeconds : '0' + remSeconds}`;
    clock.innerHTML = display;
}

function timer(seconds) {
    const now = Date.now();
    const startTime = now + (seconds * 1000);
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        secondsLeft = Math.round((startTime - Date.now()) / 1000);

        secondsLeft < 10 ? clock.style.color = "limegreen" : clock.style.color = "white";

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            displayTimeLeft(secondsLeft);
            clearInterval(countdown);
            clock.style.color = "white";
            (isBreak) ? isBreak = false : isBreak = true;
            checkBreak();
        } else {
            displayTimeLeft(secondsLeft);
        }
    }, 1000);
}


function modifyTimer() {
    const start = document.getElementById("start");
    const pause = document.getElementById("pause");
    const reset = document.getElementById("reset");
    const stop = document.getElementById("stop");
    let pausePoint;
    let isPaused = false;

    start.addEventListener("click", () => {
        indicator.innerHTML = "Session";
        clearInterval(countdown);
        pause.innerHTML = "Pause";
        timer(sessionTime.innerHTML * 60);
    });

    pause.addEventListener("click", () => {
        if (pause.innerHTML == "Pause") {
            isPaused = true;
            pausePoint = secondsLeft;
            clearInterval(countdown);
            pause.innerHTML = "Resume";
        } else {
            isPaused = false;
            pause.innerHTML = "Pause";
            timer(pausePoint);
        }
    });

    stop.addEventListener("click", () => {
        clearInterval(countdown);
        pause.innerHTML = "Pause";
        displayTimeLeft(sessionTime.innerHTML * 60);
    });

    reset.addEventListener("click", () => {
        clearInterval(countdown);
        pause.innerHTML = "Pause";
        sessionTime.innerHTML = "25";
        breakTime.innerHTML = "05";
        clock.innerHTML = "25:00";
        isBreak = false;
    });
}

update_choices();
modifyTimer();