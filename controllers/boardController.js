exports.board_get = function (req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');

    var getReservedRooms = function (reservedRooms) {
        res.render('board', {
            title: 'Board',
            isLogged: true, 
            employee: req.session.user, 
            rooms: reservedRooms });
        res.end();
    };

    dbContext.getReservedRooms(getReservedRooms);
};