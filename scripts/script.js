// let or const?

let tap = new Audio("audio/tap2.mp3"); // https://freesound.org/people/Unicornaphobist/sounds/262958/
let crack = new Audio("audio/crack.wav"); // https://freesound.org/people/deleted_user_3656686/sounds/418194/
let drop = new Audio("audio/drop.wav"); // https://freesound.org/people/8bitmyketison/sounds/701084/
let tvon = new Audio("audio/tvon2.wav"); // https://freesound.org/people/Cloud-10/sounds/648174/
let tick1 = new Audio("audio/tick1.wav"); // https://freesound.org/people/michael_grinnell/sounds/464402/
let tick2 = new Audio("audio/tick2.wav"); // https://freesound.org/people/michael_grinnell/sounds/464402/
let cdload = new Audio("audio/cdload.wav"); // https://freesound.org/people/jrssandoval/sounds/67154/
let cdunload = new Audio("audio/cdunload.wav");
let music = new Audio("audio/eshop.wav"); // NINTENDO MUSIC - CHANGE LATER

let space = document.getElementById("space");
let door = document.getElementById("door");
let page = document.getElementById("page");
let cd = document.getElementById("cd");
let pfp = document.getElementById("pfp");
let time = document.getElementById("time");
let tv = document.getElementById("tv");
let bubble1 = document.getElementById("bubble1");
let bubble2 = document.getElementById("bubble2");
let bubble3 = document.getElementById("bubble3");
let connectors = document.getElementById("connectors");
let base = document.getElementById("base");
let ustatus = document.getElementById("status");

const interactables = [cd, pfp, time, tv, bubble1, bubble2, bubble3];

let clicks = 0;
let ticker = 0;
let playing = 0;

// use cookies instead so we can set expiration?
const loaded = localStorage.getItem("loaded") == "true";

function getCoords(element) {
    let rect = element.getBoundingClientRect();
    return [(rect.left + rect.right)/2, (rect.top + rect.bottom)/2];
}

// need quick load (dont have to do door shit every time)
function quickload() {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;

    interactables.forEach((element) => {
        element.style.pointerEvents = "none";
    });

    cd.style.pointerEvents = "none";
    cd.style.visibility = "hidden";
    page.style.transform = "scale(1)";
    page.style.transition = "none";

    pfp.style.visibility = "visible";
    pfp.style.pointerEvents = "none";
    pfp.style.animation =
        "appear 0.5s ease-in"; // do in steps? modify keyframes

    setTimeout(() => {
        ustatus.style.visibility = "visible";

        interactables.forEach((element) => {
            if(element.id != "cd" && !element.classList.contains("bubble")) {
                const deg = Math.random() * Math.PI;
                const [ x, y ] = getCoords(element);
                const [ dX, dY ] = [ (x - wWidth/2), (y - wHeight/2)]
                const offsetX = Math.cos(deg) * 10;
                const offsetY = Math.sin(deg) * 10;

                element.animate([
                    {transform: `translate(${ dX + offsetX }px, ${ dY + offsetY }px)`},
                    {transform: `translate(${ dX - offsetX }px, ${ dY - offsetY }px)`},
                    {transform: `translate(${ dX }px, ${ dY }px)`}
                ], {
                    duration: 200,
                    easing: "steps(3, end)"
                });
            }
        });

        const deg = Math.random() * Math.PI;
        const [ x, y ] = getCoords(base);
        const [ dX, dY ] = [ (x - wWidth/2), (y - wHeight/2)]
        const offsetX = Math.cos(deg) * 10;
        const offsetY = Math.sin(deg) * 10;

        base.animate([
            {transform: `translate(${ dX + offsetX }px, ${ dY + offsetY }px)`},
            {transform: `translate(${ dX - offsetX }px, ${ dY - offsetY }px)`},
            {transform: `translate(${ dX }px, ${ dY }px)`}
        ], {
            duration: 200,
            easing: "steps(3, end)"
        });
    }, 600);

    setTimeout(() => {
        interactables.forEach((element) => {
            if(element.id != "cd") {
                element.style.pointerEvents = "auto";
            }
        });

        cd.style.visibility = "visible";
        cd.style.animation =
            "peek 0.5s ease-out forwards";
    }, 800);

    setTimeout(() => {
        cd.style.pointerEvents = "auto";
        cd.style.transform =
            "translate(-300px, -100px)";
        cd.style.animation = "";
    }, 1300);
}

window.onload = () => {
    if(loaded) {
        quickload();
    } else {
        space.style.visibility = "visible";
    }
}

function load() {
    localStorage.setItem("loaded", "true");

    // setInterval(() => {
    //     const now = new Date();
    //     const hours = now.getHours();
    //     const minutes = now.getMinutes();
    //     document.getElementById("realclock").innerHTML = `${ hours%12 < 10 ? '0' : '' }${ hours%12 }:${ minutes }`;
    // }, 1000);

    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;

    interactables.forEach((element) => {
        element.style.pointerEvents = "none";
    });

    door.style.pointerEvents = "none";
    door.src = "images/door_frames/door_frame2.png";

    // fun with timeouts
    setTimeout(() => {
        door.src = "images/door_frames/door_frame3.png";
    }, 500);

    setTimeout(() => {
        // document.getElementById("page").style.zIndex = 1;
        // document.getElementById("space").style.zIndex = 0;

        // document.getElementById("page").style.animation = "iris ease-out 2s forwards";

        door.src = "images/door_frames/door_frame4.png";
        door.style.transform = "scale(40)";
    }, 1000);

    setTimeout(() => {
        cd.style.pointerEvents = "none";
        cd.style.visibility = "hidden";
        page.style.transform = "scale(1)";
    }, 2500);

    setTimeout(() => {
        pfp.style.visibility = "visible";
        pfp.style.pointerEvents = "none";
        pfp.style.animation =
            "appear 0.5s ease-in"; // do in steps? modify keyframes
    }, 3500);

    setTimeout(() => {
        ustatus.style.visibility = "visible";

        interactables.forEach((element) => {
            if(element.id != "cd" && !element.classList.contains("bubble")) {
                const deg = Math.random() * Math.PI;
                const [ x, y ] = getCoords(element);
                const [ dX, dY ] = [ (x - wWidth/2), (y - wHeight/2)]
                const offsetX = Math.cos(deg) * 10;
                const offsetY = Math.sin(deg) * 10;

                element.animate([
                    {transform: `translate(${ dX + offsetX }px, ${ dY + offsetY }px)`},
                    {transform: `translate(${ dX - offsetX }px, ${ dY - offsetY }px)`},
                    {transform: `translate(${ dX }px, ${ dY }px)`}
                ], {
                    duration: 200,
                    easing: "steps(3, end)"
                });
            }
        });

        const deg = Math.random() * Math.PI;
        const [ x, y ] = getCoords(base);
        const [ dX, dY ] = [ (x - wWidth/2), (y - wHeight/2)]
        const offsetX = Math.cos(deg) * 10;
        const offsetY = Math.sin(deg) * 10;

        base.animate([
            {transform: `translate(${ dX + offsetX }px, ${ dY + offsetY }px)`},
            {transform: `translate(${ dX - offsetX }px, ${ dY - offsetY }px)`},
            {transform: `translate(${ dX }px, ${ dY }px)`}
        ], {
            duration: 200,
            easing: "steps(3, end)"
        });
    }, 4100);

    setTimeout(() => {
        interactables.forEach((element) => {
            if(element.id != "cd") {
                element.style.pointerEvents = "auto";
            }
        });

        cd.style.visibility = "visible";
        cd.style.animation =
            "peek 0.5s ease-out forwards";
    }, 4300);

    setTimeout(() => {
        cd.style.pointerEvents = "auto";
        cd.style.transform =
            "translate(-300px, -100px)";
        cd.style.animation = "";
    }, 4800);
}

function ding1() {
    tap.load();
    tap.play();
}

function ding2() {
    // use web audio api for quicker playback

    clicks++;
    if (clicks == 50) {
        pfp.src = "images/winpfpcrack.png";
        crack.load();
        crack.play();
    } else {
        ding1();
    }

    // pfp.style.transform =
    //     "translate(-200px, -100px) scale(110%) rotate(2.5deg)"; // scale(95%) ?
    // setTimeout(() => {
    //     pfp.style.transform = pfp.matches(":hover") ?
    //         "translate(-200px, -100px) scale(110%)" :
    //         "translate(-200px, -100px)";
    // }, 50);
    pfp.style.animation =
        "ding 0.1s steps(1, end)";
    setTimeout(() => {
        pfp.style.animation = "";
    }, 100);
}

function water() {
    drop.load();
    drop.play();
}

function redirect(url) {
    water();
    window.location.href = url;
}

function tvpower() {
    tvon.load();
    tvon.play()
}

function tick() {
    if (ticker == 0) {
        ticker = 1;
        tick1.load();
        tick1.play();
    } else {
        ticker = 0;
        tick2.load();
        tick2.play();
    }
}

function tickclick() {
    tick();

    // time.style.animation =
    //     "turn 0.1s steps(1, end) forwards";
    // setTimeout(() => {
    //     time.style.transform = "transform: translate(175px, 75px) rotate(30deg)";
    //     time.style.animation = "";
    // }, 100);
}

function cdactive() {
    if (playing == 0) {
        cdload.load();
        cdload.play();
    }
}

function cdplay() {
    if (playing == 0) {
        playing = 1;
        cd.style.pointerEvents = "none";
        cd.style.transform = "translate(-300px, -100px)";
        cd.style.animation = "spin 0.5s linear infinite";
        setTimeout(() => {
            cd.style.pointerEvents = "auto";
        }, 500); // is 500 consistent?

        music.load();
        music.play();
        music.loop = true;
        // use event listener method instead?
    } else {
        playing = 0;
        cd.style.animation = "";

        music.pause();
        music.currentTime = 0;
        // play eject sound?

        cdunload.load();
        cdunload.play();
    }
}