const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const SalesDepartment = sequelize.define(
    "SalesDepartment",
    {
      salesId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      productName: {
        type: Sequelize.STRING,
      },
      productQuantity: {
        type: Sequelize.INTEGER,
      },
      productPrice: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return SalesDepartment;
};
