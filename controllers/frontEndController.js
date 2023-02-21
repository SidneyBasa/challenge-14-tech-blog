// Wednesday February 16 2023
const express = require('express');
const router = express.Router();
const {UserLogin, Blog, Comment} = require('../models');

// first view
// homepage
// first route
router.get("/", (request, response)=>{
    // Adding data for blog posts to the home page
    Blog.findAll({

        include:[UserLogin],
        include:[Comment]

    }).then(blogData=>{
        // checking blogData in the terminal
        // console.log(blogData)

        // Converting raw data to the JSON format
        // Takes the property blogpost which is defined in the model Blog at blog.js 
        // and converts it into json format
        const handlebarBlogs = blogData.map(blogpost=>blogpost.toJSON())
        // const handlebarBlogsTime = blogData.map(blog_time=>blog_time.toJSON())
        // const handlebarBlogsDate = blogData.map(blog_date=>blog_date.toJSON())
        // transfer the JSON formatted data to allBlogs
        // The allBlogs key is passed into home.handlebars
        // console.log("Value of handlebarBlogs", handlebarBlogs)

            response.render("home", {
            allBlogs:handlebarBlogs,
            // alltimes:handlebarBlogsTime,
            // alldates:handlebarBlogsDate
            
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

// dashboard route
router.get("/dashboard", (request, response)=>{
    response.render("dashboard")
})


// logout route
router.get("/logout", (request, response)=>{
    response.render("logout")
})

// comment route
router.get("/comment", (request, response)=>{
    response.render("comment")
})


module.exports = router;