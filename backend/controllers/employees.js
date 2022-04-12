const Employee = require('../models/employee');

exports.getEmployees = (req, res, next) => {
  Employee.find()
    .then((employees) => {
      res.status(200).json({
        employees: employees
      });
    })
    .catch((err) => console.log(err));
};

exports.createEmployee = (req, res, next) => {
  const employee = new Employee({
    name: req.body.name,
    surname: req.body.surname,
    birthdate: req.body.birthdate,
    email: req.body.email,
    role: req.body.role,
    team: req.body.team,
    manager: req.body.manager
  });

  employee
    .save()
    .then((result) => {
      res.status(201).json({
        employee: result
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
