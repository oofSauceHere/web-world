let black = false;
let dark = localStorage.getItem("darkMode") == "true";
let currentPage = "about";

window.onload = () => {
    // need to check if all images are done loading
    // probably by creating image objects in js and
    // giving them onload triggers
    // setInterval(() => {
    //     console.log("hi");
    // }, 0);

    if(dark) {
        document.getElementById("bg-dark").style.zIndex = "50";
        document.getElementById("bg-light").style.zIndex = "0";
        document.getElementById("favicon").href = "../images/favicon-dark.ico";
    } else {
        document.getElementById("bg-dark").style.zIndex = "0";
        document.getElementById("bg-light").style.zIndex = "50";
        document.getElementById("favicon").href = "../images/favicon-light.ico";
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

const toggleLinks = (state) => {
    Array.prototype.forEach.call(document.getElementsByClassName("link"), (element) => {
        element.style.pointerEvents = state;
    });
}

const loadPage = (page) => {
    if(page == currentPage) return;
    currentPage = page;

    toggleLinks("none");
    setTimeout(() => {
        toggleLinks("auto");
    }, 1500);
    
    Array.prototype.forEach.call(document.getElementsByClassName("content"), (content) => {
        for(element of content.children) {
            if(element.className == `page ${page}`) {
                element.style.zIndex = 0;
                element.style.transform = "translateY(-10px)";
            } else {
                element.style.zIndex = -1;
                setTimeout((element) => {
                    element.style.transform = "translateY(calc(100% - 10px))";
                }, 750, element);
            }
        }
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
    document.getElementById("favicon").href = dark ? "../images/favicon-dark.ico" : "../images/favicon-light.ico";
    
    document.getElementById(type).style.clipPath = `circle(0% at ${x}px ${y}px)`;
    document.getElementById(type).style.zIndex = "50";
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