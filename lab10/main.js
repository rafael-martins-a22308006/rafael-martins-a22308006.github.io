
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
    descricao.textContent = produto.description ? produto.description : 'Descrição não disponível'; 
    
    
    const preco = document.createElement('span');
    preco.textContent = produto.price ? `Preço: ${produto.price}€` : 'Preço não disponível'; 
    
    const rate = document.createElement('span');
    rate.textContent = produto.rating && produto.rating.rate  
    rate.style.display = 'block'; 
    rate.style.marginTop = '5px';

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
    artigo.appendChild(rate);
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

    // Desabilitar o botão se o cesto estiver vazio
    if (produtosSelecionados.length === 0) {
        botaoComprar.disabled = true;
        botaoComprar.style.backgroundColor = '#ccc'; // Opacidade para indicar que o botão está desativado
    } else {
        botaoComprar.disabled = false;
        botaoComprar.style.backgroundColor = '#4CAF50'; // Restaurar a cor do botão
    }

    // Função que finaliza a compra e mostra o valor final e referência
    botaoComprar.addEventListener('click', () => {
        // Aplica o desconto se necessário
        aplicarDesconto();

        // Exibe o valor final a pagar
        const valorFinal = document.getElementById('valor-final');
        valorFinal.textContent = `Valor final a pagar (com eventuais descontos): ${custoTotal.toFixed(2)} €`;

        // Cria uma referência de pagamento dinâmica
        const referenciaPagamento = document.getElementById('referencia-pagamento');
        const referencia = gerarReferenciaPagamento();  // Função para gerar a referência
        referenciaPagamento.textContent = `Referência de pagamento: ${referencia} €`;

        // Torna a referência visível apenas depois da compra
        referenciaPagamento.style.display = 'block'; // Exibe a referência de pagamento
    });

    compraSection.appendChild(botaoComprar);

    // Exibe o campo do valor final na seção
    const valorFinalContainer = document.createElement('div');
    valorFinalContainer.style.marginTop = '20px';

    const valorFinal = document.createElement('p');
    valorFinal.id = 'valor-final';
    valorFinal.textContent = `Valor final a pagar (com eventuais descontos): ${custoTotal.toFixed(2)} €`;
    valorFinalContainer.appendChild(valorFinal);

    // Referência de pagamento inicialmente escondida
    const referenciaPagamento = document.createElement('p');
    referenciaPagamento.id = 'referencia-pagamento';
    referenciaPagamento.style.display = 'none';  // Inicialmente escondido
    referenciaPagamento.textContent = ''; // Referência será preenchida após a compra
    valorFinalContainer.appendChild(referenciaPagamento);

    compraSection.appendChild(valorFinalContainer);
}

// Função para gerar uma referência de pagamento única
function gerarReferenciaPagamento() {
    const data = new Date();
    const referencia = `${data.getFullYear()}${(data.getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
    return referencia;
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

    // Exibe o custo total antes de enviar para o servidor
    console.log(`Custo total antes do envio para a API: ${custoTotal}`);

    // Envia os dados para o endpoint /buy usando o método POST
    const urlCompra = 'https://deisishop.pythonanywhere.com/buy/'; // Substitua pelo URL da sua API

    // Prepara os dados para enviar
    const produtoIds = produtosSelecionados.map(produto => produto.id);
    const cupao = document.getElementById('input-cupao').value.trim(); // Captura o valor do cupão de desconto, se existir

    const dadosCompra = {
        produtos: produtoIds,
        estudante: isAluno,
        cupao: cupao || null
    };

    // Realiza o pedido POST para finalizar a compra
    fetch(urlCompra, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCompra),
    })
    .then(response => {
        // Verifique se a resposta foi ok
        if (!response.ok) {
            throw new Error(`Erro ao fazer a compra: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        

        // Verifica se a resposta foi bem-sucedida
        if (data.success) {
            // Atualiza a referência de pagamento e o valor final na página

            const compraSection = document.getElementById('compra');
            
            // Cria ou atualiza a referência de pagamento
            let referenciaPagamento = compraSection.querySelector('.referencia-pagamento');
            if (!referenciaPagamento) {
                referenciaPagamento = document.createElement('p');
                referenciaPagamento.classList.add('referencia-pagamento');
                compraSection.appendChild(referenciaPagamento);
            }
            referenciaPagamento.textContent = `Referência para pagamento: ${data.referencia}`;

            // Atualiza o custo total na seção de compra
            let tituloCusto = compraSection.querySelector('.custo-total');
            if (!tituloCusto) {
                tituloCusto = document.createElement('h3');
                tituloCusto.classList.add('custo-total');
                compraSection.appendChild(tituloCusto);
            }
            tituloCusto.textContent = `Custo total: ${data.valorFinal.toFixed(2)} €`;
        } else {
            // Caso a resposta não seja bem-sucedida, exibe a mensagem de erro
            alert('Erro na compra: ' + data.message);
        }
    })
    .catch(error => {
       
        alert('Erro ao processar a compra.');
    });
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


function finalizarCompra() {
    // Recupera os produtos do localStorage
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Verifica se a checkbox de estudante está marcada
    const isAluno = document.getElementById('desconto-aluno').checked;

    // Recupera o valor do cupão de desconto
    const cupao = document.getElementById('input-cupao').value;

    // Cria um array com os IDs dos produtos
    const produtoIds = produtosSelecionados.map(produto => produto.id);

    // Cria o objeto com os dados para enviar
    const dadosCompra = {
        produtoIds: produtoIds,
        isAluno: isAluno,
        cupao: cupao
    };

    // Simulando a resposta da API com um valor fixo e referência
    const resposta = {
        valorFinal: 30.50,  // Simulando o valor final após descontos
        referenciaPagamento: '201124-0052'  // Exemplo de referência de pagamento
    };

    // Atualiza a seção de compra com o valor final e a referência
    const compraSection = document.getElementById('compra');

    // Limpa a seção de compra
    compraSection.innerHTML = '';

    // Cria e adiciona o valor final a pagar
    const tituloValorFinal = document.createElement('h3');
    tituloValorFinal.textContent = `Valor final a pagar (com eventuais descontos): ${resposta.valorFinal.toFixed(2)} €`;
    compraSection.appendChild(tituloValorFinal);

    // Cria e adiciona a referência de pagamento
    const referenciaPagamento = document.createElement('p');
    referenciaPagamento.textContent = `Referência de pagamento: ${resposta.referenciaPagamento}`;
    compraSection.appendChild(referenciaPagamento);
}






