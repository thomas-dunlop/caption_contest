const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['kljfsdkljasdoij'] 
}))
app.use(passport.initialize());
app.use(passport.session());

let PORT; 
const isProduction = process.env.NODE_ENV === 'production';
if(isProduction === true) {
    PORT = process.env.PORT;
} else {
    PORT = 3000;
};

const imageRoute = require('./routes/images');
app.use('/images', imageRoute);
const captionRoute = require('./routes/captions');
app.use('/captions', captionRoute);
const authRoute = require('./routes/authentication');
app.use('/', authRoute);

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}.`);
})