const express = require('express');
const {ajouterUtilisateur} = require('../controller/addUser');
const router = express.Router();

router.route('/utilisateurs').post(ajouterUtilisateur);

module.exports = router;