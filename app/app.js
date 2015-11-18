"use strict";

module.exports = function(mongoose) {

    // Models
    var User = require('./models/user')(mongoose);

    return {

        joinUser: function(req, done) { /*Temporary to join users to beta*/
            var email = req.body.email.toLowerCase();

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                'local.email': email
            }, function(err, user) {
                // if there are any errors, return the error
                if (err) return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, 'Seems like this email is already registered..');
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = "*";

                    // save the user
                    newUser.save(function(err, user) {
                        if (err) return done(err);
                        console.log("AUTH> User subscribed: " + user.id);
                        return done(null, newUser);
                    });
                }
            });

        } //end joinUser

    } //end return
};