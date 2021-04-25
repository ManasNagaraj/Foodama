//---------------------------------------------------Package imports-------------------------------------------------------------//
const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var http = require('http');
const WebSocket = require('ws');
const connectDB = require('./config/db');
const userRoute = require('./routes/user-auth');
const userFunction = require('./routes/user-function');
const cookieSession = require('cookie-session');
const passport = require('passport');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./config/passport-setup');

//------------------------------------------------------Configurations------------------------------------------------------------//
/*

*/
const server = http.createServer(app);
const PORT = process.env.PORT;

if (PORT == null || PORT == '') {
  PORT = 5000;
}
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
const s = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed.
  },
});
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*------------------------------------------------------------------Routes-------------------------------------*/
app.use('/api/auth', userRoute);
app.use('/api/func', userFunction);

/*----------------------------------------------------- websocket stuff----------------------------------------*/

s.on('connection', function (ws, req) {
  /******* when server receives messsage from client trigger function with argument message *****/
  ws.on('message', function (message) {
    console.log('Received: ' + message);
    s.clients.forEach(function (client) {
      //broadcast incoming message to all clients (s.clients)
      if (client != ws && client.readyState) {
        //except to the same client (ws) that sent this message
        client.send('broadcast: ' + message);
      }
    });
    // ws.send("From Server only to sender: "+ message); //send to client where message is from
  });
  ws.on('close', function () {
    console.log('lost one client');
  });
  //ws.send("new client connected");
  console.log('new client connected');
});

/*--------------------------------------------------Starting Server on PORT-------------------------------------*/
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Started on Port: ${PORT}`.blue);
});
