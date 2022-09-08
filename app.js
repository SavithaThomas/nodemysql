const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql");

const app = express();

const db = require("./src/database/db");

const employee = require("./src/routes/employeeRoute");
const department = require("./src/routes/departmentRoute");

// dataBase conection

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("Unable to connect db Error:", +err);
  });

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(employee);
app.use(department);

app.listen("3000", () => {
  console.log("Port running on 3000");
});
