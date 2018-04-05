// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------
const User = require('../../models/users.js');
const Game = require('../../models/game.js');

const newUsers = [
  {
    firstname: "G1-FN",
    lastname: "G1-LN",
    username: "G1",
    password: "G1",
    email: "g1@noemail.com",
  },
  {
    firstname: "G2-FN",
    lastname: "G2-LN",
    username: "G2",
    password: "G2",
    email: "g2@noemail.com",
  },
  {
    firstname: "G3-FN",
    lastname: "G3-LN",
    username: "G3",
    password: "G3",
    email: "g3@noemail.com",
  },
];

const newGames = [
  {
    title: "Game 1",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Genre 1",
    image: "http://media.comicbook.com/2017/09/pubg-vs-fornite-battle-royale-mode-1022703.jpg",
    description: "Description 1. PlayerUnknown's Battlegrounds is still going strong, everybody. The development team just launched a new map on the game's test servers, codenamed Savage. On this episode of New Gameplay Today, I'm joined by Leo Vader and intern Robbie Key to take a tour of this tropical island paradise and no bullet is going to get in our way.",
    user_id: "",
  },
  {
    title: "Game 2",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Genre 2",
    image: "http://media.comicbook.com/2017/09/pubg-vs-fornite-battle-royale-mode-1022703.jpg",
    description: "Description 2. PlayerUnknown's Battlegrounds is still going strong, everybody. The development team just launched a new map on the game's test servers, codenamed Savage. On this episode of New Gameplay Today, I'm joined by Leo Vader and intern Robbie Key to take a tour of this tropical island paradise and no bullet is going to get in our way.",
    user_id: "",
  },
  {
    title: "Game 3",
    releaseDate: "1969-12-31T00:00:00.000Z",
    genre: "Genre 3",
    image: "http://media.comicbook.com/2017/09/pubg-vs-fornite-battle-royale-mode-1022703.jpg",
    description: "Description 3. PlayerUnknown's Battlegrounds is still going strong, everybody. The development team just launched a new map on the game's test servers, codenamed Savage. On this episode of New Gameplay Today, I'm joined by Leo Vader and intern Robbie Key to take a tour of this tropical island paradise and no bullet is going to get in our way.",
    user_id: "",
  },
];

const seeded = [{users: []}, {games: []}];


// ----------------------------------------
// | SEED ROUTES                          |
// ----------------------------------------

// users
// creates users from newUsers and games from newGames
router.get('/seeding-users-and-games', (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  // ----------
  for (let i = 0; i < newUsers.length; i++) {
    newUsers[i].password = bcrypt.hashSync(newUsers[i].password, salt);
    // ----------
    User.create(newUsers[i], (error, user) => {
      if (error) {
        res.send(error);
      } else {
        seeded[0].users.push(newUsers[i]);
        // ----------
        User.findOne({
          username: newUsers[i].username
        }, (error, foundUser) => {
          if (foundUser) {
            newGames[i].user_id = foundUser._id;
            // ----------
            Game.create(newGames[i], (error, game) => {
              if (error) {
                res.send(error);
              } else {
                seeded[1].games.push(newGames[i]);
              };
            }); // end game create
          } else {
            res.send(error);
          };
        });
      };
    }); // end user create
  }; // end for loop
  res.json(seeded);
}); // end seed route


// ----------------------------------------
// | MODULE EXPORTS                       |
// ----------------------------------------
// Access this file in server.js          |
// Export router & require in server.js   |
// ----------------------------------------
module.exports = router;
