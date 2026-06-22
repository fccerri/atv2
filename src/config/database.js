import { Sequelize } from "sequelize";

// Banco SQLite em memória conforme especificação
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

export default sequelize;
