const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    contenu: String
},
{timestamps: true});

const StoryModel = mongoose.model("Stories", StorySchema);
module.exports = StoryModel