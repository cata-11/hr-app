const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jsonToken = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const SECRET_PHRASE = 'ADMIN';

  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.secretPhrase === SECRET_PHRASE ? 'admin' : 'guest';

  User.findOne({ email: email })
    .then((result) => {
      if (result) {
        const err = new Error('User with this email already exists !');
        err.statusCode = 409;
        throw err;
      }
      bcrypt.hash(password, 12).then((result) => {
        const user = new User({
          email: email,
          password: result,
          status: status
        });
        return user.save();
      });
    })
    .then(() => {
      res.status(201).json({
        msg: `Account with status of ${status} created succesfully !`
      });
    })
    .catch((err) => next(err));
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;

  User.findOne({ email: email })
    .then((result) => {
      if (!result) {
        const err = new Error('User with such email not found.');
        err.statusCode = 404;
        throw err;
      }
      user = result;
      return bcrypt.compare(password, result.password);
    })
    .then((result) => {
      if (!result) {
        const err = new Error('Wrong password.');
        err.statusCode = 404;
        throw err;
      }

      const token = jsonToken.sign(
        { email: user.email, id: user._id.toString(), status: user.status },
        'supersecretkey',
        {
          expiresIn: '1h'
        }
      );

      res
        .status(200)
        .json({ token: token, status: user.status, email: user.email });
    })
    .catch((err) => next(err));
};
