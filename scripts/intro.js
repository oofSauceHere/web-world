const TEXT_SPEED = 25;
const DIALOGUE = [
    "Hello!",
    "Sorry, I sniffed you on your way in.\nYour packets smell new...",
    "How exciting! Is this your first visit?\n(Surely you've never cleared your cache...)",
    "Do you want something to drink?\nWater? Carrot juice?",
    "Okay, we don't really have anything to drink.\nSorry... this is just a website.",
    "It's not even my website.\n(I just work here.)",
    "We're also a little short-staffed.\nIt's just me and my friend Bea!",
    "She's hard at work getting things ready for you.\nI think.",
    "What? Who am I? Oh, I'm the webmaster.\nIndeed, a title fit for a spider!",
    "...but I'm not a spider. I'm a bunny!\n(I just think \"webmaster\" looks good on a resume.)",
    "Oh, sorry. I'm rambling.\nI'm excited to show you around! But first...",
    "What kind of experience would you like?",
];
const RESPONSES = [
    "<span class=\"next\" onclick=\"advance()\">[↑] to continue</span>&emsp;&emsp;<span class=\"next\" onclick=\"skip_dialogue()\">[Enter] to skip</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>", // first visit option
    "<span class=\"next\" onclick=\"advance()\">[←] water</span>&emsp;&emsp;<span class=\"next\" onclick=\"advance()\" >[→] carrot juice</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"advance()\">[↑]</span>",
    "<span class=\"next\" onclick=\"load_simple()\" id=\"simple\">[←] simple</span>&emsp;&emsp;<span class=\"next\" onclick=\"load_complex()\" id=\"complex\">[→] lots of STUFF!</span>"
];

let current_dialogue = 0;
let timeouts = [];

// play typewriter effect on text
function type(text) {
    document.getElementById("text").innerHTML = "";
    let delay = 0;
    for(let i=0; i<text.length; i++) {
        const t = setTimeout(() => {
            document.getElementById("text").innerHTML += text[i] == "\n" ? "<br/>" : text[i];
            if(current_dialogue == 7 && text[i] == ".") {
                setTimeout(() => {
                    document.getElementById("right").style.visibility = "visible";
                }, 250);
            }
        }, delay + TEXT_SPEED * i);
        
        if(i != text.length-1) {
            if((text[i] == "." || text[i] == "!" || text[i] == "?" || text[i] == "*") && (i == text.length-1 || text[i+1] == " " || text[i+1] == "\n")) {
                delay += 500;
            } else if((text[i] == ")" || text[i] == "'") && text[i-1] == ".") {
                delay += 500;
            } else if(text[i] == ",") {
                delay += 250;
            }
        }
        
        timeouts.push(t);
    }

    return delay + text.length * TEXT_SPEED;
}

// loading page for simple version of site
function load_simple() {
    const duration = type("well, this should be easy...");
    document.getElementById("indicator").style.display = "none";
    document.getElementById("loading").style.display = "block";

    setTimeout(() => {
       document.getElementById("bar").style.animation = "fill 1s ease-in-out forwards";
    }, 500 + duration);
}

// i think you can extrapolate what this does
function load_complex() {
    const duration = type("transitioning...\n(not in that way)");
    document.getElementById("indicator").style.display = "none";
    document.getElementById("loading").style.display = "block";

    setTimeout(() => {
       document.getElementById("bar").style.animation = "fill 1s ease-in-out forwards";
    }, 500 + duration);
}

function skip_dialogue() {
    timeouts.forEach((t) => {
        clearTimeout(t);
    });
    document.getElementById("cursor").style.borderRadius = "12.5px";
    document.getElementById("text").innerHTML = DIALOGUE[DIALOGUE.length - 1].split("\n").join("<br/>");
    document.getElementById("indicator").innerHTML = RESPONSES[DIALOGUE.length - 1];
    document.getElementById("indicator").style.visibility = "visible";
    document.addEventListener("keydown", progress);
    document.getElementById("right").style.visibility = "hidden";
    document.getElementById("webmaster").src = `images/bunny/webmaster${DIALOGUE.length-1}.png`;
    current_dialogue = DIALOGUE.length;
}

// skip to the choice dialogue
function skip(e) {
    if(e.key == "Enter" && current_dialogue < DIALOGUE.length) {
        skip_dialogue();
    }
}

// handle progression to the next dialogue
function progress(e) {
    if(e.key == "ArrowUp" && (current_dialogue < DIALOGUE.length && current_dialogue != 4)) {
        advance();
    } else if (current_dialogue == 4 && (e.key == "ArrowLeft" || e.key == "ArrowRight")) {
        advance();  
    } else if(current_dialogue == DIALOGUE.length) {
        if(e.key == "ArrowRight") {
            load_complex();
        } else if(e.key == "ArrowLeft") {
            load_simple();
        }
    }
}

// run entire dialogue sequence
function advance() {
    document.getElementById("cursor").style.borderRadius = "12.5px";
    document.getElementById("right").style.visibility = "hidden";
    document.getElementById("webmaster").src = `images/bunny/webmaster${current_dialogue}.png`;
    const duration = type(DIALOGUE[current_dialogue]);

    document.getElementById("indicator").style.visibility = "hidden";
    document.getElementById("indicator").innerHTML = RESPONSES[current_dialogue];
    document.removeEventListener("keydown", progress);
    const t = setTimeout(() => {
        current_dialogue++;
        document.getElementById("indicator").style.visibility = "visible";
        document.addEventListener("keydown", progress);
    }, 500 + duration);
    timeouts.push(t);
}

// creating the curved text effect in the intro sequence involves individually rotating each letter of the text,
// which requires span tags for each letter, which aesthetically i hate. so to avoid writing that im just having
// js do it for me.
function curve_text() {
    let bottom_text = document.getElementById("bottom-text");
    const interval = 45/(bottom_text.innerHTML.length-1);
    // hell of a one-liner...
    bottom_text.innerHTML = [...bottom_text.innerHTML].map((letter, i) => `<span style="position: absolute; transform: rotate(-${67.5 + interval*i}deg) translateX(-35rem) rotate(90deg)">${letter}</span>`).join("");
}

function enter() {
    document.getElementById("cursor").style.borderRadius = "12.5px";
    document.getElementById("intro").remove();
    setTimeout(() => {
        document.getElementById("webmaster").style.animation = "appear 2.5s cubic-bezier(0, 1, 0, 1) forwards";
    }, 500);
    setTimeout(() => {
        document.addEventListener("keydown", skip);
        advance();
    }, 1000);
}

window.onload = () => {
    // curve_text();
    setTimeout(() => {
        // document.getElementById("webmaster").style.animation = "appear 2.5s cubic-bezier(0, 1, 0, 1) forwards";
        document.getElementById("webmaster").src = "images/bunny/guava_wake.gif";
    }, 1500);
    setTimeout(() => {
        document.addEventListener("keydown", skip);
        advance();
    }, 5000);
    
    const cursor = document.getElementById("cursor");
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    });

    // const enter = document.getElementById("enter");
    // enter.addEventListener("mouseenter", (e) => {
    //     cursor.style.borderRadius = "0";
    // });
    // enter.addEventListener("mouseleave", (e) => {
    //     cursor.style.borderRadius = "12.5px";
    // });

    const indicator = document.getElementById("indicator");
    indicator.addEventListener("mouseenter", (e) => {
        cursor.style.borderRadius = "0";
    });
    indicator.addEventListener("mouseleave", (e) => {
        cursor.style.borderRadius = "12.5px";
    });
}

// Q&A
//
// Q: Did you steal the font from Bjork?
// A: No.
//
// Q: Are you sure?
// A: No. I mean yes.