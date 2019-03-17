const ServerError = require('../Error/index').ServerError;
const jwt = require('jsonwebtoken');
const secret = process.env.AUTH || require('../../config/jwt.js');

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, secret);
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
