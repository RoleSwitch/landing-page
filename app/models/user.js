"use strict";
// app/models/user.js

var props = {
    database: 'user',
    collection: 'accounts',
    model: 'User'
};

module.exports = function(mongoose) {
    var db = mongoose.get(props.database);

    var userSchema = mongoose.Schema({

        local: {
            // username + email are automatically filled from other signup methods
            username: {
                type: String,
                lowercase: true,
                trim: true
            },
            email: String,
            password: { // 3-level crypted password for maximum security (client>passport>mongoose)
                type: String,
                default: "" // empty passwords can be set in account page
            }
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        google: {
            id: String,
            token: String,
            email: String,
            name: String
        },


        // Account type: regular user, premium user or admin
        type: {
            type: String,
            default: 'beta'
        },

        // Date of user model creation
        joinDate: {
            type: Date,
            default: Date.now
        },
        // Date of last time user logged-in
        lastLogged: {
            type: Date,
            default: null
        }

    }, {
        safe: true,
        collection: props.collection
    });

    return db.model(props.model, userSchema);
};