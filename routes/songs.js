const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const auth = require("../middleware/auth");
const pool = require("../database");
const artistsValidation = require("../middleware/artistsValidation");
const songValidation = require("../middleware/songValidation");

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

router.post("/artists/add", artistsValidation, async (req, res) => {
  try {
    let { artist_name, birthDate, bio } = req.body;
    const existingArtist = await pool.query(
      "SELECT * FROM artists WHERE LOWER(artist_name) = LOWER($1)",
      [artist_name]
    );
    if (existingArtist.rows.length !== 0) {
      return res.status(409).json("Artist with that name already exists");
    }

    const artist = await pool.query(
      "INSERT INTO artists (artist_name, dob, bio) VALUES ($1, $2, $3) RETURNING *",
      [artist_name, birthDate, bio]
    );
    return res.status(200).json("working");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error");
  }
});

router.get("/artists/all", async (req, res) => {
  const getArtists = await pool.query("SELECT * from artists");
  return res.status(200).json(getArtists.rows);
});

router.post("/add", songValidation, async (req, res) => {
  try {
    const { songName, songDate, image, artistsName } = req.body;
    const token = req.headers.token;

    for (let j = 0; j < artistsName.length; j++) {
      const artistId = artistsName[j];
      const song_id = await pool.query(
        "SELECT song_id from songs WHERE LOWER(name) = LOWER($1)",
        [songName]
      );

      for (let i = 0; i < song_id.rows.length; i++) {
        let songId = song_id.rows[i].song_id;
        const existingSong = await pool.query(
          "SELECT * from song_artists WHERE artist_id = $1 AND song_id = $2",
          [artistId, songId]
        );
        if (existingSong.rows.length !== 0) {
          return res
            .status(409)
            .json("A Song with that provided Name and Artist already exists");
        }
      }
    }

    //insert queries
    const user_email = parseJwt(token).key;

    let user_id = await pool.query(
      "SELECT user_id FROM users WHERE LOWER(email)=LOWER($1)",
      [user_email]
    );

    user_id = user_id.rows[0].user_id;

    const song = await pool.query(
      "INSERT INTO songs (name, image, date_of_release) VALUES ($1, $2, $3) RETURNING *",
      [songName, image, songDate]
    );

    artistsName.forEach(async (artistId) => {
      const song_artists = await pool.query(
        "INSERT INTO song_artists (song_id, artist_id) VALUES ($1, $2) RETURNING *",
        [song.rows[0].song_id, artistId]
      );
    });

    const songsByUser = await pool.query(
      "INSERT INTO songs_by_user (user_id, song_id, ratings) VALUES ($1, $2, $3) RETURNING *",
      [user_id, song.rows[0].song_id, 0]
    );

    return res.status(200).json("Successfully created");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
