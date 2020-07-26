// Display list of all guests.
exports.guest_list = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    var passGuests = function (guests) {
        res.render('guests', {title: 'Reservation', error: '', isLogged: true, guests: guests, employee: req.session.user});
        res.end();
    };
    dbContext.getAllGuests(passGuests);
};

// Display detail page for a specific guest.
exports.guest_detail = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: guest detail: ' + req.params.id);
};

// Display guest create form on GET.
exports.guest_create_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    res.render('add_guest', {title: 'Add new guest', error: '', isLogged: true, employee: req.session.user, guest: {} });
    res.end();
};

// Handle guest create on POST.
exports.guest_create_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');

    dbContext.addNewGuest(req.body);
    res.redirect('/guest/list');
    res.end();
};

// Display guest delete form on GET.
exports.guest_delete_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    res.send('NOT IMPLEMENTED: guest delete GET');
};

// Handle guest delete on POST.
exports.guest_delete_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');

    dbContext.deleteGuest(req.params.id);

    res.redirect('/guest/list');
    res.end();
};

// Display guest update form on GET.
exports.guest_update_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');
    
    var getGuest = function (guest)
    {
        res.render('guest', {
            title: 'Edit the guest information',
            error: '',
            isLogged: true,
            employee: req.session.user,
            guest: guest
        });
        res.end();
    };
    dbContext.getGuestById(req.params.id, getGuest);
};

// Handle guest update on POST.
exports.guest_update_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');
    dbContext.updateGuest(req.body, req.params.id);

    res.redirect('/guest/list');
    res.end();
};