// elements
const terminal1 = document.getElementById("screen1").querySelector(".terminal");
const terminal2 = document.getElementById("screen2").querySelector(".terminal");
const terminal3 = document.getElementById("screen3").querySelector(".terminal");
const canvas = document.getElementById("font-test");

// global variables... probably want to change the name here?
let terminaltext = "Real Terminal<br/>(C) oofSauce. All rights reserved.";
let command = "";
let promptString = "user@web-world:~$";
let dir = ["home", "user"]
let linelen = 0;
let linecnt = 1;
let MAX_WIDTH = 576; // WRONG!
let selectedterminal = 1;

function redirect(url) {
    window.location.href = url;
}

// my own little dict-based filesystem hierarchy
const filesystem = {
    "/": ["home", "secret.txt"],
    "/home": ["user"],
    "/home/user": ["projects", "info.txt"],
    // easy enough to add projects here
    "/home/user/projects": ["misc", "gartic-phone-operator.txt", "screenwriter.txt",
                            "silent-filmifier.txt", "spotifymc.txt", "web-world.txt",],
    "/home/user/projects/misc": ["readme.txt", "color-picker.txt", "frok.txt", "nathan.txt"],
}

// files and their contents
const files = {
    "info.txt": "hello, test", // also readme?
    "secret.txt": "i don't know what you expected to find here. i mean, this isn't a real terminal. it's all fake. "
                  + "so there's like, what, 5 seconds of your life gone? i would count but im not "
                  + "there with you because im doing something more important. actually, its probably more than 5 now, "
                  + "and more, and still more... and guess what? theres still nothing interesting here. bye!",
    "readme.txt": "here are some silly projects that are a little less... complicated.",
    "gartic-phone-operator.txt": "",
    "web-world.txt": "",
    "screenwriter.txt": "",
    "silent-filmifier.txt": "",
    "spotifymc.txt": "",
    "nathan.txt": "",
    "frok.txt": "frok",
    "color-picker.txt": "",
}

const links = {
    "gartic-phone-operator.txt": "https://github.com/oofSauceHere/gartic-phone-operator",
    "web-world.txt": "https://github.com/oofSauceHere/web-world",
    "screenwriter.txt": "https://github.com/oofSauceHere/screenwriter",
    "silent-filmifier.txt": "https://github.com/oofSauceHere/silent-filmifier",
    "spotifymc.txt": "https://github.com/oofSauceHere/music-viewer-for-minecraft",
    "nathan.txt": "https://github.com/oofSauceHere/nathan",
    "frok.txt": "https://github.com/oofSauceHere/frok",
    "color-picker.txt": "https://github.com/oofSauceHere/color-picker",
}

const commands = new Set(["help", "man", "ls", "pwd", "cd", "cat", "rm"]);

// return the pixel? width of a line of text in 24px Tiny 5 font
const getlinelength = (line) => {
    const context = canvas.getContext("2d");
    context.font = "normal 24px 'Tiny 5'";
    const linedata = context.measureText(line);
    return linedata.width;
}

// process terminal keypress inputs
const readinput = (key) => {
    if(getlinelength(promptString + " " + command + key) > MAX_WIDTH*linecnt) {
        terminaltext += "\n";
        // need to account for space between newline and end of terminal screen
        linecnt += 1;
    }
    terminaltext += key;
    command += key;
    linelen += 1;
}

// handle terminal output
const printline = (line, ctrl, url = "") => {
    if(!ctrl) {
        const phrases = line.split("\t");
        let linetr = "";
        let linetr_intr = "";
        let empty = true;
        phrases.forEach((phrase) => {
            const words = phrase.split(" ");
            words.forEach((word) => {
                if(empty && word == "") return;
                empty = false;

                if(getlinelength(linetr_intr + word) > MAX_WIDTH) {
                    if(linetr_intr == "") {
                        linetr += "";
                    } else {
                        linetr += "\n";
                        empty = true;
                    }
                    linetr_intr = "";
                }

                let wordlinecnt = 1;
                let wordtr = "";
                if(getlinelength(word) > MAX_WIDTH) {
                    for(let i=0; i<word.length; i++) {
                        if(getlinelength(wordtr + word[i]) > MAX_WIDTH*wordlinecnt) {
                            wordtr += "\n";
                            wordlinecnt += 1;
                        }
                        wordtr += word[i];
                    }
                    linetr += wordtr + " ";
                } else {
                    if(empty && word == "") return;
                    empty = false;
                    linetr_intr += word + " ";
                    linetr += word + " ";
                }
            });
            linetr += "\t";
        });

        if(url == "") {
            terminaltext += `<br/><span class="result">${linetr.trim()}</span>`;
        } else {
            terminaltext += `<br/><a href='${url}' target='_blank' style='color: lightblue'>${linetr.trim()}</a>`
        }
    } else {
        // or linetr logic?
        terminaltext += `<br/><span>${line}</span>`;
    }
}

// return directory string
const getdirstr = () => {
    const dirstr = dir.reduce((acc, cv) => acc + "/" + cv, "");
    return dirstr == "" ? "/" : dirstr;
}

// update primary prompt string
const setPromptString = () => {
    let dirstr = getdirstr();
    if(dirstr.substring(0, 10) == "/home/user") dirstr = `~${dirstr.substring(10)}`;
    promptString = "user@web-world:" + dirstr + "$";
}

const randomString = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const len = Math.floor(Math.random() * 14) + 1;
    const ls = Array.from({length: len}, (_, index) => chars[Math.floor(Math.random() * chars.length)]);
    return ls.join("");
}

const selectTerminal = () => {
    for(let i=0; i<3; i++) {
        const border = document.getElementById(`screen${i+1}`).querySelector(".terminalborder");
        if(selectedterminal == i) {
            border.style.backgroundImage = "conic-gradient(#fd004c, #fe9000, #fff020, #3edf4b, #3363ff, #b102b7, #fd004c)";
            border.style.animation = "rotate 2.5s linear infinite";
            // border.style.backgroundColor = "white";
        } else {
            border.style.backgroundImage = "none";
            border.style.animation = "none";
            // border.style.backgroundColor = "rgb(82, 255, 47)";
        }
    }
}

const renderIRC = () => {
    const IRC = [[
        "*** Now talking in #random",
        "<infynity> wassup",
        "<d3sm0nd> heey",
        "<d3sm0nd> *hey",
        "<infynity> you dont gotta\ncorrect that i know what you\nwere tryig to say",
        "<d3sm0nd> *trying",
        "<infynity> you KNOW what i was\ntring to say",
        "<d3sm0nd> *tying",
        "<infynity> *trying",
        "<d3sm0nd> *trying",
        "<infynity> haha get fukced",
        "<d3sm0nd> *fucked",
        "<infynity> ...",
        "*** infynity has quit",
        "<d3sm0nd> ...",
        "<d3sm0nd> *infinity",
    ], [
        "*** Now talking in\n#programming",
        "<alien> you know what sucks?\nthat you need classes to program\nin java",
        "<scriptr> well you dont NEED\nthem... im self-taught",
        "<alien> no dumbass, i mean\nOOP classes",
        "<scriptr> wtf is OOP?",
        "<alien> dude",
        "<scriptr> out of pounds?",
        // more guesses
        "<alien> ok so evidently you do\nneed classes",
    ]];

    const chat = IRC[Math.floor(Math.random() * IRC.length)];

    // works decently well but perhaps worth customizing timing for jokes
    let total_time = 0;
    for(let i=0; i<chat.length; i++) {
        const time = chat[i].length * 100;
        setTimeout(() => {
            terminal3.textContent += chat[i] + "\n";
            terminal3.scrollTop = terminal3.scrollHeight;
        }, total_time + time);
        total_time += time;
    }

    // terminal3.textContent += IRC[Math.floor(Math.random() * IRC.length)].join("\n");
}

window.onload = () => {
    // show terminal
    setTimeout(() => {
        terminal2.innerHTML = terminaltext;
        terminal2.style.padding = "15px";
        terminal2.style.width = "calc(100% - 40px)";
        terminal2.style.height = "calc(100% - 40px)";
        selectTerminal();
    }, 3000);

    setTimeout(() => {
        terminal1.style.padding = "15px";
        terminal1.style.width = "calc(100% - 40px)";
        terminal1.style.height = "calc(100% - 40px)";
        terminal1.innerHTML = "Try `help` for a list of\ncommands.\n\nAlso, use `Ctrl-H` and\n`Ctrl-L` to switch between\nterminals.";

        terminal3.style.padding = "15px";
        terminal3.style.width = "calc(100% - 40px)";
        terminal3.style.height = "calc(100% - 40px)";

        // terminal3.textContent = "<f1n1t3ch> wassup\n<desmond> heey\n<desmond> *hey\n<f1n1t3ch> you dont gotta\ncorrect that i know what you\nwere trying to say";
        renderIRC();
        // setInterval(() => {
        //     terminal3.innerHTML += `[term] ${randomString()}\n`;
        //     terminal3.scrollTop = terminal3.scrollHeight;
        // }, 100);
    }, 3500);

    setTimeout(() => {
        // show primary prompt string
        printline(`<br/>${promptString} `, true);
        terminal2.innerHTML = terminaltext;
        
        window.onkeydown = (e) => {
            if(e.key.length == 1) { // does this work consistently?
                if(e.ctrlKey) {
                    if(e.key == "h") {
                        e.preventDefault();
                        selectedterminal = (selectedterminal + 2) % 3;
                        selectTerminal();
                    } else if(e.key == "l") {
                        e.preventDefault();
                        selectedterminal = (selectedterminal + 4) % 3;
                        selectTerminal();
                    }
                    return;
                }

                // want input to be grey? need span tag magic...
                readinput(e.key);
                terminal2.innerHTML = terminaltext;
            } else if(e.code == "Backspace" && linelen > 0) {
                terminaltext = terminaltext.slice(0, -1);
                if(terminaltext.slice(-1) == "\n") {
                    terminaltext = terminaltext.slice(0, -1);
                    linecnt -= 1;
                }
                terminal2.innerHTML = terminaltext;
                command = command.slice(0, -1);
                linelen -= 1;
            } else if(e.code == "Enter") {
                linecnt = 1;

                // execute multiple commands at once using semicolon separation?

                if(command.trim().slice(0, 13) == "sudo rm -rf /" ||
                   command.trim().slice(0, 8) == "rm -rf /") {
                    let explosion = document.createElement("img");
                    explosion.src = "images/explosion.gif";
                    explosion.id = "explosion";
                    document.getElementById("page").appendChild(explosion);

                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 250);
                    return;
                }

                const coms = command.trim().split(" ");

                if(coms[0] == "clear") {
                    terminaltext = `${promptString} `;
                    terminal2.innerHTML = terminaltext;
                    command = "";
                    linelen = 0;

                    terminal2.scrollTop = terminal2.scrollHeight;
                    return;
                } else if(coms[0] == "") {
                    // is it good practice to have empty branch?
                } else if(coms[0] == "help") {
                    printline("help: list all commands", false);
                    printline("man: view reference \"manuals\"", false)
                    printline("ls: list directory contents", false);
                    printline("pwd: print working directory", false);
                    printline("cd: change directory", false);
                    printline("cat: print file contents", false);
                    printline("rm: remove file or directory", false);
                } else if(coms[0] == "man") {
                    if(coms.length == 1) {
                        printline("What manual page do you want?");
                        printline("For example, try 'man man'.");
                    } else {
                        switch(coms[1]) {
                            case "man":
                                printline("NAME");
                                printline("man: view reference \"manuals\"");
                                printline("");
                                printline("SYNOPSIS");
                                printline("man [COMMAND]");
                                break;
                            case "ls":
                                printline("NAME");
                                printline("ls: list directory contents");
                                printline("");
                                printline("SYNOPSIS");
                                printline("ls [DIR]");
                                break;
                            case "cd":
                                printline("NAME");
                                printline("cd: change directory");
                                printline("");
                                printline("SYNOPSIS");
                                printline("cd [DIR]");
                                break;
                            case "cat":
                                printline("NAME");
                                printline("cat: print file contents (does not concatenate files even though it's supposed to... sorry");
                                printline("");
                                printline("SYNOPSIS");
                                printline("cat [FILE]");
                                break;
                            case "rm":
                                printline("NAME");
                                printline("rm: remove file or directory");
                                printline("");
                                printline("SYNOPSIS");
                                printline("rm [OPTIONS] [FILE/DIR]");
                                printline("");
                                printline("OPTIONS");
                                printline("-rf");
                                printline("remove directories and their contents recurisvely, never prompt");
                                break;
                            default:
                                printline(`No manual entry for ${coms[1]}`);
                        }
                    }
                } else if(coms[0] == "ls") {
                    // maybe have an --all flag to show something secret
                    let filelist = filesystem[getdirstr()];
                    if(coms.length > 1) {
                        let dirstr = "";
                        if(coms[1][0] == "/") {
                            dirstr = coms[1];
                        } else if(coms[1][0] == "~") {
                            dirstr = "/home/user" + coms[1].slice(1);
                        } else {
                            dirstr = getdirstr() + (getdirstr() == "/" ? "" : "/") + coms[1];
                        }

                        if(dirstr in filesystem) {
                            filelist = filesystem[dirstr];
                            if(filelist.length > 0) printline(filelist.reduce((acc, cv) => acc + cv + "    ", "").slice(0, -1), false);
                        } else {
                            printline(`ls: ${coms[1]}: No such file or directory.`);
                        }
                    } else {
                        if(filelist.length > 0) printline(filelist.reduce((acc, cv) => acc + cv + "    ", "").slice(0, -1), false);
                    }
                } else if(coms[0] == "pwd") {
                    printline(getdirstr(), false);
                } else if(coms[0] == "cd") {
                    if(coms.length == 1) {
                        dir = ["home", "user"];
                    } else {
                        const path = coms[1].split("/");
                        if(path[0] == "") {
                            dir = [];
                        }
                        
                        // use normal for-loop so we can break
                        for(let i=0; i<path.length; i++) {
                            const loc = path[i];

                            if(loc == "~" && i == 0) {
                                dir = ["home", "user"];
                            } else if(loc == "..") {
                                if(dir.length > 0) dir.pop();
                            } else if(loc == "." || loc == "") {
                                // do nothing
                            } else {
                                // doesnt check if exists lmao
                                if(filesystem[getdirstr()].includes(loc)) {
                                    if(loc.includes(".")) {
                                        printline(`cd: ${loc}: Not a directory`, false);
                                        // not sufficient for restoration
                                        for(let j=0; j<i; j++) {
                                            dir.pop();
                                        }
                                        break;
                                    }
                                    dir.push(loc);
                                } else {
                                    printline(`cd: ${coms[1]}: No such file or directory`, false);
                                    // not sufficient for restoration
                                    for(let j=0; j<i; j++) {
                                        dir.pop();
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    setPromptString();
                } else if(coms[0] == "rm") {
                    printline("rm: nope lmao.", false);
                } else if(coms[0] == "cat") {
                    // doesnt work for paths, only current directory files

                    // fails if no second input
                    if(filesystem[getdirstr()].includes(coms[1])) {
                        if(coms[1].includes(".")) {
                            printline(files[coms[1]], false);
                            if(coms[1] in links) printline("Go to project ->", false, links[coms[1]]);
                        } else {
                            printline(`cat: ${coms[1]}: Is a directory.`);
                        }
                    } else {
                        printline(`cat: ${coms[1]}: No such file or directory.`);
                    }
                } else {
                    printline(`${coms[0]}: command not found.`, false);
                    printline("Use 'help' to view all commands.");
                    printline(`${promptString} `, true)
                    terminal2.innerHTML = terminaltext;
                    command = "";
                    linelen = 0;

                    terminal2.scrollTop = terminal2.scrollHeight;
                    return;
                }
                // add "man"
                // support for mkdir/touch? put in localstorage? how big can that be?

                printline(`${promptString} `, true);
                terminal2.innerHTML = terminaltext;
                command = "";
                linelen = 0;
            }
            // arrow keys, tab completion (requires readInput overhaul)

            // always scroll to bottom of terminal
            terminal2.scrollTop = terminal2.scrollHeight;
        }
    }, 3200);
}