const GUAVA = document.getElementById("guava");
const KIWI = document.getElementById("kiwi");

const TEXT_SPEED = 50;
const DIALOGUE = [
    "Oh, hello!\nYou... woke me up.",
    "I just sniffed your packets.\nThey smell new...",
    "How exciting! Is this your first visit?\n(Surely you've never cleared your cache...)",
    "Do you want something to drink?\nWater? Carrot juice?",
    "Okay, we don't really have anything to drink.\nSorry... this is just a website.",
    "It's not even my website.\n(I just work here.)",
    "We're also a little short-staffed.\nIt's just me and my friend Kiwi.",
    "She's hard at work getting things ready for you.\nI think.",
    "Oh, right. My name is Guava!\nI'm the webmaster.",
    "Not that it means much.\n(It just looks good on a resume.)",
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
function type(text, name) {
    document.getElementById(name).innerHTML = "";
    let delay = 0;
    for(let i=0; i<text.length; i++) {
        const t = setTimeout(() => {
            document.getElementById(name).innerHTML += text[i] == "\n" ? "<br/>" : text[i];
            if(name == "text" && current_dialogue == 7 && text[i] == ".") {
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

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// loading page for simple version of site
async function load_simple() {
    document.removeEventListener("keydown", progress);

    GUAVA.src = `images/guava/guava_${current_dialogue}_talk.gif`;
    const duration = type("Okay! Simple. Got it.", "text");
    setTimeout(() => {
        GUAVA.src = `images/guava/guava_${current_dialogue}.gif`;
    }, duration);
    document.getElementById("indicator").style.display = "none";
    document.getElementById("loading").style.display = "block";

    setTimeout(() => {
        document.getElementById("loading").style.animation = "fall 1s ease-in forwards";
        GUAVA.src = `images/guava/guava_${current_dialogue+1}.gif`
    }, 2500 + duration);

    setTimeout(() => {
        GUAVA.src = `images/guava/guava_${current_dialogue+1}_talk.gif`;
        type("...okay, that's not supposed to happen", "text");
    }, 3500 + duration);
    setTimeout(() => {
        document.getElementById("page").style.animation = "fill 1.5s ease-in-out forwards";
    }, 4500 + duration);

    setTimeout(() => {
        document.getElementById("intro").remove(); // lets not clutter things up too much
        document.getElementById("title").style.animation = "pop 0.2s steps(1) forwards";
        document.querySelectorAll(".navitem").forEach((el, i) => {
            el.style.animation = `pop 0.1s ${0.5 + i * 0.1}s steps(1) forwards`;
        });
        document.getElementById("copyright").style.animation = "pop 0.2s 1s steps(1) forwards";
    }, 6000 + duration);

    setTimeout(() => {
        KIWI.src = "images/kiwi/kiwi_2.png";
        KIWI.style.animation = "fly 1s ease forwards";
    }, 7000 + duration);

    // this is horrible
    await delay(8000 + duration);

    const typelist = (list, i) => {
        if(i == list.length) {
            document.querySelectorAll(".navitem").forEach((el, i) => {
                el.style.marginLeft = "0";
            });
            return;
        }
        let duration2 = type(list[i], "text2");
        if(i > 0) {
            document.querySelectorAll(".navitem").forEach((el, i) => {
                el.style.marginLeft = "0";
            });
            document.querySelectorAll(".navitem")[i-1].style.marginLeft = "auto";
        }
        setTimeout(() => {
            duration2 += typelist(list, i+1);
        }, duration2 + 500);
        return duration2;
    }

    const kiwitext = [
        "hi my name is kiwi",
        "here's some stuff about me",
        "here are some of my projects",
        "here are my skills",
        "here's my resume\n(download it)",
        "and you can contact me at\nTHIS address",
    ];
    for (const text of kiwitext) {
        const duration2 = type(text, "text2");
        await delay(duration2 + 500);
    }

    setTimeout(() => {
        document.getElementById("guava2").style.animation = "popup 1s ease forwards";
    }, 500);
}

// i think you can extrapolate what this does
function load_complex() {
    document.removeEventListener("keydown", progress);

    GUAVA.src = `images/guava/guava_${current_dialogue}_talk.gif`;
    const duration = type("Okay, actually, this part's not done yet.\nWe'll let you when it's ready.\nI'm not sure how.\nMaybe we'll set up a mailing list.\n...we'll let you know when that's ready.", "text");
    setTimeout(() => {
        GUAVA.src = `images/guava/guava_${current_dialogue}.gif`;
    }, duration);
    document.getElementById("indicator").style.display = "none";
    // TODO: go to simple

    // document.getElementById("loading").style.display = "block";
    // setTimeout(() => {
    //    document.getElementById("page").style.animation = "fill 1s ease-in-out forwards";
    // }, 500 + duration);
}

function skip_dialogue() {
    timeouts.forEach((t) => {
        clearTimeout(t);
    });
    document.getElementById("text").innerHTML = DIALOGUE[DIALOGUE.length - 1].split("\n").join("<br/>");
    document.getElementById("indicator").innerHTML = RESPONSES[DIALOGUE.length - 1];
    document.getElementById("indicator").style.visibility = "visible";
    document.addEventListener("keydown", progress);
    document.getElementById("right").style.visibility = "hidden";
    GUAVA.src = `images/guava/guava_${DIALOGUE.length-1}.gif`;
    current_dialogue = DIALOGUE.length;
}

// skip to the choice dialogue
function skip(e) {
    if(e.key == "Enter" && current_dialogue < DIALOGUE.length) {
        // im so excited to get to use this operator
        document.getElementById("sign")?.remove();
        document.getElementById("sign2")?.remove();
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
    document.getElementById("right").style.visibility = "hidden";
    GUAVA.src = `images/guava/guava_${current_dialogue}_talk.gif`;
    const duration = type(DIALOGUE[current_dialogue], "text");
    const t1 = setTimeout(() => {
        GUAVA.src = `images/guava/guava_${current_dialogue}.gif`;
    }, duration);
    timeouts.push(t1);

    document.getElementById("indicator").style.visibility = "hidden";
    document.getElementById("indicator").innerHTML = RESPONSES[current_dialogue];
    document.removeEventListener("keydown", progress);
    const t2 = setTimeout(() => {
        current_dialogue++;
        document.getElementById("indicator").style.visibility = "visible";
        document.addEventListener("keydown", progress);
    }, 500 + duration);
    timeouts.push(t2);
}

function start() {
    GUAVA.onclick = "";
    GUAVA.src = "images/guava/guava_wake.gif";
    document.getElementById("sign").style.animation = "spin2 10s 7.5s linear infinite, leave 0.3s ease-out forwards, leave2 0.6s 0.3s ease-in forwards, jiggle 0.9s linear forwards";
    document.getElementById("sign2").style.animation = "spin3 10s 7.5s linear infinite, leave 0.3s ease-out forwards, leave2 0.6s 0.3s ease-in forwards, jiggle 0.9s linear forwards";
    setTimeout(() => {
        document.getElementById("sign").remove();
        document.getElementById("sign2").remove();
    }, 900);
    setTimeout(() => {
        advance();
    }, 3625);
}

window.onload = () => {
    document.addEventListener("keydown", skip);

    const cursor = document.getElementById("cursor");
    document.addEventListener("mousemove", (e) => {
        cursor.style.visibility = "visible";
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    });

    setTimeout(() => {
        GUAVA.style.pointerEvents = "all";
    }, 7500);

    // document.getElementById("css").href = "";
}