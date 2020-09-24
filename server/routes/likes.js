const express = require('express')
const mysql = require('mysql')
const config = require("../config")
const db = require('../lib/Database')
const router = express.Router()

const connection = mysql.createConnection(config.mysqlConfig)
connection.connect((err) => {
  if(err) throw err;
})

// Insert the user liked post into the database table (likes)
router.post("/addlike", (req, res) => {
  const user_id = req.body.userId
  const comment_id = req.body.commentId
  
  const queryString = "INSERT INTO likes SET comment_id = ?, user_id = ?" 
  db.query(queryString, [comment_id, user_id])
  .then(response => {
    res.send()
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

// Returns the likes count (INT)
router.post("/countlikes", (req, res) => {
  const queryString = ` 
    SELECT l.comment_id, COUNT(*) AS count
    FROM LIKES AS l
    WHERE 1
    GROUP BY l.comment_id
  `

  db.query(queryString)
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

router.post("/deletelike", (req, res) => {
  const comment_id = req.body.commentId;
  const user_id = req.body.userId

  const queryString = ` 
    DELETE FROM likes WHERE comment_id = ? AND user_id = ?
  `
  db.query(queryString, [comment_id, user_id])
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

module.exports = router