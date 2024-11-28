

document.addEventListener('DOMContentLoaded', () => {
    produtos.forEach(produtos)=>{
        const article= document.createElement('article');
        const titulo = document.createElement('h3');
        titulo.textContent=produtos.titulo;
        article.append(titulo);
        //falta appedn na lista produtos em html
    }
});
