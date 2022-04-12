const express = require('express');

const employeesController = require('../controllers/employees');

const router = express.Router();

router.get('/employees', employeesController.getEmployees);

router.post('/employee', employeesController.createEmployee);

module.exports = router;
