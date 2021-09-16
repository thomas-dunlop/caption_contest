const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');

router.post('/', async (req, res) => {
    const caption = req.body.caption;
    const img = req.body.image_id;
    const user = req.body.user_id;
    const newCaption = await db.addCaption(user, caption, img);
    res.status(200).json(`User ${user} added new caption ${caption}.`);
});

module.exports = router;