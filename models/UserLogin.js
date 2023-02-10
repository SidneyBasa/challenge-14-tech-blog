const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

class UserLogin extends Model {}

UserLogin.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
},{
    sequelize
})

modeule.exports=UserLogin