// Wednesday February 15 2023
const express = require('express');
const router = express.Router();
const {UserLogin, Blog, Comment} = require('../models');

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

// Get one blog
router.get("/:id", (request, response)=>{
    Blog.findByPk(request.params.id,{
        include:[UserLogin]
    })
    .then(blogData=>{
        response.json(blogData)
    })
    .catch(error=>{
        console.log(error);
        response.status(500)
        .json({msg:"blog data for this user could not be found!", error})
    })
})


// route to create a blog
// http: // localhost:3001/api/blogs
router.post("/", (request, response)=>{
    
    // Route protection shell
    if(request.session.userLoginId) {
           Blog.create({
        
            blog_title:request.body.blog_title,
            blogpost:request.body.blogpost,
            blog_time:request.body.blog_time,
            blog_date:request.body.blog_date,
    
            // Attaches the userId stored in sessions to the UserId of the json data
            UserLoginId:request.body.username,
            
    
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
    if(request.session.userLoginId) {
           
        // find the blog by the primary key
        Blog.findByPk(request.params.id).then(blogData=>{
           
        // checking if there blog data in the body of the request, if not return report
        if(!blogData){
            // status 404 means the blog does not exist
            return response.status(404).json({msg:"There is no blog data"})
        // then check if the userId of the blog post
        // matches the current logged in user id / the id of the session cookie    
        } else if (blogData.UserLoginId!== request.session.userLoginId){
            // status 403 is forbidden
            return response.status(403).json({msg: "This is not your blog post"})
        }
        Blog.destroy({
            where:{
                // make sure the blog being destroyed is the logged in users blog
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