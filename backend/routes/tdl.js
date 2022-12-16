//** Création des routes **//
const multer = require('multer');
const upload = multer();

const express = require('express');
const router  = express.Router();
const tdlController = require('../controllers/tdl');

router.get('/', tdlController.getAllTdl);
router.put('/', upload.none(), tdlController.newTdl);

router.get('/:_id', tdlController.getOneTdl);
router.delete('/:_id', tdlController.deleteOneTdl);

router.put('/:_id', upload.none(), tdlController.updateTdl);


module.exports = router;


//**************************//
