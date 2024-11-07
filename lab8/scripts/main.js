
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
      counter++;
      heading.textContent = counter;

}
function vermelho(){
    const button=document.querySelector('red')
    button.backgroundColor="red";
   }


