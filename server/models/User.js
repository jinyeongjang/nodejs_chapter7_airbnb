const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
        default: 'https://velog.velcdn.com/images/jinyeong0448/post/75918136-d457-4dba-b905-1e8d012470d5/image.svg',
    },
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
