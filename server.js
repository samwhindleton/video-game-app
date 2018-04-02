const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

app.use(express.json);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('index');
});

mongoose.connect('mongodb://localhost:27017/video-games')
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
});

app.listen(port, () => {
  console.log('up and runnning on port', port);
});
