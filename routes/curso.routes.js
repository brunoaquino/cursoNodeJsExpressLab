module.exports = () => {
  const cursoController = require("../controllers/curso.controller");

  var router = require("express").Router();

  // Create a new Curso
  router.post("/", cursoController.create);

  // Retrieve all Cursos
  router.get("/", cursoController.findAll);

  // Retrieve a single Curso with id
  router.get("/:id", cursoController.findOne);

  // Update a Curso with id
  router.put("/:id", cursoController.update);

  // Delete a Curso with id
  router.delete("/:id", cursoController.delete);

  // Delete all Cursos
  router.delete("/", cursoController.deleteAll);

  return router;
};
