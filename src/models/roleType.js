const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const roleType = sequelize.define(
    "employeeType",
    {
      roleId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roleName: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return roleType;
};
