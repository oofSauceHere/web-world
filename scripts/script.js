// let or const?

let tap = new Audio("audio/tap2.mp3"); // https://freesound.org/people/Unicornaphobist/sounds/262958/
let crack = new Audio("audio/crack.wav"); // https://freesound.org/people/deleted_user_3656686/sounds/418194/
let drop = new Audio("audio/drop.wav"); // https://freesound.org/people/8bitmyketison/sounds/701084/
let tvon = new Audio("audio/tvon2.wav"); // https://freesound.org/people/Cloud-10/sounds/648174/
let tick1 = new Audio("audio/tick1.wav"); // https://freesound.org/people/michael_grinnell/sounds/464402/
let tick2 = new Audio("audio/tick2.wav"); // https://freesound.org/people/michael_grinnell/sounds/464402/
let cdload = new Audio("audio/cdload.wav"); // https://freesound.org/people/jrssandoval/sounds/67154/
let cdunload = new Audio("audio/cdunload.wav"); // where is this from?
let music = new Audio("audio/eshop.wav"); // NINTENDO MUSIC - CHANGE LATER

let audio = [tap, crack, drop, tvon, tick1, tick2, cdload, cdunload, music];

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

function iris(rev) {
    const start = rev ? `circle(0% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)` : `circle(${100.0/Math.sqrt(2)}% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`;
    const end = rev ? `circle(${100.0/Math.sqrt(2)}% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)` : `circle(0% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`;
    const anim = document.getElementById("aperture").animate([
        {
            clipPath: start
        },
        {
            clipPath: end
        }
    ], {
        duration: 1250,
        fill: "forwards",
        easing: "ease-in" // cubic-bezier(.47,.01,1,.45)
    });

    // the clip path is designed to stop right outside the current window size,
    // so you will be able to see it if you zoom. in order to override clip-path,
    // though, we need to end the animation so its clip-path value doesn't take
    // precedence.
    if(rev) {
        setTimeout(() => {
            anim.cancel();
            document.getElementById("aperture").style.clipPath = "none";
        }, 2000);
    }
}

function recolor() {
    if(dark) {
        document.getElementById("aperture").style.cursor = "url('images/cursor2.png') 8 0, auto";
        document.getElementById("bg").style.backgroundImage = "linear-gradient(to bottom, #000000 0%, #000000 100%)";
        // document.getElementById("grid").style.backgroundImage = "url('images/space4.png')";
        document.getElementById("bubble1").src = "images/bubble2_red.png";
        document.getElementById("bubble2").src = "images/bubble3_red.png";
        document.getElementById("bubble3").src = "images/bubble1_red.png";
        document.getElementById("connectors").src = "images/connectors3.png";
        document.getElementById("realclock").style.color = "rgb(58, 67, 75)";
        document.getElementById("accent").style.color = "#990000";
        document.getElementById("mute").style.backgroundImage = muted ? "url('images/muted5.png')" : "url('images/unmuted5.png')";
    } else {
        document.getElementById("aperture").style.cursor = "url('images/cursor.png') 8 0, auto";
        document.getElementById("bg").style.backgroundImage = "linear-gradient(to bottom, white 0%, white 25%, #afafaf 75%, #afafaf 100%)";
        // document.getElementById("bg").style.backgroundImage = "linear-gradient(to bottom, white 0%, white 45%, #dbdbdb 55%, white 100%)";
        // document.getElementById("grid").style.backgroundImage = "url('images/tile2.png')";
        document.getElementById("bubble1").src = "images/bubble2.png";
        document.getElementById("bubble2").src = "images/bubble3.png";
        document.getElementById("bubble3").src = "images/bubble1.png";
        document.getElementById("connectors").src = "images/connectors.png";
        document.getElementById("realclock").style.color = "rgb(58, 67, 75)"; // #e8075d
        document.getElementById("accent").style.color = "#3cc3d8";
        document.getElementById("mute").style.backgroundImage = muted ? "url('images/muted.png')" : "url('images/unmuted.png')";
    }
}

window.onload = () => {
    audio.forEach(a => {
        a.muted = true;
    });

    recolor();
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_off.png')" : "url('images/switch_on.png')";

    iris(true);

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const hours_str = `${ hours%12 < 10 && hours%12 != 0 ? '0' : '' }${ hours%12 == 0 ? '12' : hours%12 }`;
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

    setTimeout(() => {
        pfp.style.visibility = "visible";
        pfp.style.pointerEvents = "none";
        pfp.style.animation =
            "appear 0.5s ease-in"; // do in steps? modify keyframes
    }, 1000);

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
    }, 1600);

    setTimeout(() => {
        interactables.forEach((element) => {
            if(element.id != "cd") {
                element.style.pointerEvents = "auto";
            }
        });

        cd.style.visibility = "visible";
        cd.style.animation =
            "peek 0.5s ease-out forwards";
    }, 1800);

    setTimeout(() => {
        cd.style.pointerEvents = "auto";
        cd.style.transform =
            "translate(-300px, -100px)";
        cd.style.animation = "";
    }, 2300);

    const rand = Math.floor(Math.random() * shows.length);
    document.getElementById("show").innerHTML = shows[rand];
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
    
    iris(false);

    setTimeout(() => {
        window.location.href = url;
    }, 1750);
}

function tvpower() {
    tvon.load();
    tvon.play();
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

        music.load();
        music.play();
        music.loop = true;
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
        document.getElementById("mute").style.backgroundImage = dark ? "url('images/unmuted5.png')" : "url('images/unmuted.png')";
    } else {
        document.getElementById("mute").style.backgroundImage = dark ? "url('images/muted5.png')" : "url('images/muted.png')";
    }
    muted = 1 - muted;

    // if music is playing, should start (or keep) playing
    audio.forEach(a => {
        a.muted = !a.muted;
    });
}

function darkmode() {
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_on.png')" : "url('images/switch_off.png')";
    dark = 1 - dark;
    localStorage.setItem("darkMode", dark ? true : false);
    recolor();
}