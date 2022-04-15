const Role = require('../models/role');
const Employee = require('../models/employee');

exports.get = (req, res, next) => {
  Role.find()
    .then((result) => {
      res.status(200).json({
        msg: 'Roles fetched succesfully !',
        roles: result
      });
    })
    .catch((error) => next(error));
};

exports.create = (req, res, next) => {
  const role = new Role({
    name: req.body.name
  });

  role
    .save()
    .then((result) => {
      res.status(201).json({
        msg: 'Role created succesfully !',
        role: result
      });
    })
    .catch((error) => next(error));
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Role.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        msg: 'Role deleted succesfully !'
      });
    })
    .catch((error) => next(error));
};

exports.edit = (req, res, next) => {
  const id = req.params.id;

  let oldName;

  Role.findById(id)
    .then((result) => {
      oldName = result.name;
    })
    .then(() => {
      Employee.updateMany(
        { role: oldName },
        {
          $set: {
            role: req.body.name
          }
        }
      ).then(() => {
        Role.findByIdAndUpdate(
          id,
          {
            name: req.body.name
          },
          { new: true }
        ).then((result) => {
          res.status(200).json({
            msg: 'Roles edited succesfully !',
            role: result
          });
        });
      });
    })
    .catch((error) => next(error));
};
