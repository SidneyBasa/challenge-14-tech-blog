const UserLogin = require('./UserLogin');
const Blog = require('./Blog');

Blog.belongsTo(UserLogin)

UserLogin.hasMany(Blog)

module.exports = {
    UserLogin,
    Blog
}