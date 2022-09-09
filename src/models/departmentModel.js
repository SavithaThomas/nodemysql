const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      departmentId: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      departmentName: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Department;
};
