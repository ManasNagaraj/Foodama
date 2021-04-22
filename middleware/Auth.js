const AuthCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ msg: 'Unauthorized' });
  } else {
    console.log('authenticated');
    next();
  }
};

module.exports = AuthCheck;
