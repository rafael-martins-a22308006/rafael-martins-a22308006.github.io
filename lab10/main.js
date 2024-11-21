
fetch('https://deisishop.pythonanywhere.com/#/shop/getProducts')
.then(Response=>Response.json())
.then(data=>console.log(data))
.catch(error=> console.error('Error',error));


if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

function criarProduto(produto) {
    // Cria o elemento <article>
    const artigo = document.createElement('article');
    
    // Cria o título do produto (<h2>)
    const titulo = document.createElement('h2');
    titulo.textContent = produto.title;
    
    // Cria a imagem do produto (<img>)
    const imagem = document.createElement('img');
    imagem.src = produto.imagem;
    imagem.alt = produto.title;
    
    // Cria a descrição do produto (<p>)
    const descricao = document.createElement('p');
    descricao.textContent = produto.descricao;
    
    // Cria o preço do produto (<span>)
    const preco = document.createElement('span');
    preco.textContent = `Preço: ${produto.preco}€`;
    
    // Cria o botão "+ Adicionar ao cesto"
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao cesto';

    // Adiciona o evento ao botão
    botaoAdicionar.addEventListener('click', () => {
        // Recupera a lista de produtos selecionados do localStorage
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        
        // Adiciona o produto à lista
        produtosSelecionados.push(produto);
        
        // Salva a lista de volta ao localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

        // Opcional: Confirmar que o produto foi adicionado
        alert(`${produto.title} foi adicionado ao cesto!`);
    });
    
    // Adiciona os elementos ao <article>
    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(descricao);
    artigo.appendChild(preco);
    artigo.appendChild(botaoAdicionar);
    
    // Retorna o <article> criado
    return artigo;
}

function carregarProdutos(produtos) {
    // Selecione o elemento pai onde os artigos serão inseridos
    const container = document.getElementById('produtos');
    
    // Percorre a lista de produtos com forEach
    produtos.forEach((produto) => {
        // Cria o artigo para o produto
        const artigo = criarProduto(produto);
        
        // Adiciona o artigo no elemento pai
        container.appendChild(artigo);
    });
}
