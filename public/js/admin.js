// Admin: Cadastrar, listar e remover poções via AJAX
document.addEventListener("DOMContentLoaded", () => {
  carregarPocoesAdmin();

  document.getElementById("form-pocao").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    const dados = {
      nome: form.nome.value.trim(),
      descricao: form.descricao.value.trim(),
      imagem: form.imagem.value.trim(),
      preco: parseFloat(form.preco.value),
    };

    if (!dados.nome || !dados.descricao || !dados.imagem || !dados.preco) {
      showToast("Preencha todos os campos!", "error");
      return;
    }

    try {
      const res = await fetch("/api/pocoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar");

      showToast("Poção cadastrada com sucesso!");
      form.reset();
      carregarPocoesAdmin();
    } catch (err) {
      showToast("Erro ao cadastrar poção.", "error");
      console.error(err);
    }
  });
});

async function carregarPocoesAdmin() {
  const container = document.getElementById("admin-items");

  try {
    const res = await fetch("/api/pocoes");
    if (!res.ok) throw new Error("Erro ao listar");
    const pocoes = await res.json();

    if (pocoes.length === 0) {
      container.innerHTML = '<p style="color:var(--text-secondary)">Nenhuma poção cadastrada.</p>';
      return;
    }

    container.innerHTML = pocoes.map(p => `
      <div class="admin-item">
        <img src="${p.imagem}" alt="${p.nome}">
        <div class="admin-item-info">
          <h4>${p.nome}</h4>
          <span>${p.preco} moedas</span>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removerPocao(${p.id})">Remover</button>
      </div>
    `).join("");
  } catch (err) {
    container.innerHTML = '<p style="color:var(--danger)">Erro ao carregar.</p>';
    console.error(err);
  }
}

async function removerPocao(id) {
  try {
    const res = await fetch(`/api/pocoes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao remover");

    showToast("Poção removida!", "error");
    carregarPocoesAdmin();
  } catch (err) {
    showToast("Erro ao remover poção.", "error");
    console.error(err);
  }
}

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}
