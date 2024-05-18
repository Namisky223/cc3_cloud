const mongoose = require('mongoose');

const ComtSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    article_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Articles'},
    comment: {type: String, required: true}
},
{timestamps: true});

const CommentairetModel = mongoose.model("Comentaires", ComtSchema);
module.exports = CommentairetModel