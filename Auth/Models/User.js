const mongoose = require('mongoose');

const UserScema = new mongoose.Schema({
    nom: String,
    email: {type: String, unique: true},
    login: {type: String, unique: true},
    mdp: String
},{timestamps: true});

const UserModel = mongoose.model("User", UserScema);
module.exports = UserModel