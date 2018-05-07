const router = require('express').Router()
const { db, Place, Hotel, Restaurant, Activity } = require('../models')
const Sequelize = require('Sequelize')


// eager loading -{include : [ Place] }
router.get('/attractions', (req, res, next) => {
    var allAttractions = {};

    Hotel.findAll( {include : [ Place] } )
        .then(function (hotels) {
            allAttractions.hotels = hotels;
            return Restaurant.findAll();
        })
        .then(function (restaurants) {
            allAttractions.restaurants = restaurants;
            return Activity.findAll();
        })
        .then(function (activities) {
            allAttractions.activities = activities;
        })
        .then(function () {
            res.json(allAttractions);
        })
        .catch(next);
})





module.exports = router