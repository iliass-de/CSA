var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if (!req.session.email || !req.cookies.user_sid){
    res.render('home', {title: 'Home', error: '', isLogged: false });
    res.end();
    return;
  }
  var dbContext = req.app.get('dbContext');

  var getEmployee = function (employee) {
    res.render('board', {title: 'LHSBikeshed Booking system', isLogged: true, employee: employee });
    res.end();
  };

  dbContext.getEmployeeByEmail(req.session.email, getEmployee);
});

module.exports = router;
