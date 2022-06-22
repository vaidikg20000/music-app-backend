const router = require('express').Router();
const jwtGenerator = require('../utils/jwtGenerator');
const auth = require('../middleware/auth');
const pool = require('../database');
const validation = require('../middleware/validation');
const encryptPassword = require('../utils/authUtils')

router.get('/is-authenticated', auth, async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

router.post('/signup', async(req, res, next) =>{
    try {
        
        // input validation
        const {username, email, password} = req.body; 
        validation(req, res, next);
        
        // database cross check
        const user = await pool.query("SELECT * FROM users WHERE LOWER(email)=LOWER($1)", [email]);
        if(user.rows.length !==0){
            return res.status(409).json('user already exists');
        }

        //password hash 
        const hashPassword = encryptPassword(password);
        
        // save account in db
        const newUser = await pool.query("INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *",[username, email, hashPassword]);
        if(newUser.rows.length !== 1){
            return res.status(500).json('Unable to create new User');
        }
        
        // return token in FE
        const token = jwtGenerator(password);
        return res.json({token});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

module.exports = router;

