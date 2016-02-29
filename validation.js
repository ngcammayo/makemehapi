/*jslint node: true */

'use strict';

var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

var routeConfig = {
    path: '/a/path/{with}/{parameters}',
    method: 'GET',
    handler: function(request, reply) {
        reply('Hello Joi');
    },
    config: {
        validate: {
            params: {
                with: Joi.string().required(),
                parameters: Joi.string().required()
            }
        }
    }
};

server.route(routeConfig);
server.start();
