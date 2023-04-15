const express = require("express");
const morgan = require("morgan");
require("dotenv/config");
const db = require("./services/db.service");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

require("./routes/routes")(app);


module.exports = app;
