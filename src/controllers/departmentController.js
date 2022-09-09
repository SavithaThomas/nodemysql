const db = require("../database/db");
const Department = db.Department;
const Employee = db.Employee;
const SalesDepartment = db.SalesDepartment;
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

async function viewDepartment(req, res) {
  let data = await Department.findAll();
  res.json(data);
}
async function findDepartmentById(req, res) {
  console.log("body: ", req.body);
  let data = await Department.findOne({
    where: { departmentId: req.body.departmentId },
    include: [
      {
        model: Employee,
        attributes: [
          "employeeId",
          "employeeName",
          "employeePhone",
          "employeeEmail",
        ],
        required: false,
      },
    ],
  });
  res.json(data);
}

async function deleteDepartment(req, res) {
  console.log("body: ", req.body);
  try {
    let data = await Department.destroy({
      where: { departmentId: req.body.departmentId },
    });
    res
      .status(200)
      .json({ status: true, msg: "Department deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function addDepartment(req, res) {
  try {
    let data = req.body;

    if (!data.departmentId || !data.departmentName) {
      res.json({ meassage: "Parameters are missing" });
    } else {
      let dept1 = await Department.findOne({
        where: { departmentId: data.departmentId },
      });
      let dept2 = await Department.findOne({
        where: { departmentName: data.departmentName },
      });

      if (dept1) {
        res.json({ message: "Duplicate Department Id" });
      } else if (dept2) {
        res.json({ message: "Duplicate Department name" });
      } else {
        const deptData = {
          departmentId: data.departmentId,
          departmentName: data.departmentName,
        };
        await Department.create(deptData);
        res
          .status(200)
          .json({ status: true, msg: "Department details added successfully" });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function updateDepartment(req, res) {
  console.log("body: ", req.body);
  try {
    let data = req.body;
    let dept1 = await Department.findOne({
      where: { departmentId: data.departmentId },
    });
    if (dept1) {
      const upData = {
        departmentId: data.departmentId,
        departmentName: data.departmentName,
      };
      await Department.update(upData, {
        where: { departmentId: upData.departmentId },
      });
      res
        .status(200)
        .json({ status: true, msg: "Department details updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function addSales(req, res) {
  try {
    let data = req.body;
    const upData = {
      productName: data.productName,
      productQuantity: data.productQuantity,
      productPrice: data.productPrice,
    };
    await SalesDepartment.create(upData);
    res
      .status(200)
      .json({ status: true, msg: "Sales details added successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}
async function salesAnalyze(req, res) {
  try {
    let data = req.body;
    let minPrice = await SalesDepartment.findAll({
      attributes: [
        [
          Sequelize.fn("min", Sequelize.col("productPrice")),
          "Minimuum Product Price",
        ],
      ],
    });
    let maxQuantity = await SalesDepartment.findAll({
      attributes: [
        [
          Sequelize.fn("max", Sequelize.col("productQuantity")),
          "Max Quantity Sold",
        ],
      ],
    });
    let itemsSold = await SalesDepartment.findAll({
      attributes: [
        [
          Sequelize.fn("count", Sequelize.col("productQuantity")),
          "Total Items Sold",
        ],
      ],
    });
    let quantitySold = await SalesDepartment.findAll({
      attributes: [
        [
          Sequelize.fn("sum", Sequelize.col("productQuantity")),
          "Total quantity Sold",
        ],
      ],
    });
    let orOperation = await SalesDepartment.findAll({
      where: {
        [Op.or]: [{ productName: "Pen" }, { productQuantity: 20 }],
      },
    });
    let gtOperation = await SalesDepartment.findAll({
      where: {
        productQuantity: {
          [Op.gte]: 30,
        },
      },
    });
    let likeOperation = await SalesDepartment.findAll({
      where: {
        productName: {
          [Op.like]: "Pen%",
        },
      },
    });

    const salesData = {
      minPrice,
      maxQuantity,
      itemsSold,
      quantitySold,
      orOperation,
      gtOperation,
      likeOperation,
    };
    res.json(salesData);
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}
module.exports = {
  viewDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  findDepartmentById,
  addSales,
  salesAnalyze,
};
