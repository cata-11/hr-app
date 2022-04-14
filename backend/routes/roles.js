const express = require('express');

const controller = require('../controllers/roles');

const router = express.Router();

router.get('/roles', controller.get);

router.post('/role', controller.create);

router.delete('/role/:id', controller.delete);

router.put('/role/:id', controller.edit);

module.exports = router;
