const Employee = require('../models/employee');

exports.get = (req, res, next) => {
  const page = +req.query.page || 1;
  const maxItems = 10;
  let totalPages = 0;
  Employee.find()
    .countDocuments()
    .then((result) => {
      totalPages = Math.ceil(result / maxItems);
      totalDocs = result;
      return Employee.find()
        .sort({ createdAt: 'desc' })
        .skip((page - 1) * maxItems)
        .limit(maxItems);
    })
    .then((result) => {
      res.status(200).json({
        msg: 'Employees fetched succesfully !',
        employees: result,
        totalPages: totalPages
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
    team: {
      name: req.body.team.name,
      manager: req.body.team.manager
    }
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
      role: req.body.role,
      team: {
        name: req.body.team.name,
        manager: req.body.team.manager
      }
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
