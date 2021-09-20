const db = require('./db/queries.js');
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

const cacheCheck = async (req, res) => {
    console.log('Hit cache check');
    const id = req.imgId;
    const cachedImg = imgCache.get(id);
    console.log(`cachedImg: ${cachedImg}`);
    if (cachedImg) {
        console.log('Hit update script');
        const results = await db.getSpecificImage(id);
        imgCache.del(id);
        imgCache.set(id, results);
    }
}

module.exports = {
    imgCache: imgCache,
    cacheMiddleware, cacheMiddleware,
    cacheCheck, cacheCheck
}