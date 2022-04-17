const express = require('express');

const controller = require('../controllers/roles');

const isAdmin = require('../admin/admin');

const router = express.Router();

router.get('/roles', controller.get);

router.post('/role', isAdmin, controller.create);

router.delete('/role/:id', isAdmin, controller.delete);

router.put('/role/:id', isAdmin, controller.edit);

module.exports = router;
