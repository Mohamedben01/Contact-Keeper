const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
})


module.exports = mongoose.model('user', UserSchema);