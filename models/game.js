const mongoose = require('mongoose');

const gameModel = new mongoose.Schema({
    user_id: String,
    title: { type: String, unique: true },
    genre: String,
    description: String,
    releaseDate: String,
    image: String,
});

const Game = mongoose.model('Game', gameModel);

module.exports = Game;
