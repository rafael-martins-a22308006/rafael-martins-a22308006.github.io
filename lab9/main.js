import produtos from './produtos.js';
function renderizarProdutos() {
     
    produtos.forEach(produto => {
        console.log(produto);
        const article = document.createElement('article');
        article.classList.add('produto');
        article.innerHTML = `
            <img src="${produto.imagem}" alt="Imagem de ${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>Preço: ${produto.preco}</p>
            <button onclick="adicionarAoCesto(${produto.id})">Adicionar ao Cesto</button>
        `;
        produtosContainer.appendChild(article);
    });
}
function criarProduto(produto) {
    // Cria o elemento <article>
    const artigo = document.createElement('article');
    
    // Cria o título do produto (<h2>)
    const titulo = document.createElement('h2');
    titulo.textContent = produto.titulo;
    
    // Cria a imagem do produto (<img>)
    const imagem = document.createElement('img');
    imagem.src = produto.imagem;
    imagem.alt = produto.titulo;
    
    // Cria a descrição do produto (<p>)
    const descricao = document.createElement('p');
    descricao.textContent = produto.descricao;
    
    // Cria o preço do produto (<span>)
    const preco = document.createElement('span');
    preco.textContent = `Preço: ${produto.preco}€`;
    
    // Adiciona os elementos ao <article>
    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(descricao);
    artigo.appendChild(preco);
    
    // Retorna o <article> criado
    return artigo;
}


document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos); 
});
