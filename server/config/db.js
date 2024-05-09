const mongoose = require('mongoose');

const connectWithDB = () => {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(process.env.DB_URL)
        .then(() => {
            console.log(`DB connection established`);
        })
        .catch((err) => {
            console.log(`DB connection Error: ${err}`);
            process.exit(1);
        });
};

module.exports = connectWithDB;
