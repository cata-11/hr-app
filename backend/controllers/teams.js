const Team = require('../models/team');
const Employee = require('../models/employee');

exports.get = (req, res, next) => {
  Team.find()
    .then((result) => {
      res.status(200).json({
        msg: 'Teams fetched succesfully !',
        teams: result
      });
    })
    .catch((error) => next(error));
};

exports.create = (req, res, next) => {
  Team.findOne({ name: req.body.name })
    .then((result) => {
      if (result) {
        const error = new Error();
        error.message = 'Team with such name already exists !';
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      const team = new Team({
        name: req.body.name,
        manager: req.body.manager
      });
      team.save().then((result) => {
        res.status(201).json({
          msg: 'Team created succesfully !',
          team: result
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

  Team.findById(id)
    .then((result) => {
      Employee.findOne({
        'team.name': result.name
      })
        .then((result) => {
          if (!result) {
            Team.deleteOne({ _id: id }).then(() => {
              res.status(200).json({
                msg: 'Team deleted succesfully !'
              });
            });
          } else if (result) {
            const error = new Error();
            error.message =
              "There are still employees in this team. It can't be deleted.";
            error.statusCode = 405;
            throw error;
          }
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

exports.edit = (req, res, next) => {
  const id = req.params.id;

  Team.findOne({
    name: req.body.name
  })
    .then((result) => {
      if (result)
        if (result._id.toString() !== id) {
          const error = new Error();
          error.message = 'Team with such name already exists !';
          error.statusCode = 409;
          throw error;
        }

      Team.findById(id)
        .then((result) => {
          return result.name;
        })
        .then((oldName) => {
          const r = Employee.updateMany(
            { 'team.name': oldName },
            {
              $set: {
                team: {
                  name: req.body.name,
                  manager: req.body.manager
                }
              }
            }
          );
          return r;
        })
        .then((result) => {
          const r = Team.findByIdAndUpdate(
            id,
            {
              name: req.body.name,
              manager: req.body.manager
            },
            { new: true }
          );
          return r;
        })
        .then((result) => {
          res.status(200).json({
            msg: 'Team edited succesfully !',
            team: result
          });
        });
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      next(error);
    });
};
