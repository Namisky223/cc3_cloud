const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3145;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Article")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));

app.use('/', require('./Routes/ArticleRoute'));
app.use('/commentaire', require('./Routes/commentaireRoute'));
app.use('/votes', require('./Routes/VoteRoute'));

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})