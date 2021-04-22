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
const PORT = process.env.PORT || 5000;
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
const s = new WebSocket.Server({ server });
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*------------------------------------------------------------------Routes-------------------------------------*/
app.use('/api/auth', userRoute);
app.use('/api/func', userFunction);

/*--------------------------------------------------Starting Server on PORT-------------------------------------*/
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Started on Port: ${PORT}`.blue);
});
