//Import of Mongoose Library
const mongoose = require('mongoose');

//npm Library 'Express rate limiter'
const rateLimiter = require('./middleware/rate-limiter');

//npm Library 'helmet'
const helmet = require('helmet');

//Importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');

// load dotenv to read .env and set env variables when app starts
//{path: path/filemane} -> peut être rajouté dans config(), si le nom et le chemin n'est pas standard
require('dotenv').config();

//importation pour 'multer', afin d'acceder au path du server
const path = require('path');

const express = require('express');

mongoose.connect(`mongodb+srv://${process.env.DB_USER_E}:${process.env.DB_PASS_E}@${process.env.DB_HOST_E}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
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

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images'))); //pour 'multer'

app.use("/api/", rateLimiter.apiLimiter);

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;