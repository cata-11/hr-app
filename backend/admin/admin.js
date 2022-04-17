const jsonToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jsonToken.verify(token, 'supersecretkey');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken || decodedToken.status !== 'admin') {
    const err = new Error("You don't have enough rights for this action !");
    err.statusCode = 403;
    throw err;
  }

  next();
};
