const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', (req, res) => {
  if(req.session.currentuser){
    Game.find({user_id: req.session.currentuser._id}, (err, foundGame)=> {
      res.json(foundGame);
    });
  }
});

//Update game comments
router.put('/:id', (req, res) => {
  // push new comments in to game comments
  Game.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedGame) => {
    res.json(updatedGame)
  });
});

//Delete game
router.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, deletedGame) => {
    res.json(deletedGame)
  });
});

module.exports = router;
