"use strict";
// config/settings.js

var consolidate = require('consolidate'),
    i18n = require('i18n'),
    rollbar = require('rollbar');

var props = require('./properties');


module.exports = function(express, server, mongoose) {

    // ROLLBAR init
    var rollbar_options = {
        environment: props.ENV,
        handler: "setInterval",
        handlerInterval: 5,
        root: "roleswitch-landing/",
        branch: 'master'
    };
    rollbar.init(props.ROLLBAR.server, rollbar_options);


    server.configure(function() {

        // all environments
        server.use(express.compress());
        server.use(express.favicon("public/img/favicon.png"));
        server.use(express.cookieParser(props['SECRET']));
        server.use(express.json());
        server.use(express.urlencoded());
        server.use(express.methodOverride());
        server.use(express.session({
            store: new express.session.MemoryStore,
            secret: props['SECRET']
        }));


        // render engine
        server.set('views', 'views');
        server.set('view engine', 'html');
        server.engine('html', consolidate.swig);


        // development only
        if (props['ENV'] === "development") {
            // disable cache
            server.set('view cache', false);
            // log
            server.use(express.logger('dev'));
            // error handler
            server.use(express.errorHandler({
                dumpExceptions: true,
                showStack: true
            }));
            // front-end static
            server.use(express.static(props.DEV['STATIC']));
        }
        // production only
        else {
            // Use the rollbar error handler to send exceptions to your rollbar account
            server.use(rollbar.errorHandler(props.ROLLBAR.server, rollbar_options));
            // error handler
            server.use(function(err, req, res, next) {
                if (err) console.log(err);
                res.redirect('/500');
            });
            // catch the uncaught errors that weren't wrapped in a domain or try catch statement
            process.on('uncaughtException', function(err) {
                // handle the error safely
                console.log(err);
                rollbar.reportMessage(JSON.stringify(err));
            });
            // front-end static
            server.use(express.static(props.PROD['STATIC'], {
                maxAge: 3 * 86400000 // 3*oneDay
            }));
        }

        // i18n locales module
        i18n.configure({
            locales: ['en', 'fr', 'ar'],
            directory: __dirname + '/locales',
            defaultLocale: 'en',
            cookie: 'lang'
        });
        // i18n init parses req for language headers, cookies, etc.
        server.use(i18n.init);

        // routes
        server.use(server.router);
    });

    // On app exit
    process.on('SIGINT', function() {
        rollbar.shutdown();
        mongoose.get('user').close(function() {
            console.log("SERVER> process exit.");
            process.exit(0);
        });
    });

    // global properties
    server.set('port', props['PORT']);
};