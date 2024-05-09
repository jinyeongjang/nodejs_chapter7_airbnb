const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const connectWithDB = require('./config/db');

require('dotenv').config();

const app = express();

connectWithDB();

app.use(cookieParser());

app.use(
    cookieSession({
        name: 'session',
        maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
        keys: [process.env.SESSION_SECRET],
        sameSite: 'none',
    })
);

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use('/', require('./routes'));

app.listen(process.env.PORT || 8000, (err) => {
    if (err) {
        console.log('Error in connecting to server ' + err);
    } else {
        console.log(`server is running on port ${process.env.PORT}`);
    }
});
