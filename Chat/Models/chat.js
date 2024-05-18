const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    expediteur_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    destinataire_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: String
},
{timestamps: true});

const ChatModel = mongoose.model("Chats", ChatSchema);
module.exports = ChatModel