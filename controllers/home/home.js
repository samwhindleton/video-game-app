const express = require('express');
const router = express.Router();
const Game = require('../../models/game.js');

router.post('/', (req, res) => {
  req.body.user_id = req.session.currentUser._id
  Game.create(req.body, (err, newGame) => {
    res.json(newGame)
  });
});

module.exports = router;
