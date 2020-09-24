const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const config = require("../config")
const jwt = require('jsonwebtoken')
const router = express.Router()

const connection = mysql.createConnection(config.mysqlConfig)
connection.connect((err) => {
  if(err) throw err;
})

// Login authorization process
router.post("/login", (req, res) => {
  const queryString = "SELECT * FROM user WHERE email = ?";
  const userData = req.body.user;

  connection.query(queryString, userData.email, async (err, results) => {
    // Check if results
    if(results.length === 0) return res.status(400).send("Invalid email or password");

    // Check if password correct with bcrypt
    const validPassword = await bcrypt.compare(req.body.user.password, results[0].password);
    if(!validPassword) return res.status(400).send("Invalid email or password")

    const { password, ...userData } = results[0];
  
    // Sign a token for the user to confirm authorization
    const token = jwt.sign(userData, config.jwtPrivateKey);

    res.send({token, userData})
  })
})

module.exports = router;