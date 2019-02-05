
// Display list of all rooms.
exports.room_list = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    var getCurrentEmployee = function (employee) {
        var passRooms = function (rooms) {
            res.render('rooms', {title: 'Rooms', isLogged: true, error: '', rooms: rooms, employee: employee });
            res.end();
        };
        dbContext.getAllRooms(passRooms);
    };

    dbContext.getEmployeeByEmail(req.session.email, getCurrentEmployee);
};

// Display detail page for a specific room.
exports.room_detail = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: room detail: ' + req.params.id);
};

// Display room create form on GET.
exports.room_create_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    var getEmployee = function (employee) {

        var getRoomTypes = function (roomTypes) {
            res.render('add_room', {title: 'Add new room', error: '', isLogged: true, employee: employee, room: {}, room_types: roomTypes});
            res.end();
        };

        dbContext.getAllRoomTypes(getRoomTypes);
    };

    dbContext.getEmployeeByEmail(req.session.email, getEmployee);
};

// Handle room create on POST.
exports.room_create_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');

    dbContext.addNewRoom(req.body);
    res.redirect('/room/list');
    res.end();

};

// Handle room delete on POST.
exports.room_delete_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');

    dbContext.deleteRoom(req.params.id);

    res.redirect('/room/list');
    res.end();
};

// Display room update form on GET.
exports.room_update_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    var getEmployee = function (employee) {

        var getRoomTypes = function (roomTypes) {
            var getRoom = function (room)
            {
                res.render('room', {
                    title: 'Add new room',
                    error: '',
                    isLogged: true,
                    employee: employee,
                    room: room,
                    room_types: roomTypes
                });
                res.end();
            }
            dbContext.getRoomById(req.params.id, getRoom)
        };

        dbContext.getAllRoomTypes(getRoomTypes);
    };

    dbContext.getEmployeeByEmail(req.session.email, getEmployee);
};

// Handle room update on POST.
exports.room_update_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    dbContext.updateRoom(req.body, req.params.id);

    res.redirect('/room/list');
    res.end();
};