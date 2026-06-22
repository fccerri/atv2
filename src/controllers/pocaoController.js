import Pocao from "../models/Pocao.js";

// Lista todas as poções (API JSON)
export async function listar(req, res) {
  try {
    const pocoes = await Pocao.findAll({ order: [["id", "ASC"]] });
    res.json(pocoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Busca uma poção por ID
export async function buscarPorId(req, res) {
  try {
    const pocao = await Pocao.findByPk(req.params.id);
    if (!pocao) return res.status(404).json({ erro: "Poção não encontrada" });
    res.json(pocao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Cadastra uma nova poção
export async function criar(req, res) {
  try {
    const { nome, descricao, imagem, preco } = req.body;
    if (!nome || !descricao || !imagem || preco == null) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }
    const pocao = await Pocao.create({ nome, descricao, imagem, preco: parseFloat(preco) });
    res.status(201).json(pocao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// Remove uma poção
export async function remover(req, res) {
  try {
    const pocao = await Pocao.findByPk(req.params.id);
    if (!pocao) return res.status(404).json({ erro: "Poção não encontrada" });
    await pocao.destroy();
    res.json({ mensagem: "Poção removida com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
