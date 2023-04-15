const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: true,
      freezeTableName: true,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    },
    host: process.env.DB_HOST,
  },
  
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Curso = require("../models/curso.model")(sequelize, Sequelize);

module.exports = db;
