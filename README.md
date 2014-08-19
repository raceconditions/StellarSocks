```
  _________ __         .__  .__                _________              __            
 /   _____//  |_  ____ |  | |  | _____ _______/   _____/ ____   ____ |  | __  ______
 \_____  \\   __\/ __ \|  | |  | \__  \\_  __ \_____  \ /  _ \_/ ___\|  |/ / /  ___/
 /        \|  | \  ___/|  |_|  |__/ __ \|  | \/        (  <_> )  \___|    <  \___ \ 
/_______  /|__|  \___  >____/____(____  /__| /_______  /\____/ \___  >__|_ \/____  >
        \/           \/               \/             \/            \/     \/     \/ 
```
## Introduction

The inspiration for StellarSocks is to control my telescope via my mobile device.  Many similar servers exist to allow remote connections or direct connections from a specific planetarium sofware application (e.g. Stellarium).  My goal is to make this application telescope, planetarium software, and protocol agnostic.

This should run on any *nix or Windows server which supports NodeJS and has a serial connection to a telescope.

StellarSocks is still very much in its infancy. Since I know there are many astronomy enthusiasts looking for a solution, I decided to share as soon as I had something that works in a reasonably reliable fashion.  I've tested this with my Celestron Nexstar 4SE using both Stellarium on my PC, and SkySafari Pro on my Samsung Galaxy S5.  Please let me know what hardware and software you use this with, and contact me with the results (good or bad)!

## Features

* Accepts TCP connections on a configurable port
* Interfaces with a telescope using a serial port (or USB)
* Facilitates bidirectional communication between planetarium software and telescope

## Planned Features

* Graceful recovery for Communication failures
* Interface with local camera and accept camera commands
* Provide a web interface to view current telescope position and camera feed

## Configuration

By default the server will open a TCP socket on port `5000`, and connect to a telescope on `/dev/ttyUSB0`. To configure these values, change the configuration in `config.json`.

## Installation

There's nothing much to this. 

```
npm install stellar-socks
```

This application uses core libraries with the exception of [serialport](https://github.com/voodootikigod/node-serialport). Serialport may require specific installation steps but rather than repeating them here, I recommend reading [voodootikigod's](https://github.com/voodootikigod) very detailed installation steps.

## Usage

Complete the following steps:

* Configure StellarSocks as described above for TCP port and serial device
* Turn on your telescope
* Connect the server hardware to the serial/RS-232 port on the telescope
* Align your telescope
* Run the application using the following command:

```
npm start
```

## Troubleshooting

More to come here.  For now, check the following:

* Ensure nothing else is listenting on the TCP port you provide.
* Ensure nothing else has a connection to the serial device
* You must connect the serial device to the telescope before you start StellarSocks
* If the serial connection is broken at any time, you will need to restart the service for now
