const UserLogin = require('./UserLogin');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.belongsTo(UserLogin)

UserLogin.hasMany(Blog)

Comment.belongsTo(Blog)

Blog.hasMany(Comment)

module.exports = {
    UserLogin,
    Blog,
    Comment
}