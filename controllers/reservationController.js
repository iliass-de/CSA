// Display list of all reserves.
exports.reserve_list = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');

    var passReservedRooms = function (rooms) {
        res.render('reservation', {title: 'Reserved rooms', error: '', isLogged: true, rooms: rooms, employee: req.session.user});
        res.end();
    };
    dbContext.getReservedRooms(passReservedRooms);
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
    var getGuest = function (guest)
    {
        var getNotReservedRoom = function (rooms) {
            res.render('reservation', {
                title: 'Add a reservation',
                error: '',
                isLogged: true,
                employee: req.session.user,
                guest: guest,
                rooms: rooms
            });
            res.end();
        }
        dbContext.getNotReservedRooms(getNotReservedRoom);
    };
    dbContext.getGuestById(req.params.id, getGuest);
};

// Handle reserve create on POST.
exports.reserve_create_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    
    var dbContext = req.app.get('dbContext');
    dbContext.addReservation(req.params.id ,parseInt(req.body.room_id), req.body.check_in.toString(), req.body.check_out.toString());
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
    var dbContext = req.app.get('dbContext');
    dbContext.deleteReservation(req.params.id);
    res.redirect('/board');
    res.end();
};

// Display reserve update form on GET.
exports.reserve_update_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    var getGuest = function (guest)
    {
        var getNotReservedRoom = function (rooms) {
            res.render('updateReservation', {
                title: 'Update reservation',
                error: '',
                isLogged: true,
                employee: req.session.user,
                guest: guest,
                rooms: rooms
            });
            res.end();
        }
        dbContext.getNotReservedRooms(getNotReservedRoom);
    };
    dbContext.getGuestById(req.params.id, getGuest);
};

// Handle reserve update on POST.
exports.reserve_update_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    dbContext.editReservation(req.params.id, parseInt(req.body.room_id), req.body.check_in.toString(), req.body.check_out.toString());
    res.redirect('/board');
    res.end();
};