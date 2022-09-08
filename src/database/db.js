const env = require("./env");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.user, env.password, {
  host: env.localhost,
  port: 3306,
  dialect: env.dialect,
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Connection error");
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//user models
db.Employee = require("../models/employeeModel")(sequelize, Sequelize);
db.Department = require("../models/departmentModel")(sequelize, Sequelize);
db.roleType = require("../models/roleType")(sequelize, Sequelize);
db.SalesDepartment = require("../models/salesDepartment")(sequelize, Sequelize);

//Association
db.Department.hasMany(db.Employee);
db.Employee.belongsTo(db.Department);

db.roleType.hasMany(db.Employee);
db.Employee.belongsTo(db.roleType);

module.exports = db;
