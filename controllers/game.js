const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

// get all games
router.get('/', (req,res)=>{
  Game.find({}, (err, foundGame)=>{
    res.json(foundGame);
  });
});

// //Create new game with user id
// router.post('/', (req, res) => {
//   req.body.user_id = req.session.currentuser._id;
//   Game.create(req.body, (err, newGame) => {
//     if(err.code === 11000){
//         res.status(401).json({
//              status:401,
//              message: "duplicate game"
//         });
//     }else{
//       res.json(newGame)
//     }
//
//   });
// });

// Create new game with user id
router.post('/', (req, res) => {
  req.body.user_id = req.session.currentuser._id;
  Game.findOne({
    title: req.body.title
  }, (error, foundGame) => {
    if (foundGame) {
      res.status(401).json({
        status:401,
        message: "duplicate game"
      });
    } else {
      Game.create(req.body, (error, newGame) => {
        res.json(newGame)
      });
    };
  });
});

//Update game comments
router.put('/:id', (req, res) => {
  // push new comments in to game comments
  Game.findByIdAndUpdate(req.params.id, {$push: {comments: req.body.comments}}, {new:true}, (err, updatedGame) => {
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
