const express = require('express');
const router = express.Router();
const db = require('../db/queries.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');
const passport = require('passport');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

/*router.get('/', (req, res) => {
    res.status(200).send("You logged in! Go to /images to see images or POST to /captions to submit captions.");
})*/

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/login', (req, res) => {
    res.status(200).send("Send POST request to login with body = {username: your email, password: your password}");
})

router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.user);
    res.redirect('/login');
})

router.post('/create-account', async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const result = await db.createUser(username, password);
    if (result) {
        res.status(201).send('New user sucessfully created');
    } else {
        res.status(400).send("400 Error");
    }
})

module.exports = router;