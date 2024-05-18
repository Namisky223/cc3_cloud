const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3004;
const ChatModel = require('./Models/chat');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Chat")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));

app.post('/:expediteur_id/:destinataire_id', (req, res)=>{
    const expediteur_id = req.params.expediteur_id;
    const destinataire_id = req.params.destinataire_id;

    ChatModel.create({
        expediteur_id: expediteur_id,
        destinataire_id: destinataire_id,
        message: req.body.message
    })
    .then(chat => res.json(chat))
    .catch(err => res.json(err))
});

app.get('/:expediteur_id/:destinataire_id', (req, res)=>{
    const expediteur_id = req.params.expediteur_id;
    const destinataire_id = req.params.destinataire_id;

    ChatModel.find({expediteur_id: expediteur_id, destinataire_id: destinataire_id})
    .then(chats => res.json(chats))
    .catch(err => res.json(err))
});

app.delete('/:expediteur_id/:destinataire_id', (req, res)=>{
    const expediteur_id = req.params.expediteur_id;
    const destinataire_id = req.params.destinataire_id;

    ChatModel.findByIdAndDelete({expediteur_id: expediteur_id, destinataire_id: destinataire_id})
    .then(chats => res.json(chats))
    .catch(err => res.json(err))
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})