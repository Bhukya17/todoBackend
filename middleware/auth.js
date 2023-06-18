const jwt = require('jsonwebtoken');

auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
          .status(401)
          .json({msg: 'No auth token, access denied'});
    }
    const verified = jwt.verify(token, 'passwordKey');
    if (!verified) {
      return res
          .status(401)
          .json({msg: 'Token verification failed, authorization denied'});
    }
    // since the token was made out of the document id
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

module.exports = auth;
