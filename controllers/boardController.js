
exports.board_get = function (req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');

    var getEmployee = function (employee) {
        var getReservedRooms = function (reservedRooms) {
            res.render('board', {title: 'LHSBikeshed Booking system', isLogged: true, employee: employee, rooms: reservedRooms });
            res.end();
        };

        dbContext.getReservedRooms(getReservedRooms);
    };

    dbContext.getEmployeeByEmail(req.session.email, getEmployee);
};