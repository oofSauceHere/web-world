let black = false;
let dark = localStorage.getItem("darkMode") == "true";

window.onload = () => {
    if(dark) {
        document.getElementById("bg-dark").style.zIndex = "5";
        document.getElementById("bg-light").style.zIndex = "0";
    } else {
        document.getElementById("bg-dark").style.zIndex = "0";
        document.getElementById("bg-light").style.zIndex = "5";
    }

    Array.prototype.forEach.call(document.getElementsByClassName("info"), (element) => {
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";
    });

    for(let i=0; i<5; i++) {
        setTimeout(() => {
            Array.prototype.forEach.call(document.getElementsByClassName(`link${i+1}`), (element) => {
                element.style.visibility = "visible";
                element.style.opacity = "1";
            });
        }, 500 + 100*i);
    }

    setTimeout(() => {
        Array.prototype.forEach.call(document.getElementsByClassName("footer"), (element) => {
            element.style.visibility = "visible";
            element.style.opacity = "1";
        });
    }, 1000);
}

const loadPage = () => {
    black = !black;
    Array.prototype.forEach.call(document.getElementsByClassName("content"), (element) => {
        element.style = black ? "background-color: black;" : "";
    });
}

const toggleDarkMode = () => {
    localStorage.setItem("darkMode", dark ? "false" : "true");

    let rect = document.getElementById(`toggle-${dark ? "dark" : "light"}`).getBoundingClientRect(); // doesnt matter which, really
    let x = (rect.left + rect.right) / 2;
    let y = (rect.top + rect.bottom) / 2;

    document.getElementById("toggle-dark").style.pointerEvents = "none";
    document.getElementById("toggle-light").style.pointerEvents = "none";

    dark = !dark;
    let type = dark ? "bg-dark" : "bg-light";
    let antiType = dark ? "bg-light" : "bg-dark";
    document.getElementById(type).style.clipPath = `circle(0% at ${x}px ${y}px)`;
    document.getElementById(type).style.zIndex = "5";
    document.getElementById(antiType).style.zIndex = "0";
    document.getElementById(type).animate([
        { clipPath: `circle(0% at ${x}px ${y}px)` },
        { clipPath: `circle(200% at ${x}px ${y}px)` }
    ], {
        duration: 2500,
        fill: "forwards",
        easing: "ease-out"
    });

    setTimeout(() => {
        document.getElementById("toggle-dark").style.pointerEvents = "fill";
        document.getElementById("toggle-light").style.pointerEvents = "fill";
    }, 2000);
}