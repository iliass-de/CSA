var express = require('express');
var router = express.Router();

var employee_controller = require('../controllers/employeeController');

/// employee ROUTES ///

// GET request for creating employee. NOTE This must come before route for id (i.e. display employee).
router.get('/create', employee_controller.employee_create_get);

// POST request for creating employee.
router.post('/create', employee_controller.employee_create_post);

// POST request to delete employee.
router.post('/:id/delete', employee_controller.employee_delete_post);

// GET request to update employee.
router.get('/:id/update', employee_controller.employee_update_get);

// POST request to update employee.
router.post('/:id/update', employee_controller.employee_update_post);

// GET request for one employee.
router.get('/:id/detail', employee_controller.employee_detail);

// GET request for list of all employees.
router.get('/list', employee_controller.employee_list);

// GET request for updating employee password
router.get('/:id/update/password', employee_controller.employee_update_password_get);

// POST request for updating employee password.
router.post('/:id/update/password', employee_controller.employee_update_password_post);

// GET request for employee login
router.get('/login', employee_controller.employee_login_get);

// POST request for employee login
router.post('/login', employee_controller.employee_login_post);


module.exports = router;