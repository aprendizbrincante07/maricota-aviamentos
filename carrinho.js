function getCarrinho() {
  const dados = localStorage.getItem("carrinho");
  return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nome, preco) {
  const carrinho = getCarrinho();
  const card = event.target.closest('.produto');
  const imagem = card ? card.querySelector('img').getAttribute('src') : '';
  carrinho.push({ nome: nome, preco: preco, imagem: imagem });
  salvarCarrinho(carrinho);
  atualizarContadorCarrinho();
  alert(nome + " foi adicionado ao carrinho!");
}

function removerDoCarrinho(indice) {
  const carrinho = getCarrinho();
  carrinho.splice(indice, 1);
  salvarCarrinho(carrinho);
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const carrinho = getCarrinho();
  const contador = document.getElementById("contador-carrinho");
  if (contador) {
    contador.textContent = carrinho.length;
  }
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);

function aplicarEstoque() {
  const produtos = document.querySelectorAll('.produto[data-estoque]');

  produtos.forEach(function (produto) {
    const estoque = parseInt(produto.getAttribute('data-estoque'), 10);
    const textoEstoque = produto.querySelector('.estoque');
    const botao = produto.querySelector('button');

    if (estoque <= 0) {
      textoEstoque.textContent = 'Esgotado';
      botao.disabled = true;
      botao.textContent = 'Esgotado';
    } else {
      textoEstoque.textContent = 'Em estoque: ' + estoque + ' unidade(s)';
    }
  });
}

document.addEventListener('DOMContentLoaded', aplicarEstoque);