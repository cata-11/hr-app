const Employee = require('../models/team');

exports.get = (req, res, next) => {
  Employee.find()
    .then((employees) => {
      res.status(200).json({
        msg: 'Employees fetched succesfully !',
        employees: employees
      });
    })
    .catch((error) => next(error));
};

exports.create = (req, res, next) => {
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
        msg: 'Employee created succesfully !',
        employee: result
      });
    })
    .catch((error) => next(error));
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Employee.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        msg: 'Employee deleted succesfully !'
      });
    })
    .catch((error) => next(error));
};

exports.edit = (req, res, next) => {
  const id = req.params.id;
  Employee.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      team: req.body.team,
      role: req.body.role,
      manager: 'reasigned_maybe'
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        msg: 'Employee edited succesfully !',
        employee: result
      });
    })
    .catch((error) => next(error));
};
