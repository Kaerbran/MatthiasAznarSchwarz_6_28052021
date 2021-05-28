//Ici toutes nos routes pour les objects à vendre sur ce site. Donc en anglais, les 'choses' à vendre.
const express = require('express');
const router = express.Router();

//Importer les différents contolleurs, qui seront appellées par les routes ci-dessous
const stuffCtrl = require('../controllers/stuff');

//Importer le middleware pour les authentifications 
const auth = require('../middleware/auth');

//Importer le middleware pour la gestion des fichiers
const multer = require('../middleware/multer-config');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;