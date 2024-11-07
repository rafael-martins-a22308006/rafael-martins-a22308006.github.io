
function changeColor(color) {
    document.getElementById("colorBox").style.backgroundColor = color;
}

function submitColor() {
    const color = document.getElementById("colorInput").value.toLowerCase();
    changeColor(color);
}

function count() {
    let counter = 0;
   const heading = document.querySelector('h1');
   function count() {
      counter++;
      heading.textContent = counter;
   } 
}


