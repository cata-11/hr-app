const express = require('express');

const controller = require('../controllers/employees');

const router = express.Router();

router.get('/employees', controller.get);

router.post('/employee', controller.create);

router.delete('/employee/:id', controller.delete);

router.put('/employee/:id', controller.edit);

module.exports = router;
