const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ArticleModel = require('../Models/article');

// Fonction pour valider ObjectId
function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

router.get('/Articles', (req, res) => {
    ArticleModel.find({})
        .then(articles => res.json(articles))
        .catch(err => res.status(500).json(err));
});

router.get('/Article/:id', (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid article ID format' });
    }

    ArticleModel.findById(id)
        .then(article => {
            if (article) {
                res.json(article);
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});

router.post('/:Userid/AddArticle', (req, res) => {
    const Userid = req.params.Userid;

    if (!isValidObjectId(Userid)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    ArticleModel.create({
        user_id: Userid,
        titre: req.body.title,
        categorie: req.body.categorie,
        description: req.body.description,
        contenu: req.body.content
    })
    .then(article => res.status(201).json(article))
    .catch(err => res.status(500).json(err));
});

router.put('/:Userid/:id', (req, res) => {
    const Userid = req.params.Userid;
    const id = req.params.id;

    if (!isValidObjectId(Userid)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid article ID format' });
    }

    ArticleModel.findOneAndUpdate({_id: id}, {
        user_id: Userid,
        titre: req.body.title,
        categorie: req.body.categorie,
        description: req.body.description,
        contenu: req.body.content
    }, { new: true, runValidators: true })
    .then(article => {
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/DelArticle/:id', (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid article ID format' });
    }

    ArticleModel.findOneAndDelete({_id: id})
        .then(article => {
            if (article) {
                res.json(article);
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
