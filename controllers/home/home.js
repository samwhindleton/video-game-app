const express = require('express');
const router = express.Router();
const Game = require('../../models/game.js');

//Create new game with user id
router.post('/', (req, res) => {
  req.body.user_id = req.session.currentuser._id
  Game.create(req.body, (err, newGame) => {
    res.json(newGame)
  });
});

module.exports = router;
