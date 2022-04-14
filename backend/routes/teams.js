const express = require('express');

const controller = require('../controllers/teams');

const router = express.Router();

router.get('/teams', controller.get);

router.post('/team', controller.create);

router.delete('/team/:id', controller.delete);

router.put('/team/:id', controller.edit);

module.exports = router;
