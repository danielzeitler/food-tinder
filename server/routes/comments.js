const express = require('express')
const mysql = require('mysql')
const config = require("../config")
const db = require('../lib/Database')
const router = express.Router()

const connection = mysql.createConnection(config.mysqlConfig)
connection.connect((err) => {
  if(err) throw err;
})

// Add comment to a chosen restaurant
router.post("/addcomment", (req, res) => {
  const comment_content = req.body.comment.comment
  const user_id = req.body.comment.user_id
  const yelp_id = req.body.comment.yelp_id
  
  const queryString = "INSERT INTO comments SET comment_content = ?, user_id = ?, yelp_id = ?" 
  db.query(queryString, [comment_content, user_id, yelp_id])
  .then(response => {
    res.send()
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

// Return all comments with likes 
router.post("/getcomments", (req, res) => {
  const yelp_id = req.body.yelpId
  const user_id = req.body.userId

  const queryString = `
    SELECT c.*, u.firstname, u.lastname, IFNULL(likesCount.count, 0) AS count, 
    IF(EXISTS (select * from likes AS l where l.comment_id = c.id and l.user_id = ?), true, false) AS user_has_liked
    FROM comments AS c 
    LEFT JOIN (
        SELECT l.comment_id, COUNT(*) AS count
      FROM LIKES AS l
      WHERE 1
      GROUP BY l.comment_id
    ) AS likesCount ON c.id = likesCount.comment_id
    LEFT JOIN user AS u ON u.id = c.user_id
    WHERE c.yelp_id = ? ORDER BY id DESC
  ` 

  db.query(queryString, [user_id, yelp_id] )
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    res.sendStatus(500)
  })
})

module.exports = router