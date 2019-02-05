var express = require('express');
var router = express.Router();

var room_controller = require('../controllers/roomController');

/// room ROUTES ///

// GET request for creating room. NOTE This must come before route for id (i.e. display room).
router.get('/create', room_controller.room_create_get);

// POST request for creating room.
router.post('/create', room_controller.room_create_post);

// POST request to delete room.
router.post('/:id/delete', room_controller.room_delete_post);

// GET request to update room.
router.get('/:id/update', room_controller.room_update_get);

// POST request to update room.
router.post('/:id/update', room_controller.room_update_post);

// GET request for one room.
router.get('/:id/detail', room_controller.room_detail);

// GET request for list of all rooms.
router.get('/list', room_controller.room_list);


module.exports = router;