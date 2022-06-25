const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const auth = require("../middleware/auth");
const pool = require("../database");
const artistsValidation = require("../middleware/artistsValidation");


router.post('/artists/add', artistsValidation, async(req,res) =>{
    try{
        //input validation
        let { artistName, birthDate, bio } = req.body;
        console.log(req.body);

        const existingArtist = await pool.query("SELECT * FROM artists WHERE LOWER(artist_name) = LOWER($1)", [artistName]);
        console.log(artistName);
        if(existingArtist.rows.length != 0){
            res.status(409).json("Artist with that name already exists");
        }

        const artist = await pool.query("INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *")
        // res.json("working");

    }catch (error) {
        console.error(error.message);
        return res.status(500).json("Internal Server Error");
    }
})

module.exports = router;