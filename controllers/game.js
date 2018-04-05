const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

// get all games
router.get('/', (req,res)=>{
  Game.find({}, (err, foundGame)=>{
    res.json(foundGame);
  });
});

// NOTE: get user created games

//Create new game with user id
router.post('/', (req, res) => {
  req.body.user_id = req.session.currentuser._id
  Game.create(req.body, (err, newGame) => {
    res.json(newGame)
  });
});

//Update game
router.put('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedGame) => {
    res.json(updatedGame)
  });
});

//Update game
router.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, deletedGame) => {
    res.json(deletedGame)
  });
});

module.exports = router;
