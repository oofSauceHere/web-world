// elements
const terminal = document.getElementById("terminal");
const canvas = document.getElementById("font-test");

// global variables... probably want to change the name here?
let terminaltext = "Real Terminal (Not Fake)<br/>(c) oofSauce. All rights reserved.";
let command = "";
let promptString = "user@web-world:~$";
let dir = ["home", "user"]
let linelen = 0;
let linecnt = 1;

// my own little dict-based filesystem hierarchy
const filesystem = {
    "/": ["home", "secret.txt"],
    "/home": ["user"],
    "/home/user": ["projects", "info.txt"],
    // easy enough to add projects here
    "/home/user/projects": ["misc", "gartic-phone-operator.txt", "web-world.txt",
                            "screenwriter.txt", "silent-filmifier.txt", "spotifymc.txt"],
    "/home/user/projects/misc": ["nathan.txt", "frok.txt", "color-picker.txt"],
}

// files and their contents
const files = {
    "info.txt": "hello, test",
    "secret.txt": "i don't know what you expected to find here. i mean, this isn't a real terminal. it's all fake. "
                  + "so there's like, what, 5 seconds of your life gone? i would count but im not "
                  + "there with you because im doing something more important. actually, its probably more than 5 now, "
                  + "and more, and still more... and guess what? theres still nothing interesting here. goodbye!",
    "gartic-phone-operator.txt": "",
    "web-world.txt": "",
    "screenwriter.txt": "",
    "silent-filmifier.txt": "",
    "spotifymc.txt": "",
    "nathan.txt": "",
    "frok.txt": "",
    "color-picker.txt": "",
}

// return the pixel? width of a line of text in 24px Tiny 5 font
const getlinelength = (line) => {
    const context = canvas.getContext("2d");
    context.font = "normal 24px 'Tiny 5'";
    const linedata = context.measureText(line);
    return linedata.width
}

// process terminal keypress inputs
const readinput = (key) => {
    if(getlinelength(promptString + " " + command + key) > 402*linecnt) {
        terminaltext += "\n";
        // need to account for space between newline and end of terminal screen
        linecnt += 1;
    }
    terminaltext += key;
    command += key;
    linelen += 1;
}

// handle terminal output
const printline = (line, ctrl) => {
    if(!ctrl) {
        const phrases = line.split("\t");
        let linetr = "";
        let linetr_intr = "";
        phrases.forEach((phrase) => {
            const words = phrase.split(" ");
            words.forEach((word) => {
                // dont go to newline if current line is empty
                if(getlinelength(linetr_intr + word) > 402) {
                    linetr += linetr_intr == "" ? "" : "\n";
                    linetr_intr = "";
                }

                let wordlinecnt = 1;
                let wordtr = "";
                if(getlinelength(word) > 402) {
                    for(let i=0; i<word.length; i++) {
                        if(getlinelength(wordtr + word[i]) > 402*wordlinecnt) {
                            wordtr += "\n";
                            // need to account for space between newline and end of terminal screen
                            wordlinecnt += 1;
                        }
                        wordtr += word[i];
                    }
                    linetr += wordtr + " ";
                } else {
                    linetr_intr += word + " ";
                    linetr += word + " ";
                }
            });
            linetr += "\t";
        });
        terminaltext += `<br/><span style='color: white'>${linetr}</span>`;
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

window.onload = () => {
    // show terminal
    setTimeout(() => {
        terminal.innerHTML = terminaltext;
    }, 550);

    setTimeout(() => {
        // show primary prompt string
        printline(`<br/>${promptString} `, true);
        terminal.innerHTML = terminaltext;
        
        window.onkeydown = (e) => {
            if(e.key.length == 1) { // does this work consistently?
                if(e.ctrlKey) return;

                // want input to be grey? need span tag magic...
                readinput(e.key);
                terminal.innerHTML = terminaltext;
            } else if(e.code == "Backspace" && linelen > 0) {
                terminaltext = terminaltext.slice(0, -1);
                if(terminaltext.slice(-1) == "\n") {
                    terminaltext = terminaltext.slice(0, -1);
                    linecnt -= 1;
                }
                terminal.innerHTML = terminaltext;
                command = command.slice(0, -1);
                linelen -= 1;
            } else if(e.code == "Enter") {
                linecnt = 1;

                // execute multiple commands at once using semicolon separation?

                if(command.trim() == "rm -rf /") {
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
                    terminal.innerHTML = terminaltext;
                    command = "";
                    linelen = 0;

                    terminal.scrollTop = terminal.scrollHeight;
                    return;
                } else if(coms[0] == "") {
                    // is it good practice to have empty branch?
                } else if(coms[0] == "help") {
                    printline("no", false);
                } else if(coms[0] == "ls") {
                    // printline("This isn't a real terminal lmao what did<br/>you expect to find here", false);
                    const filelist = filesystem[getdirstr()];
                    // filenames with spaces get quotes... will i ever even create filenames with spaces?
                    if(filelist.length > 0) printline(filelist.reduce((acc, cv) => acc + cv + "\t", "").slice(0, -1), false);
                } else if(coms[0] == "pwd") {
                    printline(getdirstr(), false);
                } else if(coms[0] == "cd") {
                    if(coms.length == 1) {
                        dir = ["home", "user"];
                    } else {
                        // what if it starts in "/"?
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
                    printline("rm: nope lmao", false);
                } else if(coms[0] == "cat") {
                    // fails if no second input
                    if(filesystem[getdirstr()].includes(coms[1])) {
                        if(coms[1].includes(".")) {
                            printline(files[coms[1]], false);
                        } else {
                            printline(`cat: ${coms[1]}: Is a directory`);
                        }
                    } else {
                        printline(`cat: ${coms[1]}: No such file or directory`);
                    }
                } else {
                    printline(`${coms[0]}: command not found`, false);
                    printline("Use 'help' to view all commands");
                    printline(`${promptString} `, true)
                    terminal.innerHTML = terminaltext;
                    command = "";
                    linelen = 0;

                    terminal.scrollTop = terminal.scrollHeight;
                    return;
                }

                printline(`${promptString} `, true);
                terminal.innerHTML = terminaltext;
                command = "";
                linelen = 0;
            }

            // always scroll to bottom of terminal
            terminal.scrollTop = terminal.scrollHeight;
        }
    }, 750);
}