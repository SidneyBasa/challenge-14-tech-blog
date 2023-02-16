// Wednesday February 15 2023
const express = require('express');
const router = express.Router();
const {UserLogin, Blog} = require('../models');

// get all blog posts
router.get("/", (request, response)=>{

    // find all blog posts in body
    Blog.findAll()
    .then(blogData=>{
        response.json(blogData)
    })
    .catch(error=>{
        console.log("Error at blogController", error)
        response.status(500)
        .json({msg:"error at get all blogs route at blogController"})
    })
})

// Bug found when Router.use() requires a middleware function 
// but got object 2/15/2023 @ 10:32pm
// After the fix was implemented, the server runs again
// Fix is adding the following line:
module.exports = router;