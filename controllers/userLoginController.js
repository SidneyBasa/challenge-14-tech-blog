const express = require('express');
const router = express.Router();
const {Blog, UserLogin} = require('../models');
const bcrypt = require("bcrypt");

// find all users
router.get("/", (request, response)=>{
    UserLogin.findAll().then(usageData=>{
        response.json(usageData)
    }).catch(error=>{
        console.log(error);
        response.status(500).json({msg: "error", error})
    })
})

// logout route
router.get("/logout", (request, response)=>{

    // Deleting the log in data from the cookie
    request.session.destroy();
    response.send("The user has logged out")
})

// get route for all users and their blogs
router.get("/:id", (request, response)=>{

    // The parameter we are looking for is request.params.id
    // the method findByPk is find by primary key
    UserLogin.findByPk(request.params.id, {
        
        // this option
        // will join the blog table with the userLogin table
        include:[Blog]

    })
    
    // then we take the user data and send it back
    .then(userData=>{
        response.json(userData)
    })
    
    // if there is an error we will log it
    .catch(error=>{
        console.log(error);

        // The 500 status is an internal server error
        response.status(500)
        
        // json formatted error
        .json({msg:"error getting user and blog posts!", error})
    })
})

// post route to create a user
router.post("/", (request, response)=>{
    
    // creates a user
    UserLogin.create({

        // a post request includes a request body
        // add the username to the body 
        username:request.body.username,

        // every username will add a password to the body
        password:request.body.password

    })

    // The user data is taken and sent back
    .then(bloggerData=>{
        response.json(bloggerData)
    })

    // catch and report any errors
    .catch(error=>{
        // Test of colored console logs
        console.log("\x1B[33m----------------------------------------------")
        console.log("\x1B[36mPost request error:", error.errors[0].message);
        console.log("\x1B[33m----------------------------------------------\x1b[0m")
        
        // status code 500 is a server internal error
        response.status(500)

        // a json message is rendered in this error
        .json({msg: "Error when creating this user name", error})
    })
})

// login route
router.post("/login", (request, response)=>{
    // Find one user in the body
    UserLogin.findOne({
        
        where:{
            username:request.body.username
            
        }
        
    })
    // check of if userLogin object was found
    .then(userFound=>{
        if(!userFound){
            console.log("Test at line 65 at login route in userLoginController")
            // if the userLogin obhect was not found return an unauthrized status of 401
            return response.status(401).json({msg:"User was not found"})
        } else {
            console.log("Test at line 69 at login route in userLoginController")
            // Unencrypt the data, then check if the password matches the stored password
            if(bcrypt.compareSync(request.body.password, userFound.password)){
                // tells sessions that you have logged in
                request.session.userId = userFound.id;

                // adds the property username to the session data
                request.session.username = userFound.username;

                // if the password matches, return with the userFound object data
                return response.json(userFound)
            } else {
                return response.status(401).json({msg:"incorrect password"})
            }
        }
    })
    .catch(error=>{
        console.log("\x1B[33m----------------------------------------------")
        console.log("\x1B[36mPost request error:", error.message);
        console.log("\x1B[33m----------------------------------------------\x1b[0m")
        response.status(500)
        .json({msg:"Error at login!", error})
    })
})

module.exports = router;