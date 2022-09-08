const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    "Employee",
    {
      employeeId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      employeeName: {
        type: Sequelize.STRING,
      },
      employeePhone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 10],
        },
      },
      employeeEmail: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      employeePassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
);
  return Employee;
};
