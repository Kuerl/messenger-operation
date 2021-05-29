import express from 'express';
import bodyParser from 'body-parser';                           // Json
import path from 'path';                                        // Path => express.static
import { sequelize } from './models';
var {Server} = require('socket.io');
import http from 'http';
import Transfer from './util/message';

import login from './util/login';
import register from './util/register';
import home from './util/home';

import cors from 'cors';

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './public')));

// App
login(app, urlencodedParser);
register(app, urlencodedParser);
home(app, urlencodedParser, io);

// Socket
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('test', (data) => {console.log('---------------------------------', data)});
});

// Server: Listen define
server.listen(5000,  "127.0.0.1", async function () {
    const host = server.address().address;
    const port = server.address().port;
    try {
        await sequelize.authenticate({alter: true});
            console.log('Connection has been established successfully.');
        console.log("Server start at: http://%s:%s", host, port)
    }
    catch (err) {
        console.log(err);
    }
});