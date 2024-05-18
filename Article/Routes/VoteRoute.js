const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const VoteModel = require('../Models/vote');

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

route.post('/:Userid/:Article_id', (req, res) => {
    const Userid = req.params.Userid;
    const Article_id = req.params.Article_id;

    if (!isValidObjectId(Userid) || !isValidObjectId(Article_id)) {
        return res.status(400).json({ error: 'Invalid article ID or user ID format' });
    }

    VoteModel.create({
        user_id: Userid,
        article_id: Article_id,
        vote: req.body.vote 
    })
    .then(vote => res.json(vote))
    .catch(err => res.status(500).json(err));
});


route.delete('/:Article_id/:Userid', (req, res) => {
    const Article_id = req.params.Article_id;
    const Userid = req.params.Userid;

    if (!isValidObjectId(Article_id) || !isValidObjectId(Userid)) {
        return res.status(400).json({ error: 'Invalid article ID or user ID format' });
    }

    VoteModel.findOneAndDelete({ user_id: Userid, article_id: Article_id })
        .then(vote => {
            if (vote) {
                res.json(vote);
            } else {
                res.status(404).json({ error: 'Vote not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = route;
