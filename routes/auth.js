const router = require('express').Router();
const jwtGenerator = require('../utils/jwtGenerator');
const auth = require('../middleware/auth');
const pool = require('../database');

router.get('/is-authenticated', auth, async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

module.exports = router;

