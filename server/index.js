// Express Server
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});


// SerialPort
var SerialPort = require("serialport");
console.log("hi");
// const port = new SerialPort('/dev/tty-usbserial3')
var port = new SerialPort('COM3',{
  baudRate:9600,
  // parser = port.pipe(new Readline({ delimiter: '\r\n' }))
  //parser:serialport.parsers.readline(‘\n’)
}, false);

const Readline = require('@serialport/parser-readline')

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
// parser.on('data', console.log)

// const ByteLength = require('@serialport/parser-byte-length')
// const parser = port.pipe(new ByteLength({length: 8}))

var temp = [];
var pres = [];
var alt = [];
var hum = [];
var sense = [];

parser.on('data', (data) => {
  var sensors = data.split(" ");
  console.log(data);
  // console.log(sensors[0]);
  temp.push(sensors[0]);
  // console.log(sensors[1]);
  pres.push(sensors[1])
  // console.log(sensors[2]);
  alt.push(sensors[2]);
  // console.log(sensors[3]);
  hum.push(sensors[3]);
  sense.push({temp: sensors[0], pres: sensors[1], alt: sensors[2], hum: sensors[3]});
  // console.log("sense is",sense,"\n");
  // socket.on("sense",sense);

  // io.emit("sense", sense);
  io.emit("sense",{temp: sensors[0], pres: sensors[1], alt: sensors[2], hum: sensors[3]});
});

function sendSense(sense) {
  console.log("sens is ",sense);
}

io.on("connection", function(socket) {
  console.log('a user connected');

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("sense", function(arg) {
    // socket.on("sense message", sendSense(senseData));
    io.emit("sense message", sense);
    console.log("inside function is",sense);
  });

})

// console.log("sense is",sense,"\n");


// parser.on('data',temp.push());
// parser.on('data',pres.push());
// parser.on('data',alt.push());
// parser.on('data',hum.push());


// SerialPort.list(function(err, results) {
//   console.log('working');
//   if(err) {
//     throw err;
//   }
//   console.log(results);
// });
//
// port.write('main screen turn on', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message)
//   }
//   console.log('message written')
// })
//
// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//   console.log('Error: ', err.message)
// })
//
// port.on('data', onData);
//
// function onData(data) {
//   console.log(data.toString());
// }
