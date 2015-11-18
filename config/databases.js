"use strict";
// config/databases.js

var mongoose = require('mongoose'),
    props = require('./properties');


module.exports = function(fn) {

    var DB = {
        user: (props['ENV'] === "development" ? props.DEV.DB['user'] : props.PROD.DB['user'])
    }

    // mongoose connection options
    var options = {
        db: {
            native_parser: true
        },
        server: {
            poolSize: 8,
            auto_reconnect: true
        }
    };

    var conn1 = mongoose.createConnection(process.env.DB_URI || DB['user'], options);
    // CONNECTION EVENTS
    // When successfully connected
    conn1.on('connected', function() {
        console.log('DB> Mongoose "user" connection open to ' + DB['user']);
        if (fn) fn(mongoose); // callback
    });

    // If the connection throws an error
    conn1.on('error', function(err) {
        console.log('DB> Mongoose "user" connection error: ' + err);
    });

    // When the connection is disconnected
    conn1.on('disconnected', function() {
        console.log('DB> Mongoose "user" connection disconnected');
    });
    mongoose.set('user', conn1);

};