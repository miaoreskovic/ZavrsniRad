var noble = require('noble');
var targetService = 'ba42561bb1d2440a8d040cefb43faece';

function scan(state) {
  if (state === 'poweredOn') {
    noble.startScanning([targetService], false);
    console.log("Started scanning");
  } else {
    noble.stopScanning();
    console.log("Is Bluetooth on?");
  }
}

function findMe (peripheral) {
  console.log('discovered ' + peripheral.advertisement.localName);
  peripheral.connect();

  peripheral.on('connect', connectMe);

  function connectMe() {
    noble.stopScanning();
    console.log('Checking for services on ' + peripheral.advertisement.localName);
    peripheral.discoverSomeServicesAndCharacteristics(['ba42561bb1d2440a8d040cefb43faece'], ['6bcb06e2747542a9a62a54a1f3ce11e6'], exploreMe);
  }
  peripheral.on('disconnect', disconnectMe);
}

function exploreMe(error, services, characteristics) {
  console.log('services: ' + services);
  console.log('characteristics: ' + characteristics);

  for (c in characteristics) {
    characteristics[c].notify(true);
    characteristics[c].on('read', listenToMe);
  }
}

function listenToMe (data, notification) {
  if(notification) {
    var value = data.readIntLE(0);
    console.log('value: ' + value);
  }
}

function disconnectMe() {
  console.log('peripheral disconnected');
  process.exit(0);
}

noble.on('stateChange', scan);
noble.on('discover', findMe);
