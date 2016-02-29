/*jslint node: true */

'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

function validate(request, username, password, callback) {
    if (username === 'hapi' && password === 'auth') {
        return callback(null, true, {});
    }

    return callback(null, false);
}

server.register(require('hapi-auth-basic'), function(err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply();
            }
        }
    });

    server.start(function() {
        console.log("Server running at: ", server.info.uri);
    });
});
