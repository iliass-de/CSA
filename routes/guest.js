var express = require('express');
var router = express.Router();

var guest_controller = require('../controllers/guestController');

/// guest ROUTES ///

// GET request for creating guest. NOTE This must come before route for id (i.e. display guest).
router.get('/create', guest_controller.guest_create_get);

// POST request for creating guest.
router.post('/create', guest_controller.guest_create_post);

// GET request to delete guest.
router.get('/:id/delete', guest_controller.guest_delete_get);

// POST request to delete guest.
router.post('/:id/delete', guest_controller.guest_delete_post);

// GET request to update guest.
router.get('/:id/update', guest_controller.guest_update_get);

// POST request to update guest.
router.post('/:id/update', guest_controller.guest_update_post);

// GET request for one guest.
router.get('/:id/detail', guest_controller.guest_detail);

// GET request for list of all guests.
router.get('/list', guest_controller.guest_list);

module.exports = router;