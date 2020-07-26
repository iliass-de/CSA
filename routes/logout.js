var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render('login', {title: 'Login', error: '', isLogged: false});
            res.end();
        }
    });
});

module.exports = router;
