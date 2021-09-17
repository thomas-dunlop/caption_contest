const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');
const NodeCache = require('node-cache');
const imgCache = new NodeCache({stdTTL: 3600, checkperiod: 3700});

const cacheMiddleware = (req, res, next) => {
    const id = parseInt(req.params.id);
    const cachedImg = imgCache.get(id);
    if (cachedImg) {
        res.status(200).json(cachedImg);
    } else {
        next();
    }
}

router.get('/', async (req, res) => {
    const images = await db.getAllImages();
    res.status(200).json(images);
});

router.get('/:id', cacheMiddleware, async (req, res) => {
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