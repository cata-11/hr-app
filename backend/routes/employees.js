const express = require('express');

const controller = require('../controllers/employees');

const isAdmin = require('../auth/admin');

const router = express.Router();

router.get('/employees', controller.get);

router.post('/employee', isAdmin, controller.create);

router.delete('/employee/:id', isAdmin, controller.delete);

router.put('/employee/:id', isAdmin, controller.edit);

module.exports = router;
