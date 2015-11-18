"use strict";
// server.js

// Set up server modules
var http = require('http'),
    express = require('express'),
    server = express();


require('./config/databases')( // connect to database
    function(mongoose) {
        // server settings
        require('./config/settings')(express, server, mongoose);
        // app controller
        var ctrl = new require('./app/app')(mongoose);
        // routes
        require('./config/routes')(server, ctrl);

        // Start server
        server.listen(server.get('port'), function() {
            console.log('SERVER> listening on port ' + server.get('port'));
        });
    }
);