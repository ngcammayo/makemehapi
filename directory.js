/*jslint node: true */

'use strict';

var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Inert, function(err, option, next) {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    server.start(function() {
        console.log("Server running at: ", server.info.uri);
    });
});
