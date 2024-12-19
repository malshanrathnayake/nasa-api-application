const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName: String,
    UserEmail: String,
    Password: String
});

module.exports = mongoose.model('UserModel', userSchema);
