
function changeColor(color) {
    document.getElementById("colorBox").style.backgroundColor = color;
}

function submitColor() {
    const color = document.getElementById("colorInput").value.toLowerCase();
    changeColor(color);
}

function count() {
    document.getElementById("countResult").innerText = "33";
}

