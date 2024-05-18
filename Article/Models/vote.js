const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    article_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Articles'}
    
}, {timeseries: true});

const VoteModel = mongoose.model("Votes", VoteSchema);
module.exports = VoteModel