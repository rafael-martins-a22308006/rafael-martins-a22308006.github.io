fetch('https://deisishop.pythonanywhere.com/#/shop/getProducts')
    .then(Response=>Response.json())
    .then(data=>console.log(data))
    .catch(error=> console.error('Error',error));


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

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos); 
});
