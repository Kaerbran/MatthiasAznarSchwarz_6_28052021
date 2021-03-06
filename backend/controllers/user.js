//Import du modèle de données User
const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateSchema = require('../models/password');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => { 
        if (validateSchema.validate(req.body.password)) {
          const user = new User({
            email: req.body.email.toString().toLowerCase(), 
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        } else {
          res.status(400).json(validateSchema.validate(req.body.password, { list: true }))
        }        
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email.toString().toLowerCase() })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };