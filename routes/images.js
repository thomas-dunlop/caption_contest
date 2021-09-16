const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');

router.get('/', async (req, res) => {
    const images = await db.getAllImages();
    res.status(200).json(images);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const results = await db.getSpecificImage(id);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(404).send();
    }
})

module.exports = router;