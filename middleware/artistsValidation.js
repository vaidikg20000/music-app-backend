module.exports = function (req, res, next) {
  let { artist_name, birthDate, bio } = req.body;

  if (![artist_name, birthDate].every(Boolean)) {
    return res.status(401).json("Fill Credentials properly");
  }
  next();
};
