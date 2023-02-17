// Wednesday February 16 2023
const express = require('express');
const router = express.Router();
const {UserLogin, Blog} = require('../models');

// first view
// homepage
// first route
router.get("/", (request, response)=>{
    response.render("home")
})

module.exports = router;