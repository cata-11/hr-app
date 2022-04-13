const express = require('express');

const employeesController = require('../controllers/employees');

const router = express.Router();

router.get('/employees', employeesController.getEmployees);

router.post('/employee', employeesController.createEmployee);

router.delete('/employee/:id', employeesController.deleteEmployee);

router.put('/employee/:id', employeesController.editEmployee);

module.exports = router;
