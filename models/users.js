const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userModel);

module.exports = User;
