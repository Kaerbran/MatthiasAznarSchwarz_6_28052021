//Import du modèle de données Thing
const Sauce = require('../models/sauce');

//Import de la librarie node qui permet de gerer les documents 
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.thing);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
      sauce.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};

exports.getOneSauce = (req, res, next) => {

};

exports.modifySauce = (req, res, next) => {

};

exports.deleteSauce = (req, res, next) => {

};

exports.getAllSauce = (req, res, next) => {

};

exports.putLikeSauce = (req, res, next) => {

};