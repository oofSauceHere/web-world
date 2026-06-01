const nav = document.getElementById("nav");
const page = document.getElementById("page");
let open = 1;
let dark = localStorage.getItem("darkMode3") == "true";
let muted = 1;

window.onload = () => {
    page.style.filter = dark ? "grayscale()" : "none";
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_off.png')" : "url('images/switch_on.png')";
}

function togglemenu() {
    if(open) {
        nav.style.animation = "slide-out ease-in 0.5s forwards";
    } else {
        nav.style.animation = "slide-in ease-out 0.5s forwards";
    }

    open = 1 - open;
}

function mute() {
    document.getElementById("mute").style.backgroundImage = muted ? "url('images/unmuted2.png')" : "url('images/muted2.png')";
    muted = 1 - muted;

    // if music is playing, should start (or keep) playing
}

function darkmode() {
    page.style.filter = dark ? "none" : "grayscale()";
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_on.png')" : "url('images/switch_off.png')";
    dark = 1 - dark;
    localStorage.setItem("darkMode3", dark ? true : false);
}