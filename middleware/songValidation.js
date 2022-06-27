
module.exports = function (req, res, next) {
  let { songName, songDate, image, artistsName } = req.body;

  if (![artistsName, songDate, image, artistsName].every(Boolean)) {
    return res.status(401).json("Fill Credentials properly");
  }
  next();
};
