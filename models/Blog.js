const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        blogpost: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        blog_date:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull:false,
        },
        blog_time:{
            type:DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            allowNull:false
},

},{
    sequelize
})

module.exports=Blog