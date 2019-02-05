

// Display list of all reserves.
exports.reserve_list = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');
    var getEmployee = function (employee) {

        var passReservedRooms = function (rooms) {
            res.render('reservation', {title: 'Reserved rooms', error: '', isLogged: true, rooms: rooms, employee: employee});
            res.end();
        };
        dbContext.getReservedRooms(passReservedRooms);
    };

    dbContext.getEmployeeByEmail(req.session.email, getEmployee);
};

// Display detail page for a specific reserve.
exports.reserve_detail = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: reserve detail: ' + req.params.id);
};

// Display reserve create form on GET.
exports.reserve_create_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');
    var getEmployee = function (employee) {

        var getGuest = function (guest)
        {
            var getNotReservedRoom = function (rooms) {
                res.render('reservation', {
                    title: 'Add a reservation',
                    error: '',
                    isLogged: true,
                    employee: employee,
                    guest: guest,
                    rooms: rooms
                });
                res.end();
            }
            dbContext.getNotReservedRooms(getNotReservedRoom);
        };
        dbContext.getGuestById(req.params.id, getGuest);
    };

    dbContext.getEmployeeByEmail(req.session.email, getEmployee);
};

// Handle reserve create on POST.
exports.reserve_create_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');
    dbContext.addReservation(req.params.id ,parseInt(req.body.room_id));
    res.redirect('/guest/list');
    res.end();
};

// Display reserve delete form on GET.
exports.reserve_delete_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: reserve delete GET');
};

// Handle reserve delete on POST.
exports.reserve_delete_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: reserve delete POST');
};

// Display reserve update form on GET.
exports.reserve_update_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: reserve update GET');
};

// Handle reserve update on POST.
exports.reserve_update_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: reserve update POST');
};