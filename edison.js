var util = require('util');
var bleno = require('bleno');

var EdisonService = require('./edison-service');

var name = 'Edison';
var edisonService = new EdisonService //TO DO nedovrseno

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, [edisonService.uuid], function(err) {
      if(err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err){
    if (!err) {
      conole.log('advertising...');
      bleno.setServices([
        edisonService //TO DO nedovrseno
      ]);
    }
});
