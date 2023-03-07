// Wednesday February 16 2023
const express = require('express');
const router = express.Router();
const {UserLogin, Blog, Comment} = require('../models');

let blogThatIsBeingQueried = ''

// first view
// homepage
// first route
router.get("/", (request, response)=>{
    // Adding data for blog posts to the home page
    Blog.findAll({
        include:
        [
            { model: UserLogin }, 
            { model: Comment},
            // where: {
            //     id: 3
            // }
            // limit: 7,
            // nested: true,
            // all: true,
    ]
        // include:[Comment]

    }).then(blogData=>{
        // checking blogData in the terminal
        // console.log("Test of Blog.findAll get route blogData",blogData)

        // Converting raw data to the JSON format
        // Takes the property blogpost which is defined in the model Blog at blog.js 
        // and converts it into json format
        const homeHandlebarBlogs = blogData.map(blogpost=>blogpost.toJSON())
        // const handlebarBlogsTime = blogData.map(blog_time=>blog_time.toJSON())
        // const handlebarBlogsDate = blogData.map(blog_date=>blog_date.toJSON())
        // transfer the JSON formatted data to allBlogs
        // The allBlogs key is passed into home.handlebars
        console.log("Value of homeHandlebarBlogs", homeHandlebarBlogs)

            response.render("home", {
            allBlogs:homeHandlebarBlogs,
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

// updateordelete get one selected blog route
router.get("/updateordelete/:id", (request, response)=>{
    if(!request.session.userLoginId){
        return response.redirect("/login")
    }
    // get session user blogs only
    // UserLogin.findByPk(request.session.userLoginId, {
    //     include:[Blog]
    Blog.findByPk(request.params.id,{
        include:[UserLogin]
    }
    ).then(blogData=>{
        
        if (blogData){
        const handlebarBlogs3 = blogData.toJSON()
        console.log("test of handlebarBlogs3", handlebarBlogs3)
        
        // const sessionStorageRetrieval = sessionStorage.getItem('blogExtracted')
        // const sessionStorageRetrieval = request.sessionStorage.getItem('blogExtracted')
        // const sessionStorageRetrieval = request.session
        // console.log("Test of sessionStorageRetrieval", sessionStorageRetrieval)
        // console.log("Test of session storage data", session)
        // console.log("Test of global variable blogThatIsBeingQueried at frontEndController.js: ", blogThatIsBeingQueried)
        // console.log(`Test of sessionStorage value of key blogExtracted: ${testOfSessionStorage}`)
            response.render("updateordelete", handlebarBlogs3) 
        }
    })
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