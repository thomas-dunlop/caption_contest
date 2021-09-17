const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/login');
    } else {
        next();
    }
};

router.post('/', authCheck, async (req, res) => {
    const caption = req.body.caption;
    const img = req.body.image_id;
    const user = req.user.id;
    const newCaption = await db.addCaption(user, caption, img);
    res.status(200).json(`User ${user} added new caption ${caption}.`);
});

module.exports = router;