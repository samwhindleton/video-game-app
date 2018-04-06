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

module.exports = router;
