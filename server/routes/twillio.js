const express = require('express')
const router = express.Router()

const Twilio = require('twilio')
const accountSid; // Enter your own Sid
const authToken; // Enter your own auth token
const client = require('twilio')(accountSid, authToken);

// This API is in test mode and only works with verified numbers!
router.post("/sendMessage", (req, res) => {
  const data = req.body.restaurantData;
  const userNumber = `+49${req.body.userNumber}`

  client.messages.create({
    body: `
      Hey, here are your Details: 
      Restaurant: ${data.name},
      Phone: ${data.display_phone},
      Street: ${data.location.address1},
      Zip Code: ${data.location.zip_code},
      City: ${data.location.city},
    `,
    to: `${userNumber}`,
    from: '+4915735987276'
 }).then(message => {
   res.send()
 }).catch(err => {
   res.sendStatus(500).send("Internal Server Error")
 })
})

module.exports = router;