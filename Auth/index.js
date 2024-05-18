const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4145;
const UserModel = require('./Models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ProAuth")
.then(() => {
    console.log('Database is connected')
})
.catch( err => console.log(err));


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})

app.post('/register', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email, login: req.body.login });

        if (user) {
            return res.json({ message: 'L\'utilisateur existe déjà!' });
        }

        const hashPass = await bcrypt.hash(req.body.mdp, 10);

        const newUser = await UserModel.create({
            nom: req.body.nom,
            email: req.body.email,
            login: req.body.login,
            mdp: hashPass
        });

        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur inconnu' });
        }

        const passwordMatch = await bcrypt.compare(req.body.mdp, user.mdp);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, 'secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

