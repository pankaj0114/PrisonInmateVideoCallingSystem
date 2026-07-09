const express = require('express');
const router = express.Router();
const Prisoner = require('../models/Prisoner');
const prisonerController = require('../controllers/prisonerController');

router.post('/prisoner-login', prisonerController.loginPrisoner);

module.exports = router;
