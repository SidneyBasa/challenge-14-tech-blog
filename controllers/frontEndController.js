// Wednesday February 16 2023
const express = require('express');
const router = express.Router();
const {UserLogin, Blog} = require('../models');

// first view
// homepage
// first route
router.get("/", (request, response)=>{
    // Adding data for blog posts to the home page
    Blog.findAll({

        include:[UserLogin]

    }).then(blogData=>{
        // checking blogData in the terminal
        // console.log(blogData)

        // Converting raw data to the JSON format
        // Takes the property blogpost which is defined in the model Blog at blog.js 
        // and converts it into json format
        const handlebarBlogs = blogData.map(blogpost=>blogpost.toJSON())
        // transfer the JSON formatted data to allBlogs
        // The allBlogs key is passed into home.handlebars
        // console.log("Value of handlebarBlogs", handlebarBlogs)

            response.render("home", {
            allBlogs:handlebarBlogs
            
        })
    })
})

// login route
router.get("/login", (request, response)=>{
    response.render("login")
})

// signup route
router.get("/signup", (request, response)=>{
    response.render("signup")
})

// profile route
router.get("/profile", (request, response)=>{
    response.render("profile")
})


module.exports = router;