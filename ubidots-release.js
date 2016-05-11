var ubidots = require('ubidots');
var serialport = require('serialport');
var sleep = require('sleep');
var portName = '/dev/ttyACM0';
var client = ubidots.createClient('UBIDOTS-API-TOKEN-GOES-HERE');
var sp = new serialport.SerialPort(portName, {
   baudRate: 9600,
   dataBits: 8,
   parity: 'none',
   stopBits: 1,
   flowControl: false,
   parser: serialport.parsers.readline('\r\n')
});

sp.on('open', showPortOpen);
sp.on('data', saveLatestData);
sp.on('close', showPortClose);
sp.on('error', showError);

function showPortOpen() {
  sp.flush();
  sleep.sleep(5);
  sp.write(new Buffer('c','ascii'), function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
}

function saveLatestData(data) {
  sp.write('c');
  console.log(data);
  client.auth(function () {

    var vtemp = this.getVariable('ubidotstempvariablegoeshere');
    var vhumid = this.getVariable('ubidotshumidvariablegoeshere');
    var vlight = this.getVariable('ubidotslightvariablegoeshere');

    vtemp.getDetails(function (err, data) {
      console.log('Getting temperature..');
    });

    vhumid.getDetails(function (err, data) {
      console.log('Getting humidity..');
    });

    vlight.getDetails(function (err, data) {
      console.log('Getting light level..');
    });

    var sensordata = JSON.parse(data);    
    console.log('saving values...');

    if (sensordata.temperature > 0) {
      vtemp.saveValue(sensordata.temperature);
    } else {
      console.log('Value of temperature out of range, ignoring');
    }

    if (sensordata.humidity > 0) {
      vhumid.saveValue(sensordata.humidity);
    } else {
      console.log('Value of humidity out of range, ignoring');
    }

    vlight.saveValue(sensordata.lightlevel);

  });

  sleep.sleep(15);
}

function showPortClose() {
  sp.write('x');
  console.log('Serial port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}
