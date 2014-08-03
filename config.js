var fs = require('fs');

var Config = function() {

    self = this;

    this.readConfiguration = function() {
	var configData = fs.readFileSync('./config.json');
	
	try {
	    config = JSON.parse(configData);
	    return config;
	}
	catch (err) {
	    console.log('ERROR parsing configuration file.', err);
	    process.exit(2);
	}
    };
};

module.exports = Config;
