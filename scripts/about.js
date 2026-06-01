const body = document.body;
let dark = localStorage.getItem("darkMode2") == "true";
let muted = 1;

window.onload = () => {
    document.body.style.backgroundImage = dark ? "url('images/space4.png')" : "none";
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_off.png')" : "url('images/switch_on.png')";

    const date = new Date();
    const birthday = new Date("11/04/2005");

    const years = date.getFullYear() - birthday.getFullYear();
    const months = date.getMonth() - birthday.getMonth();
    const days = date.getDate() - birthday.getDate();

    let age = years;
    if(months < 0) {
        age--;
    } else if(months == 0) {
        if(days < 0) {
            age--;
        }
    }

    document.getElementById("age").innerHTML = `${age}`;
}

function mute() {
    document.getElementById("mute").style.backgroundImage = muted ? "url('images/unmuted3.png')" : "url('images/muted3.png')";
    muted = 1 - muted;

    // if music is playing, should start (or keep) playing
}

function darkmode() {
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_on.png')" : "url('images/switch_off.png')";
    document.body.style.backgroundImage = dark ? "none" : "url('images/space4.png')";
    dark = 1 - dark;
    localStorage.setItem("darkMode2", dark ? true : false);
}