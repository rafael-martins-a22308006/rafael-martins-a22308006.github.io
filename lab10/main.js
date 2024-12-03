
fetch('https://deisishop.pythonanywhere.com/products/')
.then(Response=>Response.json())
.then(data=>{let produtos = [];
    carregarProdutos(data);
    produtos = data;
})
.catch(error=> console.error('Error',error));


if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}
// Carrega todos os produtos ao carregar a página
window.onload = () => {
    if (produtos.length > 0) {
        carregarProdutos(produtos); 
    }
    criarProduto(produtos);
    atualizarCustoTotal();
};

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
    produtosSelecionados.forEach((produto, index)=> {
        const artigo = document.createElement('article');
        
        const titulo = document.createElement('h4');
        titulo.textContent = produto.title;

        const imagem = document.createElement('img');
        imagem.src = produto.image ? produto.image : 'default-image.jpg'; // Atribui uma imagem padrão caso não tenha
        imagem.alt = produto.title;


        const preco = document.createElement('span');
        preco.textContent = `Preço: ${produto.price}€`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '+ Remover do carrinho';
        botaoRemover.onclick = () => removerProdutoDoCesto(index);
        
        // Adiciona os elementos ao artigo do cesto
        artigo.appendChild(titulo);
        artigo.appendChild(imagem);
        artigo.appendChild(preco);
        artigo.appendChild(botaoRemover);

        cestoContainer.appendChild(artigo);
    })
   
}

function adicionarAoCesto(produto) {
    // Recupera os produtos já armazenados no localStorage
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Adiciona o novo produto à lista
    produtosSelecionados.push(produto);

    // Atualiza o localStorage
    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

    // Atualiza a exibição do cesto imediatamente
    mostrarCesto();
    atualizarCustoTotal();
}


function removerProdutoDoCesto(index) {
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    
    // Remove o produto do array pelo índice
    produtosSelecionados.splice(index, 1);

    // Atualiza o localStorage
    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

    // Atualiza a exibição do cesto
    mostrarCesto();
    atualizarCustoTotal();
}

function atualizarCustoTotal() {
    // Recupera os produtos do localStorage
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Calcula o custo total
    let custoTotal = produtosSelecionados.reduce((total, produto) => total + produto.price, 0);

    // Seleciona a seção de compra existente
    const compraSection = document.getElementById('compra');

    // Limpa o conteúdo existente na seção
    compraSection.innerHTML = '';

    // Adiciona o custo total
    const tituloCusto = document.createElement('h3');
    tituloCusto.textContent = `Custo total: ${custoTotal.toFixed(2)} €`;
    compraSection.appendChild(tituloCusto);

    // Adiciona a checkbox "És estudante do DEISI?"
    const descontoContainer = document.createElement('div');
    descontoContainer.style.marginTop = '10px';

    const checkboxAluno = document.createElement('input');
    checkboxAluno.type = 'checkbox';
    checkboxAluno.id = 'desconto-aluno';
    checkboxAluno.onchange = aplicarDesconto; // Atualiza o custo ao marcar/desmarcar

    const labelAluno = document.createElement('label');
    labelAluno.htmlFor = 'desconto-aluno';
    labelAluno.textContent = 'És estudante do DEISI?';

    descontoContainer.appendChild(checkboxAluno);
    descontoContainer.appendChild(labelAluno);
    compraSection.appendChild(descontoContainer);

    // Adiciona o campo para cupão de desconto
    const cupaoContainer = document.createElement('div');
    cupaoContainer.style.marginTop = '10px';

    const labelCupao = document.createElement('label');
    labelCupao.textContent = 'Cupão de desconto:';
    labelCupao.style.marginRight = '10px';

    const inputCupao = document.createElement('input');
    inputCupao.type = 'text';
    inputCupao.id = 'input-cupao';
    inputCupao.style.padding = '5px';
    inputCupao.style.border = '1px solid #ccc';
    inputCupao.style.borderRadius = '4px';

    cupaoContainer.appendChild(labelCupao);
    cupaoContainer.appendChild(inputCupao);
    compraSection.appendChild(cupaoContainer);

    // Adiciona o botão de comprar
    const botaoComprar = document.createElement('button');
    botaoComprar.textContent = 'Comprar';
    botaoComprar.style.marginTop = '15px';
    botaoComprar.style.padding = '10px 20px';
    botaoComprar.style.border = 'none';
    botaoComprar.style.borderRadius = '4px';
    botaoComprar.style.backgroundColor = '#4CAF50';
    botaoComprar.style.color = 'white';
    botaoComprar.style.cursor = 'pointer';

    botaoComprar.onclick = () => {
        alert('Compra finalizada!');
    };

    compraSection.appendChild(botaoComprar);
}


function aplicarDesconto() {
    // Verifica se a checkbox está marcada
    const isAluno = document.getElementById('desconto-aluno').checked;

    // Recupera os produtos do localStorage
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Calcula o custo total
    let custoTotal = produtosSelecionados.reduce((total, produto) => total + produto.price, 0);

    // Aplica desconto de 10% se for aluno
    if (isAluno) {
        custoTotal *= 0.9;
    }

    // Atualiza o custo total na seção de compra
    const compraSection = document.getElementById('compra');
    compraSection.querySelector('h3').textContent = `Custo total: ${custoTotal.toFixed(2)} €`;
}

function filtrarProdutosPorCategoria() {
    const categoriaSelecionada = document.getElementById('categoriaSelect').value;

    // Filtra os produtos pela categoria
    const produtosFiltrados = categoriaSelecionada === "todos" 
    ? produtos 
    : produtos.filter(produto => produto.category.toLowerCase() === categoriaSelecionada.toLowerCase());

    // Carrega os produtos filtrados
    carregarProdutos(produtosFiltrados);
}

// Adiciona um evento para atualizar os produtos filtrados sempre que a categoria for alterada
document.getElementById('categoriaSelect').addEventListener('change', filtrarProdutosPorCategoria);

function ordenarProdutosPorPreco() {
    const ordenarValor = document.getElementById('ordenarSelect').value;
    
    let produtosOrdenados = [...produtos]; // Cria uma cópia dos produtos para não modificar o original
    
    // Ordena os produtos conforme a opção escolhida
    if (ordenarValor === 'preco-asc') {
        produtosOrdenados.sort((a, b) => a.price - b.price);
    } else if (ordenarValor === 'preco-desc') {
        produtosOrdenados.sort((a, b) => b.price - a.price);
    }
    
    // Carrega os produtos ordenados
    carregarProdutos(produtosOrdenados);
}
document.getElementById('ordenarSelect').addEventListener('change', ordenarProdutosPorPreco);








