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

    let about_light = new Image();
    about_light.src = "../images/landscape1.png";
    document.getElementById("about-light").style.backgroundImage = `url(${about_light.src})`;

    // let projects_light = new Image();
    // projects_light.src = "../images/corkboard.png";
    // document.getElementById("projects-light").style.backgroundImage = `url(${projects_light.src})`;

    let contact_light = new Image();
    contact_light.src = "../images/trees.png";
    document.getElementById("contact-light").style.backgroundImage = `url(${contact_light.src})`;

    let about_dark = new Image();
    about_dark.src = "../images/water.png";
    document.getElementById("about-dark").style.backgroundImage = `url(${about_dark.src})`;

    // let projects_dark = new Image();
    // projects_dark.src = "../images/corkboard.png";
    // document.getElementById("projects-dark").style.backgroundImage = `url(${projects_dark.src})`;

    let contact_dark = new Image();
    contact_dark.src = "../images/landscape3.png";
    document.getElementById("contact-dark").style.backgroundImage = `url(${contact_dark.src})`;

    // use image onload callback to see if images are done loading?

    document.getElementById("loading").style.visibility = "hidden";

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
    }, 750);
    
    Array.prototype.forEach.call(document.getElementsByClassName("content"), (content) => {
        for(element of content.children) {
            if(element.className.includes(page)) {
                element.style.zIndex = 0;
                element.classList.remove("inactive");
            } else {
                element.style.zIndex = -1;
                setTimeout((element) => {
                    element.classList.add("inactive");
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
        duration: 1500,
        fill: "forwards",
        easing: "ease-in" // cubic-bezier(.47,.01,1,.45)
    });

    setTimeout(() => {
        document.getElementById("toggle-dark").style.pointerEvents = "fill";
        document.getElementById("toggle-light").style.pointerEvents = "fill";
    }, 1500);
}