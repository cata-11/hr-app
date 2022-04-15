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
  const team = new Team({
    name: req.body.name,
    manager: req.body.manager
  });

  team
    .save()
    .then((result) => {
      res.status(201).json({
        msg: 'Team created succesfully !',
        team: result
      });
    })
    .catch((error) => next(error));
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Team.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        msg: 'Team deleted succesfully !'
      });
    })
    .catch((error) => next(error));
};

exports.edit = (req, res, next) => {
  const id = req.params.id;

  let oldName;

  Team.findById(id)
    .then((result) => {
      oldName = result.name;
    })
    .then(() => {
      Employee.updateMany(
        { 'team.name': oldName },
        {
          $set: {
            team: {
              name: req.body.name,
              manager: req.body.manager
            }
          }
        }
      ).then(() => {
        Team.findByIdAndUpdate(
          id,
          {
            name: req.body.name,
            manager: req.body.manager
          },
          { new: true }
        ).then((result) => {
          res.status(200).json({
            msg: 'Teams edited succesfully !',
            team: result
          });
        });
      });
    })
    .catch((error) => next(error));
};
