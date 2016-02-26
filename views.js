/*jslint node: true */

'use strict';

var Hapi = require('hapi');
var Vision = require('vision');
var Path = require('path');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Vision, function(err, option, next) {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    });

    server.route({
        method: 'GET',
        path: '/{name?}',
        handler: {
            view: 'index.html'
        }
    });

    server.start(function() {
        console.log("Server running at: ", server.info.uri);
    });
});
