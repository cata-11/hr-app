const express = require('express');

const controller = require('../controllers/teams');

const isAdmin = require('../auth/admin');

const router = express.Router();

router.get('/teams', controller.get);

router.post('/team', isAdmin, controller.create);

router.delete('/team/:id', isAdmin, controller.delete);

router.put('/team/:id', isAdmin, controller.edit);

module.exports = router;
