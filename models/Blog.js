const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
        blogpost: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

},{
    sequelize
})

module.exports=Blog