//** Création des routes **//
const multer = require('multer');
const upload = multer();

const express = require('express');
const router  = express.Router();
const personnesController = require('../controllers/personnes');

router.get('/', personnesController.getAllPersonnes);
router.post('/', upload.none(), personnesController.newPersonnes);
router.delete('/', personnesController.deleteAllPersonnes);

router.get('/:mail', personnesController.getOnePersonnes);
router.post('/:mail', personnesController.newAge);
router.delete('/:mail', personnesController.deleteOnePersonnes);


module.exports = router;


//**************************//
