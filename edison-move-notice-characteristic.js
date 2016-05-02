var util = require('util');
var bleno = require('bleno');
var message = require('./message');

function EdisonMoveNoticeCharacteristic() {
  bleno.Characteristic.call(this, {
    uuid: '';
    properties: ['notify', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Notifies'
      })
    ]
  })
  this.message = message;
}

util.inherits(EdisonMoveNoticeCharacteristic, bleno.characteristics);

EdisonMoveNoticeCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if(data.length !== 2) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    this
  }
  }
}
