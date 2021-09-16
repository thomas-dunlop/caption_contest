const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db/queries.js');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
}) 

passport.deserializeUser(async (id, done) => {
    const user = await db.findUserById(id);
    done(null, user);
}) 

passport.use(new LocalStrategy(
    async function(username, password, done) {
        const user = await db.findUser(username);
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        const passwordCompare = await bcrypt.compare(password, user.hashed_password);
        if (!passwordCompare) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
    }
))