var express = require('express');
var router = express.Router();


var board_controller = require('../controllers/boardController');

/// board ROUTES ///
// GET request board.
router.get('/', board_controller.board_get);

// // GET request for creating board. NOTE This must come before route for id (i.e. display board).
// router.get('/create', board_controller.board_create_get);
//
// // POST request for creating board.
// router.post('/create', board_controller.board_create_post);
//
// // POST request to delete board.
// router.post('/:id/delete', board_controller.board_delete_post);
//
// // GET request to update board.
// router.get('/:id/update', board_controller.board_update_get);
//
// // POST request to update board.
// router.post('/:id/update', board_controller.board_update_post);
//
// // GET request for one board.
// router.get('/:id/detail', board_controller.board_detail);
//
// // GET request for updating board password
// router.get('/:id/update/password', board_controller.board_update_password_get);
//
// // POST request for updating board password.
// router.post('/:id/update/password', board_controller.board_update_password_post);
//
// // GET request for board login
// router.get('/login', board_controller.board_login_get);
//
// // POST request for board login
// router.post('/login', board_controller.board_login_post);

module.exports = router;