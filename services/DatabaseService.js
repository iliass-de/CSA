"use strict";


function DatabaseService() {

    const sqlite3 = require('sqlite3').verbose();
    var fs = require('fs');
    var file = './services/hotel_database.db';
    var exists = fs.existsSync(file);

    if(!exists){
        console.log('Creating DB file');
        fs.openSync(file,'w')
        fs.chmodSync(file, '777');
    }

    // open the database
    this.dbContext = new sqlite3.Database(file, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the hotel management database.');
    });
    if(!exists) {
        this.createEmployeeTable();
        this.createGuestTable();
        this.createRoomTypeTable();
        this.createRoomTable();
        this.createReservationTable();
    }
}

DatabaseService.prototype.getAllEmployees = function(callback){

    const sql = `SELECT * FROM Employee`;

    this.dbContext.all(sql, [], (err,rows) => {
        if(err)
            console.log(err.message);

        callback(rows);
    });
};

DatabaseService.prototype.getEmployeeById = function(id, callback){
    const sql = 'SELECT * FROM Employee WHERE id = ?;';

    // first row only
    this.dbContext.get(sql, [id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        callback(row);
    });
};

DatabaseService.prototype.getEmployeeByEmail = function(email, callback){
    const sql = 'SELECT * FROM Employee WHERE email = ?;';

    // first row only
    this.dbContext.get(sql, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        callback(row);
    });
};

DatabaseService.prototype.checkEmployeeByEmail = function(email, callback){
    const sql = 'SELECT * FROM Employee WHERE email = ?;';

    // first row only
    this.dbContext.get(sql, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        const EmployeeExists = row && row.email;
        callback(EmployeeExists);
    });
};

DatabaseService.prototype.createEmployeeTable = function(){

    const sql = 'CREATE TABLE IF NOT EXISTS Employee ( id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'isAdmin INTEGER DEFAULT 0,' +
        'first_name TEXT NOT NULL,' +
        'last_name TEXT NOT NULL,' +
        'hash_value TEXT NOT NULL,' +
        'salt TEXT NOT NULL,' +
        'email TEXT NOT NULL,' +
        'phone TEXT );';
    this._executeSqlStatement(sql, 'Employee table created');
};

DatabaseService.prototype.dropTable = function(tableName){
    const sql = 'DROP TABLE ' + tableName + ' IF EXISTS;';

    this._executeSqlStatement(sql, tableName + " droped");
};




DatabaseService.prototype.addNewEmployee = function(postBody, passwordData)
{



    const self = this;
    const sql = `INSERT INTO Employee (isAdmin, first_name, last_name, hash_value, salt, email, phone) VALUES ( 
                                    ?, ?, ?, ?, ?, ?, ?);`;

    this.dbContext.serialize(function() {

        const stmt = self.dbContext.prepare(sql);

        stmt.run(postBody.checkboxAdmin, postBody.firstName, postBody.lastName, passwordData.passwordHash, passwordData.salt, postBody.email, postBody.phone);

        stmt.finalize();
    });
};

DatabaseService.prototype.updateEmployee = function(postBody, employeeId)
{
    const self = this;
    const sql = `UPDATE Employee SET isAdmin=?, first_name=?, last_name=?, email=?, phone=? WHERE id=?;`;

    this.dbContext.serialize(function() {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(postBody.checkboxAdmin, postBody.firstName, postBody.lastName,
            postBody.email, postBody.phone, employeeId);

        stmt.finalize();
    });
};

DatabaseService.prototype.updateEmployeePassword = function (employeeId, passData) {

    const self = this;
    const sql = `UPDATE Employee SET hash_value=?, salt=? WHERE id=?;`;

    this.dbContext.serialize(function() {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(passData.passwordHash, passData.salt, employeeId);

        stmt.finalize();
    });
};

DatabaseService.prototype.deleteEmployee = function (employeeId) {
    const self = this;
    const sql = `DELETE FROM Employee WHERE id=?;`;

    this.dbContext.serialize(function() {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(employeeId);

        stmt.finalize();
    });
};

DatabaseService.prototype._executeSqlStatement = function(sql, message){

        this.dbContext.run(sql, function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(message);
        }
    );
};


// --------------------------------------------------------------- Room database service



DatabaseService.prototype.createRoomTypeTable = function(){

    const sql = 'CREATE TABLE IF NOT EXISTS RoomType ( id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'room_type TEXT NOT NULL );';
    const self = this;
    self.dbContext.serialize(function() {
        self.dbContext.run(sql);

        var stmt = self.dbContext.prepare("INSERT INTO RoomType (room_type) VALUES (?)");
        var room_types = ['Suite', 'Standard', 'Single', 'Double', 'Triple', 'King', 'Twin', 'Apartment', 'President Suite'];
        for (var i = 0; i < room_types.length; i++) {
            stmt.run(room_types[i]);
        }

        stmt.finalize();
    });
    // this._executeSqlStatement(sql, 'Room type table created');
};

DatabaseService.prototype.createRoomTable = function(){

    const sql = 'CREATE TABLE IF NOT EXISTS Room ( id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'room_type_id INTEGER NOT NULL,' +
        'room_number TEXT NOT NULL );';

    const self = this;
    self.dbContext.serialize(function() {
        self.dbContext.run(sql);

        var stmt = self.dbContext.prepare("INSERT INTO Room (room_type_id, room_number) VALUES (?, ?)");

        for (var i = 0; i < 5; i++) {
            var d = i + 1;
            stmt.run(1, 'A' + d);
        }

        stmt.run(0, 'C' + 1);
        stmt.run(2, 'B' + 1);
        stmt.run(2, 'B' + 2);
        stmt.run(2, 'B' + 3);
        stmt.run(2, 'B' + 4);
        stmt.run(2, 'B' + 5);
        stmt.run(3, 'C' + 2);
        stmt.run(4, 'D' + 1);
        stmt.finalize();
    });
    // this._executeSqlStatement(sql, 'Room table created');
};

DatabaseService.prototype.getAllRooms = function(callback){

    const sql = `SELECT Room.id as room_id, room_type, room_number FROM Room INNER JOIN RoomType ON RoomType.id = Room.room_type_id;`;

    this.dbContext.all(sql, [], (err,rows) => {
        if(err)
            console.log(err.message);

        callback(rows);
    });
};

DatabaseService.prototype.getAllRoomTypes = function(callback){

    const sql = `SELECT * FROM RoomType;`;

    this.dbContext.all(sql, [], (err,rows) => {
        if(err)
            console.log(err.message);

        callback(rows);
    });
};

DatabaseService.prototype.deleteRoom = function (roomId) {
    const self = this;
    const sql = `DELETE FROM Room WHERE id=?;`;

    this.dbContext.serialize(function() {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(roomId);

        stmt.finalize();
    });
};

DatabaseService.prototype.addNewRoom = function(postBody)
{
    const self = this;
    const sql = `INSERT INTO Room (room_number, room_type_id) VALUES ( 
                                    ?, ?);`;

    this.dbContext.serialize(function() {

        const stmt = self.dbContext.prepare(sql);

        stmt.run(postBody.roomNumber, parseInt(postBody.roomType));

        stmt.finalize();
    });
};

DatabaseService.prototype.getRoomById = function(id, callback){
    const sql = 'SELECT * FROM Room WHERE id = ?;';

    // first row only
    this.dbContext.get(sql, [id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        callback(row);
    });
};

DatabaseService.prototype.updateRoom = function(postBody, roomId) {
    const self = this;
    const sql = `UPDATE Room SET room_number=?, room_type_id=? WHERE id=?;`;

    this.dbContext.serialize(function () {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(postBody.roomNumber, parseInt(postBody.roomType), roomId);

        stmt.finalize();
    });
};

// --------------------------------------------------------------- Guest database service

DatabaseService.prototype.getAllGuests = function(callback){

    const sql = `SELECT * FROM Guest`;

    this.dbContext.all(sql, [], (err,rows) => {
        if(err)
            console.log(err.message);

        callback(rows);
    });
};

DatabaseService.prototype.createGuestTable = function(){

    const sql = 'CREATE TABLE IF NOT EXISTS Guest ( id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'first_name TEXT NOT NULL,' +
        'last_name TEXT NOT NULL,' +
        'email TEXT NOT NULL,' +
        'phone TEXT );';
    this._executeSqlStatement(sql, 'Guest table created');
};

DatabaseService.prototype.addNewGuest = function(postBody)
{
    const self = this;
    const sql = `INSERT INTO Guest (first_name, last_name, email, phone) VALUES ( 
                                    ?, ?, ?, ?);`;

    this.dbContext.serialize(function() {

        const stmt = self.dbContext.prepare(sql);

        stmt.run(postBody.firstName, postBody.lastName, postBody.email, postBody.phone);

        stmt.finalize();
    });
};

DatabaseService.prototype.deleteGuest = function (guestId) {
    const self = this;
    const sql = `DELETE FROM Guest WHERE id=?;`;

    this.dbContext.serialize(function() {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(guestId);

        stmt.finalize();
    });
};

DatabaseService.prototype.updateGuest = function(postBody, guestId) {
    const self = this;

    const sql = `UPDATE Guest SET first_name=?, last_name=?, email=?, phone=? WHERE id=?;`;

    this.dbContext.serialize(function () {
        const stmt = self.dbContext.prepare(sql);

        stmt.run(postBody.firstName, postBody.lastName, postBody.email, postBody.phone, guestId);

        stmt.finalize();
    });
};

DatabaseService.prototype.getGuestById = function(id, callback){
    const sql = 'SELECT * FROM Guest WHERE id = ?;';

    // first row only
    this.dbContext.get(sql, [id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        callback(row);
    });
};

// --------------------------------------------------------------- Reservation database service

DatabaseService.prototype.createReservationTable = function(){

    const sql = 'CREATE TABLE IF NOT EXISTS Reservation ( id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'guest_id INTEGER NOT NULL, ' +
        'room_id INTEGER NOT NULL );';

    this._executeSqlStatement(sql, 'Reservation table created');
};

DatabaseService.prototype.getReservedRooms = function (callback) {

    const sql = `SELECT * 
                    FROM Guest INNER JOIN Reservation ON Guest.id = Reservation.guest_id
                     INNER JOIN Room ON Room.id = Reservation.room_id;`;

    this.dbContext.all(sql, [], (err,rows) => {
        if(err)
            console.log(err.message);

        callback(rows);
    });
};

DatabaseService.prototype.getNotReservedRooms = function (callback) {

    const sql = `SELECT * 
                    FROM Room
                    LEFT JOIN Reservation 
                    ON Room.id = Reservation.room_id
                    INNER JOIN RoomType ON Room.room_type_id = RoomType.id
                    WHERE Reservation.room_id IS NULL;`;

    this.dbContext.all(sql, [], (err,rows) => {
        if(err)
            console.log(err.message);

        callback(rows);
    });
};

DatabaseService.prototype.addReservation = function(guestId , roomId) {
    const self = this;
    const sql = `INSERT INTO Reservation (guest_id, room_id) VALUES ( 
                                    ?, ?);`;

    this.dbContext.serialize(function() {
        const stmt = self.dbContext.prepare(sql);
        stmt.run(guestId, roomId);
        stmt.finalize();
    });
};

module.exports = DatabaseService;