const mongoose = require('mongoose');

const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://DBUserFull001:7I912lfH7so3Kn7u@gofullstack.54xuk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Importation des routes
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//Déclarer comment on souhaite utiliser ces API
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;