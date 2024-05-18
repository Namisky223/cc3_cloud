const express = require('express');
const mongoose = require('mongoose');  
const route = express.Router();
const CommentaireModel = require('../Models/commentaire');


function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

route.get('/commentaires_par_article/:Article_id', (req, res) => {
    const Article_id = req.params.Article_id;

    if (!isValidObjectId(Article_id)) {
        return res.status(400).json({ error: 'Invalid article ID format' });
    }

    CommentaireModel.find({ article_id: Article_id })
        .then(commentaires => res.json(commentaires))
        .catch(err => res.status(500).json(err));
});

route.post('/:Article_id/:Userid', (req, res) => {
    const Article_id = req.params.Article_id;
    const Userid = req.params.Userid;

    if (!isValidObjectId(Article_id) || !isValidObjectId(Userid)) {
        return res.status(400).json({ error: 'Invalid article ID or user ID format' });
    }

    CommentaireModel.create({
        user_id: Userid,
        article_id: Article_id,
        comment: req.body.comment
    })
    .then(commentaire => res.status(201).json(commentaire))
    .catch(err => res.status(500).json(err));
});

route.put('/:Article_id/:Userid', (req, res) => {
    const Article_id = req.params.Article_id;
    const Userid = req.params.Userid;

    if (!isValidObjectId(Article_id) || !isValidObjectId(Userid)) {
        return res.status(400).json({ error: 'Invalid article ID or user ID format' });
    }

    CommentaireModel.findOneAndUpdate(
        { user_id: Userid, article_id: Article_id },
        { comment: req.body.comment },
        { new: true, runValidators: true }
    )
    .then(comment => {
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    })
    .catch(err => res.status(500).json(err));
});

route.delete('/:Article_id/:Userid', (req, res) => {
    const Article_id = req.params.Article_id;
    const Userid = req.params.Userid;

    if (!isValidObjectId(Article_id) || !isValidObjectId(Userid)) {
        return res.status(400).json({ error: 'Invalid article ID or user ID format' });
    }

    CommentaireModel.findOneAndDelete({ user_id: Userid, article_id: Article_id })
        .then(comment => {
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({ error: 'Comment not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = route;
