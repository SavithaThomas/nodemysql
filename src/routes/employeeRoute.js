const express = require("express");
var router = express.Router();

const {
  viewEmployee,
  findEmployeeByDept,
  findEmployeeByRole,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employeeLogin,
  tokenValidation,
} = require("../controllers/employeeController");

router.get("/employee/viewEmployee", tokenValidation, viewEmployee);
router.get("/employee/findEmployeeByDept", tokenValidation, findEmployeeByDept);
router.get("/employee/findEmployeeByRole", tokenValidation, findEmployeeByRole);
router.get("/employee/deleteEmployee", deleteEmployee);
router.post("/employee/addEmployee", addEmployee);
router.put("/employee/updateEmployee", updateEmployee);
router.get("/employee/employeeLogin", employeeLogin);

module.exports = router;
