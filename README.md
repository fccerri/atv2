# Poções e Soluções 🧪

Web Service para a loja de poções da Annabelle Merigold — Beco da Última Saída.

## Requisitos

- Node.js 18+

## Instalação e Execução

```bash
npm install
npm start
```

O servidor estará disponível em `http://localhost:3000`.

## Estrutura MVC

```
src/
├── app.js                    # Ponto de entrada (Express)
├── config/
│   └── database.js           # Configuração SQLite em memória
├── models/
│   └── Pocao.js              # Model (Sequelize)
├── controllers/
│   └── pocaoController.js    # Controller (CRUD)
├── routes/
│   └── pocaoRoutes.js        # Rotas da API REST
└── seeds/
    └── seed.js               # Dados iniciais

public/                        # Views (front-end)
├── index.html                # Página da loja
├── admin.html                # Painel de administração
├── css/
│   └── style.css             # Estilos
└── js/
    ├── main.js               # AJAX - página principal
    └── admin.js              # AJAX - painel admin
```

## API REST

| Método | Rota              | Descrição            |
|--------|--------------------|----------------------|
| GET    | `/api/pocoes`      | Listar poções        |
| GET    | `/api/pocoes/:id`  | Buscar por ID        |
| POST   | `/api/pocoes`      | Cadastrar poção      |
| DELETE | `/api/pocoes/:id`  | Remover poção        |

## Tecnologias

- **Back-end:** Node.js + Express
- **Banco:** SQLite em memória (Sequelize)
- **Front-end:** HTML, CSS, JavaScript (AJAX/Fetch)