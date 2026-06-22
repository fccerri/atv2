import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pocao = sequelize.define("Pocao", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "pocoes",
  timestamps: true,
});

export default Pocao;
