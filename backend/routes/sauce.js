//Ici toutes nos routes pour les objects à vendre sur ce site. Donc en anglais, les 'choses' à vendre.
const express = require('express');
const router = express.Router();

//Importer les différents contolleurs, qui seront appellées par les routes ci-dessous
const sauceCtrl = require('../controllers/sauce');

//Importer le middleware pour les authentifications 
const auth = require('../middleware/auth');

//Importer le middleware pour la gestion des fichiers
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce); 
router.post('/:id/like', auth, sauceCtrl.putLikeSauce); 

module.exports = router;