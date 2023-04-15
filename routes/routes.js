module.exports = (app) => {
  var cursoRouter = require("./curso.routes");

  app.use("/api/curso", cursoRouter(app));
};
