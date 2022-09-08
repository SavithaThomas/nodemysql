const express = require("express");
var router = express.Router();

const {
  viewDepartment,
  findDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  addSales,
  salesAnalyze,
} = require("../controllers/departmentController");

const auth = require("../controllers/employeeController").tokenValidation;

router.get("/department/viewDepartment", auth, viewDepartment);
router.get("/department/findDepartmentById", auth, findDepartmentById);
router.get("/department/deleteDepartment", deleteDepartment);
router.post("/department/addDepartment", addDepartment);
router.put("/department/updateDepartment", updateDepartment);
router.post("/department/addSales", addSales);
router.get("/department/salesAnalyze", salesAnalyze);

module.exports = router;
