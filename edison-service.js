var util = require('util');
var bleno = require('bleno');

var EdisonMoveNoticeCharacteristic = require('./edison-move-notice-characteristic');

function EdisonService(message){
  bleno.PrimaryService.call(this, {
      uuid: '',// TO DO - skužiti UUID
      characteristics: [
        new SendMessageCharacteristic(message) // TO do napraviti SendMessageCharacteristic
      ]


  });
}

util.inherits(EdisonService, bleno.PrimaryService);

module.exports = EdisonService;
