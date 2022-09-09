const db = require("../database/db");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const Employee = db.Employee;
const employeeType = db.roleType;
const Department = db.Department;

async function viewEmployee(req, res) {
  try {
    console.log("body: ", req.body);
    let empEmail = req.body?.email;
    let employee = await Employee.findOne({
      where: { employeeEmail: empEmail },
    });
    console.log(employee);
    if (employee && employee.employeeTypeRoleId == 1) {
      let data = await Employee.findAll();
      res.json(data);
    } else if (employee.employeeTypeRoleId == 2) {
      res.json(employee);
    } else {
      res.json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}
async function findEmployeeByDept(req, res) {
  try {
    console.log("body: ", req.body);
    let empDept = req.body?.departmentId;
    let empEmail = req.body?.email;
    let employee = await Employee.findOne({
      where: { employeeEmail: empEmail },
    });

    if (employee && employee.employeeTypeRoleId == 1) {
      let emp = await Employee.findAll({
        attributes: [
          "employeeId",
          "employeeName",
          "employeePhone",
          "employeeEmail",
          "employeeTypeRoleId",
        ],
        include: [
          {
            model: Department,
            where: { departmentId: empDept },
            required: true,
          },
        ],
      });

      res.json(emp);
    } else if (employee.employeeTypeRoleId == 2) {
      res.json(employee);
    } else {
      res.json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function findEmployeeByRole(req, res) {
  try {
    console.log("body: ", req.body);
    let empRole = req.body?.role;
    let empEmail = req.body?.email;
    let employee = await Employee.findOne({
      where: { employeeEmail: empEmail },
    });

    if (employee && employee.employeeTypeRoleId == 1) {
      let emp = await Employee.findAll({
        attributes: [
          "employeeId",
          "employeeName",
          "employeePhone",
          "employeeEmail",
          "DepartmentDepartmentId",
        ],
        include: [
          {
            model: employeeType,
            where: { roleName: empRole },
            required: true,
          },
        ],
      });

      res.json(emp);
    } else if (employee.employeeTypeRoleId == 2) {
      res.json(employee);
    } else {
      res.json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function deleteEmployee(req, res) {
  console.log("body: ", req.body);
  try {
    await Employee.destroy({
      where: { employeeEmail: req.body.email },
    });
    res
      .status(200)
      .json({ status: true, msg: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function addEmployee(req, res) {
  try {
    let data = req.body;

    if (!data.phone || !data.email) {
      res.json({ meassage: "Parameters are missing" });
    } else {
      let emp1 = await Employee.findOne({
        where: { employeePhone: data.phone },
      });
      let emp2 = await Employee.findOne({
        where: { employeeEmail: data.email },
      });

      if (emp1) {
        res.json({ message: "Duplicate Phone number" });
      } else if (emp2) {
        res.json({ message: "Duplicate email" });
      } else {
        const empData = {
          employeeName: data.name,
          employeePhone: data.phone,
          employeeEmail: data.email,
          employeePassword: data.password,
          DepartmentDepartmentId: data.departmentId,
          employeeTypeRoleId: data.roleId,
        };
        await Employee.create(empData);
        res
          .status(200)
          .json({ status: true, msg: "Employee details added successfully" });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function updateEmployee(req, res) {
  console.log("body: ", req.body);
  try {
    let data = req.body;
    const empData = {
      employeeName: data.name,
      employeePhone: data.phone,
      employeeEmail: data.email,
      employeePassword: data.password,
      DepartmentDepartmentId: data.departmentId,
      employeeTypeRoleId: data.roleId,
    };

    await Employee.update(empData, {
      where: { employeeEmail: data.email },
    });
    res
      .status(200)
      .json({ status: true, msg: "Employee details updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function employeeLogin(req, res) {
  try {
    let data = req.body;
    let empLogin = await Employee.findOne({
      where: { employeeEmail: data.email },
    });
    if (!empLogin) {
      res.json("Invalid email");
    } else {
      let empPassword = data.password;
      if (empLogin.employeePassword == empPassword) {
        var token = jwt.sign({ employee: empLogin }, config.secret);
      }
      if (token) {
        res.json({ jwt: token });
      } else {
        res.json("Invalid Password!");
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

async function tokenValidation(req, res, next) {
  try {
    let jwtSecretKey = config.secret;
    const authHeader = req.headers["authorization"];
    if (typeof authHeader !== "undefined" || authHeader !== null) {
      const token = authHeader && authHeader.split(" ")[1];
      jwt.verify(token, jwtSecretKey);
      next();
    }
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
  }
}

module.exports = {
  viewEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  findEmployeeByDept,
  findEmployeeByRole,
  employeeLogin,
  tokenValidation,
};
