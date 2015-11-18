"use strict";
// config/routes.js

var props = require('./properties');


module.exports = function(server, ctrl) {

    // Root
    server.get('/', function(req, res) {
        res.render('index', {
            env: props['ENV']
        });
    });

    // Errors
    server.get('/500', function(req, res) {
        res.status(500);
        res.render('500', {
            env: props['ENV']
        });
    });
    server.get('/404', function(req, res) {
        res.status(404);
        res.render('404', {
            env: props['ENV']
        });
    });


    // =================================================
    // JOIN ===============================
    server.post('/join', function(req, res, next) {
        ctrl.joinUser(req, function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
                res.status(500);
                return res.json({
                    ok: false,
                    message: info
                });
            }

            //SUCCESS
            return res.json({
                ok: true,
                message: info
            });
        });
    });

    // =================================================
    // Wildcard Route
    server.get('/*', function(req, res, next) {

        res.status(404);
        res.format({
            'text/plain': function() {
                res.send('404 NOT FOUND!');
            },

            'text/html': function() {
                res.redirect('/404');
            },

            'application/json': function() {
                res.json(undefined);
            }
        });
    });

};