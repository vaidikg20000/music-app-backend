const router = require('express').Router();
const jwtGenerator = require('../utils/jwtGenerator');
const auth = require('../middleware/auth');
const pool = require('../database');
const validation = require('../middleware/validation');

router.get('/is-authenticated', auth, async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

router.post('/signup', auth, async(req, res) =>{
    try {
        // input validation
        validation(req, res, next);
        // database cross check
        // save account in db
        // return token in FE
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

module.exports = router;

