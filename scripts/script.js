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
const shows = ["Scrubs", "Malcolm in the Middle", "It's Always Sunny", "Arrested Development", "30 Rock"]

let clicks = 0;
let ticker = 0;
let playing = 0;
let muted = 1;
let dark = localStorage.getItem("darkMode") == "true";

// use cookies instead so we can set expiration?
const loaded = localStorage.getItem("loaded") == "true";

// need mute function, using mute to handle sound event triggers is bad...

function getCoords(element) {
    let rect = element.getBoundingClientRect();
    return [(rect.left + rect.right)/2, (rect.top + rect.bottom)/2];
}

// need quick load (dont have to do door shit every time)
function quickload() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const hours_str = `${ hours%12 < 10 && hours%12 != 0 ? '0' : '' }${ hours%12 == 0 ? '12' : hours%12 }`;
    // const hours_str = `${ hours%12 == 0 ? '12' : hours%12 }`;
    const minutes_str = `${ minutes < 10 ? '0' : '' }${ minutes }`;
    document.getElementById("realclock").innerHTML = `${ hours_str }:${ minutes_str }`;
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const hours_str = `${ hours%12 < 10 && hours%12 != 0 ? '0' : '' }${ hours%12 == 0 ? '12' : hours%12 }`;
        const minutes_str = `${ minutes < 10 ? '0' : '' }${ minutes }`;
        document.getElementById("realclock").innerHTML = `${ hours_str }:${ minutes_str }`;
    }, 1000);

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

    setInterval(() => {
        spawncircle();
    }, 2500);
}

function recolor() {
    if(dark) {
        document.body.style.backgroundImage = "url('images/city_black.png')";
        // document.getElementById("bg").style.backgroundImage = "linear-gradient(black 0%, grey 100%)"
        document.getElementById("bg").style.backgroundImage = "linear-gradient(transparent 0%, transparent 50%, black 100%)";
        document.getElementById("grid").style.backgroundImage = "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)"
        document.getElementById("bubble1").src = "images/bubble1_red.png";
        document.getElementById("bubble2").src = "images/bubble2_red.png";
        document.getElementById("bubble3").src = "images/bubble3_red.png";
        document.getElementById("connectors").src = "images/connectors3.png";
        document.getElementById("mute").style.backgroundImage = muted ? "url(images/muted.png)" : "url(images/unmuted.png)";
        document.getElementById("realclock").style.color = "#e8075d";
        document.getElementById("accent").style.color = "#990000";
    } else {
        document.body.style.backgroundImage = "url('images/city_blue.png')";
        // document.getElementById("bg").style.backgroundImage = "linear-gradient(white 0%, #acf4ff 100%)";
        document.getElementById("bg").style.backgroundImage = "linear-gradient(transparent 0%, transparent 50%, #acf4ff 100%)";
        document.getElementById("grid").style.backgroundImage = "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)"
        document.getElementById("bubble1").src = "images/bubble1.png";
        document.getElementById("bubble2").src = "images/bubble2.png";
        document.getElementById("bubble3").src = "images/bubble3.png";
        document.getElementById("connectors").src = "images/connectors.png";
        document.getElementById("mute").style.backgroundImage = muted ? "url(images/muted5.png)" : "url(images/unmuted5.png)";
        document.getElementById("realclock").style.color = "#e86207";
        document.getElementById("accent").style.color = "#3cc3d8";
    }
}

window.onload = () => {
    recolor();
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_off.png')" : "url('images/switch_on.png')";

    if(loaded) {
        quickload();
    } else {
        space.style.visibility = "visible";
    }

    const rand = Math.floor(Math.random() * 5);
    document.getElementById("show").innerHTML = shows[rand];
}

function load() {
    localStorage.setItem("loaded", "true");

    setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        document.getElementById("realclock").innerHTML = `${ hours%12 < 10 ? '0' : '' }${ hours%12 }:${ minutes }`;
    }, 1000);

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
    if(muted == 0) {
        tap.load();
        tap.play();
    }
}

function ding2() {
    // use web audio api for quicker playback

    clicks++;
    if (clicks == 50) {
        pfp.src = "images/winpfpcrack.png";

        if(muted == 0) {
            crack.load();
            crack.play();
        }
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
    if(muted == 0) {
        drop.load();
        drop.play();
    }
}

function redirect(url) {
    water();
    window.location.href = url;
}

function tvpower() {
    if(muted == 0) {
        tvon.load();
        tvon.play();
    }
}

function tick() {
    if (ticker == 0) {
        ticker = 1;
        
        if(muted == 0) {
            tick1.load();
            tick1.play();
        }
    } else {
        ticker = 0;

        if(muted == 0) {
            tick2.load();
            tick2.play();
        }
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
    if (playing == 0 && muted == 0) {
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

        if(muted == 0) {
            music.load();
            music.play();
            music.loop = true;
        }
        // use event listener method instead?
    } else {
        playing = 0;
        cd.style.animation = "";

        music.pause();
        music.currentTime = 0;

        if(!muted) {
            cdunload.load();
            cdunload.play();
        }
    }
}

function mute() {
    if(muted) {
        document.getElementById("mute").style.backgroundImage = dark ? "url('images/unmuted.png')" : "url('images/unmuted5.png')";
    } else {
        document.getElementById("mute").style.backgroundImage = dark ? "url('images/muted.png')" : "url('images/muted5.png')";
    }
    muted = 1 - muted;

    // if music is playing, should start (or keep) playing
}

function darkmode() {
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_on.png')" : "url('images/switch_off.png')";
    dark = 1 - dark;
    localStorage.setItem("darkMode", dark ? true : false);
    recolor();
}

function spawncircle() {
    let circle = document.createElement("img");
    // apparently if the gif has limited loops, it needs to be reloaded so it doesnt stop playing forever (lame)
    // circle.src = Math.random() < 0.5 ? "images/circle.gif?" + new Date().getTime() : "images/circle2.gif?" + new Date().getTime();
    circle.src = (dark ? "images/circle2.gif?" : "images/circle.gif?") + new Date().getTime();
    circle.classList.add("circle");
    const size = Math.floor(Math.random() * 300) + 100;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    const xrange = window.innerWidth - 750;
    const xpos_pre = Math.random() * xrange;
    const xpos = xpos_pre < xrange/2 ? xpos_pre + 100 : xpos_pre + 650;
    const ypos = Math.random() * (window.innerHeight - 200) + 100;
    circle.style.left = `${xpos}px`;
    circle.style.top = `${ypos}px`;
    document.getElementById("page").appendChild(circle);
    setTimeout(() => {
        document.getElementById("page").removeChild(circle);
    }, 1000);
}