const express = require('express');
const router = express.Router();
const Game = require('../../models/game.js');

router.post('/', (req, res) => {
  Game.create(req.body, (err, newGame) => {
    res.json(newGame)
  });
});

module.exports = router;
