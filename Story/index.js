const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3012;
const StoryModel = require('./Models/story');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Stories")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));

app.get('/toutes_les_stories', (req, res)=>{
    StoryModel.find({})
    .then(stories => res.json(stories))
    .catch(err => res.json(err))
});

app.get('/Story_par_id/:id', (req, res)=>{
    const id = req.params.id;

    StoryModel.findOne({_id: id})
    .then(story => res.json(story))
    .catch(err => res.json(err));
});



app.post('/addStory', (req, res)=>{
    StoryModel.create({
        contenu: req.body.content
    })
    .then(story => res.json(story))
    .catch(err => res.json(err));
});

app.delete('/:id', (req, res)=>{
    const id = req.params.id;

    StoryModel.findOneAndDelete({_id: id})
    .then(story => res.json(story))
    .catch(err => res.json(err));
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})