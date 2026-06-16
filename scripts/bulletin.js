const nav = document.getElementById("nav");
const page = document.getElementById("page");
let open = 1;
let dark = localStorage.getItem("darkMode3") == "true";
let muted = 1;

function iris(rev) {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    let clipPath;
    if(window.innerWidth > window.innerHeight) {
        const top = 0 - (window.innerWidth - window.innerHeight) / 2;
        const bottom = window.innerHeight + (window.innerWidth - window.innerHeight) / 2;
        clipPath = `rect(${top}px ${window.innerWidth}px ${bottom}px 0)`;
    } else {
        const left = 0 - (window.innerHeight - window.innerWidth) / 2;
        const right = window.innerWidth + (window.innerHeight - window.innerWidth) / 2;
        clipPath = `rect(0 ${right}px ${window.innerHeight}px ${left}px)`;
    }

    const start = rev ? `rect(${y}px ${x}px ${y}px ${x}px)` : clipPath;
    const end = rev ? clipPath : `rect(${y}px ${x}px ${y}px ${x}px)`;
    const spin = rev ? "spinfixedrev" : "spinfixed";
    const anim = document.getElementById("aperture").animate([
        {
            clipPath: start,
        },      
        {
            clipPath: end,
        }
    ], {
        duration: 1500,
        fill: "forwards",
        easing: "ease-in" // cubic-bezier(.47,.01,1,.45)
    });

    document.getElementById("aperture").style.animation = `${spin} linear 1.5s forwards`;

    if(rev) {
        setTimeout(() => {
            anim.cancel();
            document.getElementById("aperture").style.clipPath = "none";
        }, 2000);
    }

    // const width = window.innerWidth;
    // const height = window.innerHeight;

    // document.getElementById("aperture").style.visibility = "visible";
    // document.getElementById("aperture").style.maskImage = `url('test/mask2.svg'), linear-gradient(#ffffff, #ffffff)`;
    // document.getElementById("aperture").style.maskPosition = `center center`;
    // document.getElementById("aperture").style.maskMode = `luminance`;
    // document.getElementById("aperture").style.maskRepeat = `no-repeat`;
    // document.getElementById("aperture").style.maskComposite = `exclude`;

    // const len = Math.max(width, height);
    // const start = rev ? `0 0, ${width}px ${height}px` : `${len}px ${len}px, ${width}px ${height}px`;
    // const end = rev ? `${len}px ${len}px, ${width}px ${height}px` : `0 0, ${width}px ${height}px`;
    // const start_r = rev ? "0deg" : "360deg";
    // const end_r = rev ? "360deg" : "0deg";
    // const anim = document.getElementById("aperture").animate([
    //     {
    //         maskSize: start,
    //         rotate: start_r
    //     },
    //     {
    //         maskSize: end,
    //         rotate: end_r
    //     }
    // ], {
    //     duration: 1500,
    //     fill: "forwards",
    //     easing: "ease-in" // cubic-bezier(.47,.01,1,.45)
    // });

    // const spin = rev ? "spinfixedrev" : "spinfixed";
    // document.getElementById("aperture").style.animation = `${spin} linear 1.5s forwards`;

    // if(rev) {
    //     setTimeout(() => {
    //         document.getElementById("aperture").style.visibility = "hidden";
    //     }, 1500);
    // }
}

window.onload = () => {
    page.style.filter = dark ? "grayscale()" : "none";
    document.getElementById("switch").style.backgroundImage = dark ? "url('images/switch_off.png')" : "url('images/switch_on.png')";

    iris(true);

    // interactables should be off-limits until 1500

    // const navs = document.getElementsByTagName("a");
    // [...navs].forEach((element) => {
    //     if(element.id != "selected") {
    //         element.innerHTML = "[" + element.innerHTML + "]";
    //     }
    // });
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

function redirect(url) {
    iris(false);

    setTimeout(() => {
        window.location.href = url;
    }, 1750);
}