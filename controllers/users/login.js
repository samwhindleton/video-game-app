const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/users.js');

router.post('/', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if(user === null || undefined){
      res.send('invalid username')
    }else{
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.currentUser = user;
        res.redirect('/');
      }else {
        res.send('wrong password');
      }
    }
  })
});

module.exports = router;
