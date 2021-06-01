//Import du modèle de données Thing
const Sauce = require('../models/sauce');

//Import de la librarie node qui permet de gerer les documents 
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
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
    Sauce.findOne({_id: req.params.id})
    .then(
    (sauce) => {
        res.status(200).json(sauce);
    })
    .catch(
    (error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
            res.status(201).json({
            message: 'Sauce updated successfully!'
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

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
/*exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
  .then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};*/


exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(
        (sauce) => {
          res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    );
};

// corps de la demande : { userId: Chaîne,
//                       j'aime : Nombre }
///api/sauces/:id/like
exports.putLikeSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id 
    })
    .then(function (sauce) {
        const likedObject = JSON.parse(req.body);
        console.log(likedObject);
        const likeAction = likedObject.jaime;
        const likePerson = likedObject.userID;
        if (condition) {
            
        }
        if (condition) {
            
        } else {
            
        }

        return sauce;
        //res.status(200).json(sauce);

        }
    )
    .catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

    //si =1 => utilisateur aime la sauce
    // +ajouter nom au tableau
        //ne peut pas faire plusieurs fois la même action

    //si =0 => utilisateur annule son like ou dislike 
    // +retirer le nom des tableaux

    //si =-1 => utilisateur dislike
    // +ajouter nom au tableau
        //ne peut pas faire plusieurs fois la même action


};