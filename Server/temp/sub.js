var mqtt = require('mqtt')
var client  = mqtt.connect('ws://13.72.86.164:8883')
 
client.on('connect', function () {
    console.log('CONNECT SUCCESSFULLY!');
  client.subscribe('DOKBetaV0/22', function (err) {
    if (!err) {
    //   client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
//   client.end()
})