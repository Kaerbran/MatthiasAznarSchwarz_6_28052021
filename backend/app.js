const express = require('express');
const app = express();

//Importation des routes
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//Déclarer comment on souhaite utiliser ces API
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;