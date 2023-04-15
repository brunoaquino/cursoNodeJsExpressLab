const db = require("../services/db.service");
const Curso = db.Curso;
const Op = db.Sequelize.Op;

const getPagingData = (data, page, limit) => {
  const totalItems = data.length;
  const cursos = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, cursos, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Curso
exports.create = (req, res) => {
  // Validate request
  validate(req.body);
  // Create a Curso
  const curso = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    qtd_exercicios: req.body.qtd_exercicios,
    carga_horaria: req.body.carga_horaria,
  };

  // Save Curso in the database
  Curso.create(curso)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Curso.",
      });
    });
};

// Retrieve all Cursos from the database.
exports.findAll = (req, res) => {
  const { page, size, titulo } = req.query;
  var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  Curso.findAll({ where: condition })
    .then((data) => {
      const response = getPagingData(data, 1, 10);
      //const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Cursos.",
      });
    });
};

// Find a single Curso with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Curso.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Curso with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Curso with id=" + id,
      });
    });
};

// Update a Curso by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  validate(req.body);

  Curso.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Curso was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Curso with id=${id}. Maybe Curso was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Curso with id=" + id,
      });
    });
};

// Delete a Curso with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Curso.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Curso was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Curso with id=${id}. Maybe Curso was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Curso with id=" + id,
      });
    });
};

// Delete all Cursos from the database.
exports.deleteAll = (req, res) => {
  Curso.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Cursos were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cursos.",
      });
    });
};

const validate = (body) => {
  if (!body.titulo) {
    res.status(400).send({
      message: "Campo título não pode ser vazio.",
    });
    return;
  }
  if (!body.qtd_exercicios) {
    res.status(400).send({
      message: "Campo Quantidade de exercícios não pode ser vazio.",
    });
    return;
  }
};
