const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');
const cache = require('../cache.js');
const imgCache = cache.imgCache;

router.get('/', async (req, res) => {
    const images = await db.getAllImages();
    res.status(200).json(images);
});

router.get('/:id', cache.cacheMiddleware, async (req, res) => {
    const id = parseInt(req.params.id)
    const results = await db.getSpecificImage(id);
    imgCache.set(id, results);
    if (results) {
        res.status(200).json(results);
    } else {
        res.status(404).send();
    }
})

module.exports = router;