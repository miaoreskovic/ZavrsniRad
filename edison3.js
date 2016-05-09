var bleno = require('bleno');

bleno.on('stateChange', function(state) {
    console.log('State change: ' + state);
    if (state === 'poweredOn') {
      bleno.startAdvertising('Edison', ['ba42561bb1d2440a8d040cefb43faece']);
    } else {
      bleno.stopAdvertising();
    }
});

bleno.on('accept', function(clientAddress) {
  console.log('Accepted connection from address: ' + clientAddress);
});

bleno.on('disconnect', function(clientAddress) {
  console.log("Disconnected from address" + clientAddress);
});

bleno.on('advertisingStart', function(error) {
  if (error) {
    console.log("Advertising start error:" + error);
  } else {
    console.log("Advertising start success" + error);
    bleno.setServices([

      new bleno.PrimaryService({
        uuid : 'ba42561bb1d2440a8d040cefb43faece',
        characteristics : [
            new bleno.Characteristic({
              value : null,
              uuid : '6bcb06e2747542a9a62a54a1f3ce11e6',
              properties : ['notify', 'read', 'write'],

              onSubscribe : function(maxValueSize, updateValueCallback) {
                console.log("Device subscribed");
                this.intervalId = setInterval(function(){
                  console.log("Sending: Hi");
                  updateValueCallback(new Buffer("Hi!"));
                }, 1000);
              },

              onUnsubscribe : function() {
                console.log("Device unsubscribed");
                clearInterval(this.intervalId);
              },

              onReadRequest : function(offset, callback) {
                console.log("Read request received");
                callback(this.RESULT_SUCCESS, new Buffer("Echo: " +
                          this.value ? this.value.toString("utf-8") : ""));
              },

              onWriteRequest : function(data, offset, withoutResponse, callback) {
                this.value = data;
              }
            })
        ]
      })
    ]);
  }
});
