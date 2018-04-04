const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/users.js');

router.post('/', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if( bcrypt.compareSync(req.body.password, user.password) ){
        req.session.currentuser = user;
        res.status(201).json({
            status:201,
            message:'session created'
        });
    } else {
        res.status(401).json({
            status:401,
            message:'login failed'
        });
    }
  })
});

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({
            status:200,
            message:'logout complete'
        });
    });
})

module.exports = router;
