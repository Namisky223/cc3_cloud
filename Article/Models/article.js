const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    titre: String,
    categorie: String,
    description: String,
    contenu: String
},
{timestamps: true});

const ArticleModel = mongoose.model("Articles", ArticleSchema);
module.exports = ArticleModel