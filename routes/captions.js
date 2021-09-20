const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');
const cache = require('../cache.js');
const imgCache = cache.imgCache;

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/login');
    } else {
        next();
    }
};

router.post('/', authCheck, async (req, res , next) => {
    const caption = req.body.caption;
    const img = req.body.image_id;
    const user = req.user.id;
    const newCaption = await db.addCaption(user, caption, img);
    req.imgId = img;
    res.status(201).json(`User ${user} added new caption ${caption}.`);
    next()
},
cache.cacheCheck);

module.exports = router;