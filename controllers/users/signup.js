const express = require('express');
const router = express.Router();
const User = require('../../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt)
  User.create(req.body, (err, newUser) => {
    res.status(201).json({
         status:201,
         message: "user created"
    });
  });
});

module.exports = router;
