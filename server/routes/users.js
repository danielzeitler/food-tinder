const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require("../config")
const path = require('path')
const db = require('../lib/Database')

const fs = require('fs')
const multer = require('multer')

// Settings for Image uploader
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

// Filter allowed upload data
const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // store the file
    cb(null, true)
  } else {
    // reject a file
    cb(null, false)
  }
}

// Uploas specs + max fileSize 3mb
const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
})

const connection = mysql.createConnection(config.mysqlConfig)
connection.connect((err) => {
  if(err) throw err;
})

// Route to register a new user
router.post("/register", async (req, res) => {
  const { confirmpassword, ...user } = req.body.user;

  // Hashing password with bcrypt (10 salt rounds)
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  const queryString = "INSERT INTO user SET ?"

  db.query(queryString, user).then( results => {    
    res.send(user)
    res.end()
  })
})

// Checking the token for page reload feature on client
router.post("/checktoken", (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = jwt.decode(token)

  const queryString = "SELECT * FROM user WHERE id = ?";
  db.query(queryString, payload.id).then(rows => {
    if(rows.length === 0) return res.status(500).send('Login data expired. Please Login again')

    const { password, ...payload } = rows[0]
    
    const token = jwt.sign(payload, config.jwtPrivateKey)

    res.send({ user: payload, token: token })
  })
})

// Enter the liked restaurants into the database
router.post("/likedposts", (req, res) => {
  const yelpData = JSON.stringify(req.body.data.yelpData)
  const yelpId = req.body.data.yelpData.id
  const user_id = req.body.data.user.id
  
  const queryString = "INSERT INTO likedposts SET yelpId = ?, yelpData = ?, user_id = ?" 
  db.query(queryString, [yelpId, yelpData, user_id])
  .then(response => {
    res.send()
  })
})

// Get the users liked post in descending order
router.post("/yelpdata", (req, res) => {
  const user_id = req.body.data

  const queryString = "SELECT * FROM likedposts WHERE user_id = ? ORDER BY id DESC"
  db.query(queryString, user_id).then(response => {
    const yelpData = []
    response.forEach((data) => {
      yelpData.push(data.yelpData)
    })

    res.send(yelpData)
  })
})

// Update the user data 
router.post("/updateuser", (req, res) => {
  const id = req.body.userData.id
  const firstname = req.body.userData.firstname
  const lastname = req.body.userData.lastname
  const email = req.body.userData.email
  const location = req.body.userData.location
  
  const queryString = "UPDATE user SET firstname = ?, lastname = ?, email = ?, location = ? WHERE id = ?" 
  db.query(queryString, [firstname, lastname, email, location, id])
  .then(response => {
    const query = "SELECT * FROM user WHERE id = ?";
    db.query(query, id).then(rows => {  
      const { password, ...payload } = rows[0]
        
      res.send({ user: payload })
    })
  })
  .catch(err => {
    res.sendStatus(500).send("An error occured when updating your profile. Try it again.")
  })
})

// Delete from users like restaurants array
router.post("/deleterestaurant", (req, res) => {
  const yelpId = req.body.yelpId
  const queryString = "DELETE FROM likedposts WHERE yelpId = ? LIMIT 1"
  db.query(queryString, yelpId).then(response => {
    res.send()
  })
})

// Get the user image
router.post("/userimg", (req, res) => {
  const id = req.body.id
  const queryString = ` 
    SELECT u.id, u.file_id, file.image
    FROM user AS u
    LEFT JOIN file ON u.file_id = file.id
    WHERE u.id = ?
  `

  db.query(queryString, id).then(response => {
    const userImg = {
      id: response[0].id,
      image: response[0].image,
      file_id: response[0].file_id
    }

    res.send(userImg)
  })
})

// If user has an image this route gets called to update the current image
router.post("/updateimage", upload.single('userImage'), (req, res) => {
  const name = req.file.fieldname
  const image = req.file.path
  const size = req.file.size
  const id = req.body.userid

  const queryString = `
  SELECT user.id, file.id AS file_id, file.image
  FROM user
  LEFT JOIN file ON user.file_id = file.id
  WHERE user.id = ?
  `

  db.query(queryString, id).then(response => {
    const user_id = response[0].id
    const file_id = response[0].file_id
    const path = response[0].image

    // Delete Image in Uploads Folder
    fs.unlink(path, (err) => {
      if (err) throw err;
    });

    // 1st Query: Update Files Table Row
    const queryString = "UPDATE file SET name = ?, image = ?, size = ? WHERE id = ?"
    db.query(queryString, [name, image, size, file_id]).then(response => {
      // 2nd Query: Update User File ID
      const query = "UPDATE user SET file_id = ? WHERE id = ?" 
      db.query(query, [file_id, user_id]).then(response => {
        res.send()
      }).catch(err => {
        res.sendStatus(500).send("An error occured.")
      })
    })
  })
})

// If user has no image a new image gets uploaded and put into uploads folder
router.post('/upload', upload.single('userImage'), (req, res, next) => {
  const name = req.file.fieldname
  const image = req.file.path
  const size = req.file.size
  const id = req.body.userid

  // 1st Request: Set File into file table
  const queryString = "INSERT INTO file SET name = ?, image = ?, size = ?"
  db.query(queryString, [name, image, size]).then(response => {
    // Get last inserted Id
    const file_id = response.insertId

    // 2nd Request: Set ID into users table
    const query = "UPDATE user SET file_id = ? WHERE id = ?" 
    db.query(query, [file_id, id]).then(response => {
      res.send()
    }).catch(err => {
      fs.unlink(image, (err) => {
        if (err) throw err;
      });
      res.sendStatus(500).send("An error occured.")
    })
  }).catch(err => {
    fs.unlink(image, (err) => {
      if (err) throw err;
    });
    res.sendStatus(500).send("An errror occured.")
  }) 
})

module.exports = router;