// Packages
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const jwtExpress = require('express-jwt');

// Config
const config = require('./config')

// Routes
const auth = require('./routes/auth')
const yelp = require('./routes/yelp')
const twilio = require('./routes/twillio')
const comments = require("./routes/comments")
const likes = require("./routes/likes")
const users = require('./routes/users')

const app = express();

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Secures Routes with JWT
app.use(jwtExpress({secret: config.jwtPrivateKey}).unless({
  path: ['/api/users/register', '/api/auth/login', '/api/users/upload', '/api/users/userimg'],
}));

// Mysql connection
const connection = mysql.createConnection(config.mysqlConfig)
connection.connect((err) => {
  if(err) throw err;
});

// Routes
app.use("/api/yelp", yelp)
app.use("/api/auth", auth)
app.use("/api/users", users);
app.use("/api/twilio", twilio)
app.use("/api/comments", comments)
app.use("/api/likes", likes)

app.listen(config.expressConfigPort.port, () => {
  console.log("server is listening")
})