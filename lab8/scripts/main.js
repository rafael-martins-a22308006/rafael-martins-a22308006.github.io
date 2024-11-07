
document.querySelectorAll("#color").forEach((e) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color; // Acessa a cor armazenada em data-color
        console.log("Cor selecionada:", color);
        document.getElementById("colorBox").style.backgroundColor = color; // Aplica a cor ao elemento
    });
})
