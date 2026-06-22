// Carrega e exibe as poções na página principal usando AJAX
document.addEventListener("DOMContentLoaded", () => {
  carregarPocoes();
});

async function carregarPocoes() {
  const container = document.getElementById("products-container");

  try {
    const response = await fetch("/api/pocoes");
    if (!response.ok) throw new Error("Erro ao carregar poções");
    const pocoes = await response.json();

    if (pocoes.length === 0) {
      container.innerHTML = '<div class="loading">Nenhuma poção disponível no momento.</div>';
      return;
    }

    container.innerHTML = pocoes.map(p => `
      <div class="product-card">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
        <div class="product-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="product-footer">
            <span class="product-price">${p.preco} moedas</span>
            <button class="btn btn-primary btn-sm" onclick="comprar('${p.nome}')">🛒 Comprar</button>
          </div>
        </div>
      </div>
    `).join("");
  } catch (err) {
    container.innerHTML = '<div class="loading">Erro ao carregar poções. Tente novamente.</div>';
    console.error(err);
  }
}

function comprar(nome) {
  showToast(`Poção "${nome}" adicionada ao carrinho! (em breve)`, "success");
}

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}
