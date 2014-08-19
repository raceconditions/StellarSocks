#!/usr/bin/env node

/*
 * (C) Copyright 2014 Travis Miller (http://raceconditions.net/).
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 */

var Server = require('../server.js');
var Telescope = require('../telescope.js');
var Config = require('../config.js');

var config = new Config().readConfiguration();

process.on('uncaughtException', function(err) {
    if(err.errno === 'EADDRINUSE')
         console.log("ERROR: An existing process is already listening on port", config.port);
    else
         throw err;
    process.exit(1);
});

var server = new Server(config.port);
var telescope = new Telescope(config.device);

server.on('data', function(buffer) {
    telescope.write(buffer);
});

telescope.on('data', function(buffer) {
    server.write(buffer);
});

telescope.start();
server.start();
