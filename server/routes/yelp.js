const express = require('express')
const yelp = require('yelp-fusion');
const config = require('../config')
const db = require('../lib/Database')
const router = express.Router()

const apiKey = config.apiKey;
const client = yelp.client(apiKey)

router.post("/", (req, res) => {
  const offset = req.body.offset;
  const location = req.body.location;

  // Search function provided by yelp fusion API
  // Returns 1 restaurant, all Price categories and the category food
  client.search({ limit: 1, offset, price: "4, 3, 2, 1", term: 'food', location: location})
  .then(response => {
    const prettyJson = JSON.stringify(response)
    const id = response.jsonBody.businesses[0].id
    client.business(id).then(response => {
      const { alias, is_claimed, is_closed, phone, review_count, categories, coordinates, transactions,  ...data } = response.jsonBody;
      const restaurantData = data;
      res.send(restaurantData);
    }).catch(e => {
      res.sendStatus(400).send("An error occured. Please check if your location is valid")
    });
  }).catch(e => {
    res.sendStatus(400).send("An error occured. Please check if your location is valid")
  })
})

// Get a specific yelp business by id
router.post("/getrestaurantbyid", (req, res) => {
  const id = req.body.id
  // Yelp fusion function to get a business
  client.business(id).then(response => {
    const { alias, is_claimed, is_closed, phone, review_count, categories, coordinates, transactions,  ...data } = response.jsonBody;
    const restaurantData = data;
    res.send(restaurantData);
  }).catch(e => {
    res.sendStatus(400).send("No restaurant found")
  });
})

module.exports = router;