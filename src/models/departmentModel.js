const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      DepartmentId: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      DepartmentName: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Department;
};
