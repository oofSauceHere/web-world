const links = document.getElementsByTagName("a");

linknames = [
    "play all",
    "originals",
    "specs",
    "extras"
];

for(let i=0; i<links.length; i++) {
    links[i].addEventListener("focus", function() {
        this.innerText = "[" + linknames[i] + "]";
        this.style.fontSize = "7.5vh";
        this.style.outline = "none";
    });
    links[i].addEventListener("mouseover", function() {
        this.innerText = "[" + linknames[i] + "]";
        this.style.fontSize = "7.5vh";
        this.style.outline = "none";
    });
    links[i].addEventListener("blur", function() {
        this.innerText = linknames[i];
        this.style.fontSize = "7vh";
        this.style.outline = "none";
    });
    links[i].addEventListener("mouseout", function() {
        this.innerText = linknames[i];
        this.style.fontSize = "7vh";
        this.style.outline = "none";
    });
};