// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// ----------------------------------------
// | MIDDLEWARE                           |
// ----------------------------------------
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('index');
});


// ----------------------------------------
// | MODELS                               |
// ----------------------------------------


// ----------------------------------------
// | CONTROLLERS                          |
// ----------------------------------------


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
// mongoose.connect('mongodb://localhost:27017/video-games')
// mongoose.connection.once('open', () => {
//   console.log('connected to mongod');
// });

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'video-games';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
});

// ----------------------------------------
// | LISTENER                             |
// ----------------------------------------
// app.listen(port, () => {
//   console.log('up and runnning on port', port);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('up and runnning on port', port);
});
