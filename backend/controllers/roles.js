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
  Role.findOne({ name: req.body.name })
    .then((result) => {
      if (result) {
        const error = new Error();
        error.message = 'This role already exists !';
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      const role = new Role({
        name: req.body.name
      });

      role.save().then((result) => {
        res.status(201).json({
          msg: 'Role created succesfully !',
          role: result
        });
      });
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      next(error);
    });
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

  Role.findOne({
    name: req.body.name
  })
    .then((result) => {
      if (result) {
        const error = new Error();
        error.message = 'Role with such name already exists !';
        error.statusCode = 409;
        throw error;
      }

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
          );
        })
        .then(() => {
          const r = Role.findByIdAndUpdate(
            id,
            {
              name: req.body.name
            },
            { new: true }
          );
          return r;
        })
        .then((result) => {
          res.status(200).json({
            msg: 'Role edited succesfully !',
            role: result
          });
        });
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      next(error);
    });

  // const id = req.params.id;

  // let oldName;

  // Role.findById(id)
  //   .then((result) => {
  //     oldName = result.name;
  //   })
  //   .then(() => {
  //     Employee.updateMany(
  //       { role: oldName },
  //       {
  //         $set: {
  //           role: req.body.name
  //         }
  //       }
  //     ).then(() => {
  //       Role.findByIdAndUpdate(
  //         id,
  //         {
  //           name: req.body.name
  //         },
  //         { new: true }
  //       ).then((result) => {
  //         res.status(200).json({
  //           msg: 'Roles edited succesfully !',
  //           role: result
  //         });
  //       });
  //     });
  //   })
  //   .catch((error) => next(error));
};
