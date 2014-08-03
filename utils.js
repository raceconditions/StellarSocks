var fs = require('fs');
var serialport = require('serialport');

serialport.parsers.readlineIncludeDelim =  function (delimiter, encoding) {
    if (typeof delimiter === "undefined" || delimiter === null) { delimiter = "\r"; }
    if (typeof encoding  === "undefined" || encoding  === null) { encoding  = "utf8"; }
    // Delimiter buffer saved in closure
    var data = "";
    return function (emitter, buffer) {
      // Collect data
      data += buffer.toString(encoding);
      // Split collected data by delimiter
      var parts = data.split(delimiter);
      data = parts.pop();
      parts.forEach(function (part) {
	console.log("Part: ", part + delimiter);
        emitter.emit('data', part + delimiter);
      });
    };
}

function getDeviceStream(devicePath)
{
  fs.exists(devicePath, function (exists) {
    if (!exists) {
      throw Error('Unable to open the NexStar device descriptior: ' + devicePath);
    }
  });

  return fs.createWriteStream(devicePath, {'flags': 'a'});
}

function getParsedSerialPort(devicePath) {
    
  return getSerialPort(devicePath, serialport.parsers.readlineIncludeDelim("#"));
}

function getRawSerialPort(devicePath) {
  return getSerialPort(devicePath, serialport.parsers.raw);
}

function getSerialPort(devicePath, parser) {
  var serialDevice = new serialport.SerialPort(devicePath, {
    baudrate: 9600,
    parser: parser
  }, false); // this is the openImmediately flag [default is true]

  serialDevice.open(function () {
    console.log('Serial port opened: ', devicePath);
    serialDevice.isOpen = true;
  });

  return serialDevice;
}

module.exports = {
	getDeviceStream: getDeviceStream,
	getRawSerialPort: getRawSerialPort,
	getParsedSerialPort: getParsedSerialPort
};
