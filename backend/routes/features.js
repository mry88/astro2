const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

router.post('/create', featureController.createFeature);

module.exports = router;