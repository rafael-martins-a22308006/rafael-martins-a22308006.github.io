
document.querySelectorAll("button.cor").forEach((e) => {
    e.addEventListener("click", () => {
        const color = e.dataset.color; // Acessa a cor armazenada em data-color
        console.log("Cor selecionada:", color);
        document.getElementById("colorBox").style.backgroundColor = color; // Aplica a cor ao elemento
    });
})
