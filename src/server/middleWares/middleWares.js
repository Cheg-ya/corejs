const ServerError = require('../Error/index').ServerError;
const secretObj = require('../../config/jwt');
const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, secretObj.secret);
    } catch(err) {
      return next(new ServerError('Invalid Token!'));
    }

    const { id, email } = decoded;

    res.locals.verifiedData = {
      id,
      email
    };

    next();
  }
};
