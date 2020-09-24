module.exports = {
  "expressConfigPort": {
    port: 5000 || process.env.PORT
  },
  "mysqlConfig": {
    host: "localhost",
    port: 8889,
    user: "foodswipe_db",
    password: "foodswipe_pw",
    database: "foodswipe_db"
  },
  "jwtPrivateKey": "privateKey",
  "apiKey": ""
}