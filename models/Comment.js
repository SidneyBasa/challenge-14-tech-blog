const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blogPostNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
},{
    sequelize
})

module.exports=Comment