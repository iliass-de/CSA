var express = require('express');
var router = express.Router();

var reserve_controller = require('../controllers/reservationController');

/// reserve ROUTES ///

// GET request for creating reserve. NOTE This must come before route for id (i.e. display reserve).
router.get('/create/:id', reserve_controller.reserve_create_get);

// POST request for creating reserve.
router.post('/create/:id', reserve_controller.reserve_create_post);

// POST request to delete reserve.
router.post('/:id/delete', reserve_controller.reserve_delete_post);

// GET request to update reserve.
router.get('/:id/update', reserve_controller.reserve_update_get);

// POST request to update reserve.
router.post('/:id/update', reserve_controller.reserve_update_post);

// GET request for one reserve.
router.get('/:id/detail', reserve_controller.reserve_detail);

// GET request for list of all reserves.
router.get('/list', reserve_controller.reserve_list);


module.exports = router;