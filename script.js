function load() {
    document.getElementById("page").style.zIndex = 1;
    document.getElementById("space").style.zIndex = 0;

    document.getElementById("page").style.animation = "iris ease-out 2.5s forwards";

    setTimeout(() => {
        document.getElementById("pfp").style.visibility = "visible";
        document.getElementById("pfp").style.zIndex = 2;
        document.getElementById("pfp").style.animation = "appear 0.3s linear, shake 0.2s 0.4s steps(1, end)";
    }, 1250);
}