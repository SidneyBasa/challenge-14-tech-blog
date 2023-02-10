const express = require('express');
const router = express.Router();
const {Blog, UserLogin} = require('../models');
const bcrypt = require("bcrypt");

router.get("/", (request, response)=>{
    UserLogin.findAll().then(usageData=>{
        response.json(usageData)
    }).catch(error=>{
        console.log(error);
        response.status(500).json({msg: "error", error})
    })
})

module.exoprts = router;