// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');


// ----------------------------------------
// | MIDDLEWARE                           |
// ----------------------------------------
app.use(express.json());
app.use(express.static('public'));
// express-session
app.use(session({
  secret: "remembergamestop", // any random string
  resave: false,
  saveUninitialized: false
}));


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------


// ----------------------------------------
// | CONTROLLERS                          |
// ----------------------------------------
const gameController = require('./controllers/game.js');
app.use('/game', gameController);

const signupController = require('./controllers/users/signup.js');[

]
app.use('/signup', signupController);

const loginController = require('./controllers/users/login.js');
app.use('/login', loginController);

// seeds
const seedController = require('./controllers/seeds/seeds.js');
app.use('/seed', seedController);


// ----------------------------------------
// | ROUTES                               |
// ----------------------------------------
// --------------------                   |
// 7 Restful Routes   |                   |
// --------------------                   |
// Index  : GET    '/'                1/7 |
// Show   : GET    '/:id'             2/7 |
// New    : GET    '/new'             3/7 |
// Create : POST   '/'                4/7 |
// Edit   : GET    '/:id/edit'        5/7 |
// Update : PUT    '/:id'             6/7 |
// Delete : DELETE '/:id'             7/7 |
// ----------------------------------------


// ----------------------------------------
// | DATABASE                             |
// ----------------------------------------
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'video-games';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
});


// ----------------------------------------
// | LISTENER                             |
// ----------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('up and runnning on port', port);
});
