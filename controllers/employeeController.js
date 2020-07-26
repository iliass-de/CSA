// Display list of all employees.
exports.employee_list = function(req, res) {

    var dbContext = req.app.get('dbContext');
    
    // var encryptionService = req.app.get('encryptionService');
    // var passwordData = encryptionService.getSaltHashPassword('demo');
    // var user = { isAdmin: 1 , lastName: 'Mustermanne', firstName: 'Max', phone: 08836822, addNewEmployee: 1, email: 'admin@hotel.de'};
    // dbContext.addNewEmployee(user, passwordData);

    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    if (req.session.user.isAdmin === 1) {
        var passEmployees = function (employees) {
            res.render('employees', {title: 'Employees', error: '', isLogged: true, employees: employees, employee: req.session.user});
            res.end();
        };
        dbContext.getAllEmployees(passEmployees);
    }else {
        res.render('board', {title: 'LHSBikeshed Booking system', isLogged: true, employee: req.session.user, rooms: {} });
        res.end();
    }
};

// Display detail page for a specific employee.
exports.employee_detail = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var passEmployeeDetail = function (employee) {
        res.render('profile', {title: 'Profile', error: '', isLogged: true, employee: employee});
        res.end();
    };
    var dbContext = req.app.get('dbContext');
    dbContext.getEmployeeById(req.params.id, passEmployeeDetail);
};

// Display employee create form on GET.
exports.employee_create_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    
    res.render('add_employee', {title: 'Add new Employee', error: '', isLogged: true, employee: req.session.user });
    res.end();
};

// Handle employee create on POST.
exports.employee_create_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid ){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    if(!req.body.password || req.body.password.length <= 0){
        res.render('employee', { title: 'Employees', error: 'The password is empty.', isLogged: false });
        res.end();
    }else if(req.body.password !== req.body.password_r){
        res.render('employee', { title: 'Employees', error: 'Password und wiederholtes password stimmmen nicht überein.', isLogged: false });
        res.end();
    }else {
        var dbContext = req.app.get('dbContext');
        var encryptionService = req.app.get('encryptionService');
        var passwordData = encryptionService.getSaltHashPassword(req.body.password);

        var checkemployee = function (userExists) {
            if (userExists) {
                res.render('employee', {
                    title: 'Employees',
                    error: 'User with the email already exists.',
                    isLogged: false
                });
                res.end()
            } else {
                req.body.isAdmin = req.body.isAdmin && req.body.isAdmin === 'on' ? 1 : 0;


                dbContext.addNewEmployee(req.body, passwordData);
                res.redirect('/employee/list');
                res.end();
            }
        };

        dbContext.checkEmployeeByEmail(req.body.email, checkemployee);
    } 
};

// Handle employee delete on POST.
exports.employee_delete_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    var dbContext = req.app.get('dbContext');
    console.info(req.params.id);
    dbContext.deleteEmployee(req.params.id);
    var passEmployees = function (employees) {
        res.render('employees', {title: 'Employees', error: '', isLogged: true, employees: employees, employee: req.session.user});
        res.end();
    };

    dbContext.getAllEmployees(passEmployees);
};

// Display employee delete form on GET.
exports.employee_update_password_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    
    res.render('change_password', {title: 'Change password', isLogged: true, error: '', employee: req.session.user });
    res.end();
};

// Handle employee delete on POST.
exports.employee_update_password_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    if(!req.body.password || req.body.password.length <= 0){
        res.render('employee', { title: 'Employees', error: 'The password is empty.', isLogged: false });
        res.end();
    }else if(req.body.new_password !== req.body.password_r){
        res.render('employee', { title: 'Employees', error: 'Password und wiederholtes password stimmmen nicht überein.', isLogged: false });
        res.end();
    }else {
        console.info(req.body.password_r);
        var encryptionService = req.app.get('encryptionService');
        var passwordData = encryptionService.getSaltHashPassword(req.body.password_r);

        var dbContext = req.app.get('dbContext');
        dbContext.updateEmployeePassword(req.params.id, passwordData);
        res.render('profile', {title: 'Profile', error: '', isLogged: true, employee: req.session.user});
        res.end();
    }
};

// Display employee update form on GET.
exports.employee_update_get = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }

    res.render('employee', {title: 'Edit employee', error: '', isLogged: true, employee: req.session.user});
};

// Handle employee update on POST.
exports.employee_update_post = function(req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.redirect('/employee/login');
        res.end();
        return;
    }
    var dbContext = req.app.get('dbContext');
    if(req.body.isAdmin)
        req.body.isAdmin = req.body.isAdmin === 'on' ? 1 : 0;

    dbContext.updateEmployee(req.body, req.params.id);

    res.redirect('/employee/list');
    res.end();
};

exports.employee_login_get = function (req, res) {
    if (!req.session.email || !req.cookies.user_sid){
        res.render('login', {title: 'Login', error: '', isLogged: false });

        res.end();
        return;
    }
    
    res.render('board', {title: 'Board', isLogged: true, employee: req.session.user });
    res.end();
    // var getEmployee = function (employee) {
    //     res.render('board', {title: 'LHSBikeshed Booking system', isLogged: true, employee: employee });
    //     res.end();
    // };
    // var dbContext = req.app.get('dbContext');
    // dbContext.getEmployeeByEmail(req.session.email, getEmployee);
};

exports.employee_login_post = function (req, res) {
    var dbContext = req.app.get('dbContext');
    var encryption = req.app.get('encryptionService');
    var err= 'password not correct';
    var checkLogin = function(user){
        if(user && user.email){
            var passData = encryption.sha512(req.body.password, user.salt);
            if(user.hash_value !== passData.passwordHash){
                
                res.render('login', {title: 'Login', error: 'Email or Password are false', isLogged: false});
               // res.redirect('/employee/login');
                res.end();
            }else{
                // Very basic. Set the session e-mail to whatever the user has added.

                req.session.email = req.body.email;
                req.session.user = user;
                res.redirect('/board');
                res.end();
            }
        }else{
           
            res.render('login', {title: 'Login', error: 'Email or Password are false', isLogged: false});
            res.end();
        }
    };

    dbContext.getEmployeeByEmail(req.body.email, checkLogin);
};

