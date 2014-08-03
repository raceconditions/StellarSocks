var util = require('util');
var EventEmitter = require('events').EventEmitter;
var serialport = require('serialport');

var Telescope = function(device) {

    var self = this;
    self.lastCommand = '';

    var serialDevice = new serialport.SerialPort(device, {
	baudrate: 9600,
	parser: serialport.parsers.raw
    }, false); // this is the openImmediately flag [default is true]

    this.start = function() {
	serialDevice.open(function () {
	    console.log('OPENED serial connection to device:', device);
	});

	serialDevice.on('data', function(buffer){
		self.emit('data', buffer);
	});
    };

    this.stop = function() {
	serialDevice.close(function() {
	    console.log('CLOSED serial connection to device:', device);
	});
    };

    this.write = function(buffer) {
	serialDevice.write(buffer, function(err){
	    if(err != undefined) 
		console.log(err);
	});
    };

};

util.inherits(Telescope, EventEmitter);

module.exports = Telescope;
