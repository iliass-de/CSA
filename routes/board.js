var express = require('express');
var router = express.Router();


var board_controller = require('../controllers/boardController');

/// board ROUTES ///
// GET request board.
router.get('/', board_controller.board_get);



module.exports = router;