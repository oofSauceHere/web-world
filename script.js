function load() {
    // fun with timeouts
    document.getElementById("door").style.pointerEvents = "none";
    document.getElementById("door").src = "images/door_frames/door_frame2.png";

    setTimeout(() => {
        document.getElementById("door").src = "images/door_frames/door_frame3.png";
    }, 500);

    setTimeout(() => {
        document.getElementById("page").style.zIndex = 1;
        document.getElementById("space").style.zIndex = 0;

        document.getElementById("page").style.animation = "iris ease-out 2s forwards";
    }, 1000);

    setTimeout(() => {
        document.getElementById("pfp").style.visibility = "visible";
        document.getElementById("pfp").style.animation = "appear 0.3s ease-in, shake 0.2s 0.4s steps(1, end)";
    }, 2000);
}