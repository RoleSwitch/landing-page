// config/properties.js

module.exports = {

    PORT: process.env.PORT || 8080,
    ENV: process.env.NODE_ENV || "production",

    SECRET: "duderoleswitchisthebestappeverohmygodicantbelieveit",
    ROLLBAR: {
        client: '7d9924773c9a448aac37a187e2c9a487',
        server: 'bd06ab5d60ee460a838ecbdb79834227'
    },

    DEV: {
        STATIC: 'public/dev',
        local: {

        },
        facebook: {
            clientID: '513849435394695',
            clientSecret: '2f6207f0203ba1d10b2109aeebfa1dd4',
            callbackUrl: 'http://localhost:8080/auth/facebook/callback'
        },
        google: {
            clientID: '160480800316-lpvm81mlesdntpa4fph7cb2o5b4rqb3c.apps.googleusercontent.com',
            clientSecret: 'O19N3SN4_SwgHI8qsPSKni5T',
            callbackUrl: 'http://localhost:8080/auth/google/callback'
        },
        DB: {
            user: 'mongodb://127.0.0.1:27017/user'
        }
    },
    PROD: {
        STATIC: 'public/prod',
        local: {

        },
        facebook: {
            clientID: '513849435394695',
            clientSecret: '2f6207f0203ba1d10b2109aeebfa1dd4',
            callbackUrl: 'http://localhost:8080/auth/facebook/callback'
        },
        google: {
            clientID: '160480800316-lpvm81mlesdntpa4fph7cb2o5b4rqb3c.apps.googleusercontent.com',
            clientSecret: 'O19N3SN4_SwgHI8qsPSKni5T',
            callbackUrl: 'http://localhost:8080/auth/google/callback'
        },
        DB: {
            user: 'mongodb://roleswitch:roleswitchpasswordqp@ds029979.mongolab.com:29979/user'
        }
    }
};