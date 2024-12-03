
fetch('https://deisishop.pythonanywhere.com/products/')
.then(Response=>Response.json())
.then(data=>{console.log(data)
    carregarProdutos(data);
   
})
.catch(error=> console.error('Error',error));


if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}


function criarProduto(produto) {
    // Cria o elemento <article>
    const artigo = document.createElement('article');
    
    // Cria o título do produto (<h2>)
    const titulo = document.createElement('h2');
    titulo.textContent = produto.title; // O título já está correto como 'title'
    
    // Verifica se a imagem está presente e adiciona
    const imagem = document.createElement('img');
    imagem.src = produto.image ? produto.image : 'default-image.jpg'; // Atribui uma imagem padrão caso não tenha
    imagem.alt = produto.title;
    
    // Cria a descrição do produto (<p>) usando 'description' conforme sua API
    const descricao = document.createElement('p');
    descricao.textContent = produto.description ? produto.description : 'Descrição não disponível'; // Usando 'description' da API
    
    // Cria o preço do produto (<span>) usando 'price' conforme sua API
    const preco = document.createElement('span');
    preco.textContent = produto.price ? `Preço: ${produto.price}€` : 'Preço não disponível'; // Usando 'price' da API
    
    // Cria o botão "+ Adicionar ao cesto"
    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao cesto';

    // Adiciona o evento ao botão
    botaoAdicionar.addEventListener('click', () => {
        // Vai buscar a lista guardada no localStorage
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        
        // Adiciona o produto à lista
        produtosSelecionados.push(produto);
        
        // Guarda a lista de volta ao localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
        adicionarAoCesto(produto);
        
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
    mostrarCesto();
}

function mostrarCesto() {
    const cestoContainer = document.getElementById('cesto');
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Limpa a seção do cesto
    cestoContainer.innerHTML = '';

    // Exibe os produtos do cesto
    produtosSelecionados.forEach(produto => {
        const artigo = document.createElement('article');
        
        const titulo = document.createElement('h4');
        titulo.textContent = produto.title;

        const imagem = document.createElement('img');
        imagem.src = produto.image ? produto.image : 'default-image.jpg'; // Atribui uma imagem padrão caso não tenha
        imagem.alt = produto.title;

        const descricao = document.createElement('p');
        descricao.textContent = produto.description;

        const preco = document.createElement('span');
        preco.textContent = `Preço: ${produto.price}€`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '+ Remover do carrinho';
        botaoRemover.onclick = () => removerProdutoDoCesto(index);
        
        // Adiciona os elementos ao artigo do cesto
        artigo.appendChild(titulo);
        artigo.appendChild(imagem);
        artigo.appendChild(descricao);
        artigo.appendChild(preco);
        artigo.appendChild(botaoRemover);

        cestoContainer.appendChild(artigo);
    })

    function adicionarAoCesto(produto) {
        // Recupera os produtos já armazenados no localStorage
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    
        // Adiciona o novo produto à lista
        produtosSelecionados.push(produto);
    
        // Atualiza o localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
    
        // Atualiza a exibição do cesto imediatamente
        mostrarCesto();
    }
}
function removerProdutoDoCesto(index) {
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    
    // Remove o produto do array pelo índice
    produtosSelecionados.splice(index, 1);

    // Atualiza o localStorage
    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

    // Atualiza a exibição do cesto
    mostrarCesto();
}

