module.exports = (sequelize, Sequelize) => {
  const Curso = sequelize.define("curso", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING,
    },
    carga_horaria: Sequelize.INTEGER,
    qtd_exercicios: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Curso;
};
