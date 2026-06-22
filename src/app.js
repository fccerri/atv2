import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sequelize from "./config/database.js";
import pocaoRoutes from "./routes/pocaoRoutes.js";
import { popularBanco } from "./seeds/seed.js";

// Importa o model para garantir que ele seja registrado
import "./models/Pocao.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (views)
app.use(express.static(join(__dirname, "..", "public")));

// Rotas da API
app.use("/api/pocoes", pocaoRoutes);

// Inicializa banco e servidor
async function iniciar() {
  try {
    await sequelize.sync({ force: true });
    console.log("Banco de dados sincronizado.");

    await popularBanco();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar:", err);
  }
}

iniciar();
