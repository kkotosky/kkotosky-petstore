var express = require('express');
var router = express.Router();
let pets = require('./data/example-pets.json').pets;
let bigDataPets = require('./data/big-data-pets.json').pets;

router.get('/', function(req, res, next) {
  setTimeout(() => {
    if (req.query.page ) {
      const start = parseInt(req.query.limit) * (parseInt(req.query.page) - 1);
      const end  = (parseInt(req.query.limit) * parseInt(req.query.page))
      const returnVal = bigDataPets.slice(start, end);
      res.status(200).json(returnVal);

      //Empty Case
      // res.status(200).json([]);

      // Failure Case
      // res.status(503).json({message: "There was a problem loading additional pets"});
    } else {
      const returnVal = bigDataPets.slice(0, req.query.limit);
      res.status(200).json(returnVal);

      // Failure case
      // res.status(503).json({message: "There was a problem loading the pets"});
      
      // Empty case 
      // res.status(200).json([]);
    }
  }, 3000);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

router.post('/', function(req, res) {
  setTimeout(() => {
    const newPet = req.body;
    newPet.id = getRandomInt(9223372036854775807);
    // Prepend for demonstration purposes so that the pet appears in the front of the list.
    bigDataPets.unshift(newPet);
    res.status(201).json({});

    //Failure case
    // res.status(503).json({message: "There was a problem creating the pet."});
  }, 3000);
});

module.exports = router;