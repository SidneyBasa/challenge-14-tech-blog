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

        include:[UserLogin]

    }).then(blogData=>{
        // checking blogData in the terminal
        // console.log("Test of Blog.findAll get route blogData",blogData)

        // Converting raw data to the JSON format
        // Takes the property blogpost which is defined in the model Blog at blog.js 
        // and converts it into json format
        const handlebarBlogs = blogData.map(blogpost=>blogpost.toJSON())
        // const handlebarBlogsTime = blogData.map(blog_time=>blog_time.toJSON())
        // const handlebarBlogsDate = blogData.map(blog_date=>blog_date.toJSON())
        // transfer the JSON formatted data to allBlogs
        // The allBlogs key is passed into home.handlebars
        console.log("Value of handlebarBlogs", handlebarBlogs)

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
    // logged in users only, protected route
    if(!request.session.userLoginId){
        return response.redirect("/login")
    }

    UserLogin.findByPk(request.session.userLoginId, {
        include:[Blog]
    }
    ).then(blogData=>{
        // console.log("test of blogData", blogData)
        // console.log("test length of blogData.length", blogData.length) // returns undefined
        // console.log("typeof blogdata:  ", typeof blogdata) // returns undefined
        // console.log("test of session userLoginId:", userLoginId)
        // console.log("test of session userLoginId:", request.session.userLoginId)
        const handlebarBlogs2 = blogData.toJSON()
        console.log("test of handlebarBlogs2", handlebarBlogs2)
            response.render("dashboard", handlebarBlogs2) 
            // allBlogs2:handlebarBlogs2
    })
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