
// Elementos
const inputText = document.getElementById('inputText');
const botao = document.getElementById('botao');
const dblClickBotao = document.getElementById('dblClickBotao');
const mouseBotao = document.getElementById('mouseBotao');
const mensagem = document.getElementById('mensagem');

// Evento 1: click
botao.addEventListener('click', () => {
    mensagem.textContent = "Clicaste no botao!";
});

// Evento 2: focus (quando o campo de texto recebe o foco)
inputText.addEventListener('focus', () => {
    mensagem.textContent = "Quiseste escrever algo.";
});

// Evento 3: blur (quando o campo de texto perde o foco)
inputText.addEventListener('blur', () => {
    mensagem.textContent = "Saíste da escrita.";
});

// Evento 4: dblclick (clique duplo no botão)
dblClickBotao.addEventListener('dblclick', () => {
    mensagem.textContent = "Clicaste duas vezes!";
});

// Evento 5: mouseover e mouseout (passar o mouse sobre um botão e sair)
mouseBotao.addEventListener('mouseover', () => {
    mensagem.textContent = "O rato está sobre o botão!";
});
mouseBotao.addEventListener('mouseout', () => {
    mensagem.textContent = "O rato saiu do botão.";
});

document.addEventListener('DOMContentLoaded', () => {
    hello();
});

 hello = (name)=>{
     "hello "+ name;
}
