let black = false;

const loadPage = () => {
    black = !black;
    document.getElementById("content").style = black ? "background-color: black;" : "background-color: #f0d2c9;";
}