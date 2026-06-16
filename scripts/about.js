const body = document.body;
let dark = localStorage.getItem("darkMode2") == "true";
let muted = 1;

function rad(deg) {
    return (deg * Math.PI) / 180.0;
}

function round(n) {
    return Math.floor(n + 0.5);
}

function star() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    // ideally use diagonal as length to star border at exact angle of diagonal... currently the star is scaled too large
    const diagonal = Math.sqrt(height*height + width*width) / 2;
    const radius = diagonal / Math.sin(rad(54));
    const spike = diagonal + radius * (Math.cos(rad(54)) * Math.sin(rad(72)) / Math.cos(rad(72)));
    
    const angles = Array.from(Array(10).keys(), (x) => x*36 + 18);
    let vertices = [];
    for(let i=0; i<10; i++) {
        let x, y, len;
        if(i % 2 == 0) {
            len = spike;
        } else {
            len = radius;
        }

        x = len * Math.cos(rad(angles[i]));
        y = -1 * len * Math.sin(rad(angles[i]));
        vertices.push(`${round((x + width/2)/width * 100.0)}% ${round((y + height/2)/height * 100.0)}%`);
    }

    clipPath = `polygon(${vertices.join(", ")})`;
    console.log(clipPath);
    return clipPath;
}

function iris(rev) {
    const start = rev ? `polygon(${Array.from(Array(10), (x) => "50% 50%").join(", ")})` : star();
    const end = rev ? star() : `polygon(${Array.from(Array(10), (x) => "50% 50%").join(", ")})`;
    const spin = rev ? "spinfixedrev" : "spinfixed";
    const anim = document.getElementById("aperture").animate([
        {
            clipPath: start
        },
        {
            clipPath: end
        }
    ], {
        duration: 1500,
        fill: "forwards",
        easing: "ease-in" // cubic-bezier(.47,.01,1,.45)
    });

    // document.getElementById("aperture").style.animation = `${spin} linear 1.5s forwards`;

    if(rev) {
        setTimeout(() => {
            anim.cancel();
            document.getElementById("aperture").style.clipPath = "none";
        }, 2000);
    }
}

window.onload = () => {
    document.getElementById("page").style.backgroundImage = dark ? "url('images/space4.png')" : "none";
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_off.png')" : "url('images/switch_on.png')";

    iris(true);
    setTimeout(() => {
        document.getElementById("aperture").style.clipPath = "none";
    }, 1500);

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

    star();
}

function mute() {
    document.getElementById("mute").style.backgroundImage = muted ? "url('images/unmuted3.png')" : "url('images/muted3.png')";
    muted = 1 - muted;

    // if music is playing, should start (or keep) playing
}

function darkmode() {
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_on.png')" : "url('images/switch_off.png')";
    document.getElementById("page").style.backgroundImage = dark ? "none" : "url('images/space4.png')";
    dark = 1 - dark;
    localStorage.setItem("darkMode2", dark ? true : false);
}

function redirect(url) {
    iris(false);

    setTimeout(() => {
        window.location.href = url;
    }, 1750);
}