const mongoose = require('mongoose');

//Importation des routes
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');

//importation pour 'multer', afin d'acceder au path du server
const path = require('path');

const express = require('express');

mongoose.connect('mongodb+srv://DBUserFull001:7I912lfH7so3Kn7u@gofullstack.54xuk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//CROS resolved : permet de donner acces à notre serveur pour tous les origines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Déclarer comment on souhaite utiliser ces API
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); //pour 'multer'

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;