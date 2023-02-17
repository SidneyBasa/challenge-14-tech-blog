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

// route to create a blog
router.post("/", (request, response)=>{
    
    // Route protection shell
    if(request.session.userId) {
           Blog.create({
        
            blogpost:request.body.blogpost,
    
            // Attaches the userId stored in sessions to the UserId of the chirp json data
            UserId:request.session.userId
    
        }).then(blogData=>{
            response.json(blogData)
        })
        .catch(error=>{
            console.log("\x1B[33m----------------------------------------------")
            // console.log("\x1B[36mPost request error:", error.errors[0].message);
            console.log(error);
            console.log("\x1B[33m----------------------------------------------\x1b[0m")
            response.status(500).json({msg:"oh noes!", error})
        })

    } else {
        return response.status(403).json({msg:"You must login or sign up to create a blog"})
    }
})

// route to delete a blog
router.delete("/:id", (request, response)=>{
    
    // Route protection shell
    if(request.session.userId) {
           
        // find the blog by the primary key
        Blog.findByPk(request.params.id).then(blogData=>{
           
        // checking if there blog data in the body of the request, if not return report
        if(!blogData){
            return response.status(404).json({msg:"There is no blog data"})
        // then check if the userId of the blog post, matches the user id of the session cookie    
        } else if (blogData.UserId!== request.session.userId){
            return response.status(403).json({msg: "This is not your blog post"})
        }
        Blog.destroy({
            where:{
                id:request.params.id
            }
        })
            // nested promises
           .then(blogData=>{
            response.json(blogData)
        })

        // In the event something went wrong with destroying the blog post return an error
        .catch(error=>{
            console.log("Something went wrong when destroying the blog post", error)
            response.status(500).json({msg:"Something went wrong when removing a blog post",error})
        })

        }
        // this catch error is in the event the router.delete route does not connect or other errors
        ).catch(error=>{
            console.log("\x1B[33m----------------------------------------------")
            // console.log("\x1B[36mPost request error:", error.errors[0].message);
            console.log(error);
            console.log("\x1B[33m----------------------------------------------\x1b[0m")
            response.status(500).json({msg:"oh noes!", error})
        })

    } else {
        return response.status(403).json({msg:"You must login or sign up to create a blog"})
    }
})


// Bug found when Router.use() requires a middleware function 
// but got object 2/15/2023 @ 10:32pm
// After the fix was implemented, the server runs again
// Fix is adding the following line:
module.exports = router;